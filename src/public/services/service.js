/** 
 * API Service
 */

angular.module('app')
	.factory('DataService', function($http) {
		return {
			create: function(task) {
				return $http.post('/api/create', task);
			}
		};
	});