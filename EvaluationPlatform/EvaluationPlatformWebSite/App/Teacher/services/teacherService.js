(function (module) {

    function teacherService($http, configurationService) {
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

    module.service('teacherService', teacherService);
})(angular.module('app.teacher'))