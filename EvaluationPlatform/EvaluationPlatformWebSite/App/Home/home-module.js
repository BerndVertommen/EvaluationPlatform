angular.module('app.Home', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
    .mapRoute('home', '/', {
        templateUrl: 'app/home/views/home.html',
        controller: 'homeCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

    });
