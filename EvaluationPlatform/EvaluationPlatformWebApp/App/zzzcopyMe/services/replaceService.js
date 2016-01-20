(function (module) {

    function serviceName($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        
        // Variables

        //private Functions

        // public functions

        //initiations
        var init = function () {

        }

        init();

    }

    module.service('serviceName', serviceName);
})(angular.module('app.replace'))