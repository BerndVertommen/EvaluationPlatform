(function(module) {
    'use strict';

    function classesService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;

        //Variables

        //private Functions

        // public functions

        thiz.classesForTeacher = function() {
            return $http.get(baseWebApiUrl + 'class/classesForTeacher').then(function(result) {
                return result.data;
            });
        }

        thiz.classesForCourse = function(courseId) {
            return $http.post(baseWebApiUrl + 'class/classesForCourse', { 'id': courseId }).then(function(result) {
                return result.data;
            });
        }

        thiz.availableClassesForTeacher = function(teacherId) {
            return $http.post(baseWebApiUrl + 'class/availableClassesForTeacher', { 'id': teacherId }).then(function(result) {
                return result.data;
            });
        }

        thiz.uploadClassCsv = function(file) {
            return $http.post(baseWebApiUrl + 'class/uploadClassCsv', { file: file }).then(function(result) {
                return result;
            });
        };

        //initiations

    };

    module.service('classesService', classesService);
})(angular.module('app.classes'));