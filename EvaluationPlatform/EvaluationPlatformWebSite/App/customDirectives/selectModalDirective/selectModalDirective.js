﻿(function (module) {
    'use strict';
    function selectModal(selectModalService) {
        return {
            restrict: 'E',
            template: "<a class='btn btn-default' ><i class='fa fa-search'></i></a>",
            scope: {
                modalname: '@',
                items: '=',
                selection:'='
            },
            link: function (scope, element) {

                element.bind('click', function() {
                    selectModalService.openModal(scope.modalname, scope.items).then(function (result) {
                        scope.selection = result;
                    });
                });
            }
        };
    }

    module.directive('selectModal', selectModal);
})(angular.module('app.customDirectives'));