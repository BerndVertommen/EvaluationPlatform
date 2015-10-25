﻿
(function (module) {
    'use strict';

    function evaluationSubSectionController($scope, $modalInstance, evaluationSubSections, course, subSection) {
        var thiz = this;

        //Variables
      
      
        //private Functions

        // public functions
       
        thiz.addnewEvaluationSubSection = function () {
            $scope.evaluationSubSections.push(angular.copy($scope.newEvaluationSubSection));
        }
        
        // modal functions
        $scope.ok = function () {
            if (angular.isUndefined($scope.isEditing) || $scope.isEditing === false) {
                thiz.addnewEvaluationSubSection();
            }

            $modalInstance.close($scope.evaluationSubSections);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

       
        //initiations
        var init = function () {
            $scope.evaluationSubSections = evaluationSubSections;
            $scope.course = course;
            if (angular.isDefined(subSection) && subSection !==null) {
                $scope.newEvaluationSubSection = subSection;
                $scope.isEditing = true;
            }

        }

        init();
    }

    module.controller('evaluationSubSectionController', evaluationSubSectionController);
})(angular.module('app.evaluation'));