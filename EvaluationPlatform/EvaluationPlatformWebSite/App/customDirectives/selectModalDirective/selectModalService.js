(function (module) {
    'use strict';
    function selectModalService($uibModal) {
        var thiz = this;

        var modalSettings = [
           /*selectTeacherModalSetting*/
           {
               modalName: "selectTeacherModal", template: "app/customDirectives/selectModalDirective/searchTeachersModal/selectTeacherModal.html", controller: "selectItemModalController",
               content: { title: "Leerkrachten", itemDescription: "Selecteer een leerkracht" }
           },
           /*selectTeachersModalSetting  => multiple teachers*/
           {
               modalName: "selectTeachersModal", template: "app/customDirectives/selectModalDirective/searchTeachersModal/selectTeachersModal.html", controller: "selectItemsModalController",
               content: { title: "Leerkrachten", itemDescription: "Selecteer leerkrachten" }
           },
           /*Other settings*/
           //selectCoursesModal
        {
            modalName: "selectCoursesModal", template: "app/customDirectives/selectModalDirective/searchCoursesModal/selectCoursesModal.html", controller: "selectItemsModalController",
            content: { title: "Cursussen", itemDescription: "Selecteer cursussen" }
        }
        ];

        var getModalSetting = function (modalName) {
            var result = _.find(modalSettings, function (modalSetting) {
                return modalSetting.modalName.toLowerCase() === modalName.toLowerCase();
            });

            if (result == null) {
                console.log("Geen modal setting gevonden");
            };

            return result;
        };

        // public functions
        thiz.openModal = function (modalName, items) {

            var modalSetting = getModalSetting(modalName);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: modalSetting.template,
                controller: modalSetting.controller,
                size: 'lg',
                resolve: {
                    items: function () {
                        return items;
                    },
                    content: function () {
                        return modalSetting.content;
                    }
                }
            });

            return modalInstance.result.then(function (selectedItem) {
                return selectedItem;
            });
        }
    }

    module.service('selectModalService', selectModalService);
})(angular.module('app.customDirectives')); //test