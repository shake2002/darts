var app = angular.module('dataSource', []);

app.factory('fDatService', ['$http', '$rootScope', '$q',
	function ($http, $rootScope, $q) {
		var modelScope = {
			players: [],
			games: []
		},
		assignToModel = function (data) {
			console.log('assign to model:  ' + data);
			modelScope.players = data.players;
			modelScope.games = data.games;
		},
		defer = $q.defer(),
		postData = function (url, dataToSave, callback) {
			var defer = $q.defer();
			$http.post(url, dataToSave).success(function (data) {
				defer.resolve(data);
				callback(defer.promise);

			});
		}, 
		process = function (promise) {
			promise.then(function (data) {
				assignToModel(data);
			});
		};
		$rootScope.modelScope = modelScope;

		$http.get('/init').success(function (data) {
			defer.resolve(data);

		});
		process(defer.promise);

		return {
			addPlayer: function (player) {
				postData('/player/add', player, process);
			},
			removePlayer: function (player) {
				postData('/player/remove', player, process);
			},
			newGame: function (game) {
				postData('/game/new', game, process);
			}
		};
	}
	]);

app.service('SaveService', [

	function () {

	}
	]);