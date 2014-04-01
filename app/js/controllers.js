angular.module('contorllers', ['dataSource'])

.controller('SingleGameCtrl', ['$scope', 'fDatService',
	function($scope, fDatService) {

		$scope.selectedPlayersCount = 0;
		$scope.selectedGame = 'none';
		$scope.gameLaunched = false;
		$scope.playerResultRowsCount = 0;
		$scope.activePlayer = 0;
		$scope.playerResult = 0;
		$scope.activeInput = 0;
		$scope.roundNo = 1;
		$scope.currentPlace = 1;
		$scope.shots = [{
			value: 0,
			multipier: 1,
			display: ''
		}, {
			value: 0,
			multipier: 1,
			display: ''
		}, {
			value: 0,
			multipier: 1,
			display: ''
		}];

		$scope.$watch(function() {
			$scope.players = $scope.$parent.modelScope.players;
		});
		$scope.playerChosen = [];

		$scope.showGameSelector = function() {
			$scope.playersSelected = true;
		};

		$scope.startGame = function() {
			$scope.activePlayer = $scope.playerChosen[0];
			$scope.gameLaunched = true;
		};

		$scope.selectPlayer = function(playerId, columnNo) {
			if ($scope.playerChosen[columnNo - 1] == playerId) {
				$scope.playerChosen[columnNo - 1] = 0;
				$scope.selectedPlayersCount--;
				$scope.playerResultRowsCount = Math.ceil($scope.selectedPlayersCount / 2);
				$scope.shots = [];
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
			for (var i = 0; i < $scope.selectedPlayersCount; i++) {
				for (var j = 0; j < $scope.players.length; j++) {
					var player = $scope.players[j];
					if (player._id == $scope.playerChosen[i]) {
						player.partialResults = [];
						player.place = 0;
					}
				}
			}
		};
		$scope.nextInput = function() {
			if ($scope.activeInput < 2) {
				$scope.activeInput++;
			}
		};
		$scope.prevInput = function() {
			if ($scope.activeInput > 0) {
				$scope.activeInput--;
			}
		};

		$scope.nextPlayer = function() {
			var result = 0;
			for (var i = 0; i < $scope.shots.length; i++) {
				result += $scope.shots[i].value;
				$scope.shots[i].value = 0;
				$scope.shots[i].multipier = 1;
				$scope.shots[i].display = '';
			}
			for (i = 0; i < $scope.players.length; i++) {
				var player = $scope.players[i];
				if (player._id == $scope.activePlayer) {
					var tmpResults = {};
					tmpResults.roundNo = $scope.roundNo;
					tmpResults.roundResult = result;
					var finalResult = 0;
					if ($scope.selectedGame == '301' && $scope.roundNo == 1) {
						finalResult = 301 - result;
					} else if ($scope.selectedGame == '501' && $scope.roundNo == 1) {
						finalResult = 501 - result;
					} else {
						finalResult = player.partialResults[$scope.roundNo - 2].finalResult - result;
					}

					tmpResults.finalResult = finalResult;
					if (finalResult < 0) {
						tmpResults.finalResult = player.partialResults[$scope.roundNo - 2].finalResult;
					} else if (finalResult === 0) {
						player.place = $scope.currentPlace;
						$scope.currentPlace++;
					}
					player.partialResults.push(tmpResults);
					break;
				}
			}
			$scope.activeInput = 0;
			for (i = 0; i < $scope.selectedPlayersCount; i++) {
				if ($scope.playerChosen[i] == $scope.activePlayer) {
					if (i == $scope.selectedPlayersCount - 1) {
						$scope.activePlayer = $scope.playerChosen[0];
						$scope.roundNo++;
					} else {
						$scope.activePlayer = $scope.playerChosen[i + 1];
					}
					break;
				}
			}
		};
		$scope.setResult = function(result) {
			$scope.shots[$scope.activeInput].value = result;
			$scope.shots[$scope.activeInput].display = result;
			$scope.shots[$scope.activeInput].multipier = 1;
		};

		$scope.double = function() {
			$scope.shots[$scope.activeInput].multipier = 2;
			$scope.shots[$scope.activeInput].display = $scope.shots[$scope.activeInput].value + '*2';
			$scope.shots[$scope.activeInput].value = $scope.shots[$scope.activeInput].value * 2;
		};

		$scope.tripple = function() {
			$scope.shots[$scope.activeInput].multipier = 3;
			$scope.shots[$scope.activeInput].display = $scope.shots[$scope.activeInput].value + '*3';
			$scope.shots[$scope.activeInput].value = $scope.shots[$scope.activeInput].value * 3;
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

			console.log(user);

			var tmp = {
				'_id': user._id
			};

			console.log(tmp);

			fDatService.removePlayer({
				'_id': user._id
			});
			//$scope.users.splice(user, 1);
		};

		$scope.showingDetails = false;
		$scope.userDetails = function(user) {
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