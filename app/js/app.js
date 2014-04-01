angular.module('dartsApp', ['ngRoute', 'contorllers', 'services', 'directives', 'ngDragDrop']).

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
			.when('/detailsUser', {
				templateUrl: 'detailsUser.html',
				controller: 'DetailsUserCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);