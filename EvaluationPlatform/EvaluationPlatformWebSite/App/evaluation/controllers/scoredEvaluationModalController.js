(function (module) {
    'use strict';

    function scoredEvaluationModalController($scope, $location, evaluation, evaluationService, $uibModalInstance) {
        var thiz = this;

        $scope.ok = function () {

            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.evaluationToPdf = function () {
            evaluationService.createPdfForEvaluation($scope.evaluation);
            $scope.ok();
        };

        //initiations
        var init = function () {
            $scope.evaluation = evaluation;
            evaluationService.mapSubsectionToEvaluation(evaluation);

            console.log(evaluation);
        }

        init();
    }

    module.controller('scoredEvaluationModalController', scoredEvaluationModalController);
})(angular.module('app.evaluation'));