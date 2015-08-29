
angular.module('app.classes', ['ngRoute'])
    .config(function($routeProvider) {
        'use strict';

        $routeProvider
            .when('/classes', {
                templateUrl: 'app/classes/views/testClassView.html',
                controller: 'TestClassController'
            });
    });