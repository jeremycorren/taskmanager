/**
 * List Controller
 */

angular.module('task-manager')
	.controller('ListCtrl', function($scope, $state, $stateParams, $localStorage, tasks, DataService) {
		$scope.tasks = [];
		$scope.taskMap = {};
		$scope.taskDetail;
		$scope.selected;

		if (tasks.length > 0) {
			tasks.forEach(function(task) {
				$scope.tasks.push(task);
				$scope.taskMap[task.id] = task;
			});
		}
		$state.go('list.view');

		$scope.deleteTask = function(taskToDelete) {
			$scope.tasks = $scope.tasks.filter(function(task) {
				return task.id != taskToDelete.id;
			});
			$scope.selected = undefined;

			DataService.delete({ id: taskToDelete.id })
				.then(function(res) {
					console.log(res.data.msg);
					delete $localStorage.tasks;
        	$state.go('list', {}, { reload: true });
      	})
      	.catch(function(err) {
      		console.log(err);
      	});
		}

		$scope.selectDetail = function(index, task) {
			$scope.selected = index;
			$scope.taskDetail = task;
		};

		$scope.hasTasks = function() {
			return $scope.tasks.length > 0;
		}

		$scope.checkSelected = function() {
			return $scope.selected === undefined;
		}
	}); 