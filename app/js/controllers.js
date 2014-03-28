angular.module('contorllers', [])

.controller('SingleGameCtrl', ['$scope',
	function($scope) {
		$scope.playersSelected = false;

		$scope.players = [{
			'id': 1,
			'selected': false,
			'name': 'Kasia Krawczyk'
		}, {
			'id': 2,
			'selected': false,
			'name': 'Jan Kowalski'
		}, {
			'id': 3,
			'selected': false,
			'name': 'Zbigniew Nowak'
		}];

		$scope.playerChosen = [0, 0];

		$scope.startGame = function() {
			$scope.playersSelected = true;
		};

		$scope.selectPlayer = function(playerId, columnNo) {
			if ($scope.playerChosen[columnNo - 1] == playerId) {
				$scope.playerChosen[columnNo - 1] = 0;
			} else {
				for (var i = $scope.players.length - 1; i >= 0; i--) {
					player = $scope.players[i];
					if (player.id == playerId) {
						$scope.playerChosen[columnNo - 1] = playerId;
						break;
					}
				}
			}
		};
	}
]);