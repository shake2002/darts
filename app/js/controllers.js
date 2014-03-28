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
])

.controller('ManageUsersCtrl', ['$scope',
	function($scope) {

		$scope.title = 'Manage User';

		$scope.users = [{
			name: 'Mark',
			nick: 'superman'
		}, {
			name: 'Joe',
			nick: 'jooo'
		}];

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

		$scope.isDetailsShow = false;
		$scope.userDetails = function() {
			$scope.isDetailsShow = !$scope.isDetailsShow;
			$scope.finishedGames = '6';
			$scope.bestResults = '5 rounds';
			$scope.highResults = '450 pkt';
		};
	}
]);