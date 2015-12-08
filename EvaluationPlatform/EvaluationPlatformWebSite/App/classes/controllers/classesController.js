(function (module) {
    'use strict';

    function classesController($scope, $location, classes) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {
            $scope.classes = classes;

        }

        init();
    }

    module.controller('classesController', classesController);
})(angular.module('app.classes'));