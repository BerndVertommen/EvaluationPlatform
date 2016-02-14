(function (module) {
    'use strict';

    function calendarController($scope, $location, dashboardService) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions

        $scope.selectedRow = null;

        $scope.setSelectedEvaluation = function(evaluation, index) {
            $scope.selectedEvaluation = evaluation;
            $scope.selectedRow = index;
        };

        $scope.startEvaluation = function() {
            $location.path("/evaluation/" + $scope.selectedEvaluation.bundleId);
        };

        //initiations
        var init = function() {
            dashboardService.plannedEvaluations().then(function(evaluations) {
                $scope.plannedEvaluations = evaluations;
            });
        }

        init();

    }
    module.controller('calendarController', calendarController);
})(angular.module('app.dashboard'));