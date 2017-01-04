seevee.controller("loginController", ['$scope', '$location',
    function($scope, $location) {
        $scope.login = function() {
            window.location = "/api/auth/facebook";
        };
    }
]);
