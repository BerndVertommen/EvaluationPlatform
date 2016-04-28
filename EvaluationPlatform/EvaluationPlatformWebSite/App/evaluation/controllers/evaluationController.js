(function (module) {
    'use strict';

    function evaluationController($scope, $location, evaluationService, evaluations) {
        var thiz = this;


        //Variables

        //private Functions

        // public functions
        $scope.selectEvaluation = function (evaluation) {
            $scope.selectedEvaluation = evaluation;
           // evaluationService.setSubsectionScores(); // find other solution to map scores not on evry select.
            console.log($scope.selectedEvaluation);
        }

        $scope.setScore = function (evaluationItem, score) {
            evaluationItem.score = score;
            evaluationItem.notScoredReason = 0;
        };

        $scope.updateEvaluation = function () {
            evaluationService.updateEvaluation($scope.selectedEvaluation).then(function (evaluation) {
                var indexEva = _.findIndex($scope.evaluations, function (eva) {
                    return eva.id === evaluation.id;
                });

                $scope.evaluations[indexEva] = evaluation;
                //var hashkey = $scope.selectedEvaluation.$$hashKey;
                //$scope.selectedEvaluation = evaluation;
                //$scope.selectedEvaluation.$$hashKey = hashkey;
                thiz.updateAfterChange();

            });
        };

        $scope.updateEvaluations = function () {
            evaluationService.updateEvaluations($scope.evaluations).then(function(evaluations) {
                $scope.evaluations = evaluations;

                thiz.updateAfterChange();
            });
        };

        $scope.setNotScoredReason = function(evaluationitem, number) {
            evaluationitem.notScoredReason = number;
            evaluationitem.score = null;
        };

        thiz.updateAfterChange = function() {
            $scope.evaluations = evaluationService.mapItemsToSubSection($scope.evaluations);
           // evaluationService.setSubsectionScores();
        };

        /*
        thiz.mapItemsToSubSection = function () {

            _.each($scope.evaluations, function (evaluation) {
                var differentSubsections = _.groupBy(evaluation.evaluationItems, function (item) {
                    return item.evaluationSubSection.description;
                });
                differentSubsections = _.sortBy(differentSubsections, function(sub) {
                    return sub[0].evaluationSubSection.weight;
                });
                evaluation.mappedSubsections = differentSubsections;
            });
        };
        */

        /*
        thiz.setSubsectionScores = function () {
            //// var value = object[key] => use dictionary from c# this way
            _.each($scope.selectedEvaluation.mappedSubsections, function (subsection) {
                if (angular.isDefined($scope.selectedEvaluation.result) && $scope.selectedEvaluation.result !== null) {
                    subsection.totalScore = $scope.selectedEvaluation.result.totalsPercategory[subsection[0].evaluationSubSection.id];
                }
            });
            // map every evaluation not just selected so it can be procesed in int()
        };
        */

        //initiations
        var init = function () {
            console.log(evaluations[0]);
            $scope.classTitle = evaluations[0].createdForClass.description;
            $scope.selectEvaluation(evaluations[0]);
            $scope.evaluations = evaluationService.mapItemsToSubSection(evaluations);
            console.log($scope.evaluations);

        }

        init();
    }

    module.controller('evaluationController', evaluationController);
})(angular.module('app.evaluation'));