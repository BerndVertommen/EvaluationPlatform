(function (module) {
    'use strict';

    function manageClassesController($scope, classesService, toastr, $location) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        $scope.uploadCsv = function() {
            classesService.uploadClassCsv($scope.file).then(function(parameters) {
                toastr.success('Het CSV bestand is met success opgeslagen.');
            });

        };

        //klassen volledig oproepen filteren clientside
        //studenten 10/10 van server ophalen

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('manageClassesController', manageClassesController);
})(angular.module('app.classes'));