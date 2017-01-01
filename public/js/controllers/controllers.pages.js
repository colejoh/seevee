seevee.controller("pagesController", ['$scope', '$http', '$rootScope', '$sce',
    function($scope, $http, $rootScope, $sce) {
        var SAVING = 'Saving...';
        var SAVED = 'Saved';

        $scope.liveLink = "http://pages.seevee.co/" + ($rootScope.currentUser.pageName || $rootScope.currentUser._id);
        // $scope.liveLink = "http://localhost:3000/" + ($rootScope.currentUser.pageName || $rootScope.currentUser._id);
        $scope.slug = $rootScope.currentUser.pageName;
        $scope.iframeLink = $sce.trustAsResourceUrl($scope.liveLink);

        $scope.saveUrl = function() {
            $scope.slugMessage = SAVING;
            $http.post('/api/pages/url', {slug: $scope.slug}).then(function(res) {
                $scope.liveLink = "http://pages.seevee.co/" + res.data.pageName;
                $scope.slugMessage = SAVED;
            });
        };

        $scope.showSettings = {
            work: $rootScope.currentUser.page.showWork,
            project: $rootScope.currentUser.page.showProject,
            ed: $rootScope.currentUser.page.showEd,
            honor: $rootScope.currentUser.page.showEd
        };

        $scope.saveShowOptions = function() {
            $scope.showMessage = SAVING;
            $http.post('/api/pages/settings', $scope.showSettings).then(function(res) {
                $rootScope.currentUser = res.data;
                $scope.showMessage = SAVED;
                document.getElementById('page-preview').src = document.getElementById('page-preview').src;
            });
        };

        $scope.saveTheme = function(color) {
            setThemeClasses(color);
            $http.post('/api/pages/theme', {color: color}). then(function(res) {
                document.getElementById('page-preview').src = document.getElementById('page-preview').src;
            });
        };

        function setThemeClasses(color) {
            if(color) {
                if(color === 'red') {
                    $scope.redClass = 'selected';
                    $scope.blueClass = $scope.greenClass = $scope.blackClass = 'non-selected';
                } else if (color === 'blue') {
                    $scope.blueClass = 'selected';
                    $scope.redClass = $scope.greenClass = $scope.blackClass = 'non-selected';
                } else if (color === 'green') {
                    $scope.greenClass = 'selected';
                    $scope.blueClass = $scope.redClass = $scope.blackClass = 'non-selected';
                } else if (color === 'black') {
                    $scope.blackClass = 'selected';
                    $scope.blueClass = $scope.greenClass = $scope.redClass = 'non-selected';
                }
            } else {
                $scope.redClass = $rootScope.currentUser.page.color === 'red' ? 'selected' : 'non-selected';
                $scope.blueClass = $rootScope.currentUser.page.color === 'black' ? 'selected' : 'non-selected';
                $scope.greenClass = $rootScope.currentUser.page.color === 'green' ? 'selected' : 'non-selected';
                $scope.blackClass = $rootScope.currentUser.page.color === 'black' ? 'selected' : 'non-selected';
            }
        }

        setThemeClasses();
    }
]);
