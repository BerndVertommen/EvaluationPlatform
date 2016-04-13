(function (module) {
    'use strict';

    function manageClassesController($scope, $location, allClasses) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions

        //klassen volledig oproepen filteren clientside
        //studenten 10/10 van server ophalen

        $scope.selectedRow = null;

        $scope.setSelectedClass = function (classX, index) {
            $scope.setSelectedClass = classX;
            $scope.selectedRow = index;
        }

        //initiations
        var init = function () {
            $scope.allClasses = allClasses;
            console.log($scope.allClasses);
        }

        init();
    }

    module.controller('manageClassesController', manageClassesController);
})(angular.module('app.classes'));