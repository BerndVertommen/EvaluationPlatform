(function(model) {
    'use strict';

    function loginController($scope) {
        var init = function() {
            $scope.testTitle = "TestTitle";
        }

        init();
    }

    model.controller('loginController', loginController);
}(angular.module('app.login')))