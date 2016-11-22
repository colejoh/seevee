seevee.controller("headerCtrl", ['$scope', '$location', '$window',
  function($scope, $location, $window) {
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
        $scope.resumeClass = 'nav-unselected';
        $scope.accountClass = 'nav-unselected';
      } else if ($scope.path == '/resumes') {
        $scope.accomplishmentClass = 'nav-unselected';
        $scope.resumeClass = 'nav-selected';
        $scope.accountClass = 'nav-unselected';
      } else if ($scope.path == '/account') {
        $scope.accomplishmentClass = 'nav-unselected';
        $scope.resumeClass = 'nav-unselected';
        $scope.accountClass = 'nav-selected';
      }
    }
  }
]);
