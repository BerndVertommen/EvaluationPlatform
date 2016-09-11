(function (module) {

    function evaluationService($http, configurationService, messageService, $filter, $q) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        thiz.evaluationsForBundle = function (bundleId) {
            return $http.post(baseWebApiUrl + 'evaluation/evaluationsForBundle', { 'id': bundleId }).then(function (result) {
                return result.data;
            });
        };

        thiz.updateEvaluation = function (evaluation) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluation', evaluation).then(function (result) {
                return result.data;
            });
        };


        thiz.updateEvaluations = function (evaluations) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluations', evaluations).then(function (result) {
                return result.data;
            });
        };

        thiz.searchEvaluations = function (pdfForEvaluationsQueryDto) {
            return $http.post(baseWebApiUrl + 'evaluation/searchEvaluations', pdfForEvaluationsQueryDto).then(function (result) {
                return result.data;
            });
        };

        thiz.searchEvaluationForClassTotalOverviews = function (queryDto) {
            return $http.post(baseWebApiUrl + 'evaluation/searchEvaluationForClassTotalOverviews', queryDto).then(function (result) {
                return result.data;
            });
        };

        thiz.createPdfForEvaluations = function (evaluationsPagedQueryObject) {
            return $http.post(baseWebApiUrl + 'evaluation/createPdfForEvaluations', evaluationsPagedQueryObject, { responseType: 'arraybuffer' }).then(function (result) {
                return configurationService.handlePdfData(result.data).then(function (data) {
                    return data;
                });
            });
        };

        thiz.createPdfForEvaluation = function (evaluation) {
            var pdfForEvaluationsQueryObject = {};
            pdfForEvaluationsQueryObject.EvaluationIds = [evaluation.id];

            return thiz.createPdfForEvaluations(pdfForEvaluationsQueryObject);
        };

        thiz.plannedEvaluations = function () {
            return $http.get(baseWebApiUrl + "evaluation/plannedEvaluations").then(function (result) {
                console.log("Planned Evaluations");
                console.log(result.data);
                return result.data;
            });
        };

        thiz.transformEvaluationForClassOverviewsToTableParams = function (overviews) {
            if (overviews == null || overviews.length < 1) {
                messageService.handleWarning('Geen evaluaties gevonden');
                return;
            }

            var tableParams = {};
            tableParams.allEvaluations = overviews;
            tableParams.resultsForStudents = [];

            // loop over all the studens form the class
            _.each(overviews[0].createdForClass.students, function (student) {
                var resultForStudent = { 'student': student, 'totals': [] }

                //find a result for the student form the overview. Fill up non matching with alternative data.
                _.each(overviews, function (overview) {
                    var total = { 'total': '', 'generalComment': '' };
                    var evaSum = _.find(overview.evalutionSummaries, function (summary) {
                        return summary.student.id === student.id;
                    });

                    if (evaSum != null) {
                        total.total = evaSum.result != null ? $filter('number')(evaSum.result.total, 2) : '';
                        total.generalComment = evaSum.generalComment  != null ? evaSum.generalComment : '';
                    } else {
                        total.total = '';
                        total.generalComment = "Niet ingevuld";
                    }

                    resultForStudent.totals.push(total);
                });

                tableParams.resultsForStudents.push(resultForStudent);
            });

            return tableParams;
        }

        thiz.validateEvaluationTotalsForClassOverViewQueryDto = function (querDto) {
            if (angular.isUndefined(querDto.classId) || querDto.classId == null) {
                messageService.handleWarning('Je moet een klas selecteren om te kunnen zoeken.');
                return false;
            }
            if (angular.isUndefined(querDto.courseId) || querDto.courseId == null) {
                messageService.handleWarning('Je moet een vak selecteren om te kunnen zoeken.');

                return false;
            }

            return true;
        };

        thiz.unlockEditable = function(evaluationId) {
            var guidDto = { 'id': evaluationId };

            return $http.post(baseWebApiUrl + 'evaluation/unlockEvaluation', guidDto).then(function (result) {
                    return result.data;
            });
        };

        //initiations
        var init = function () {

        }

        init();

        // calculation functions
        thiz.mapSubsectionToEvaluation = function (evaluation) {
            var differentSubsections = _.groupBy(evaluation.evaluationItems, function (item) {
                return item.evaluationSubSection.description;
            });
            differentSubsections = _.sortBy(differentSubsections, function (sub) {
                return sub[0].evaluationSubSection.sequenceNumber;
            });
            evaluation.mappedSubsections = differentSubsections;

            thiz.setSubsectionScores(evaluation);
        };

        /*Maps subsections to evaluationitems*/
        thiz.mapItemsToSubSection = function (evaluations) {

            angular.forEach(evaluations, function (evaluation) {
                thiz.mapSubsectionToEvaluation(evaluation);
            });

            //_.each(evaluations, function (evaluation) {
            //        thiz.mapSubsectionToEvaluation(evaluation);
            //});

            return evaluations;
        };

        /*Use this to map the scores to the mapped subsections of a evaluation*/
        thiz.setSubsectionScores = function (evaluation) {
            //// var value = object[key] => use dictionary from c# this way
            _.each(evaluation.mappedSubsections, function (subsection) {
                if (angular.isDefined(evaluation.result) && evaluation.result !== null) {
                    subsection.totalScore = evaluation.result.totalsPercategory[subsection[0].evaluationSubSection.id];
                    console.log("subsection");
                    console.log(subsection);

                    var completlyUnscored = _.every(subsection, function (evaluationItem) {
                        return angular.isUndefined(evaluationItem.score) || evaluationItem.score == null;
                    });
                    if (completlyUnscored === true) {
                        subsection.unScored = true;
                    }
                }
            });
            // map every evaluation not just selected so it can be procesed in int()
        };

    }

    module.service('evaluationService', evaluationService);
})(angular.module('app.evaluation'));