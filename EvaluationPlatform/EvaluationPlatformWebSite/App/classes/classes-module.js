
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

        $routeProvider
          .when('/manageClasses', {
              templateUrl: 'app/classes/views/manageClasses.html',
              controller: 'manageClassesController',
              resolve: {
                  allClasses: function(classesService) {
                      return classesService.allClasses().then(function (allClasses) {
                          return allClasses;
                      });
                  }
              }
          });

        $routeProvider
        .when('/createClass', {
            templateUrl: 'app/classes/views/createClass.html',
            controller: 'createClassController'

        });

    });