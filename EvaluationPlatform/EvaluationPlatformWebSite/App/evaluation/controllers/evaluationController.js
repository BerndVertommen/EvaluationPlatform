(function (module) {
    'use strict';

    function evaluationController($scope, $location, evaluationService, evaluations) {
        var thiz = this;
      
       
        //Variables

        //private Functions
        
        // public functions
        $scope.selectEvaluation = function(evaluation) {
            $scope.selectedEvaluation = evaluation;
            console.log($scope.selectedEvaluation);
        }

        $scope.setScore= function (evaluationItem, score)
        {
            evaluationItem.score = score;
        };

        $scope.updateEvaluation = function () {
            evaluationService.updateEvaluation($scope.selectedEvaluation);
        };

        $scope.selectedEvaluation = function() {
            
        }

        //initiations
        var init = function () {
            $scope.evaluations = evaluations;
            console.log(evaluations[0]);
            $scope.classTitle = evaluations[0].createdForClass.description;
            $scope.selectEvaluation(evaluations[0]);
            
        }

        init();
    }

    module.controller('evaluationController', evaluationController);
})(angular.module('app.evaluation'));