(function (module) {
    'use strict';

    function classesService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;

        //Variables

        //private Functions

        // public functions

        thiz.classesForTeacher = function () {
            return $http.get(baseWebApiUrl + 'class/classesForTeacher').then(function (result) {
                return result.data;
            });
        }

        //initiations
        
    }

    module.service('classesService', classesService);
})(angular.module('app.classes'))