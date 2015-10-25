
(function (module) {
    'use strict';

    function evaluationSubSectionController($scope, $modalInstance, evaluationSubSections, course) {
        var thiz = this;

        //Variables
      
      
        //private Functions

        // public functions
        $scope.selectCourseForSubSection = function (goal) {
            $scope.newEvaluationSubSection.goal = goal;
        };

        $scope.addnewEvaluationSubSection = function () {
            $scope.evaluationSubSections.push(angular.copy($scope.newEvaluationSubSection));
        }

        $scope.AddGoalToNewEvaluationSubSection = function () {
            if ($scope.evaluationSubSections.length < 1) {
                $scope.evaluationSubSections.push(angular.copy($scope.newEvaluationSubSection));
            }
            var arrayLength = $scope.evaluationSubSections.length - 1;

            if (angular.isUndefined($scope.evaluationSubSections[arrayLength].goals) || $scope.evaluationSubSections[arrayLength].goals.length < 1) {
                $scope.evaluationSubSections[arrayLength].goals = [];
            }
            $scope.evaluationSubSections[arrayLength].goals.push($scope.newEvaluationSubSection.goal);
        }

        // modal functions
        $scope.ok = function () {
            $modalInstance.close($scope.evaluationSubSections);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

       
        //initiations
        var init = function () {
            $scope.evaluationSubSections = evaluationSubSections;
            $scope.course = course;

        }

        init();
    }

    module.controller('evaluationSubSectionController', evaluationSubSectionController);
})(angular.module('app.evaluation'));