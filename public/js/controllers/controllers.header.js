seevee.controller("headerCtrl", ['$scope', '$rootScope', '$location', '$window', '$http',
  function($scope, $rootScope, $location, $window, $http) {
    $scope.path = $location.$$path;
    assignClasses();

    $scope.go = function(location) {
      $scope.path = location;
      assignClasses();
      $location.path(location);
    };

    function assignClasses() {
      if($scope.path == '/') {
        $scope.accomplishmentClass = 'nav-selected';
        $scope.infoClass = 'nav-unselected';
        $scope.resumeClass = 'nav-unselected';
        $scope.accountClass = 'nav-unselected';
    } else if ($scope.path == '/info') {
        $scope.accomplishmentClass = 'nav-unselected';
        $scope.infoClass = 'nav-selected';
        $scope.resumeClass = 'nav-unselected';
        $scope.accountClass = 'nav-unselected';
      } else if ($scope.path == '/resumes') {
        $scope.accomplishmentClass = 'nav-unselected';
        $scope.infoClass = 'nav-unselected';
        $scope.resumeClass = 'nav-selected';
        $scope.accountClass = 'nav-unselected';
      } else if ($scope.path == '/account') {
        $scope.accomplishmentClass = 'nav-unselected';
        $scope.infoClass = 'nav-unselected';
        $scope.resumeClass = 'nav-unselected';
        $scope.accountClass = 'nav-selected';
      } else if ($scope.path === '/login') {
      }
    }


    $("#accomplishment-nav-button").mouseenter(function(){
      $("#accomplishment-nav-label").show();
    });
    $("#accomplishment-nav-button").mouseleave(function(){
      $("#accomplishment-nav-label").hide();
    });

    $("#info-nav-button").mouseenter(function(){
      $("#info-nav-label").show();
    });
    $("#info-nav-button").mouseleave(function(){
      $("#info-nav-label").hide();
    });

    $("#resume-nav-button").mouseenter(function(){
      $("#resume-nav-label").show();
    });
    $("#resume-nav-button").mouseleave(function(){
      $("#resume-nav-label").hide();
    });

    $("#account-nav-button").mouseenter(function(){
      $("#account-nav-label").show();
    });
    $("#account-nav-button").mouseleave(function(){
      $("#account-nav-label").hide();
    });

    $("#log-out-nav-button").mouseenter(function(){
      $("#log-out-nav-label").show();
    });
    $("#log-out-nav-button").mouseleave(function(){
      $("#log-out-nav-label").hide();
    });
  }
]);
