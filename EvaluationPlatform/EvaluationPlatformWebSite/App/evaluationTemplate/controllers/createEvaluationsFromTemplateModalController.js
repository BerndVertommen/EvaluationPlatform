
(function (module) {
    'use strict';

    function createEvaluationsFromTemplateModalController($scope, $uibModalInstance, evaluationTemplate) {
        var thiz = this;

        //Variables


        //private Functions

        // public functions
        // datepicker
        $scope.open = function ($event) {
            $scope.status.opened = true;
        };

        $scope.setDate = function (year, month, day) {
            $scope.createCommand.evaluationDate = new Date(year, month, day);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        // end datepicker

        //schoolyear dropdown
        $scope.status = {
            isopen: false
        };


        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };

        $scope.selectedSchoolYear = {};
        $scope.setSchoolYear = function (schoolYear) {
            $scope.createCommand.schoolYearId = schoolYear.id;
            $scope.selectedSchoolYear = schoolYear;
        };
        //end schoolyear dropdown

        $scope.selectedRow = null;

        $scope.ok = function () {
            if (angular.isUndefined($scope.generalOptions.discription) || $scope.generalOptions.discription === null || $scope.generalOptions.discription === "") {
                return; // replace with error method
            }
            if (angular.isUndefined($scope.generalOptions.course) || $scope.generalOptions.course === null) {
                return; // replace with error method
            }
            $uibModalInstance.close($scope.evaluationTemplate);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };



        //initiations
        var init = function () {
          
            // $scope.evaluationTemplate = evaluationTemplate;
            $scope.createCommand = {
                schoolYearId: undefined,
                EvaluationTemplateId: evaluationTemplate.id,
                EvaluationDate: undefined,
                ClassId: undefined,
                CourseId: undefined
            }

        }

        init();
    }

    module.controller('createEvaluationsFromTemplateModalController', createEvaluationsFromTemplateModalController);
})(angular.module('app.evaluationTemplate'));
