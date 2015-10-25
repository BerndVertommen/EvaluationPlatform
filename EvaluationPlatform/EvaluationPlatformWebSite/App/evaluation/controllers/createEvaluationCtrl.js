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
        $scope.openGeneralOptions = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/app/evaluation/views/generalEvaluationOptionsModal.html',
                controller: 'generalEvaluationOptionsController',
                size: 'lg',
                resolve: {
                    createEvaluationOptions: function () {
                        return $scope.createEvaluationOptions;
                    },
                    generalOptions: function () {
                        return { 'discription': "", 'course': null };
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

        $scope.openSubSections = function () {
            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/app/evaluation/views/evaluationSubSectionModal.html',
                controller: 'evaluationSubSectionController',
                size: 'lg',
                resolve: {
                    course: function () {
                        return $scope.evaluationTemplate.course;
                    },
                    evaluationSubSections: function () {
                        return $scope.evaluationTemplate.evaluationSubSections;
                    }
                }
            });
            modalInstance.result.then(function (evaluationSubSections) {
                $scope.evaluationTemplate.evaluationSubSections = evaluationSubSections;
            }, function () {
                // Console.log('Modal general options dismissed at: ' + new Date());
            });
        };



        //initiations
        var init = function () {
            $scope.createEvaluationOptions = createEvaluationOptions;

        }

        init();
    }

    module.controller('createEvaluationController', createEvaluationController);
})(angular.module('app.evaluation'));