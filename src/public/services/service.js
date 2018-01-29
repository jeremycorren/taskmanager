/** 
 * API Service
 */

angular.module('task-manager')
	.factory('DataService', function($http) {
		return {
			list: function() {
				return $http.get('/api/list');
			},

			create: function(task) {
				return $http.post('/api/create', task);
			}
		};
	});