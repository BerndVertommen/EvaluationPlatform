(function(module) {

    function studyPlanService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        
        thiz.getStudyPlans = function() {
            return $http.get(baseWebApiUrl + "/studyPlans/allStudyPlans").then(function(result) {
                return result.data;
            });
        }

        thiz.getStudyPlanInfo = function (studyPlanId) {
            var guidDto = { 'id': studyPlanId };
            return $http.post(baseWebApiUrl + "/studyPlans/getStudyPlanInfo", guidDto ).then(function (result) {
                return result.data;
            });
        }

    }

    module.service('studyPlanService', studyPlanService);
})(angular.module('app.studyPlan'));