seevee.controller("resumeController", ['$scope', '$location', '$http', '$sce', '$q', '$interpolate',
  function($scope, $location, $http, $sce, $interpolate, $q) {
    $scope.items = {};
    $scope.templates = {};

    // Temporary data for testing resumes
    $scope.firstName = "Cole";
    $scope.lastName = "Johnson";

    // Gets all the resume data
    $scope.getItems = function() {
      $http.get("api/resumeItem").then(function(response){
        $scope.items = response.data;
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

    $scope.render = function() {
      var fileName = 'Resume.pdf';
      var a = document.createElement("a");
      var options = {id: $scope.template.id};
      document.body.appendChild(a);
      $http.post('api/renderResume', options , { responseType: 'arraybuffer' }).then(function(response){
        var file = new Blob([response.data], {type: 'application/pdf'});
        var fileURL = window.URL.createObjectURL(file);
        a.href = fileURL;
        a.download = fileName;
        a.click();
      });
    };

    $scope.getTemplates();
    $scope.getItems();

  }
]);
