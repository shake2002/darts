angular.module('contorllers', [])

.controller('SingleGameCtrl', ['$scope',
	function($scope) {

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