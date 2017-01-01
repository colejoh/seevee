seevee.controller("pagesController", ['$scope', '$http', '$rootScope', '$sce',
    function($scope, $http, $rootScope, $sce) {
        $scope.liveLink = "http://pages.seevee.co/" + ($rootScope.currentUser.pageName || $rootScope.currentUser._id);
        $scope.slug = $rootScope.currentUser.pageName;
        $scope.iframeLink = $sce.trustAsResourceUrl($scope.liveLink);

        $scope.saveUrl = function() {
            $scope.slugMessage = "Saving...";
            $http.post("/api/pages/url", {slug: $scope.slug}).then(function(res) {
                $scope.liveLink = "http://pages.seevee.co/" + res.data.pageName;
                $scope.slugMessage = "Saved";

            });
        };
    }
]);
