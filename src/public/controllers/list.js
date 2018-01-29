/**
 * List Controller
 */

angular.module('task-manager')
	.controller('ListCtrl', function($scope, DataService) {
		$scope.tasks = [];
		$scope.taskMap = {};
		$scope.taskDetail;
		$scope.selected = 0;

		DataService.list()
			.then(function(response) {
				const tasks = response.data.tasks;
				if (tasks.length > 0) {
					console.log('Queried tasks');
					$scope.taskDetail = tasks[0];

					tasks.forEach(function(task) {
						$scope.tasks.push(task);
						$scope.taskMap[task.id] = task;
					});
				}
			});

		$scope.selectDetail = function(task) {
			$scope.taskDetail = $scope.taskMap[task.id];
		};

		$scope.hasTasks = function() {
			return $scope.tasks.length > 0;
		}
	}); 