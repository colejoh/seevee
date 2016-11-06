myApp.controller("ResumesCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {
    $scope.logout = function() {
      UserAuthFactory.logout();
    }
  }
]);
