seevee.directive('accomplishmentCard', function() {
  var directiveDefinitionObject = {
    restrict: 'EA',
    scope: {
      accomplishment: '=',
      update: '&'
    },
    templateUrl: '../../templates/templates.accomplishment-card.html',
    link: function(scope, element, attrs) {
    },
    controller: function($scope, $element, $http) {
        $scope.delete = function(accomplishment) {
          var accId = accomplishment._id;
          $http.delete("api/accomplishment/" + accId).then(function(res) {
            console.log("hit delete");
            $scope.update();
          });
        };
    }
  };

  return directiveDefinitionObject;
});
