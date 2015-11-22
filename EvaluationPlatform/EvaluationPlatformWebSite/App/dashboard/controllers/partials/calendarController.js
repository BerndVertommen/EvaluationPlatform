(function (module) {
    'use strict';

    function calendarController($scope, $location, dashboardService) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
       

     
        //initiations
        var init = function () {
            dashboardService.plannedEvaluations().then(function (evaluations) {
                $scope.plannedEvaluations = evaluations;
            });
        }

        init();
    }

    module.controller('calendarController', calendarController);
})(angular.module('app.dashboard'));