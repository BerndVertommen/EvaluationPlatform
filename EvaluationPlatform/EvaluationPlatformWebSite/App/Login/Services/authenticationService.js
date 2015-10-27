(function (module) {
    'use strict';

    function authenticationService($http, localStorageService, configurationService, $q, $rootScope) {
        var thiz = this;


        thiz.logOut = function () {

            localStorageService.remove('authorizationData');

            thiz.isAuth = false;
            thiz.userName = "";

            $rootScope.$broadcast('userLoggedOut', {
              
            });
        };

        thiz.login = function (loginData) {

            var deferred = $q.defer();

            var data = "grant_type=password&username=" +
            loginData.userName + "&password=" + loginData.password;

            $http.post(configurationService.tokenPath, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {

                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName, expires: response.data.expires_in });

                thiz.userName = loginData.userName;
                thiz.isAuth = true;

                $rootScope.$broadcast('userLoggedIn', {
                    userName: thiz.userName
                });

                deferred.resolve(response);

            }), function (error) {
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