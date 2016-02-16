(function (module) {
    'use strict';

    function createCourseController($scope, $location, courseService) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        //public functions
        $scope.cancel = function() {
            $location.path("#/manageCourse");
        }

        $scope.ok = function() {
            courseService.createCourse($scope.createCourseInfo).then($location.path("#/manageCourse"));
            console.log($scope.createCourseInfo);
        }

        //initiations
        var init = function () {
            $scope.createCourseInfo = {};
            $scope.createCourseInfo.schoolYear = null;

        }

        init();
    }

    module.controller('createCourseController', createCourseController);
})(angular.module('app.course'));