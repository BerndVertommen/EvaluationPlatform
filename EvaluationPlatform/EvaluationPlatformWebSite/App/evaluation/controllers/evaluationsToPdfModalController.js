(function (module) {
    'use strict';

    function evaluationsToPdfModalController($scope, $location, evaluations, $uibModalInstance) {
        var thiz = this;
       
        //Variables

        //private Functions
        var getSelectedIds = function() {
            return _.map($scope.evaluations, function(eva) {
                if (eva.selected === true) {
                    return eva.id;
                }
            });
        };
        
        // public functions

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.evaluations, function (item) {
                item.selected = $scope.selectedAll;
            });

        };

        $scope.ok = function () {

            $uibModalInstance.close(getSelectedIds());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //initiations
        var init = function () {
            $scope.evaluations = evaluations;

        }

        init();
    }

    module.controller('evaluationsToPdfModalController', evaluationsToPdfModalController);
})(angular.module('app.evaluation'));