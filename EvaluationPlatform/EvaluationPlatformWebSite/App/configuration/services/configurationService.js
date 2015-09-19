(function(module) {
    'use strict';

    function configurationService() {
       var thiz = this;

       thiz.baseApiPath = 'http://testplatformApi/api/';
    }


    module.service('configurationService', configurationService);
})(angular.module('app'))