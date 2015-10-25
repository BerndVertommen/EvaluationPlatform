
(function (module) {
    'use strict';

    function evaluationGoalsController($scope, $modalInstance, subSection, course) {
        var thiz = this;

        //Variables
      
      
        //private Functions
        
        // public functions
        $scope.selectedRow = null; 
      
        $scope.setSelectedGoal = function (goal, index) {
            $scope.selectedGoal = goal;
            $scope.selectedRow = index;
        };
      
        thiz.AddGoalToNewEvaluationSubSection = function () {
          
            if (angular.isUndefined(subSection.goals) || $scope.evaluationSubSection.goals.length < 1) {
                $scope.evaluationSubSection.goals = [];
            }
            $scope.evaluationSubSection.goals.push($scope.selectedGoal);
        }

        // modal functions
        $scope.ok = function () {
            if ( angular.isUndefined($scope.selectedGoal)) {
                return ;  //handle with error in future
            }

            thiz.AddGoalToNewEvaluationSubSection();

            $modalInstance.close($scope.evaluationSubSection);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

       
        //initiations
        var init = function () {
            $scope.evaluationSubSection = subSection;
            $scope.course = course;

            if (angular.isDefined(subSection.goals)) {
                $scope.course.goalsForCourse = _.reject($scope.course.goalsForCourse, function (goalFromCourse) {
                    var inGoals = _.contains(subSection.goals, function (goalfromSub) {
                        return goalFromCourse.id === goalfromSub.id;
                    });
                    return inGoals;
                });
            }
            
            $scope.selectedGoal = {};
            $scope.selectedGoal.Id="noId";


        }

        init();
    }

    module.controller('evaluationGoalsController', evaluationGoalsController);
})(angular.module('app.evaluation'));