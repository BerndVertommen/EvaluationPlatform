angular.module('app', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap','$scope', 'app.Home'])
    .config(function($routeProvider, $httpProvider) {
        "use strict";
        // $httpProvider.interceptors.push('authInterceptorService');
        $routeProvider
         .mapRoute('home', '/', {
             templateUrl: 'app/home/views/home.html',
             controller: 'homeCtrl'
         })
         .otherwise({
             redirectTo: '/'
         });

    });

angular.module('app').run(function (authService) {
  //  authService.fillAuthData();
});


