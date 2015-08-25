(function (module) {

    function classesService($http) {
        'use strict';
        var thiz = this;

        thiz.getTestClass = function() {
            return $http.get('http://testplatformApi/api/class/test');
        }
    }

    module.service('classesService', classesService);
})(angular.module('app.classes'))