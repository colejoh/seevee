var seevee = angular.module('seevee', ['ngRoute', 'ngSanitize']);

seevee.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: '../partials/partials.accomplishment.html',
        controller: 'accomplishmentController'
    })
    .when("/info", {
        templateUrl: '../partials/partials.info.html',
        controller: 'infoController'
    })
    .when("/resumes", {
        templateUrl: '../partials/partials.resume.html',
        controller: 'resumeController'
    })
    .when("/login", {
        templateUrl: '../partials/partials.login.html',
        controller: 'loginController'
    })
    .when("/account", {
        templateUrl: '../partials/partials.account.html',
        controller: 'accountController'
    });
});
