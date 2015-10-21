
(function (module) {
    'use strict';

    function generalEvaluationOptionsController($scope, $modalInstance, generalOptions, createEvaluationOptions) {
        var thiz = this;

        //Variables
      
      
        //private Functions

        // public functions
       
        $scope.ok = function () {
            $modalInstance.close($scope.generalOptions);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.selectCourse = function (course) {
            $scope.generalOptions.course = course;
        };

        //initiations
        var init = function () {
            $scope.generalOptions = generalOptions;
            $scope.createEvaluationOptions = createEvaluationOptions;

        }

        init();
    }

    module.controller('generalEvaluationOptionsController', generalEvaluationOptionsController);
})(angular.module('app.evaluation'));