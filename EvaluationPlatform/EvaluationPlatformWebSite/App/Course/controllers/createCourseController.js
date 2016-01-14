(function (module) {
    'use strict';

    function createCourseController($scope, $location) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        //public functions
        //$scope.cancel = function() {
        //    location.href = '#/manageCourse';
        //} // Redirecten naar /manageCourse ? of goed zo dat ik dat ineens doe in de html

        //initiations
        var init = function () {
            $scope.createCourseInfo = {};

        }

        init();
    }

    module.controller('createCourseController', createCourseController);
})(angular.module('app.course'));