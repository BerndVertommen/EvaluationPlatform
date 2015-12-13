(function (module) {
    'use strict';

    function selectClassModalController($scope, $location, $uibModalInstance, classes) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions
        $scope.selectedRow = null;
        $scope.setSelectedClass = function (klas, index) {
            $scope.selectedClass = klas;
            $scope.selectedRow = index;
        };

        // modal functions
        $scope.ok = function () {
            if (angular.isUndefined($scope.selectedClass)) {
                return;  //handle with error in future
            }

            $uibModalInstance.close($scope.selectedClass);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //initiations
        var init = function () {
            $scope.classes = classes;
            console.log(classes);
        }

        init();
    }

    module.controller('selectClassModalController', selectClassModalController);
})(angular.module('app.classes'));