
angular.module('app.classes', ['ngRoute'])
    .config(function($routeProvider) {
        'use strict';

        $routeProvider
            .when('/classes', {
                templateUrl: 'app/classes/views/classes.html',
                controller: 'classesController',
                resolve: {
                    /*ngInject*/
                    classes: function(classesService) {
                        return classesService.classesForTeacher().then(function(classes) {
                            return classes;
                        });
                    }
                }
            });
    });