angular.module('app.dashboard', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/dashboard', {
              templateUrl: 'app/dashboard/views/dashboard.html',
              controller: 'dashboardController'
          });

    });
