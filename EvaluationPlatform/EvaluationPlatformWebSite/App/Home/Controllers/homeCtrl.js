(function (module) {
    "use strict";  
    function homeCtrl($http, $scope) {
        $scope.message = "Welkom";
    }

    module.controller('homeCtrl', homeCtrl);

}(angular.module('app.Home')))