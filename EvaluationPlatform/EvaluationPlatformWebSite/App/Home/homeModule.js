    angular.module('app.Home', ['ngRoute'])
        .config(function ($routeProvider) {
            "use strict";
            $routeProvider
                .mapRoute('home','/', {
                    controller: 'homeCtrl',
                    templateUrl: '/App/Home/Views/home.html'
                });
        });
