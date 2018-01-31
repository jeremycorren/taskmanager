/**
 * Create Controller
 */

angular.module('task-manager')
	.controller('CreateCtrl', function($scope, $state, $stateParams, $location, $localStorage, DataService) {
		$scope.action = 'Submit';

		const idToEdit = $stateParams.id;
		let taskToEdit;
		if (idToEdit) {	
			const taskMap = {};
			$localStorage.tasks.forEach(function(task) {
				taskMap[task.id] = task;
			});

			taskToEdit = taskMap[idToEdit];
			$scope.name = taskToEdit.name;
			$scope.description = taskToEdit.description;
			$scope.topic = taskToEdit.topic;
			$scope.action = 'Update';
		}

		$scope.addTask = function() {
			const task = {
				name: $scope.name,
				description: $scope.description,
				topic: $scope.topic
			};
			$scope.name = $scope.description = $scope.topic = '';

			if (idToEdit) {
				DataService.update(idToEdit, task)
					.then(function(res) {
						console.log(res.data.msg);
						delete $localStorage.tasks;

						task.id = idToEdit;
						$state.go('list.view', {}, { reload: true });
					})
					.catch(function(err) {
	      		console.log(err);
	      	});
			} else {
				DataService.create(task)
					.then(function(res) {
						console.log(res.data.msg);
						delete $localStorage.tasks;
						$state.go('list.view', {}, { reload: true });
	      	})
	      	.catch(function(err) {
	      		console.log(err);
	      	});
			}
		};

		$scope.canAdd = function() {
			return $scope.name && $scope.name.length > 0
				&& $scope.description && $scope.description.length > 0
				&& $scope.topic && $scope.topic.length > 0;
		};
	}); 