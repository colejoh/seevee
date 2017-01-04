seevee.controller("infoController", ['$scope', '$location', '$window', '$http', '$rootScope',
    function($scope, $location, $window, $http, $rootScope) {
        $scope.your = {};
        $scope.skills = '';
        $scope.online = {};
        $scope.activeTab = 'about';
        $scope.aboutClass = "active";

        $http.get("/api/user/" + $rootScope.currentUser._id).then(function(res) {
            var user = res.data;
            $scope.your.name = user.info.displayName || '';
            $scope.your.number = user.info.phoneNumber || '';
            $scope.your.industry = user.info.industry || '';

            $scope.online.website = user.online.website || '';
            $scope.online.linkedin = user.online.linkedIn || '';
            $scope.online.github = user.online.github || '';
        });

        $http.get("/api/skill/").then(function(res) {
            for (var i = 0; i < res.data.length; i++) {
                $scope.skills += res.data[i].title;
                if (i != res.data.length - 1) $scope.skills += ", ";
            }
        });

        $scope.messages = {
            your: '',
            skills: '',
            online: ''
        };

        $scope.save = function(type) {
            if (type === 'your') {
                $scope.messages.your = 'saving...';
                $http.put("/api/info/your", $scope.your).then(function(res) {
                    $scope.messages.your = 'saved';
                });
            } else if (type === 'skills') {
                $scope.messages.skills = 'saving...';
                $http.put("/api/info/skills", {
                    skills: $scope.skills
                }).then(function(res) {
                    $scope.messages.skills = 'saved';
                });
            } else if (type === 'online') {
                $scope.messages.online = 'saving...';
                $http.put("/api/info/online", $scope.online).then(function(res) {
                    $scope.messages.online = 'saved';
                });
            }
        };

        $scope.setTab = function(tab) {
            $scope.activeTab = tab;
            if (tab === 'about') {
                $scope.aboutClass = "active";
                $scope.profilesClass = "non-active";
                $scope.elseClass = "non-active";
            } else if (tab === 'profiles') {
                $scope.aboutClass = "non-active";
                $scope.profilesClass = "active";
                $scope.elseClass = "non-active";
            } else if (tab === 'else') {
                $scope.aboutClass = "non-active";
                $scope.profilesClass = "non-active";
                $scope.elseClass = "active";
            }
        };
    }
]);
