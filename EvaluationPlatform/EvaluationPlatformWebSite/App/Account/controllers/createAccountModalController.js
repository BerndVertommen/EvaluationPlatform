(function (module) {
    'use strict';

    function createAccountModalController($scope, accountService, $location, $uibModalInstance) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.ok = function () {
            // roep hier de accountservice op om een nieuwe account te maken met de data die via de view is ingevuld.
            // geef $scope.createAccountInfo mee in in de accountService methode.
            $uibModalInstance.dismiss(); // gebruik dit in the .then functie zodat de modal sluit na de servercall.
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //initiations
        var init = function () {
            $scope.createAccountInfo = {}; // gebruik dit om alle info aan te hangen in de view (dit model moet je serverside nog opbouwen)

        }

        init();
    }

    module.controller('createAccountModalController', createAccountModalController);
})(angular.module('app.account'));