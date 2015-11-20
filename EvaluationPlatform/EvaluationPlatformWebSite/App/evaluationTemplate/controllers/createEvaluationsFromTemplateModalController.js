
(function (module) {
    'use strict';

    function createEvaluationsFromTemplateModalController($scope, $uibModalInstance, evaluationTemplate) {
        var thiz = this;

        //Variables


        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.ok = function () {
            if (angular.isUndefined($scope.generalOptions.discription) || $scope.generalOptions.discription === null || $scope.generalOptions.discription === "") {
                return; // replace with error method
            }
            if (angular.isUndefined($scope.generalOptions.course) || $scope.generalOptions.course === null) {
                return; // replace with error method
            }
            $uibModalInstance.close($scope.evaluationTemplate);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

      

        //initiations
        var init = function () {
            $scope.evaluationTemplate = evaluationTemplate;
            

        }

        init();
    }

    module.controller('createEvaluationsFromTemplateModalController', createEvaluationsFromTemplateModalController);
})(angular.module('app.evaluationTemplate'));
