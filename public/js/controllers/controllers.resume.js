seevee.controller("resumeController", ['$scope', '$location', '$http',
  function($scope, $location, $http) {
    $scope.items = {};

    $scope.getItems = function() {
      $http.get("api/resumeItem").then(function(response){
        $scope.items = response.data;
      });
    };

    $scope.getItems();
  }
]);
