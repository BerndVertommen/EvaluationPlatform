(function (model) {
    'use strict';

    function indexController($scope, $location, authenticationService, accountService, $rootScope) {
        var thiz = this;
        $scope.loggedIn = authenticationService.isAuth;

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

        var handleMenus = function() {
            accountService.getAccountInfo($scope.userName).then(function (result) {
                if (result.isAdministrator === true) {
                    $scope.adminMenuInvisible = false;
                }
            });
        }

        //initiations
        var init = function () {
           
            var userName = authenticationService.userName;
            var adminMenuInvisible = true;

            var usernameIsKnown = function() {
                return angular.isDefined(authenticationService.userName) && authenticationService.userName !== "";
            }

            if (authenticationService.isAuth && authenticationService.userName !== usernameIsKnown()) {
                $scope.userName = userName;
                handleMenus();
            }

            $scope.isCollapsed = true;
            $scope.adminMenuInvisible = adminMenuInvisible;

        };

        $rootScope.$on('userLoggedIn', function (event, data) {
            $scope.userName = data.userName;
            $scope.loggedIn = authenticationService.isAuth;
            handleMenus();

        });
        
        $rootScope.$on('userLoggedOut', function (event, data) {
            $scope.userName = undefined;
            $scope.loggedIn = false;
            $scope.adminMenuInvisible = true;

        });

        init();
    }

    model.controller('indexController', indexController);
})(angular.module('app.index'));