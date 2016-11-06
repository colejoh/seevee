myApp.factory('accomplishmentFactory', function($http) {
  var urlBase = 'http://localhost:3000/api/v1/accomplishment';
  var _accomplishmentFactory = {};

  _accomplishmentFactory.getAccomplishments = function() {
    return $http.get(urlBase);
  };

  return _accomplishmentFactory;
});
