(function(module) {
    "use strict";

    function homeController($http, $scope) {

        var init = function() {
            $scope.message = "Welkom";
        }

        init();
    }

    module.controller('HomeController', homeController);

})(angular.module('app.home'));


