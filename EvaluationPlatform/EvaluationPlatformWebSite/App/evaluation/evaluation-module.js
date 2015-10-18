angular.module('app.evaluation', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
          .when('/createEvaluation', {
              templateUrl: '/app/evaluation/views/createEvaluation.html',
              controller: 'createEvaluationController',
              resolve: {
                  /*ngInject*/
                  createEvaluationOptions: function (evaluationService) {
                      return evaluationService.getCreateEvaluationOptions();
                  }
              }
          });

    });
