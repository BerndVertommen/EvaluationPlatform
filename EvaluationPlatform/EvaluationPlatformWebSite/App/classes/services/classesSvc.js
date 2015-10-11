(function (module) {

    function classesService($http) {
        'use strict';
        var thiz = this;

        thiz.getTestClass = function() {
            return $http.get('http://testplatformApi/api/class/test').then(function(result) {
                return result.data;
            });
        }
    }

    module.service('classesService', classesService);
})(angular.module('app.classes'))