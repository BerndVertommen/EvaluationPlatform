var app = angular.module('app', ['ngRoute', 'toastr', 'ngAnimate', "ui.bootstrap", 'LocalStorageModule', 'app.home', 'app.classes', 'app.login', 'app.account', 'app.index', 'app.student', 'app.evaluationTemplate', 'app.evaluation', 'app.dashboard', 'angular-loading-bar', 'ngTouch', 'app.teacher', 'app.course', 'app.studyPlan'])
    .config(function ($routeProvider, $httpProvider, toastrConfig) {
        "use strict";

        angular.extend(toastrConfig, {
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 10,
            newestOnTop: true,
            positionClass: 'toast-bottom-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',

            allowHtml: false,
            closeButton: false,
            closeHtml: '<button>&times;</button>',
            extendedTimeOut: 1000,
            iconClasses: {
                error: 'toast-error',
                info: 'toast-info',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            messageClass: 'toast-message',
            onHidden: null,
            onShown: null,
            onTap: null,
            progressBar: true,
            tapToDismiss: true,
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 2000,
            titleClass: 'toast-title',
            toastClass: 'toast'
        });

    });

app.config(function ($provide, $httpProvider) {
    $provide.factory('errorInterceptor', function ($q, $injector) {
        return {
            responseError: function (rejection) {

                //console.log(rejection.data.exceptionMessage);
                
               //var toastr = $injector.get('toastr');
               // toastr.error('Fout', rejection.data.exceptionMessage);

                var errorMessageService = $injector.get('errorMessageService');
                errorMessageService.handleReject(rejection);

                return $q.reject(rejection);
            }
        };
    });

    $httpProvider.interceptors.push('errorInterceptor');
});






