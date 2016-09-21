(function (module) {
    'use strict';

    function editGeneralGoalModalController($scope, $location, $uibModalInstance,generalGoal) {
        var thiz = this;
       
        //Variables
        $scope.generealGoal = generalGoal;
        //private Functions
        
        // public functions

        $scope.ok = function () {
         
            $uibModalInstance.close($scope.generealGoal);
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        }

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('editGeneralGoalModalController', editGeneralGoalModalController);
})(angular.module('app.studyPlan'));