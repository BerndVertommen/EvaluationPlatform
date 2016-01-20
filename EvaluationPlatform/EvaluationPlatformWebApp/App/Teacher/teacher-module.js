angular.module('app.teacher', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/manageTeacher', {
              templateUrl: 'app/Teacher/views/manageTeacher.html',
              controller: 'manageTeacherController',
              resolve: {
                  teachers : function(teacherService) {
                      return teacherService.teachers().then(function(result) {
                          return result;
                      });
                  }
              }

          });

    });
