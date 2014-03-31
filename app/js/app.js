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
			.otherwise({
				redirectTo: '/'
			});
	}
]);