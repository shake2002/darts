angular.module('contorllers', ['dataSource'])

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

.controller('ManageUsersCtrl', ['$scope', 'PlayerService', 'fDatService',

	function($scope, PlayerService, fDatService) {

		$scope.title = 'Manage User';


		fDatService.init();
		$scope.$watch(function() {
			$scope.users = $scope.$parent.modelScope.players;
		});
		//$scope.users = PlayerService.getPlayers();

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