(function (module) {
    'use strict';

    function createCourseController($scope, $location, courseService, $uibModal) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        //public functions
        $scope.cancel = function () {
            
            $location.path("/manageCourse");
            //window.location.href = "#/manageCourse"; //bij location.path geen # bijdoen
        }

        $scope.ok = function() {
            courseService.createCourse($scope.createCourseInfo).then($location.path("/manageCourse"));
            console.log($scope.createCourseInfo);
        }

        $scope.openStudyplanModal = function() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/StudyPlan/views/selectStudyPlanModal.html',
                controller: 'selectStudyPlanModalController',
                size: 'lg',
                resolve: {
                    // voorlopig nog niks doorgeven
                }
                


            });

        }

        //initiations
        var init = function () {
            
            $scope.createCourseInfo = {};
            
        }

        init();
    }

    module.controller('createCourseController', createCourseController);
})(angular.module('app.course'));