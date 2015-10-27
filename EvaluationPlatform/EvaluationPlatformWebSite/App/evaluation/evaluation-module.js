angular.module('app.evaluation', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
          .when('/createEvaluationTemplate', {
              templateUrl: '/app/evaluation/views/createEvaluation.html',
              controller: 'createEvaluationController',
              resolve: {
                  /*ngInject*/
                  createEvaluationOptions: function (evaluationService) {
                      return evaluationService.getCreateEvaluationOptions();
                  }
              }
          });

        $routeProvider
        .when('/evaluationTemplates', {
            templateUrl: '/app/evaluation/views/evaluationTemplates.html',
            controller: 'evaluationTemplatesController',
            resolve: {
                /*ngInject*/
                evaluationTemplates: function (evaluationService) {
                    return evaluationService.getEvaluationTemplates();
                }
            }
        });

    });
