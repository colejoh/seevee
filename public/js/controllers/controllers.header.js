seevee.controller("headerCtrl", ['$scope', '$rootScope', '$location', '$window', '$http',
    function($scope, $rootScope, $location, $window, $http) {
        $scope.path = $location.$$path;
        assignClasses();

        $scope.go = function(location) {
            $scope.path = location;
            assignClasses();
            $location.path(location);
        };

        function assignClasses() {
            if ($scope.path == '/') {
                $scope.accomplishmentClass = 'nav-selected';
                $scope.infoClass = 'nav-unselected';
                $scope.resumeClass = 'nav-unselected';
                $scope.accountClass = 'nav-unselected';
                $scope.pagesClass = 'nav-unselected';
            } else if ($scope.path == '/info') {
                $scope.accomplishmentClass = 'nav-unselected';
                $scope.infoClass = 'nav-selected';
                $scope.resumeClass = 'nav-unselected';
                $scope.accountClass = 'nav-unselected';
                $scope.pagesClass = 'nav-unselected';
            } else if ($scope.path == '/resumes') {
                $scope.accomplishmentClass = 'nav-unselected';
                $scope.infoClass = 'nav-unselected';
                $scope.resumeClass = 'nav-selected';
                $scope.accountClass = 'nav-unselected';
                $scope.pagesClass = 'nav-unselected';
            } else if ($scope.path == '/account') {
                $scope.accomplishmentClass = 'nav-unselected';
                $scope.infoClass = 'nav-unselected';
                $scope.resumeClass = 'nav-unselected';
                $scope.accountClass = 'nav-selected';
                $scope.pagesClass = 'nav-unselected';
            } else if ($scope.path == '/pages') {
                $scope.accomplishmentClass = 'nav-unselected';
                $scope.infoClass = 'nav-unselected';
                $scope.resumeClass = 'nav-unselected';
                $scope.accountClass = 'nav-unselected';
                $scope.pagesClass = 'nav-selected';
            } else if ($scope.path === '/login') {}
        }
    }
]);
