seevee.controller("accountController", ['$scope', '$location', '$http', "$rootScope",
    function($scope, $location, $http, $rootScope) {
        $scope.user = {};
        $scope.address = {};
        $scope.saveMessage = '';

        var getData = function() {
            $http.get("api/user/" + $rootScope.currentUser._id).then(function(response) {
                $scope.user.email = response.data.email;
                $scope.user.firstName = response.data.firstName;
                $scope.user.lastName = response.data.lastName;

                $scope.address.addressLine1 = response.data.address.addressLine1;
                $scope.address.addressLine2 = response.data.address.addressLine2;
                $scope.address.city = response.data.address.city;
                $scope.address.state = response.data.address.state;
                $scope.address.zip = response.data.address.zip;
            });
        };

        $scope.save = function() {
            $scope.saveMessage = 'Saving...';
            $scope.body = {
                user: $scope.user,
                address: $scope.address
            };
            $http.put("/api/user/" + $rootScope.currentUser._id, $scope.body).then(function(response) {
                $scope.saveMessage = 'Saved';
            });
        };

        $http.get('/api/admin/isAdmin').then(function(res) {
            $scope.isAdmin = res.data.isAdmin;
        });

        $scope.goToAdmin = function() {
            $location.path('/admin');
        };

        getData();
    }
]);
