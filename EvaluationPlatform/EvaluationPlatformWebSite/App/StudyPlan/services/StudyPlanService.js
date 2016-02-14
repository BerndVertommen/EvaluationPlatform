(function(module) {

    function studyPlanService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;

        // Variables

        //private Functions

        // public functions

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('studyPlanService', studyPlanService);
})(angular.module('app.studyPlan'));