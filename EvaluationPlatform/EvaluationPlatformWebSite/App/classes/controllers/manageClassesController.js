(function (module) {
    'use strict';

    function manageClassesController($scope, classesService,courseService, messageService, schoolyearService, toastr, $location, allClasses, selectModalService) {
        var thiz = this;
       
        //Variables
        var allCourses = null;
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

        $scope.addCourse = function () {
                selectModalService.openModal('selectCoursesModal', allCourses).then(function (result) {
                    classesService.addCourses($scope.selectedClass.id, result).then(function() {
                        messageService.handleSucces("De vakken zijn toegevoegd.");
                    });
                });       
        }

        //initiations
        var init = function () {
          schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
              $scope.schoolYears = schoolyears;
              $scope.selectedSchoolYear = schoolyears[0];
          });

          courseService.allCourses().then(function (courses) {             
              allCourses = courses;
          });



            $scope.allClasses = allClasses;
            console.log($scope.allClasses);
        }

        init();
    }

    module.controller('manageClassesController', manageClassesController);
})(angular.module('app.classes'));