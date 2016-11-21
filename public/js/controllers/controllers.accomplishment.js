seevee.controller("accomplishmentController", ['$scope', '$location', '$http',
  function($scope, $location, $http) {

    // Accomplishment Model, Hold all the info from the modal
    $scope.formData = {};
    $scope.accomplishments = {};

    // Initial get for all the accomplishments
    $http.get("api/accomplishment").then(function(response){
      $scope.accomplishments = response.data;
    });

    // Function that is called when we want the modal to show
    $scope.addNew = function(type) {
      if(type === 'work') {
        $(".work-modal").fadeIn();
      } else if (type === 'ed') {
        $(".ed-modal").fadeIn();
      } else if (type === 'project') {
        $(".project-modal").fadeIn();
      } else if (type === 'honor') {
        $(".honor-modal").fadeIn();
      }
    };

    // Function to call when we want to remove the modal
    $scope.hideModal = function(type) {
      if(type === 'work') {
        $(".work-modal").fadeOut();
      } else if (type === 'ed') {
        $(".ed-modal").fadeOut();
      } else if (type === 'project') {
        $(".project-modal").fadeOut();
      } else if (type === 'honor') {
        $(".honor-modal").fadeOut();
      }
    };

    // Function that is called when we're going to add an accomplishment
    $scope.add = function(type) {
      $scope.formData.type = type;
      console.log($scope.formData);
      $http.post("api/accomplishment", $scope.formData).then(function(res) {
        $scope.updateAccomplishments();
        $scope.hideModal(type);
        $scope.formData = {};
      });
    };

    $scope.delete = function(accomplishment) {
      var accId = accomplishment._id;
      $http.delete("api/accomplishment/" + accId).then(function(res) {
        $scope.updateAccomplishments();
      });
    };

      // Updates the list of accomplishments, usually after a CRUD is done
    $scope.updateAccomplishments = function() {
      $http.get("api/accomplishment").then(function(response){
        $scope.accomplishments = response.data;
      });
    };


  }
]);
