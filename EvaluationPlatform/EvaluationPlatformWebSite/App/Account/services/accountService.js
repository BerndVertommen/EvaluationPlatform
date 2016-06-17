(function (module) {

    function accountService($http, configurationService) {
        var thiz = this;
        var basePath = configurationService.baseApiPath;

        thiz.getAccounts = function () {
            return $http.get(basePath + 'accounts/getAccounts').then(function (result) {
                return result.data;
            });
        }

        //nieuwe methode om account te creeeren aangemaakt
        thiz.createAccount = function (createAccountInfo) {
            return $http.post(basePath + 'accounts/createAccount', createAccountInfo).then(function (result) {
                return result.data;
            });
        }

        thiz.getAccountInfo = function(username) {
            return $http.get(basePath + 'accounts/getAccount/'+ username ).then(function(result) {
                return result.data;
            });
        }
    }

    module.service('accountService', accountService);
})(angular.module('app.account'));