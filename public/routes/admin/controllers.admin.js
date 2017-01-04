seevee.controller("adminController", ['$scope', '$location', '$http', "$rootScope",
    function($scope, $location, $http, $rootScope) {
        $http.get("api/admin").then(function(res) {
            $scope.users = res.data;
        });

        $scope.getAccomplishments = function(userId) {
            $http.get("api/user/accomplishments/" + userId).then(function(res) {
                $scope.accomplishments = res.data;
            });
        };
    }
]);
