(function (module) {
    'use strict';

    function createClassController($scope, $location, classesService, messageService, teacherService) {
        var thiz = this;
       
        //Variables
        $scope.selectedTeacher = null;
        $scope.selectedTeachers = [];

        //private Functions
        
        // public functions
        $scope.cancel = function() {
            $location.path("/manageClasses");
        }

        $scope.ok = function () {
            classesService.createClass($scope.createClassInfo).then(function () {
                messageService.handleSucces("Klas aangemaakt!");
                $location.path("/manageClasses");
            });

        }

        // todo remove this 
        $scope.$watch('selectedTeacher', function (value) {
            if (value == null) {
                return null;
            }
            console.log('Geselecteerde leerkacht :' + value.person.firstName + ' ' + value.person.lastName);
        });

        // todo remove this 
        $scope.$watch('selectedTeachers', function (teachers) {
            if (teachers.length < 1 ) {
                return null;
            }
            _.each(teachers, function(teacher) {
                console.log('Leerkracht :' + teacher.person.firstName + ' ' + teacher.person.lastName);
            });
        });


        //initiations
        var init = function () {
            $scope.createClassInfo = {};
            $scope.createClassInfo.nextYear = false;

            teacherService.getTeachers().then(function (result) {
                $scope.teachers = result;
            });
        }

        init();
    }

    module.controller('createClassController', createClassController);
})(angular.module('app.classes'));