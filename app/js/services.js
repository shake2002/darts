angular.module('services', [])

.factory('PlayerService', function($rootScope) {
	var factory = {};

	var players = [{
		id: 1,
		name: 'Mark King',
		nick: 'superman'
	}, {
		id: 2,
		name: 'Joe Perry',
		nick: 'jooo'
	}];

	factory.getPlayers = function() {
		return players;
	};

	return factory;

});