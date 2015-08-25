
angular.module('app.home', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
            .when( '/', {
            templateUrl: 'app/home/views/home.html',
            controller: 'HomeController'
            })
            .when('/home', {
                templateUrl: 'app/home/views/home.html',
                controller: 'HomeController'
            })
            .otherwise({
            redirectTo: '/'
    });

    });
