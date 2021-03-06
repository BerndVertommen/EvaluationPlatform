﻿angular.module('app.login', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
            .when('/login', {
                templateUrl: 'app/login/views/login.html',
                controller: 'loginController'
            });

    });

app.run(['authenticationService', function (authenticationService) {
    authenticationService.getAuthData();
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorFactory');
});




