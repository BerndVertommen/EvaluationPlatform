(function(module) {

    function studyPlanService($http, configurationService, $uibModal) {
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

        thiz.openNewStudyPlanModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/StudyPlan/views/newStudyPlanModal.html",
                controller: "newStudyPlanModalController",
                size: 'lg',
                resolve: {
                }
            });

            return modalInstance.result.then(function (newStudyPlan) {
                return newStudyPlan;
            });
        }

    }

    module.service('studyPlanService', studyPlanService);
})(angular.module('app.studyPlan'));