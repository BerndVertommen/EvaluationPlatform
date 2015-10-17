(function (model) {
    'use strict';

    function indexController($scope, $location, authenticationService, $rootScope) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
       
        $scope.logOut = function() {
            authenticationService.logOut();
        };

        //initiations
        var init = function () {
           
            var userName = authenticationService.userName;
            if (angular.isDefined(userName) && userName !== "") {
                $scope.userName = userName;
            }

        };

        $rootScope.$on('userLoggedIn',function (event,data) {
            $scope.userName = data.userName;
        });
        
        $rootScope.$on('userLoggedOut', function (event, data) {
            $scope.userName = undefined;
        });

        init();
    }

    model.controller('indexController', indexController);
})(angular.module('app.index'));