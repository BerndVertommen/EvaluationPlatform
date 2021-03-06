﻿(function(module) {

    function studyPlanService($http, configurationService, $uibModal) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        
        thiz.getStudyPlans = function() {
            return $http.get(baseWebApiUrl + "/studyPlans/allStudyPlans").then(function(result) {
                return result.data;
            });
        }

        thiz.createNewStudyPlan = function (createStudyPlanInfo) {
            return $http.post(baseWebApiUrl + "/studyPlans/createStudyPlan", createStudyPlanInfo).then(function(result) {
                return result.data;
            });
        }

        thiz.addGeneralGoal = function (editedGeneralGoal) {
            return $http.post(baseWebApiUrl + "/studyPlans/addGeneralGoal", editedGeneralGoal).then(function (result) {
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

        thiz.openEditGeneralGoalModal = function (generalGoalToEdit) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/StudyPlan/views/editGeneralGoalModal.html",
                controller: "editGeneralGoalModalController",
                size: 'lg',
                resolve: {
                    generalGoal : function() {
                        return generalGoalToEdit;
                    }
                }
            });

            return modalInstance.result.then(function (newStudyPlan) {
                return newStudyPlan;
            });
        }

    }

    module.service('studyPlanService', studyPlanService);
})(angular.module('app.studyPlan'));