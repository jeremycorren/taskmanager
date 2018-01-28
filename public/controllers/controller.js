/**
 * Task Controller
 */

angular.module('app')
	.controller('TaskController', function($scope, DataService) {
		$scope.tasks = [];
		$scope.archive = [];
		$scope.isCollapsed = true;

		$scope.addTask = function() {
			const task = {
				text: $scope.newTask,
				done: false
			};

			$scope.tasks.push(task);
			$scope.newTask = '';

			DataService.create(task)
				.then(function(response) {
        	console.log('Server msg: ' + response.data.msg);
      	});
		};

		$scope.archiveTasks = function() {
			$scope.tasks
				.filter(task => task.done)
				.forEach(task => $scope.archive.push(task));
			$scope.tasks = $scope.tasks.filter(task => !task.done);
		};

		$scope.toggleArchive = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		$scope.clearArchive = function() {
			$scope.archive.length = 0;
			$scope.isCollapsed = true;
		};

		$scope.tasksDone = function() {
			return $scope.tasks.filter(task => task.done);
		};

		$scope.canAdd = function() {
			return !$scope.newTask || $scope.newTask.length == 0;
		};

		$scope.displayArchiveContainer = function() {
			return $scope.tasksDone().length > 0 || $scope.archive.length > 0 || !$scope.isCollapsed;
		};
	}); 