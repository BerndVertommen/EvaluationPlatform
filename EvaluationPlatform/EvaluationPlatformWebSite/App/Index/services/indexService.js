(function (module) {

    function indexService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        //initiations
        var init = function () {

        }

        init();

    }

    module.service('serviceName', indexService);
})(angular.module('app.index'))