angular.module('dartsApp', ['ngRoute', 'contorllers', 'directives']).

config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'mainScreen.html'
		})
			.when('/singleGame', {
				templateUrl: 'html/partials/singleGame.html',
				controller: 'SingleGameCtrl'
			})
			.when('/manageUsers', {
				templateUrl: 'html/partials/manageUsers.html',
				controller: 'ManageUsersCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);