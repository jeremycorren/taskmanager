/**
 * Main App Module
 */

angular.module('task-manager', ['ngRoute', 'ngAnimate', 'ui.bootstrap'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/create', {
				templateUrl: 'views/create.html'
			})
			.when('/list', {
				templateUrl: 'views/list.html'
			})
			.otherwise({
				redirectTo: '/list'
			});
	});