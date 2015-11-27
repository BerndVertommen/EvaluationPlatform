(function (module) {
    'use strict';

    function evaluationController($scope, $location, evaluations) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.selectEvaluation = function(evaluation) {

        };

        $scope.saveEvaluation = function() {
            // write save entire evaluations functionality
        };

        $scope.selectedEvaluation = function() {
            
        }

        //initiations
        var init = function () {
            $scope.evaluations = evaluations;
            $scope.classTitle = evaluations[0].createdForClass.description;


        }

        init();
    }

    module.controller('evaluationController', evaluationController);
})(angular.module('app.evaluation'));