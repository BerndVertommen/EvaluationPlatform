angular.module('app.evaluation', ['ngRoute'])
    .config(function ($routeProvider,$route, evaluationService) {
        "use strict";

        // define routes

        $routeProvider
          .when('/evaluation/{id}', {
              templateUrl: '/app/evaluation/views/evaluation.html',
              controller: 'evaluationController',
              resolve: {
                  /*ngInject*/
                  createEvaluationOptions: function (evaluationService) {
                      var id = $route.current.params("id");
                      return evaluationService.getEvaluations(id);
                  }
              }
          });

       

    });
