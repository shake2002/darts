angular.module('contorllers', [])

.controller('SingleGameCtrl', ['$scope',
	function($scope) {
		$scope.selectedPlayersCount = 0;
		$scope.selectedGame = 'none';
		$scope.gameLaunched = false;
		$scope.playerResultRowsCount = 0;

		$scope.players = [{
			'id': 1,
			'name': 'Kasia Krawczyk'
		}, {
			'id': 2,
			'name': 'Jan Kowalski'
		}, {
			'id': 3,
			'name': 'Zbigniew Nowak'
		}];

		$scope.playerChosen = [0, 0];

		$scope.showGameSelector = function() {
			$scope.playersSelected = true;
		};

		$scope.startGame = function() {
			$scope.gameLaunched = true;
		};

		$scope.selectPlayer = function(playerId, columnNo) {
			if ($scope.playerChosen[columnNo - 1] == playerId) {
				$scope.playerChosen[columnNo - 1] = 0;
				$scope.selectedPlayersCount--;
				$scope.playerResultRowsCount = Math.ceil($scope.selectedPlayersCount / 2);
			} else {
				for (var i = $scope.players.length - 1; i >= 0; i--) {
					player = $scope.players[i];
					if (player.id == playerId) {
						$scope.playerChosen[columnNo - 1] = playerId;
						$scope.selectedPlayersCount++;
						$scope.playerResultRowsCount = Math.ceil($scope.selectedPlayersCount / 2);
					}
				}
			}
		};
		$scope.selectGame = function(gameType) {
			$scope.selectedGame = gameType;
		};
	}
]);