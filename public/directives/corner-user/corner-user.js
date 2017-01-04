seevee.directive('cornerUser', ['$http', '$location', function() {
    return {
        restrict: 'EA',
        templateUrl: '/directives/corner-user/corner-user.html',
        controller: function($scope, $element, $http, $location) {
            var toggleCount = 0;
            var arrows = ['fa-angle-right', 'fa-angle-left'];
            var states = ['hiding', 'showing'];
            $scope.arrowClass = arrows[0];
            $scope.state = states[0];

            $scope.toggleDropdown = function() {
                toggleCount++;
                var toggleState = toggleCount % 2;
                $scope.arrowClass = arrows[toggleState];
                $scope.state = states[toggleState];
            };

            $scope.logout = function() {
                $http.post("/api/user/logout");
                $location.url('/login');
            };

            $scope.goToAccount = function() {
                $location.path('/account');
            };
        }
    };
}]);
