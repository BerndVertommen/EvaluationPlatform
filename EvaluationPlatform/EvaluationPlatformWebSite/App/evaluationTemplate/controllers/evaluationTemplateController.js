(function (module) {
    'use strict';

    function evaluationTemplatesController($scope, $location, evaluationTemplates, $uibModal, classesService, evaluationTemplateService) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedTemplate = function (template, index) {
            $scope.selectedTemplate = template;
            $scope.selectedRow = index;
        };

        $scope.createEvaluations = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluationTemplate/views/createEvaluationsFromTemplateModal.html',
                controller: 'createEvaluationsFromTemplateModalController',
                size: 'lg',
                resolve: {
                    evaluationTemplate: function () {
                        return $scope.selectedTemplate;
                    },
                    classesForCourse: function () {
                        return classesService.classesForCourse($scope.selectedTemplate.course.id).then(function (classes) {
                            return classes;
                        });
                    }
                }
            });
        }

        $scope.hideSelectedTemplates = function () {
            console.log('test');

            var templatesToHide = [];
            _.each($scope.evaluationTemplates, function (template) {
                if (template.checkHidden === true) {
                    templatesToHide.push(template);
                }
            });

            if (templatesToHide.length > 0) {

                evaluationTemplateService.hideSelectedTemplates(templatesToHide).then(function () {
                    _.each(templatesToHide, function (template) {
                        template.hide = true;
                    });
                });
            }
        }

        //initiations
        var init = function () {
            $scope.evaluationTemplates = evaluationTemplates;
        }

        init();
    }

    module.controller('evaluationTemplatesController', evaluationTemplatesController);
})(angular.module('app.evaluationTemplate'));
