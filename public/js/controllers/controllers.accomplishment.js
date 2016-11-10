seevee.controller("accomplishmentController", ['$scope', '$location', '$http',
  function($scope, $location, $http) {
    $scope.accomplishments = {};
    $http.get("api/accomplishment").then(function(response){
      console.log(response.data);
      $scope.accomplishments = response.data;
    });
  }
]);
