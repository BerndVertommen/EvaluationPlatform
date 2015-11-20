angular.module('app.account', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        $routeProvider
          .when('/manageAccount', {
              templateUrl: '/app/Account/views/manageAccount.html',
              controller: 'manageAccountController'
             
              
          });
       


    });
