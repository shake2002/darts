angular.module('dartsApp', ['ngRoute']).

config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'mainScreen.html'
		})
			.otherwise({
				redirectTo: '/'
			});
	}
]);