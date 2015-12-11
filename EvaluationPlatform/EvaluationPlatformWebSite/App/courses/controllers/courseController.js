(function (module) {
    'use strict';

    function courseController($scope, $location, courses) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {
            $scope.courses = courses;
            console.log($scope.courses);

        }

        init();
    }

    module.controller('courseController', courseController);
})(angular.module('app.course'));