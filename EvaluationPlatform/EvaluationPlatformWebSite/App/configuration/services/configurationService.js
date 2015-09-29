(function(module) {
    'use strict';

    function configurationService() {
       var thiz = this;

        thiz.apiUrl = 'http://testplatformApi/';

        thiz.baseApiPath = thiz.apiUrl + 'api/';

        thiz.tokenPath = thiz.apiUrl + 'oauth/token';

    }


    module.service('configurationService', configurationService);
})(angular.module('app'))