(function(module) {
    'use strict';

    function configurationService() {
        thiz = this;

        var baseApiPath = 'http://testplatformApi/api/';
    }


    module.service('configurationService', configurationService);
})(angular.module('app'))