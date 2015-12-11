(function (module) {
    'use strict';

    function evaluationsController($scope, $location) {
        var thiz = this;
       
        //Variables
        evaluationQueryObject = {};
        evaluationQueryObject.startDate;
        evaluationQueryObject.endDate;
        evaluationQueryObject.complete = false;

        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('evaluationsController', evaluationsController);
})(angular.module('app.evaluation'));