seevee.controller("accomplishmentController", ['$scope', '$location', '$http',
  function($scope, $location, $http) {

    // Accomplishment Model, Hold all the info from the modal
    $scope.formData = {};
    $scope.accomplishments = {};
    $scope.modalState = '';

    // Initial get for all the accomplishments
    $http.get("api/accomplishment").then(function(response){
      $scope.accomplishments = response.data;
      console.log(response);
    });

    // Function that is called when we want the modal to show
    $scope.showModal = function(type, state) {
      $scope.modalState = state;
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
    $scope.save = function(type) {
      if($scope.modalState == 'new') {
        $scope.formData.type = type;
        $http.post("api/accomplishment", $scope.formData).then(function(res) {
          $scope.updateAccomplishments();
          $scope.hideModal(type);
          $scope.formData = {};
        });
      } else if ($scope.modalState == 'edit') {
        $http.put("api/accomplishment/" + $scope.formData._id, $scope.formData).then(function(res) {
          $scope.updateAccomplishments();
          $scope.hideModal($scope.formData.type);
          $scope.formData = {};
        });
      }
    };

    $scope.delete = function(accomplishment) {
      var accId = accomplishment._id;
      $http.delete("api/accomplishment/" + accId).then(function(res) {
        $scope.updateAccomplishments();
      });
    };

    $scope.edit = function(accomplishment) {
      $scope.formData = accomplishment;
      $scope.formData.date = accomplishment.dateStart + ' - ' + accomplishment.dateEnd;
      $scope.showModal(accomplishment.type, 'edit');
    };

      // Updates the list of accomplishments, usually after a CRUD is done
    $scope.updateAccomplishments = function() {
      $http.get("api/accomplishment").then(function(response){
        $scope.accomplishments = response.data;
      });
    };


  }
]);
