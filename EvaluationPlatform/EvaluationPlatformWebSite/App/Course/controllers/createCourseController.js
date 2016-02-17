(function (module) {
    'use strict';

    function createCourseController($scope, $location, courseService) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        //public functions
        $scope.cancel = function () {
            // werkt nimeer
            // $location.path("#/manageCourse");
            window.location.href = "#/manageCourse";
        }

        $scope.ok = function() {
            courseService.createCourse($scope.createCourseInfo).then(window.location.href = "#/manageCourse");
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