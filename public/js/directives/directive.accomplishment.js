seevee.directive('accomplishmentCard', function() {
  var directiveDefinitionObject = {
    restrict: 'EA',
    scope: {
      accomplishment: '='
    },
    templateUrl: '../../templates/templates.accomplishment-card.html',
    link: function(scope, element, attrs) {
      console.log("hi");
    }
  };

  return directiveDefinitionObject;
});
