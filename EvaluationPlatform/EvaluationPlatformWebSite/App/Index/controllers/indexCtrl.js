(function (model) {
    'use strict';

    function indexController($scope, $location, authenticationService, $rootScope) {
        var thiz = this;

        $scope.isCollapsed = true;
       
        //Variables

        //private Functions
        
        // public functions

        $scope.collapseMe = function(redirectTo) {
            $scope.isCollapsed = true;
            $location.path(redirectTo);
        }
       
        $scope.logOut = function() {
            authenticationService.logOut();
        };

        //initiations
        var init = function () {
           
            var userName = authenticationService.userName;
            var adminMenuInvisible = true;

            if (authenticationService.isAuth) {
                adminMenuInvisible = false;
            }

            if (angular.isDefined(userName) && userName !== "") {
                $scope.userName = userName;
            }

            $scope.isCollapsed = true;
            $scope.adminMenuInvisible = adminMenuInvisible;

        };

        $rootScope.$on('userLoggedIn',function (event,data) {
            $scope.userName = data.userName;
            $scope.adminMenuInvisible = false;
        });
        
        $rootScope.$on('userLoggedOut', function (event, data) {
            $scope.userName = undefined;
            $scope.adminMenuInvisible = true;

        });

        init();
    }

    model.controller('indexController', indexController);
})(angular.module('app.index'));