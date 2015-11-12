(function (module) {
    'use strict';

    function evaluationTemplatesController($scope, $location, evaluationTemplates) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedTemplate = function(template, index) {
            $scope.selectedTemplate = template;
            $scope.selectedRow = index;
        };

        //initiations
        var init = function () {
            $scope.evaluationTemplates = evaluationTemplates;
        }

        init();
    }

    module.controller('evaluationTemplatesController', evaluationTemplatesController);
})(angular.module('app.evaluation'));