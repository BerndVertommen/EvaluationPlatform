﻿(function (module) {

    function evaluationService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions
        thiz.getCreateEvaluationOptions = function() {
            return $http.get(baseWebApiUrl + 'evaluation/getCreateEvaluationOptions').then(function(result) {
                return result.data;
            });
        };

        thiz.createTemplate = function(evaluationTemplate) {
            $http.post(baseWebApiUrl + 'evaluation/createTemplate',evaluationTemplate);
        };

        //initiations
        var init = function () {

        }

        init();

    }

    module.service('evaluationService', evaluationService);
})(angular.module('app.evaluation'))