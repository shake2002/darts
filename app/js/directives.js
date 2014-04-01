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


.directive('playerResult', function() {
	return {
		restrict: 'E',
		scope: {
			playerResultRowsCount: "=",
			players: '=',
			currentPlayer: '='
		},
		template: '<div class="row" ng-repeat="number in playerResultRowsCount">' +
			'<div class="col-md-6" ng-repeat="player in players.slice($index*2, $index*2+2)">' +
			'<div ng-class="{ \'panel panel-primary\' : currentPlayer._id == player._id, \'panel panel-default\' : currentPlayer._id != player._id}">' +
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
			'</div>' +
			'</div>' +
			'</div>'
	};
});