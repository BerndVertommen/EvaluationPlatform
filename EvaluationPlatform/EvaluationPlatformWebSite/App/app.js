var app = angular.module('app', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap']);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/home', {
            controller: 'HomeCtrl',
            templateUrl: '/App/Home/Views/Home.html'
        });

    app.run([
        'authService', function (authService) {
            authService.fillAuthData();
        }
    ]);

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });
});