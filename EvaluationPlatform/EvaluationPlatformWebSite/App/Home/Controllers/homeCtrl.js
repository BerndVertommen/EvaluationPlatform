(function(module) {
    "use strict";

    function homeCtrl($http, $scope) {

        var init = function() {
            $scope.message = "Welkom";
        }

        init();
    }

    module.controller('homeCtrl', homeCtrl);

})(angular.module('app.Home'));


