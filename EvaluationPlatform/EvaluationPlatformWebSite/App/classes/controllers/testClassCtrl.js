﻿(function(module) {
    function testClassController($scope, classesService) {

        var init = function() {
             classesService.getTestClass().then(function (classResult) {
                 $scope.testClass = classResult.data;
            });
        }

        init();
    }

    module.controller('TestClassController', testClassController);
})(angular.module('app.classes'));