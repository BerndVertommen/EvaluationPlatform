(function(model) {
    'use strict';

    function loginController($scope, authenticationService) {
        var init = function() {
            $scope.testTitle = "TestTitle";
        }

        init();

        $scope.login = function(loginData) {
            authenticationService.login(loginData).then(function(response) {
                $location.path("/home");
            });
        }
    }

    model.controller('loginController', loginController);
}(angular.module('app.login')))