angular.module('directives', [])

.directive('players', function() {
	// Runs during compile
	return {
		restrict: 'E',
		scope: {
			columnNo: '=',
			players: '='
		},
		template: '<div class="col-md-6">' +
			'<div class="thumbnail">' +
			'<div class="caption">' +
			'Zawodnik nr {{columnNo}}' +
			'<p ng-repeat="player in players">' +
		'<button  ng-class="{\'btn btn-primary\' : playerChosen[{{columnNo - 1}}] == player.id, \'btn btn-default\' : playerChosen[{{columnNo - 1}}] != player.id}" ng-click="selectPlayer(player.id, {{columnNo}})" ng-disabled="(playerChosen[{{columnNo - 1}}] > 0 && playerChosen[{{columnNo - 1}}] != player.id)  || playerChosen[{{columnNo%2}}] == player.id">{{player.name}}</button>'
		//</p>\n</div>\n</div>\n</div>'
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
	};
});