﻿(function (module) {
    'use strict';

    function authenticationService($http, localStorageService, configurationService, $q) {
        var thiz = this;


        thiz.logOut = function () {

            localStorageService.remove('authorizationData');

            thiz.isAuth = false;
            thiz.userName = "";
        };

        thiz.login = function (loginData) {

            var deferred = $q.defer();

            var data = "grant_type=password&username=" +
            loginData.userName + "&password=" + loginData.password;

            $http.post(configurationService.tokenPath, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                thiz.userName = loginData.userName;
                thiz.isAuth = true;

                deferred.resolve(response);

            }),function (error) {
                this.logOut();
                deferred.reject(error);
            };

            return deferred.promise;
        };

        thiz.getAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                thiz.isAuth = true;
                thiz.userName = authData.userName;
            }
        }
    }

    module.service('authenticationService', authenticationService);
})(angular.module('app'))