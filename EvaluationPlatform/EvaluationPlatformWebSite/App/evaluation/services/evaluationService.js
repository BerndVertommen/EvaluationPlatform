﻿(function (module) {

    function evaluationService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        thiz.evaluationsForBundle = function (bundleId) {
            return $http.post(baseWebApiUrl + 'evaluation/evaluationsForBundle', { 'id': bundleId }).then(function (result) {
                return result.data;
            });
        };
      

        //initiations
        var init = function () {

        }

        init();

    }

    module.service('evaluationService', evaluationService);
})(angular.module('app.evaluation'))