(function(module) {

    function dashboardService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions
       

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('dashboardService', dashboardService);
})(angular.module('app.dashboard'));