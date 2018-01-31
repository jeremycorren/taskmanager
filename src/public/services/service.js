/** 
 * API Service
 */

angular.module('task-manager')
	.factory('DataService', function($http, $localStorage) {
		return {
			create: function(task) {
				return $http.post('/api/create', task);
			},

			update: function(id, task) {
				return $http.post('/api/update', { id: id, task: task });
			},

			delete: function(id) {
				return $http.post('/api/delete', id);
			},

			list: function() {
				if ($localStorage.tasks) {
					return $localStorage.tasks;
				}

				return $http.get('/api/list')
					.then(function(response) {
						const tasks = response.data.tasks;
						$localStorage.tasks = tasks;
						return tasks;
					});
			}
		};
	});