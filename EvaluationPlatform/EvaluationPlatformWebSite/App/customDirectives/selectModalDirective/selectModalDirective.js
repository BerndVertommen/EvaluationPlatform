﻿(function (module) {
    'use strict';
    function selectModal(selectModalService) {
        return {
            restrict: 'E',
            template: "<a class='btn btn-default btn-sm' ><i class='fa fa-plus-square'></i></a>",
            scope: {
                modalname: '@',
                items: '=',
                selecteditem:'='
            },
            link: function (scope, element) {

                element.bind('click', function() {
                    selectModalService.openModal(scope.modalname, scope.items).then(function (result) {
                        scope.selecteditem = result;
                    });
                });
            }
        };
    }

    module.directive('selectModal', selectModal);
})(angular.module('app.customDirectives'));