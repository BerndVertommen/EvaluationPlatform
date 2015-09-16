(function(module) {

    function accountService($http, configurationservice) {
        var thiz = this;

        thiz.changePassword = function (changePasswordBindingModel) {
            $http.post(configurationservice.baseApiPath + 'accounts/changepassword', changePasswordBindingModel);
        }

    }

    module.service('accountService', accountService);
})(angular.module('app.account'))