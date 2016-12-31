seevee.controller("adminController", ['$scope', '$location', '$http', "$rootScope",
  function($scope, $location, $http, $rootScope) {
    $http.get("api/admin").then(function(res){
      console.log(res.data);
      $scope.users = res.data;
    });
  }
]);
