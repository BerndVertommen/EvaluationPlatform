angular.module('app.account', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
            .when('/changePassword', {
                templateUrl: 'app/account/views/changePassword.html',
                controller: 'changePasswordController'
            });

    });
