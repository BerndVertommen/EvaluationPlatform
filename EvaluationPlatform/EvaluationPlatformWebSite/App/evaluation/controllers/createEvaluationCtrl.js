(function (module) {
    'use strict';

    function createEvaluationController($scope, $location, createEvaluationOptions, $modal) {
        var thiz = this;

        //Variables
        $scope.evaluationTemplate = {};
        $scope.evaluationTemplate.evaluationSubSections = [];
        $scope.tabs = 1;

        //private Functions

        // public functions
        $scope.openGeneralOptions = function() {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/app/evaluation/views/generalEvaluationOptions.html',
                controller: 'generalEvaluationOptionsController',
                size: 'lg',
               resolve: {
                    createEvaluationOptions: function () {
                        return  $scope.createEvaluationOptions;
                    },
                    generalOptions: function () {
                        return {'discription' : "", 'course' : null};
                    }
                }
            });
            modalInstance.result.then(function (generalOptions) {
                $scope.evaluationTemplate.discription = generalOptions.discription;
                $scope.evaluationTemplate.course = generalOptions.course;
            }, function () {
               // Console.log('Modal general options dismissed at: ' + new Date());
            });
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

    module.controller('createEvaluationController', createEvaluationController);
})(angular.module('app.evaluation'));