﻿(function (module) {
    'use strict';

    function manageClassesController($scope, classesService,schoolyearService, toastr, $location, allClasses) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        //$scope.setSelectedSchoolYear = function(schoolyear) {
        //    $scope.selectedSchoolYear = schoolyear;
        //}
        $scope.fileUpdated = function($files, $event) {
            $scope.file = $event.target.files[0];
        };

        $scope.uploadCsv = function() {
            classesService.uploadClassCsv($scope.file, $scope.selectedSchoolYear).then(function (parameters) {
                toastr.success('Het CSV bestand is met success opgeslagen.');
            });

        };

        //klassen volledig oproepen filteren clientside
        //studenten 10/10 van server ophalen

        $scope.selectedRow = null;

        $scope.setSelectedClass = function (classX, index) {
            $scope.selectedClass = classX;
            $scope.selectedRow = index;
        }

        //initiations
        var init = function () {
          schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
              $scope.schoolYears = schoolyears;
              $scope.selectedSchoolYear = schoolyears[0];
          });
           

            $scope.allClasses = allClasses;
            console.log($scope.allClasses);
        }

        init();
    }

    module.controller('manageClassesController', manageClassesController);
})(angular.module('app.classes'));