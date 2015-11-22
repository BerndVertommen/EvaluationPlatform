(function (module) {
    'use strict';

    function dashboardController($scope, $location) {
        var thiz = this;
       
        //Variables
        $scope.calenderPath = '/app/dashboard/views/partials/calendarPartial.html';
        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('dashboardController', dashboardController);
})(angular.module('app.dashboard'));