(function (model) {
    'use strict';

    function createEvaluationController($scope, $location, createEvaluationOptions) {
        var thiz = this;

        //Variables
        $scope.evaluationTemplate = {};
        $scope.tabs = 1;

        //private Functions
        
        // public functions
        $scope.selectCourse = function(course) {
            $scope.evaluationTemplate.course = course;
        };

        //initiations
        var init = function () {
            $scope.createEvaluationOptions = createEvaluationOptions;
           
        }

        init();
    }

    model.controller('createEvaluationController', createEvaluationController);
})(angular.module('app.evaluation'));