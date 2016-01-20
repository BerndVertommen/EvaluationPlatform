(function (module) {

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


        thiz.updateEvaluation = function (evaluation) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluation', evaluation).then(function (result) {
                return result.data;
            });
        };


        thiz.updateEvaluations = function (evaluations) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluations', evaluations).then(function (result) {
                return result.data;
            });
        };

        thiz.searchEvaluations = function (evaluationsPagedQueryObject) {
            return $http.post(baseWebApiUrl + 'evaluation/searchEvaluations', evaluationsPagedQueryObject).then(function (result) {
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