(function (module) {
    'use strict';

    function manageStudyPlanController($scope, studyPlanService, selectModalService) {
        var thiz = this;

        $scope.studyplans = [];
        $scope.selectedStudyPlan = {};
        //Variables

        //private Functions
        
        // public functions
        $scope.createNewStudyPlan = function() {
            $scope.selectedStudyPlan = {};
        }

        $scope.getStudyPlanInfo = function() {
            selectModalService.openModal("selectStudyplanModal", $scope.studyplans).then(function(studyPlanSummary) {
                studyPlanService.getStudyPlanInfo(studyPlanSummary.id).then(function(studyPlan) {
                    $scope.selectedStudyPlan = studyPlan;
                });
            });
        }

        //initiations
        var init = function () {
            studyPlanService.getStudyPlans().then(function (result) {
                $scope.studyplans = result;
            });
        }

        init();
    }

    module.controller('manageStudyPlanController', manageStudyPlanController);
})(angular.module('app.studyPlan'));