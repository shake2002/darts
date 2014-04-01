angular.module('services', ['dataSource'])

.factory('PlayerService', function($rootScope, fDatService) {

	var factory = {};
	var players = {};

	players = $rootScope.modelScope.players;

	factory.getPlayers = function() {
		return players;
	};

	return factory;

});