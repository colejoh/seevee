seevee.controller("accomplishmentController", ['$scope', '$location', '$http',
  function($scope, $location, $http) {
    $scope.accomplishments = {};
    $http.get("api/accomplishment").then(function(response){
      $scope.accomplishments = response.data;
    });
  }
]);
