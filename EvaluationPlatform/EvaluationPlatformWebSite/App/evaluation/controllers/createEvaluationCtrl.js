(function (model) {
    'use strict';

    function createEvaluationController($scope, $location, createEvaluationOptions) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {
            $scope.createEvaluationOptions = createEvaluationOptions;
        }

        init();
    }

    model.controller('createEvaluationController', createEvaluationController);
})(angular.module('app.evaluation'));