(function (module) {

    function accountService($http, configurationService) {
        var thiz = this;

        thiz.changePassword = function (changePasswordBindingModel) {
            return $http.post(configurationService.baseApiPath + 'accounts/changepassword', changePasswordBindingModel).then(function (data) {
                return data;
            });
        }

        thiz.createTestAccount = function () {
            var createUserModel = {
                username: "Tester",
                email: "berndvertommen@msn.com",
                firstName: "Test",
                lastname: "er",
                password: "@Dmin123",
                confirmPassword :"@Dmin123"
        }

            return $http.post(configurationService.baseApiPath + 'accounts/createTester', createUserModel).then(function (data) {
                return data;
            });
        }

    }

    module.service('accountService', accountService);
})(angular.module('app.account'))