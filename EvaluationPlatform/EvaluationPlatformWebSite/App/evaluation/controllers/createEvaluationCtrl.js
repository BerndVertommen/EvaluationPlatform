(function (model) {
    'use strict';

    function createEvaluationController($scope, $location, createEvaluationOptions) {
        var thiz = this;

        //Variables
        $scope.evaluationTemplate = {};
        $scope.evaluationTemplate.evaluationSubSections = [];
        $scope.tabs = 1;

        //private Functions

        // public functions
        $scope.selectCourse = function (course) {
            $scope.evaluationTemplate.course = course;
        };

        $scope.selectCourseForSubSection = function (goal) {
            $scope.newEvaluationSubSection.goal = goal;
        };

        $scope.addnewEvaluationSubSection = function () {
            $scope.evaluationTemplate.evaluationSubSections.push(angular.copy($scope.newEvaluationSubSection));
        }

        $scope.AddGoalToNewEvaluationSubSection = function () {
            if ($scope.evaluationTemplate.evaluationSubSections.length < 1) {
                $scope.evaluationTemplate.evaluationSubSections.push(angular.copy($scope.newEvaluationSubSection));
            }
            var arrayLength = $scope.evaluationTemplate.evaluationSubSections.length - 1;

            if (angular.isUndefined($scope.evaluationTemplate.evaluationSubSections[arrayLength].goals) || $scope.evaluationTemplate.evaluationSubSections[arrayLength].goals.length < 1) {
                $scope.evaluationTemplate.evaluationSubSections[arrayLength].goals = [];
            }
            $scope.evaluationTemplate.evaluationSubSections[arrayLength].goals.push($scope.newEvaluationSubSection.goal);
        }

        //initiations
        var init = function () {
            $scope.createEvaluationOptions = createEvaluationOptions;

        }

        init();
    }

    model.controller('createEvaluationController', createEvaluationController);
})(angular.module('app.evaluation'));