angular.module('contorllers', [])

.controller('SingleGameCtrl', ['$scope', 'Players',

	function($scope, Players) {
		$scope.playersSelected = false;

		$scope.players = Players.cast;

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
])

.controller('ManageUsersCtrl', ['$scope', 'PlayerService',

	function($scope, PlayerService) {

		$scope.title = 'Manage User';

		$scope.users = PlayerService.getPlayers();

		$scope.addUser = function() {
			var newUser = {
				name: $scope.userName,
				nick: $scope.userNick
			};
			$scope.users.push(newUser);

			$scope.userName = '';
			$scope.userNick = '';
		};

		$scope.removeUser = function(user) {
			$scope.users.splice(user, 1);
		};

		$scope.userDetails = function(user) {
			//$scope.
		};
	}
])

.controller('DetailsUserCtrl', ['$scope', 'Players',
	function($scope, Player) {
		$scope.title = 'User details: ';
	}
]);