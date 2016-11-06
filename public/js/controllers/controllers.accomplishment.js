myApp.controller("AccomplishmentsCtrl", ['$scope', '$location', 'UserAuthFactory', 'accomplishmentFactory',
  function($scope, $location, UserAuthFactory, accomplishmentFactory) {
    // Gets All Accomplishments
    $scope.accomplishments = [];

    accomplishmentFactory.getAccomplishments().then(function(data) {
      $scope.accomplishments = data.data;
    });

    // Adds Accomplishment
    $scope.newAccomplishment = {};
  }
]);
