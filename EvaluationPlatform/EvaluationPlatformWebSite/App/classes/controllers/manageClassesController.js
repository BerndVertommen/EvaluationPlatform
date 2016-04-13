(function (module) {
    'use strict';

    function manageClassesController($scope, classesService,schoolyearService, toastr) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.setSelectedSchoolYear = function(schoolyear) {
            $scope.selectedSchoolYear = schoolyear;
        }

        $scope.uploadCsv = function() {
            classesService.uploadClassCsv($scope.file, $scope.selectedSchoolYear).then(function(parameters) {
                toastr.success('Het CSV bestand is met success opgeslagen.');
            });

        };

        //klassen volledig oproepen filteren clientside
        //studenten 10/10 van server ophalen

        //initiations
        var init = function () {
          schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
              $scope.schoolYears = schoolyears;

              $scope.selectedSchoolYear = $scope.schoolYears[0];

              console.log($scope.schoolYears);
              console.log($scope.selectedSchoolyear);
            });
           

        }

        init();
    }

    module.controller('manageClassesController', manageClassesController);
})(angular.module('app.classes'));