(function (module) {
    'use strict';

    function searchEvaluationForClassController($scope, $location, courses, classes, evaluationService, $uibModal, $compile, $timeout, $templateCache) {
        var thiz = this;
       
        //Variables
        $scope.queryObject = {};

        
        // public functions
        $scope.setClass = function(klas) {
            $scope.selectedClass = klas;
            $scope.queryObject.classId = $scope.selectedClass.id;
        };

        $scope.setCourse = function (course) {
            $scope.selectedCourse = course;
            $scope.queryObject.courseId = $scope.selectedCourse.id;
        };

        $scope.clearSearch = function () {
            $scope.queryObject.startDate = null;
            $scope.queryObject.endDate = null;
            $scope.queryObject.classId = null;
            $scope.queryObject.courseId = null;
            $scope.queryObject.description = null;
            $scope.selectedClass = null;
            $scope.selectedCourse = null;

            $scope.showpagination = false;
        };

        $scope.search = function () {
            var queryObjectIsValid = evaluationService.validateEvaluationTotalsForClassOverViewQueryDto($scope.queryObject);

            if (queryObjectIsValid === false) {
                return;
            }

            evaluationService.searchEvaluationForClassTotalOverviews($scope.queryObject).then(function (result) {
                $scope.tableParams = evaluationService.transformEvaluationForClassOverviewsToTableParams(result);
                console.log(result);
            });
        };
      
        $scope.openScoredEvaluationModal = function (evaluation) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluation/views/scoredEvaluationModal.html',
                controller: 'scoredEvaluationModalController',
                size: 'lg',
                resolve: {
                    evaluation: evaluation
                }
            });
        };

        //$scope.toPdf = function () {
        //    //$templateCache.put('tableHtml', $("#overviewTable").html());
        //    //var contents = $compile($templateCache.get('tableHtml'))($scope);
        //    //$timeout(function () {
        //    //    console.log(contents.html());
        //    //}, 300);   // wait for a short while

        //    var contents = $("#overviewTable").html();
        //    console.log(contents);
        //}

        //initiations
        var init = function () {
            $scope.courses = courses;
            $scope.classes = classes;

            $scope.clearSearch();
        }

        init();
    }

    module.controller('searchEvaluationForClassController', searchEvaluationForClassController);
})(angular.module('app.evaluation'));