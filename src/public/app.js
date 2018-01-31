/**
 * Main App Module
 */

angular.module('task-manager', ['ngStorage', 'ngAnimate', 'ui.router', 'ui.bootstrap'])
	.config(function($urlRouterProvider, $stateProvider) {
		$urlRouterProvider
			.otherwise('/list');

		$stateProvider
			.state('list', {
				url: '/list',
				templateUrl: 'views/list/list.html',
				controller: 'ListCtrl',
				resolve: {
					tasks: function(DataService) {
						return DataService.list();
					}
				}
			})
			.state('list.create', {
				url: '/create',
				templateUrl: 'views/create/create.html',
				controller: 'CreateCtrl'
			})
			.state('list.edit', {
				url: '/:id',
				templateUrl: 'views/create/create.html',
				controller: 'CreateCtrl'
			})
			.state('list.view', {
				url: '',
				templateUrl: 'views/view/view.html',
				controller: 'ListCtrl'
			});
	});