angular.module('app.login', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
            .when('/login', {
                templateUrl: 'app/login/views/login.html',
                controller: 'loginController'
            });

    });

angular.module('app.login').run(function (authService) {
    authService.fillAuthData();
});

angular.module('app.login').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorFactory');
});

