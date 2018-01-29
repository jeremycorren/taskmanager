/**
 * Create Controller
 */

angular.module('task-manager')
	.controller('CreateCtrl', function($scope, $location, DataService) {
		$scope.addTask = function() {
			const task = {
				name: $scope.name,
				description: $scope.description,
				topic: $scope.topic
			};

			$scope.name = $scope.description = $scope.topic = '';

			DataService.create(task)
				.then(function(response) {
        	$location.path('#!/list');
      	});
		};

		$scope.canAdd = function() {
			return $scope.name && $scope.name.length > 0
				&& $scope.description && $scope.description.length > 0
				&& $scope.topic && $scope.topic.length > 0;
		};
	}); 