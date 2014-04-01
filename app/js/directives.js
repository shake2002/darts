/* Directives */
angular.module('directives', [])

.directive('userdetails', [

	function() {
		return function(scope, element, attr) {
			element.bind("mouseenter", function() {
				scope.userDetails();
			});
		};
	}
])

.directive('players', function() {
	// Runs during compile
	return {
		restrict: 'E',
		scope: {
			columnNo: '=',
			players: '=',
			action: '&',
			playerChosen: '='
		},
		template: '<div class="col-md-6">' +
			'<div class="thumbnail">' +
			'<div class="caption">' +
			'Zawodnik nr {{columnNo}}' +
			'<p ng-repeat="player in players">' +
			'<button  ng-class="{\'btn btn-primary\' : playerChosen[{{columnNo - 1}}] == player._id, \'btn btn-default\' : playerChosen[{{columnNo - 1}}] != player._id}" ng-click="selectPlayer(player._id)" ng-disabled="(playerChosen[{{columnNo - 1}}] != \'\' && playerChosen[{{columnNo - 1}}] != player._id)  || playerChosen[{{columnNo%2}}] == player._id">{{player.name}}</button>' +
			'</p>\n</div>\n</div>\n</div>',
		controller: ['$scope', '$element', '$attrs', '$transclude',
			function($scope, $element, $atrrs, $transclude) {
				$scope.selectPlayer = function(playerId) {
					console.log(playerId);
					$scope.action({
						selectedPlayerId: playerId,
						selectedColumnNo: $scope.columnNo
					});
				};
			}
		]
	};
})

.directive('playerResult', function() {
	return {
		restrict: 'E',
		scope: {
			playerId: '=',
			players: '=',
			activePlayer: '='
		},
		template: '<div ng-class="{ \'panel panel-primary\' : activePlayer == player._id, \'panel panel-default\' : activePlayer != player._id}" ng-repeat="player in players | filter: {_id : playerId}">' +
			'<div class="panel-heading">' +
			'<h2>{{player.name}} ({{player.place}})</h2>' +
			'</div>' +
			'<table class="table table-striped active"><thead>' +
			'<th>Numer rundy</th>' +
			'<th>Wynik rundy</th>' +
			'<th>Wynik końcowy</th></thead>' +
			'<tbody>' +
			'<tr ng-repeat="singleResult in player.partialResults">' +
			'<td>{{singleResult.roundNo}}</td>' +
			'<td>{{singleResult.roundResult}}</td>' +
			'<td>{{singleResult.finalResult}}</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>'
	};
});