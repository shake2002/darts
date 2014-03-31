angular.module('contorllers', ['dataSource'])

.controller('SingleGameCtrl', ['$scope', 'fDatService',
	function($scope, fDatService) {

		$scope.selectedPlayersCount = 0;
		$scope.selectedGame = 'none';
		$scope.gameLaunched = false;
		$scope.playerResultRowsCount = 0;

		$scope.$watch(function() {
			$scope.players = $scope.$parent.modelScope.players;
		});
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
					if (player._id == playerId) {
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
])

.controller('ManageUsersCtrl', ['$scope', 'PlayerService', 'fDatService',

	function($scope, PlayerService, fDatService) {

		$scope.title = 'Manage User';

		$scope.$watch(function() {
			$scope.users = $scope.$parent.modelScope.players;
		});

		$scope.addUser = function() {
			var newUser = {
				name: $scope.userName,
				nick: $scope.userNick
			};
			fDatService.addPlayer(newUser);

			$scope.userName = '';
			$scope.userNick = '';
		};

		$scope.removeUser = function(user) {
			$scope.users.splice(user, 1);
		};

		$scope.showingDetails = false;
		$scope.userDetails = function(user) {
			console.log(user + ' | ' + $scope.showingDetails);
			$scope.showingDetails = true;
			$scope.userDetails = user;
		};
		$scope.closeDetails = function() {
			$scope.showingDetails = false;
			$scope.userDetails = '';
		};
	}
])

.controller('DetailsUserCtrl', ['$scope', 'Players',
	function($scope, Player) {
		$scope.title = 'User details: ';
	}
]);