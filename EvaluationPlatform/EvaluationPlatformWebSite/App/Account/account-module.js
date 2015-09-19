angular.module('app.account', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        //Remove this in production Very important
        $routeProvider
           .when('/createTestAccount', {
               templateUrl: 'app/account/views/createTestAccountView.html',
               controller: 'createTestAccountController'
           });


        $routeProvider
            .when('/changePassword', {
                templateUrl: 'app/account/views/changePassword.html',
                controller: 'changePasswordController'
            });


    });
