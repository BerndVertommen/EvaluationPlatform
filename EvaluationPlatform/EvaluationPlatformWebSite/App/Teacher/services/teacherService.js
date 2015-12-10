(function (module) {

    function teacherService($http, configurationService) {
        var thiz = this;
        var basePath = configurationService.baseApiPath;
       

        thiz.getAccounts = function () {
            return $http.get(basePath + 'accounts/getAccounts').then(function (result) {
                return result.data;
            });
        }

        

    }

    module.service('teacherService', teacherService);
})(angular.module('app.teacher'))