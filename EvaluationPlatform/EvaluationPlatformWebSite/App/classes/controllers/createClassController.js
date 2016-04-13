(function (module) {
    'use strict';

    function createClassController($scope, $location, classesService, messageService) {
        var thiz = this;
       
        //Variables

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

        //initiations
        var init = function () {
            $scope.createClassInfo = {};
            $scope.createClassInfo.nextYear = false;
        }

        init();
    }

    module.controller('createClassController', createClassController);
})(angular.module('app.classes'));