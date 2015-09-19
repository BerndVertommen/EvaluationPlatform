(function(module) {
    'use strict';

    function createTestAccountController($scope, accountService) {

        $scope.message = "Creating Account";

        var init = function() {
            accountService.createTestAccount().then(function() {
                $scope.message = "TestAccount Created";
            });
        }

        init();
    }


    module.controller('createTestAccountController', createTestAccountController);
})(angular.module('app.account'));