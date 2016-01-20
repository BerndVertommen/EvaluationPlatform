(function (module) {
    'use strict';

    function calendarController($scope, $location, dashboardService) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions
        $scope.showCalendar = false;

        $scope.selectedRow = null;

        $scope.setSelectedEvaluation = function (evaluation, index) {
            $scope.selectedEvaluation = evaluation;
            $scope.selectedRow = index;
        };

        $scope.startEvaluation = function () {
            $location.path("/evaluation/" + $scope.selectedEvaluation.bundleId);
        };

        //initiations
        var init = function () {
            dashboardService.plannedEvaluations().then(function (evaluations) {
                $scope.plannedEvaluations = evaluations;
                mapEvaluationToCalenderEvent(evaluations);
            });
        }

        init();


        // calender
        $scope.calendarView = 'month';
        $scope.calendarDay = moment(); // vandaag

        var mapEvaluationToCalenderEvent = function (evaluations) {
            $scope.events = [];
            _.each(evaluations, function(eva) {
                $scope.events.push({
                    evaluation : eva,
                    title: eva.description, // The title of the event
                    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
                    startsAt: eva.evaluationDate, // A javascript date object for when the event starts
                    editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
                    deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
                    draggable: false, //Allow an event to be dragged and dropped
                    resizable: true, //Allow an event to be resizable
                    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
                  cssClass: 'fa fa-star' 
                });
            });
           
        }

        $scope.eventClicked = function (event) {
            console.log = "eventClicked";
            console.log = event;
        };

        $scope.eventEdited = function (event) {
            console.log = "eventEdited";
            console.log = event;
        };

        $scope.eventDeleted = function (event) {
            console.log = "eventDeleted";
            console.log = event;
        };

  //      $scope.events = [
  //{
  //    title: 'My event title', // The title of the event
  //    type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
  //    startsAt: new Date(2015, 11, 26, 1), // A javascript date object for when the event starts
  //    endsAt: new Date(2015, 11, 27, 15), // Optional - a javascript date object for when the event ends
  //    editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
  //    deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
  //    draggable: true, //Allow an event to be dragged and dropped
  //    resizable: true, //Allow an event to be resizable
  //    incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
  //    recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
  //    cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
  //}
  //      ];

        $scope.calendarTitle = 'test';
    }




    module.controller('calendarController', calendarController);
})(angular.module('app.dashboard'));