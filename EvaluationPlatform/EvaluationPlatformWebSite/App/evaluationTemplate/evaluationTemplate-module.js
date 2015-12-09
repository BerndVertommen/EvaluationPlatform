angular.module('app.evaluationTemplate', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
          .when('/createEvaluationTemplate', {
              templateUrl: 'app/evaluationTemplate/views/createEvaluationTemplate.html',
              controller: 'createEvaluationTemplateController',
              resolve: {
                  /*ngInject*/
                  createEvaluationOptions: function (evaluationTemplateService) {
                      return evaluationTemplateService.getCreateEvaluationOptions();
                  }
              }
          });

        $routeProvider
        .when('/evaluationTemplates', {
            templateUrl: 'app/evaluationTemplate/views/evaluationTemplates.html',
            controller: 'evaluationTemplatesController',
            resolve: {
                /*ngInject*/
                evaluationTemplates: function (evaluationTemplateService) {
                    return evaluationTemplateService.getEvaluationTemplates();
                }
            }
        });
      
     
    });
