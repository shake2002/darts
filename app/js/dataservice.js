angular.module('dataSource', [])

.factory('fDatService', ['$http', '$rootScope',
	function($http, $rootScope) {
		var modelScope = {
			players: [],
			games: []
		};

		$rootScope.modelScope = modelScope;

		$http.get('/init').success(function(data) {
			assignToModel(data);
		});
		var assignToModel = function(data) {
			console.log('assign to model: ' + data);
			modelScope.players = data.players;
			modelScope.games = data.games;
		};

		return {
			addPlayer: function(player) {
				$http.post('/player/add', player).success(function(data) {
					assignToModel(data);
				});
			},
			removePlayer: function(player) {
				$http.post('/player/remove', player).success(function(data) {
					assignToModel(data);
				});
			},
			newGame: function(game) {
				$http.post('/game/new', game).success(function(data) {
					assignToModel(data);
				});
			}
		};
	}
]);