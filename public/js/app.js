var seevee = angular.module('seevee', ['ngRoute', 'ngSanitize', 'truncate', 'ngMaterial', 'ngMessages']);

seevee.config(function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl: '../routes/accomplishment/accomplishment.html',
        controller: 'accomplishmentController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/info", {
        templateUrl: '../routes/info/info.html',
        controller: 'infoController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/resumes", {
        templateUrl: '../routes/resume/resume.html',
        controller: 'resumeController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/login", {
        templateUrl: '../routes/login/login.html',
        controller: 'loginController',
        controllerAs: 'model'
    })
    .when("/account", {
        templateUrl: '../routes/account/account.html',
        controller: 'accountController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/admin", {
        templateUrl: '../routes/admin/admin.html',
        controller: 'adminController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .when("/pages", {
        templateUrl: '../routes/pages/pages.html',
        controller: 'pagesController',
        resolve: {
            loggedin: checkLoggedin
        }
    })
    .otherwise({
        redirectTo: '/'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});

// I hate this
seevee.run(function($rootScope, $location) {
    $rootScope.$watch(function() {
      return $location.path();
    },
    function(a){
      if(a === '/login') {
          $(".left").hide();
      }
    });
});

var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
    console.log("checkCurrentUser");
    var deferred = $q.defer();

    $http.get('/api/user/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
                $rootScope.currentUser = user;
        }
        deferred.resolve();
    });

    return deferred.promise;
};

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/user/loggedin').success(function(user) {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
            $rootScope.currentUser = user;
            $rootScope.currentUserFirstLetter = user.firstName.substring(0,1);
            deferred.resolve();
        }
        // User is Not Authenticated
        else {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

    return deferred.promise;
};
