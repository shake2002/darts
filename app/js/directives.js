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
]);