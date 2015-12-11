angular.module('app.course', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/manageCourse', {
              templateUrl: 'app/Course/views/manageCourse.html',
              controller: 'manageCourseController'
          });

        $routeProvider
         .when('/courses', {
             templateUrl: 'app/Course/views/courses.html',
             controller: 'courseController',
             resolve: {
                 /*ngInject*/
                 courses: function (courseService) {
                     return courseService.getCourses().then(function (courses) {
                         return courses;
                     });
                 }
             }
         });

    });
