angular.module('contorllers', ['dataSource'])

.controller('SingleGameCtrl', ['$scope', 'fDatService',
	function($scope, fDatService) {

		$scope.selectedPlayers = [];
		$scope.selectedGame = 'none';
		$scope.gameLaunched = false;
		$scope.playerResultRowsCount = 0;
		$scope.playerResult = 0;
		$scope.activeInput = 0;
		$scope.roundNo = 1;
		$scope.currentPlace = 1;
		$scope.gameFinished = false;
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
			for (var i = 0; i < $scope.selectedPlayers.length; i++) {
				var player = $scope.selectedPlayers[i];
				player.partialResults = [];
				player.place = 0;
				player.finished = false;
			}
			$scope.playerResultRowsCount = [];
			var count = Math.ceil($scope.selectedPlayers.length / 2);
			for (i = 0; i < count; i++) {
				$scope.playerResultRowsCount.push(i);
			}
			$scope.currentPlayer = $scope.selectedPlayers[0];
			$scope.gameLaunched = true;
		};

		$scope.selectGame = function(gameType) {
			$scope.selectedGame = gameType;
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
			var tmpNextPlayer = '';
			var playerFounded = false;
			var playerBeforeCurrent = true;
			for (i = 0; i < $scope.selectedPlayers.length; i++) {
				var player = $scope.selectedPlayers[i];
				if (!playerFounded && player._id == $scope.currentPlayer._id) {
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
						player.finished = true;
						if ($scope.currentPlace == $scope.selectedPlayers.length) {
							$scope.gameFinished = true;
						}
					}
					player.partialResults.push(tmpResults);
					playerFounded = true;
				} else {
					if (!playerFounded && !player.finished && tmpNextPlayer === '') {
						tmpNextPlayer = player;
					} else if (playerFounded && !player.finished) {
						tmpNextPlayer = player;
						playerBeforeCurrent = false;
						break;
					}
				}
			}

			if ($scope.gameFinished) {
				for (i = 0; i < $scope.selectedPlayers.length; i++) {
					var playerTmp = $scope.selectedPlayers[i];
					if (!playerTmp.finished) {
						playerTmp.place = $scope.currentPlace;
					}
				}
				fDatService.newGame({
					'game': {
						'type': $scope.selectedGame
					},
					'players': $scope.selectedPlayers
				});
			}
			if (playerBeforeCurrent) {
				$scope.roundNo++;
			}
			$scope.currentPlayer = tmpNextPlayer;
			$scope.activeInput = 0;
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

		window.scope = $scope.$parent.modelScope.players;
		window.scope2 = $scope;

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
			fDatService.removePlayer(user);
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