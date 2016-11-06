myApp.directive('accomplishmentCard', function() {
  /** https://docs.angularjs.org/guide/directive **/

  var directiveDefinitionObject = {
    restrict: 'EA',
    scope: {
      accomplishment: '='
    },
    templateUrl: '../../templates/templates.accomplishment-card.html',
    link: function(scope, element, attrs) {

    }
  }

  return directiveDefinitionObject;
});
