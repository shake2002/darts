angular.module('dataSource', [])

.factory('fDatService', ['$http', '$rootScope',
	function($http, $rootScope) {
		var modelScope = {
			players: []
		};

		$rootScope.modelScope = modelScope;

		$http.get('/player/list').success(function(data) {
			modelScope.players = data.players;
		});

		return {
			addPlayer: function(player) {
				$http.post('/player/add', player).success(function(data) {

				});
			},
			removePlayer: function(player) {
				$http.post('/player/remove', player).success(function(data) {

				});
			},
			init: function() {
				console.log('init');
			}
		};
	}
]);