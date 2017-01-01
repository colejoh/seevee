seevee.controller("resumeController", ['$scope', '$rootScope', '$http', '$sce',
  function($scope, $rootScope, $http, $sce) {
    $scope.data = {};
    $scope.templates = {};
    var baseUrl = 'http://app.seevee.co';
    $scope.iframeLink = $sce.trustAsResourceUrl(baseUrl + '/api/resume/template/0');

    // Temporary data for testing resumes
    $scope.firstName = $rootScope.currentUser.firstName;
    $scope.lastName = $rootScope.currentUser.lastName;

    // Gets all the resume data
    $scope.getItems = function() {
      $http.get("api/resume/items").then(function(response){
        $scope.data = response.data;
      });
    };

    // Gets all the templates
    $scope.getTemplates = function() {
      $http.get("api/resume/templates").then(function(response){
        $scope.templates = response.data;
        $scope.template = $scope.templates[0];
      });
    };

    // Sets the template from the choices
    $scope.setTemplate = function(template) {
      $scope.template = template;
      $scope.iframeLink = $sce.trustAsResourceUrl(baseUrl + '/api/resume/template/' + template.id);
    };

    $scope.render = function() {
      $("#export-button").html("<img src='img/loader.svg' height='18px'> Exporting");
      var fileName = 'Resume.pdf';
      var a = document.createElement("a");
      var options = {id: $scope.template.id};
      document.body.appendChild(a);
      $http.post('api/resume/render', options , { responseType: 'arraybuffer' }).then(function(response){
        var file = new Blob([response.data], {type: 'application/pdf'});
        var fileURL = window.URL.createObjectURL(file);
        a.href = fileURL;
        a.download = fileName;
        a.click();
        $("#export-button").html("Export");
      });
    };

    $scope.getTemplates();
    $scope.getItems();

  }
]);
