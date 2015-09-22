(function (module) {
    'use strict';

    function authenticationService($http,  localStorageService, configurationService) {
        var thiz = this;

        thiz.login = function (loginData) {

            var data = "grant_type=password&username=" +
            loginData.userName + "&password=" + loginData.password;

            thiz.logOut = function () {

                localStorageService.remove('authorizationData');

                this.isAuth = false;
                this.userName = "";
            };


            $http.post(configurationService.baseApiPath + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(response) {

                localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

                thiz.userName = loginData.userName;
                this.isAuth = true;

            }).error(function(error) {
                this.logOut();
            });



        };
    }


    module.service('authenticationService', authenticationService);
})(angular.module('app.login'))