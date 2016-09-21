(function (module) {
    'use strict';

    function newStudyPlanModalController($scope, $location, $uibModalInstance) {
        var thiz = this;
       
        //Variables
        $scope.newStudyPlan = {};
        //private Functions
        
        // public functions

        $scope.ok = function () {
            $scope.newStudyPlan.generalGoals = [];
            $uibModalInstance.close($scope.newStudyPlan);
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        }

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('newStudyPlanModalController', newStudyPlanModalController);
})(angular.module('app.studyPlan'));