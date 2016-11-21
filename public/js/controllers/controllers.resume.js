seevee.controller("resumeController", ['$scope', '$location', '$http', '$sce', '$interpolate',
  function($scope, $location, $http, $sce, $interpolate) {
    $scope.items = {};
    $scope.templates = {};
    $scope.firstName = "Cole";
    $scope.lastName = "Johnson";


    $scope.getItems = function() {
      $http.get("api/resumeItem").then(function(response){
        $scope.items = response.data;
        console.log($scope.items);
      });
    };

    $scope.getTemplates = function() {
      $http.get("api/resumeTemplate").then(function(response){
        $scope.templates = response.data;
        $scope.template = $scope.templates[0];
      });
    };

    $scope.setTemplate = function(template) {
      $scope.template = template;
    };

    $scope.getTemplates();
    $scope.getItems();

  }
]);
