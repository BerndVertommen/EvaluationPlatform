angular.module('app', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap','$scope', 'app.Home'])
    .config(function($routeProvider, $httpProvider, $scope) {
        "use strict";
        $httpProvider.interceptors.push('authInterceptorService');
    });

angular.module('app').run(function (authService) {
    authService.fillAuthData();
});


