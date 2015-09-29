//(function (module) {
//    'use strict';

//    function authInterceptorFactory($q, $location, localStorageService) {
//        var thiz = this;

//        thiz.request = function (config) {

//            config.headers = config.headers || {};

//            var authData = localStorageService.get('authorizationData');
//            if (authData) {
//                config.headers.Authorization = 'Bearer ' + authData.token;
//            }

//            return config;
//        }

//        thiz.responseError = function (rejection) {
//            if (rejection.status === 401) {
//                $location.path('/login');
//            }
//            return $q.reject(rejection);
//        }


//    }
    
//    module.factory('authInterceptorFactory', authInterceptorFactory);
//})(angular.module('app'));


'use strict';
app.factory('authInterceptorFactory', ['$q', '$location',
'localStorageService', function ($q, $location, localStorageService) {

    var authInterceptorFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorFactory.request = _request;
    authInterceptorFactory.responseError = _responseError;

    return authInterceptorFactory;
}]);
