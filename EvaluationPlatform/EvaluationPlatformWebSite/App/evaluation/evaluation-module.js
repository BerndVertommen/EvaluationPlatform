angular.module('app.evaluation', ['ngRoute'])
    .config(function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
            .when('/evaluation/:bundleId?', {
                templateUrl: 'app/evaluation/views/evaluation.html',
                controller: 'evaluationController',
                resolve: {
                    /*ngInject*/
                    evaluations: function (evaluationService, $route) {
                        var bundleId = $route.current.params.bundleId;
                        return evaluationService.evaluationsForBundle(bundleId).then(function (evals) {
                            return evals;
                        });
                    }
                }
            });

        $routeProvider
           .when('/evaluations', {
               templateUrl: 'app/evaluation/views/evaluations.html',
               controller: 'evaluationsController'
           });



    });
