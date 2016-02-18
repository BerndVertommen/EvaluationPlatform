(function (module) {
    'use strict';

    function selectStudyPlanModalController($scope, $location, $uibModalInstance) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.ok = function() {
            
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        }

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('selectStudyPlanModalController', selectStudyPlanModalController);
})(angular.module('app.studyPlan'));