/// <reference path="controllers/createStudentController.js" />
angular.module('app.student', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/createStudent', {
              templateUrl: 'app/Student/views/createStudent.html',
              controller: 'createStudentController'
          });

    });
