(function (module) {
    'use strict';

    function errorMessageService(toastr) {
        var thiz = this;

        thiz.handleReject = handleReject;

        function handleReject(rejection) {

            if (rejection.status === 500) {
                toastr.error('Fout', rejection.data.exceptionMessage);
            }
        }
    }

module.service('errorMessageService', errorMessageService);
})(angular.module('app')); //test