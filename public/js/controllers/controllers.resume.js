seevee.controller("resumeController", ['$scope', '$location', '$http', '$sce', '$interpolate',
  function($scope, $location, $http, $sce, $interpolate) {
    $scope.items = {};
    $scope.templates = {};

    // Temporary data for testing resumes
    $scope.firstName = "Cole";
    $scope.lastName = "Johnson";

    // Gets all the resume data
    $scope.getItems = function() {
      $http.get("api/resumeItem").then(function(response){
        $scope.items = response.data;
        console.log($scope.items);
      });
    };

    // Gets all the templates
    $scope.getTemplates = function() {
      $http.get("api/resumeTemplate").then(function(response){
        $scope.templates = response.data;
        $scope.template = $scope.templates[0];
      });
    };

    // Sets the template from the choices
    $scope.setTemplate = function(template) {
      $scope.template = template;
    };

    $scope.getTemplates();
    $scope.getItems();

  }
]);
