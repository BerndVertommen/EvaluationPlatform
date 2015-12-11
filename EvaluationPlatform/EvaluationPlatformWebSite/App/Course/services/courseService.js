(function (module) {

    function courseService($http, configurationService) {
        var thiz = this;
        var basePath = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        //initiations
        var init = function () {

        }

        init();

    }

    module.service('courseService', courseService);
})(angular.module('app.replace'))