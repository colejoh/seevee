seevee.controller("pagesController", ['$scope', '$location', '$window', '$http', '$rootScope',
  function($scope, $location, $window, $http, $rootScope) {
    $scope.openPage = function() {
      window.location = "http://pages.seevee.co/" + $rootScope.currentUser._id;
    };
  }
]);
