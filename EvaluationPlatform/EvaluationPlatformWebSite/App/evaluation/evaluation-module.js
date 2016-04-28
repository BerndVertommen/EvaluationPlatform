angular.module('app.evaluation', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
            .when('/evaluation/:bundleId?', {
                templateUrl: 'app/evaluation/views/evaluation.html',
                controller: 'evaluationController',
                resolve: {
                    /*ngInject*/
                    evaluations: function (evaluationService, $route) {
                        var bundleId = $route.current.params.bundleId;
                        return evaluationService.evaluationsForBundle(bundleId).then(function (evals) {
                            return evals;
                        });
                    }
                }
            });

        $routeProvider
           .when('/searchEvaluationForClass', {
               templateUrl: 'app/evaluation/views/searchEvaluationForClass.html',
               controller: 'searchEvaluationForClassController',
               resolve: {
                   /*ngInject*/
                   classes: function (classesService) {
                       return classesService.classesForTeacher().then(function (classes) {
                           return classes;
                       });
                   },
                   courses: function (courseService) {
                       return courseService.getCourses().then(function (courses) {
                           return courses;
                       });
                   }
               }
           });

        $routeProvider
          .when('/searchEvaluationsForStudent', {
              templateUrl: 'app/evaluation/views/searchEvaluationsForStudent.html',
              controller: 'searchEvaluationsForStudentController',
              resolve: {
                  /*ngInject*/
                  classes: function (classesService) {
                      return classesService.classesForTeacher().then(function (classes) {
                          return classes;
                      });
                  },
                  courses: function (courseService) {
                      return courseService.getCourses().then(function (courses) {
                          return courses;
                      });
                  }
              }
          });
    });

