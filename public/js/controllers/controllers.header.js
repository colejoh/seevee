seevee.controller("headerCtrl", ['$scope', '$location', '$window',
  function($scope, $location, $window) {
    
    $scope.go = function(location) {
      $location.path(location);
    };
  }
]);
