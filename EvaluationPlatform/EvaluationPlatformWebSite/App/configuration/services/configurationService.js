(function(module) {
    'use strict';

    function configurationService() {
       var thiz = this;

        var apiUrl = 'http://testplatformApi/';

        thiz.baseApiPath = apiUrl + 'api/';

        thiz.tokenPath = apiUrl + 'oauth/token';

    }


    module.service('configurationService', configurationService);
})(angular.module('app'))