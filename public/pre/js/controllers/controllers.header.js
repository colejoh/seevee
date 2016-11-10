myApp.controller("HeaderCtrl", ['$scope', '$location', '$window', 'UserAuthFactory', 'userFactory',
  function($scope, $location, $window, UserAuthFactory, userFactory) {
    $scope.name = $window.sessionStorage.user;
    $scope.headerTheme = "light";
    $scope.path = 'home';
    $scope.resumeClass = 'small';
    $scope.accomplishmentClass = 'big';

    if($location.path() == '/') {
      $scope.headerTheme = "light";
      $scope.path = 'home';

      $scope.accomplishmentClass = 'big';
      $scope.resumeClass = 'small';
    } else if ($location.path() == '/resumes') {
      $scope.headerTheme = "dark";
      $scope.path = 'resumes';

      $scope.accomplishmentClass = 'small';
      $scope.resumeClass = 'big';
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
    }

    $scope.setAccomplishment = function() {
      $scope.headerTheme = "light";
      $scope.path = 'home'

      $scope.accomplishmentClass = 'big';
      $scope.resumeClass = 'small';
    }

    $scope.setResume = function() {
      $scope.headerTheme = "dark";
      $scope.path = 'resumes';

      $scope.accomplishmentClass = 'small';
      $scope.resumeClass = 'big';
    }

    $scope.go = function ( path ) {
      $location.path( path );
    };
  }
]);
