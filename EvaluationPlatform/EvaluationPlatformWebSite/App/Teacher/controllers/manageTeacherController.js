(function (module) {
    'use strict';

    function manageTeacherController($scope, $location, teacherService, $uibModal) {
        var thiz = this;
       
        //Variables
        $scope.selectedRow = null;
        $scope.setSelectedAccount = function (account, index) {
            $scope.setSelectedAccount = account;
            $scope.selectedRow = index;
        };

        //private Functions
        
        // public functions


        //initiations
        var init = function () {
            teacherService.getAccounts().then(function (accounts) {
                $scope.accountList = accounts;
            });



        }

        init();
    }

    module.controller('manageTeacherController', manageTeacherController);
})(angular.module('app.teacher'));