
(function (module) {
    'use strict';

    function generalEvaluationTemplateOptionsModalController($scope, $uibModalInstance, generalOptions, createEvaluationOptions) {
        var thiz = this;

        //Variables


        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.ok = function () {
            if (angular.isUndefined($scope.generalOptions.description) || $scope.generalOptions.description === null || $scope.generalOptions.description === "") {
                return; // replace with error method
            }
            if (angular.isUndefined($scope.generalOptions.course) || $scope.generalOptions.course === null) {
                return; // replace with error method
            }
            $uibModalInstance.close($scope.generalOptions);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.selectCourse = function (course, index) {
            $scope.generalOptions.course = course;
            $scope.selectedRow = index;

        };

        //initiations
        var init = function () {
            $scope.generalOptions = generalOptions;
            $scope.createEvaluationOptions = createEvaluationOptions;

        }

        init();
    }

    module.controller('generalEvaluationTemplateOptionsModalController', generalEvaluationTemplateOptionsModalController);
})(angular.module('app.evaluationTemplate'));
