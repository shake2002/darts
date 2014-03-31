angular.module('directives', [])

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
			'<button  ng-class="{\'btn btn-primary\' : playerChosen[{{columnNo - 1}}] == player.id, \'btn btn-default\' : playerChosen[{{columnNo - 1}}] != player.id}" ng-click="selectPlayer(player.id)" ng-disabled="(playerChosen[{{columnNo - 1}}] > 0 && playerChosen[{{columnNo - 1}}] != player.id)  || playerChosen[{{columnNo%2}}] == player.id">{{player.name}}</button>' +
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
			players: '='
		},
		template: '<div class="panel panel-default" ng-repeat="player in players | filter: {id : playerId}">' +
			'<div class="panel-heading">' +
			'<h2>{{player.name}}</h2>' +
			'</div>' +
			'<table class="table table-striped active"><thead>' +
			'<th>Numer rundy</th>' +
			'<th>Wynik rundy</th>' +
			'<th>Wynik końcowy</th></thead>' +
			'<tbody>' +
			'<tr ng-repeat="singleResult in playerResults">' +
			'<td>{{$index + 1}}</td>' +
			'<td>{{singleResult.roundResult}}</td>' +
			'<td>{{singleResult.finalResult}}</td>' +
			'</tr>' +
			'</tbody>' +
			'</table>' +
			'</div>'
	};
});