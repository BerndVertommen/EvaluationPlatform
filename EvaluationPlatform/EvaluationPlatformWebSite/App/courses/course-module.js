angular.module('app.course', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/courses', {
              templateUrl: 'app/courses/views/courses.html',
              controller: 'courseController',
              resolve: {
                  /*ngInject*/
                  courses: function (courseService) {
                      return courseService.getCourses().then(function(courses) {
                          return courses;
                      });
                  }
              }
          });

    });
