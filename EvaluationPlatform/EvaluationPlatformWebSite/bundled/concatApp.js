var app = angular.module('app',
    ['ngRoute', 'toastr', 'ngAnimate', "ui.bootstrap", 'LocalStorageModule', 'angular-loading-bar', 'ngTouch'
    , 'app.home', 'app.classes', 'app.login', 'app.account', 'app.index', 'app.student', 'app.evaluationTemplate', 'app.evaluation', 'app.dashboard'
    , 'app.teacher', 'app.course', 'app.studyPlan'])








angular.module('app.account', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";

        $routeProvider
          .when('/manageAccount', {
              templateUrl: 'app/Account/views/manageAccount.html',
              controller: 'manageAccountController'
             
              
          });
       


    }]);


angular.module('app.classes', ['ngRoute'])
    .config(["$routeProvider", function($routeProvider) {
        'use strict';

        $routeProvider
            .when('/classes', {
                templateUrl: 'app/classes/views/classes.html',
                controller: 'classesController',
                resolve: {
                    /*ngInject*/
                    classes: ["classesService", function(classesService) {
                        return classesService.classesForTeacher().then(function(classes) {
                            return classes;
                        });
                    }]
                }
            });

        $routeProvider
          .when('/manageClasses', {
              templateUrl: 'app/classes/views/manageClasses.html',
              controller: 'manageClassesController'
          });
    }]);
angular.module('app.course', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
          .when('/manageCourse', {
              templateUrl: 'app/Course/views/manageCourse.html',
              controller: 'manageCourseController',
              resolve: {
                  /*ngInject*/
                  courses: ["courseService", function (courseService) {
                      return courseService.allCourses().then(function (courses) {
                          return courses;
                      });
                  }]
              }
          });

        $routeProvider
         .when('/courses', {
             templateUrl: 'app/Course/views/courses.html',
             controller: 'courseController',
             resolve: {
                 /*ngInject*/
                 courses: ["courseService", function (courseService) {
                     return courseService.getCourses().then(function (courses) {
                         return courses;
                     });
                 }]
             }
         });

        $routeProvider
            .when('/createCourse', {
                templateUrl: 'app/Course/views/createCourse.html',
                controller: 'createCourseController'
            });

    }]);

angular.module('app.dashboard', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/dashboard', {
              templateUrl: 'app/dashboard/views/dashboard.html',
              controller: 'dashboardController'
          });

    }]);

angular.module('app.evaluation', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
            .when('/evaluation/:bundleId?', {
                templateUrl: 'app/evaluation/views/evaluation.html',
                controller: 'evaluationController',
                resolve: {
                    /*ngInject*/
                    evaluations: ["evaluationService", "$route", function (evaluationService, $route) {
                        var bundleId = $route.current.params.bundleId;
                        return evaluationService.evaluationsForBundle(bundleId).then(function (evals) {
                            return evals;
                        });
                    }]
                }
            });

        $routeProvider
           .when('/evaluations', {
               templateUrl: 'app/evaluation/views/evaluations.html',
               controller: 'evaluationsController',
               resolve: {
                   /*ngInject*/
                   classes: ["classesService", function (classesService) {
                       return classesService.classesForTeacher().then(function (classes) {
                           return classes;
                       });
                   }],
                   courses: ["courseService", function (courseService) {
                       return courseService.getCourses().then(function (courses) {
                           return courses;
                       });
                   }]
               }
           });



    }]);

angular.module('app.evaluationTemplate', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";

        // define routes

        $routeProvider
          .when('/createEvaluationTemplate', {
              templateUrl: 'app/evaluationTemplate/views/createEvaluationTemplate.html',
              controller: 'createEvaluationTemplateController',
              resolve: {
                  /*ngInject*/
                  createEvaluationOptions: ["evaluationTemplateService", function (evaluationTemplateService) {
                      return evaluationTemplateService.getCreateEvaluationOptions();
                  }]
              }
          });

        $routeProvider
        .when('/evaluationTemplates', {
            templateUrl: 'app/evaluationTemplate/views/evaluationTemplates.html',
            controller: 'evaluationTemplatesController',
            resolve: {
                /*ngInject*/
                evaluationTemplates: ["evaluationTemplateService", function (evaluationTemplateService) {
                    return evaluationTemplateService.getEvaluationTemplates();
                }]
            }
        });
      
     
    }]);


angular.module('app.home', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";

        $routeProvider
            .when( '/', {
            templateUrl: 'app/home/views/home.html',
            controller: 'homeController'
            })
            .when('/home', {
                templateUrl: 'app/home/views/home.html',
                controller: 'homeController'
            })
            .otherwise({
            redirectTo: '/'
    });

    }]);

angular.module('app.index', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        //$routeProvider
        //  .when('/replace', {
        //      templateUrl: 'view Here',
        //      controller: 'controller for view here'
        //  });

    }]);

angular.module('app.login', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";

        $routeProvider
            .when('/login', {
                templateUrl: 'app/login/views/login.html',
                controller: 'loginController'
            });

    }]);

app.run(['authenticationService', function (authenticationService) {
    authenticationService.getAuthData();
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorFactory');
}]);





/// <reference path="controllers/createStudentController.js" />
angular.module('app.student', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/createStudent', {
              templateUrl: 'app/Student/views/createStudent.html',
              controller: 'createStudentController'
          });

    }]);

angular.module('app.studyPlan', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/manageStudyPlan', {
              templateUrl: 'app/StudyPlan/views/manageStudyPlan.html',
              controller: 'manageStudyPlanController'
          });

    }]);

angular.module('app.teacher', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        $routeProvider
          .when('/manageTeacher', {
              templateUrl: 'app/Teacher/views/manageTeacher.html',
              controller: 'manageTeacherController',
              resolve: {
                  teachers : ["teacherService", function(teacherService) {
                      return teacherService.teachers().then(function(result) {
                          return result;
                      });
                  }]
              }

          });

    }]);

angular.module('app.replace', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        //$routeProvider
        //  .when('/replace', {
        //      templateUrl: 'view Here',
        //      controller: 'controller for view here'
        //  });

    }]);

app.config(["toastrConfig", function (toastrConfig) {
    "use strict";

    angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 10,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',

        allowHtml: false,
        closeButton: false,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'toast-error',
            info: 'toast-info',
            success: 'toast-success',
            warning: 'toast-warning'
        },
        messageClass: 'toast-message',
        onHidden: null,
        onShown: null,
        onTap: null,
        progressBar: false,
        tapToDismiss: true,
        templates: {
            toast: 'directives/toast/toast.html',
            progressbar: 'directives/progressbar/progressbar.html'
        },
        timeOut: 4000,
        titleClass: 'toast-title',
        toastClass: 'toast'
    });

}]);

app.config(["$provide", "$httpProvider", function ($provide, $httpProvider) {
    $provide.factory('errorInterceptor', ["$q", "$injector", function ($q, $injector) {
        return {
            responseError: function (rejection) {

                //console.log(rejection.data.exceptionMessage);

                //var toastr = $injector.get('toastr');
                // toastr.error('Fout', rejection.data.exceptionMessage);

                var errorMessageService = $injector.get('messageService');
                errorMessageService.handleReject(rejection);

                return $q.reject(rejection);
            }
        };
    }]);

    $httpProvider.interceptors.push('errorInterceptor');
}]);
(function (module) {
    'use strict';

    createAccountModalController.$inject = ["$scope", "accountService", "$location", "$uibModalInstance", "messageService"];
    function createAccountModalController($scope, accountService, $location, $uibModalInstance, messageService) {
        var thiz = this;

        //Variables


        //private Functions

        // public functions
        $scope.setAccountRole = function (role) {
            $scope.createAccountInfo.roleType = role;
        };

        $scope.ok = function () {
            // roep hier de accountservice op om een nieuwe account te maken met de data die via de view is ingevuld.
            // geef $scope.createAccountInfo mee in in de accountService methode.
            //.then om te wachten totdat de server geantwoord heeft
            accountService.createAccount($scope.createAccountInfo).then(function () {
                messageService.handleSucces("Account aangemaakt!");
                
                $uibModalInstance.dismiss(); // gebruik dit in the .then functie zodat de modal sluit na de servercall.
            });
            

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //initiations
        var init = function () {
            $scope.createAccountInfo = {}; // gebruik dit om alle info aan te hangen in de view (dit model moet je serverside nog opbouwen)
            $scope.createAccountInfo.roleType = "UserRole";
            $scope.createAccountInfo.isTeacher = true;
        }

        init();
    }

    module.controller('createAccountModalController', createAccountModalController);
})(angular.module('app.account'));
(function (module) {
    'use strict';

    manageAccountController.$inject = ["$scope", "$location", "accountService", "$uibModal"];
    function manageAccountController($scope, $location, accountService, $uibModal) {
        var thiz = this;

        // ctrl + h replace alle controllernamen door huidige controller
        // vervang app.replace door de juiste module in dit geval app.account staat in account-module.js

        //controller in index.html slepen/toevoegen onderaan bij scripts controllers

        //view aanmaken kopieer uit copy folder
        
        // in module account-module route aanmaken ($routeProvider)

        // Variables

        //private Functions
        
        // public functions

        // selecteren van rij in accountstabel
        $scope.selectedRow = null;
        $scope.setSelectedAccount = function (account, index) {
            $scope.setSelectedAccount = account;
            $scope.selectedRow = index;
        };

        $scope.createAccountInfo = function() {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/Account/views/createAccountModal.html',
                controller: 'createAccountModalController',
                size: 'lg',
                resolve: {
                   // niets door te geven.
                }
            });
        }

        //initiations
        var init = function () {
            accountService.getAccounts().then(function (accounts) {
                $scope.accountList = accounts;
            });

           

        }

        init();
    }

    module.controller('manageAccountController', manageAccountController);
})(angular.module('app.account'));
(function(module) {

    accountService.$inject = ["$http", "configurationService"];
    function accountService($http, configurationService) {
        var thiz = this;
        var basePath = configurationService.baseApiPath;

        //thiz.changePassword = function (changePasswordBindingModel) {
        //    return $http.post(basePath + 'accounts/changepassword', changePasswordBindingModel).then(function (data) {
        //        return data;
        //    });
        //}

        //thiz.createTestAccount = function () {
        //    var createUserModel = {
        //        username: "Tester",
        //        email: "berndvertommen@msn.com",
        //        firstName: "Test",
        //        lastname: "er",
        //        password: "@Dmin123",
        //        confirmPassword :"@Dmin123"
        //}

        //    return $http.post(configurationService.baseApiPath + 'accounts/createTester', createUserModel).then(function (data) {
        //        return data;
        //    });
        //}

        thiz.getAccounts = function() {
            return $http.get(basePath + 'accounts/getAccounts').then(function(result) {
                return result.data;
            });
        }

        //nieuwe methode om account te creeeren aangemaakt
        thiz.createAccount = function(createAccountInfo) {
            return $http.post(basePath + 'accounts/createAccount', createAccountInfo).then(function(result) {
                return result.data;
            });
        }

        //creeer hier de methode die naar bij de accountcontroller createAccount gebruikt.
    }

    module.service('accountService', accountService);
})(angular.module('app.account'));
(function (module) {
    'use strict';

    classesController.$inject = ["$scope", "$location", "classes"];
    function classesController($scope, $location, classes) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {
            $scope.classes = classes;
            console.log(classes);

        }

        init();
    }

    module.controller('classesController', classesController);
})(angular.module('app.classes'));
(function (module) {
    'use strict';

    manageClassesController.$inject = ["$scope", "$location"];
    function manageClassesController($scope, $location) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('manageClassesController', manageClassesController);
})(angular.module('app.classes'));
(function (module) {
    'use strict';

    selectClassModalController.$inject = ["$scope", "$location", "$uibModalInstance", "classes"];
    function selectClassModalController($scope, $location, $uibModalInstance, classes) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions
        $scope.selectedRow = null;
        $scope.setSelectedClass = function (klas, index) {
            $scope.selectedClass = klas;
            $scope.selectedRow = index;
        };

        // modal functions
        $scope.ok = function () {
            if (angular.isUndefined($scope.selectedClass)) {
                return;  //handle with error in future
            }

            $uibModalInstance.close($scope.selectedClass);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //initiations
        var init = function () {
            $scope.classes = classes;
            console.log(classes);
        }

        init();
    }

    module.controller('selectClassModalController', selectClassModalController);
})(angular.module('app.classes'));
(function(module) {
    testClassController.$inject = ["$scope", "classesService"];
    function testClassController($scope, classesService) {
        
        //Variables

        //private Functions

        // public functions

        //initiations

        var init = function() {
             classesService.getTestClass().then(function (classResult) {
                 $scope.testClass = classResult;
            });
        }

        init();
    }

    module.controller('TestClassController', testClassController);
})(angular.module('app.classes'));
(function(module) {
    'use strict';

    classesService.$inject = ["$http", "configurationService"];
    function classesService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;

        //Variables

        //private Functions

        // public functions

        thiz.classesForTeacher = function() {
            return $http.get(baseWebApiUrl + 'class/classesForTeacher').then(function(result) {
                return result.data;
            });
        }

        thiz.classesForCourse = function(courseId) {
            return $http.post(baseWebApiUrl + 'class/classesForCourse', { 'id': courseId }).then(function(result) {
                return result.data;
            });
        }

        thiz.availableClassesForTeacher = function(teacherId) {
            return $http.post(baseWebApiUrl + 'class/availableClassesForTeacher', { 'id': teacherId }).then(function(result) {
                return result.data;
            });
        }

        //initiations

    };

    module.service('classesService', classesService);
})(angular.module('app.classes'));
(function(module) {
    'use strict';

    configurationService.$inject = ["$http", "toastrConfig"];
    function configurationService($http, toastrConfig) {
        var thiz = this;

        var apiUrl = 'http://testplatformApi/';

        thiz.baseApiPath = apiUrl + 'api/';

        thiz.tokenPath = apiUrl + 'oauth/token';

        thiz.getSchoolYears = function() {
            return $http.get(thiz.baseApiPath + "/generalInfo/getschoolyears").then(function(result) {
                return result.data;
            });
        };

    }


    module.service('configurationService', configurationService);
})(angular.module('app'));
(function (module) {
    'use strict';

    courseController.$inject = ["$scope", "$location", "courses"];
    function courseController($scope, $location, courses) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {
            $scope.courses = courses;
            console.log($scope.courses);

        }

        init();
    }

    module.controller('courseController', courseController);
})(angular.module('app.course'));
(function (module) {
    'use strict';

    createCourseController.$inject = ["$scope", "$location", "courseService", "$uibModal", "studyPlanService", "messageService"];
    function createCourseController($scope, $location, courseService, $uibModal, studyPlanService, messageService) {
        var thiz = this;

        //Variables

        //private Functions

        //public functions
        $scope.cancel = function () {

            $location.path("/manageCourse");
            //window.location.href = "#/manageCourse"; //bij location.path geen # bijdoen
        }

        $scope.ok = function() {
            courseService.createCourse($scope.createCourseInfo).then(function() {
                messageService.handleSucces("Cursus aangemaakt!");
                $location.path("/manageCourse");

            });
            console.log($scope.createCourseInfo);

        }

        $scope.openStudyplanModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/StudyPlan/views/selectStudyPlanModal.html',
                controller: 'selectStudyPlanModalController',
                size: 'lg',
                resolve: {
                    studyplans: studyPlanService.getStudyPlans().then(function (result) {
                        return result;
                    })
                }
            });
            modalInstance.result.then(function (selectedStudyPlan) {
                $scope.createCourseInfo.studyPlan = selectedStudyPlan;
            }, function () {
                // geen Studyplan geselecteerd error? hier kom je in als je niks selecteerd
            }
            );
        }

        //initiations
        var init = function () {

            $scope.createCourseInfo = {};
           
        }

        init();
    }

    module.controller('createCourseController', createCourseController);
})(angular.module('app.course'));
(function (module) {
    'use strict';

    manageCourseController.$inject = ["$scope", "$location", "courses"];
    function manageCourseController($scope, $location, courses) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedCourse = function (course, index) {
            $scope.selectedCourse = course;
            $scope.selectedRow = index;
        };

        //initiations
        var init = function () {

            $scope.courses = courses;
            console.log($scope.courses);

        }

        init();
    }

    module.controller('manageCourseController', manageCourseController);
})(angular.module('app.course'));
(function(module) {

    courseService.$inject = ["$http", "configurationService"];
    function courseService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        thiz.getCourses = function() {
            return $http.get(baseWebApiUrl + "courses/coursesForTeacher").then(function(result) {
                return result.data;
            });
        };

        thiz.allCourses = function() {
            return $http.get(baseWebApiUrl + "courses/allCourses").then(function(result) {
                return result.data;
            });
        };

        thiz.createCourse = function (createCourseInfo) {
            return $http.post(baseWebApiUrl + "courses/createCourse", createCourseInfo).then(function(result) {
                return result.data;
            });
        }

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('courseService', courseService);
})(angular.module('app.course'));
(function (module) {
    'use strict';

    dashboardController.$inject = ["$scope", "$location"];
    function dashboardController($scope, $location) {
        var thiz = this;
       
        //Variables
        $scope.calenderPath = 'app/dashboard/views/partials/calendarPartial.html';
        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('dashboardController', dashboardController);
})(angular.module('app.dashboard'));
(function(module) {

    dashboardService.$inject = ["$http", "configurationService"];
    function dashboardService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions
        thiz.plannedEvaluations = function() {
            return $http.get(baseWebApiUrl + "evaluation/plannedEvaluations").then(function(result) {
                return result.data;
            });
        };

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('dashboardService', dashboardService);
})(angular.module('app.dashboard'));
(function (module) {
    'use strict';

    evaluationController.$inject = ["$scope", "$location", "evaluationService", "evaluations"];
    function evaluationController($scope, $location, evaluationService, evaluations) {
        var thiz = this;


        //Variables

        //private Functions

        // public functions
        $scope.selectEvaluation = function (evaluation) {
            $scope.selectedEvaluation = evaluation;
            thiz.setSubsectionScores(); // find other solution to map scores not on evry select.
            console.log($scope.selectedEvaluation);
        }

        $scope.setScore = function (evaluationItem, score) {
            evaluationItem.score = score;
        };

        $scope.updateEvaluation = function () {
            evaluationService.updateEvaluation($scope.selectedEvaluation).then(function (evaluation) {
                var indexEva = _.findIndex($scope.evaluations, function (eva) {
                    return eva.id === evaluation.id;
                });

                $scope.evaluations[indexEva] = evaluation;
                //var hashkey = $scope.selectedEvaluation.$$hashKey;
                //$scope.selectedEvaluation = evaluation;
                //$scope.selectedEvaluation.$$hashKey = hashkey;
                thiz.updateAfterChange();

            });
        };

        $scope.updateEvaluations = function () {
            evaluationService.updateEvaluations($scope.evaluations).then(function(evaluations) {
                $scope.evaluations = evaluations;

                thiz.updateAfterChange();
            });
        };

        $scope.setNotScoredReason = function(evaluationitem, number) {
            evaluationitem.notScoredReason = number;
            evaluationitem.score = null;
        };

        thiz.updateAfterChange = function() {
            thiz.mapItemsToSubSection();
            thiz.setSubsectionScores();
        };

        thiz.mapItemsToSubSection = function () {

            _.each($scope.evaluations, function (evaluation) {
                var differentSubsections = _.groupBy(evaluation.evaluationItems, function (item) {
                    return item.evaluationSubSection.description;
                });
                differentSubsections = _.sortBy(differentSubsections, function(sub) {
                    return sub[0].evaluationSubSection.weight;
                });
                evaluation.mappedSubsections = differentSubsections;
            });
        };


        thiz.setSubsectionScores = function () {
            //// var value = object[key] => use dictionary from c# this way
            _.each($scope.selectedEvaluation.mappedSubsections, function (subsection) {
                if (angular.isDefined($scope.selectedEvaluation.result) && $scope.selectedEvaluation.result !== null) {
                    subsection.totalScore = $scope.selectedEvaluation.result.totalsPercategory[subsection[0].evaluationSubSection.id];
                }
            });
            // map every evaluation not just selected so it can be procesed in int()
        };

        //initiations
        var init = function () {
            $scope.evaluations = evaluations;
            console.log(evaluations[0]);
            $scope.classTitle = evaluations[0].createdForClass.description;
            $scope.selectEvaluation(evaluations[0]);
            thiz.mapItemsToSubSection();
            thiz.setSubsectionScores();
            console.log($scope.evaluations);

        }

        init();
    }

    module.controller('evaluationController', evaluationController);
})(angular.module('app.evaluation'));
(function (module) {
    'use strict';

    evaluationsController.$inject = ["$scope", "$location", "courses", "classes", "evaluationService", "$uibModal"];
    function evaluationsController($scope, $location, courses, classes, evaluationService, $uibModal) {
        var thiz = this;
       
        //Variables
        $scope.evaluationsPagedQueryObject = {};
        $scope.evaluations = {};

        //private Functions
        
        // public functions
        $scope.setClass = function(klas) {
            $scope.selectedClass = klas;
            $scope.evaluationsPagedQueryObject.classId = $scope.selectedClass.id;
        };

        $scope.setCourse = function (course) {
            $scope.selectedCourse = course;
            $scope.evaluationsPagedQueryObject.courseId = $scope.selectedCourse.id;
        };

        $scope.clearSearch = function () {
            $scope.evaluationsPagedQueryObject.page = 1;
            $scope.evaluationsPagedQueryObject.startDate = null;
            $scope.evaluationsPagedQueryObject.endDate = null;
            $scope.evaluationsPagedQueryObject.finished = null;
            $scope.evaluationsPagedQueryObject.classId = null;
            $scope.evaluationsPagedQueryObject.courseId = null;
            $scope.evaluationsPagedQueryObject.studentFirstname = null;
            $scope.evaluationsPagedQueryObject.studentLastname = null;
            $scope.selectedClass = null;
            $scope.selectedCourse = null;

            $scope.showpagination = false;
        };

        $scope.search = function() {
            evaluationService.searchEvaluations($scope.evaluationsPagedQueryObject).then(function (evaluationsPagedQueryResult) {

                $scope.evaluations = evaluationsPagedQueryResult.evaluations;
                $scope.totalItems = evaluationsPagedQueryResult.totalItems;
                $scope.showpagination = true;
                console.log($scope.evaluations);

            });

        };

        $scope.evaluationsToPdf = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluation/views/evaluationsToPdfModal.html',
                controller: 'evaluationsToPdfModalController',
                size: 'lg',
                resolve: {
                   evaluations: function () {
                       return $scope.evaluations; // maybe do a search again with more items paged?
                   }
                }
            });
            modalInstance.result.then(function (selectedEvaluationIds) {
                var pdfForEvaluationsQueryObject = {};
                pdfForEvaluationsQueryObject.EvaluationIds = selectedEvaluationIds;

                evaluationService.createPdfForEvaluations(pdfForEvaluationsQueryObject).then(function (result) {

                   // window.open("data:application/pdf;base64, " + result.data);
                    var file = new Blob([result.data], { type: 'application/pdf' });
                    if (window.navigator.msSaveOrOpenBlob) {
                        navigator.msSaveBlob(file, 'fileName.pdf');
                    } else {
                        saveAs(file, 'filename.pdf');
                    };
                });

            }, function () {
                // Console.log('Modal general options dismissed at: ' + new Date());
            });
        };

        //initiations
        var init = function () {
            $scope.courses = courses;
            $scope.classes = classes;

            $scope.clearSearch();
        }

        init();
    }

    module.controller('evaluationsController', evaluationsController);
})(angular.module('app.evaluation'));
(function (module) {
    'use strict';

    evaluationsToPdfModalController.$inject = ["$scope", "$location", "evaluations", "$uibModalInstance"];
    function evaluationsToPdfModalController($scope, $location, evaluations, $uibModalInstance) {
        var thiz = this;
       
        //Variables

        //private Functions
        var getSelectedIds = function() {
            return _.map($scope.evaluations, function(eva) {
                if (eva.selected === true) {
                    return eva.id;
                }
            });
        };
        
        // public functions

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.evaluations, function (item) {
                item.selected = $scope.selectedAll;
            });

        };

        $scope.ok = function () {

            $uibModalInstance.close(getSelectedIds());
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        //initiations
        var init = function () {
            $scope.evaluations = evaluations;

        }

        init();
    }

    module.controller('evaluationsToPdfModalController', evaluationsToPdfModalController);
})(angular.module('app.evaluation'));
(function(module) {

    evaluationService.$inject = ["$http", "configurationService"];
    function evaluationService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        thiz.evaluationsForBundle = function(bundleId) {
            return $http.post(baseWebApiUrl + 'evaluation/evaluationsForBundle', { 'id': bundleId }).then(function(result) {
                return result.data;
            });
        };


        thiz.updateEvaluation = function(evaluation) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluation', evaluation).then(function(result) {
                return result.data;
            });
        };


        thiz.updateEvaluations = function(evaluations) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluations', evaluations).then(function(result) {
                return result.data;
            });
        };

        thiz.searchEvaluations = function(pdfForEvaluationsQueryObject) {
            return $http.post(baseWebApiUrl + 'evaluation/searchEvaluations', pdfForEvaluationsQueryObject).then(function(result) {
                return result.data;
            });
        };

        thiz.createPdfForEvaluations = function(evaluationsPagedQueryObject) {

            return $http.post(baseWebApiUrl + 'evaluation/createPdfForEvaluations', evaluationsPagedQueryObject, { responseType: 'arraybuffer' }).then(function(result) {
                return result;
            });
        };


        //initiations
        var init = function() {

        }

        init();

    }

    module.service('evaluationService', evaluationService);
})(angular.module('app.evaluation'));

(function (module) {
    'use strict';

    createEvaluationsFromTemplateModalController.$inject = ["$scope", "$uibModalInstance", "evaluationTemplateService", "evaluationTemplate", "classesForCourse"];
    function createEvaluationsFromTemplateModalController($scope, $uibModalInstance,evaluationTemplateService, evaluationTemplate, classesForCourse) {
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

        $scope.selectedClass = {};
        $scope.setClass = function (classForCourse) {
            $scope.createCommand.classId = classForCourse.id;
            $scope.selectedClass = classForCourse;
        };
        //end schoolyear dropdown

      $scope.ok = function () {
          //make call here
          evaluationTemplateService.createEvaluationFromTemplate($scope.createCommand).then(function() {
              $uibModalInstance.dismiss('ok');
          });

      };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
        //initiations
        var init = function () {
            $scope.classesForCourse = classesForCourse;
          
            // $scope.evaluationTemplate = evaluationTemplate;
            $scope.createCommand = {
                EvaluationTemplateId: evaluationTemplate.id,
                EvaluationDate: undefined,
                classId: undefined
               }

        }

        init();
    }

    module.controller('createEvaluationsFromTemplateModalController', createEvaluationsFromTemplateModalController);
})(angular.module('app.evaluationTemplate'));

(function (module) {
    'use strict';

    createEvaluationTemplateController.$inject = ["$scope", "$location", "evaluationTemplateService", "createEvaluationOptions", "$uibModal"];
    function createEvaluationTemplateController($scope, $location, evaluationTemplateService, createEvaluationOptions, $uibModal) {
        var thiz = this;

        //Variables
        $scope.evaluationTemplate = {};
        $scope.evaluationTemplate.evaluationSubSections = [];
        $scope.tabs = 1;

        //private Functions


        // public functions
        $scope.saveTemplate = function() {
            // TODO develop validation and adjust 100 perscent code.
            evaluationTemplateService.createTemplate($scope.evaluationTemplate).then(function(result) {
                $location.path('/evaluationTemplates');
            });
        };

        $scope.openGeneralOptions = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluationTemplate/views/generalEvaluationTemplateOptionsModal.html',
                controller: 'generalEvaluationTemplateOptionsModalController',
                size: 'lg',
                resolve: {
                    createEvaluationOptions: function () {
                        return $scope.createEvaluationOptions;
                    },
                    generalOptions: function () {
                        return { 'description': "", 'course': null };
                    }
                }
            });
            modalInstance.result.then(function (generalOptions) {
                $scope.evaluationTemplate.description = generalOptions.description;
                $scope.evaluationTemplate.course = generalOptions.course;

                thiz.calculateProgress();
            }, function () {
                // Console.log('Modal general options dismissed at: ' + new Date());
            });
        };

        $scope.openSubSections = function (subSection) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluationTemplate/views/evaluationTemplateSubSectionModal.html',
                controller: 'evaluationTemplateSubSectionModalController',
                size: 'lg',
                resolve: {
                    course: function () {
                        return $scope.evaluationTemplate.course;
                    },
                    evaluationSubSections: function () {
                        return $scope.evaluationTemplate.evaluationSubSections;
                    },
                    subSection: function () {
                        return subSection;
                    },
                    currentTotalWeight: function() {
                        return thiz.getTotalSubSectionPercentage();
                    }
                }
            });
            modalInstance.result.then(function (evaluationSubSections) {
                $scope.evaluationTemplate.evaluationSubSections = evaluationSubSections;

                thiz.calculateProgress();
            }, function () {
                // Console.log('Modal general options dismissed at: ' + new Date());
            });
        };

        $scope.deleteSubSection = function (subSection) {
            var index = $scope.evaluationTemplate.evaluationSubSections.indexOf(subSection);
            $scope.evaluationTemplate.evaluationSubSections.splice(index, 1);

            thiz.calculateProgress();
        };

        $scope.openGoals = function (subSection) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluationTemplate/views/evaluationTemplateGoalsModal.html',
                controller: 'evaluationTemplateGoalsModalController',
                size: 'lg',
                resolve: {
                    course: function () {
                        return $scope.evaluationTemplate.course;
                    },
                    subSection: function () {
                        return subSection;
                    },
                    availableGoals: function () {
                        var chosenGoals = [];
                        angular.forEach($scope.evaluationTemplate.evaluationSubSections, function (subSection) {
                            angular.forEach(subSection.goals, function(goal) {
                                chosenGoals.push(goal);
                            });

                        });
                        var avialableGoals;
                        if (chosenGoals.length >0) {
                            avialableGoals = _.reject($scope.evaluationTemplate.course.goalsForCourse, function (goalFromCourse) {
                                var inGoals = _.any(chosenGoals, function (goalfromSub) {
                                    return goalFromCourse.id === goalfromSub.id;
                                });
                                return inGoals;
                            });
                        } else {
                            avialableGoals= $scope.evaluationTemplate.course.goalsForCourse;
                        }
                        return avialableGoals;
                    }
                }
            });
            modalInstance.result.then(function (evaluationSubSection) {
                console.log("Doel toegevoegd");

                thiz.calculateProgress();
            }, function () {
                // Console.log('Modal general options dismissed at: ' + new Date());
            });
        };

        $scope.deleteGoal = function(subsection, goal) {
            var index = subsection.goals.indexOf(goal);
            subsection.goals.splice(index, 1);
        };

        thiz.getTotalSubSectionPercentage = function () {
            var totalPercentage = 0;

            angular.forEach($scope.evaluationTemplate.evaluationSubSections, function (subSection) {
                totalPercentage += parseInt(subSection.weight,10);
            });

            return totalPercentage;
        };

        thiz.calcDescriptionPoints = function () {
            if (angular.isDefined($scope.evaluationTemplate.description) && $scope.evaluationTemplate.description !== null && $scope.evaluationTemplate.description !== "") {
                return 25;
            }

            return 0;
        }
        thiz.calcCoursePoints = function () {
            if (angular.isDefined($scope.evaluationTemplate.course) && $scope.evaluationTemplate.course !== null) {
                return 25;
            }

            return 0;
        }
        thiz.calcSubTotalPoints = function () {
            if (angular.isDefined($scope.evaluationTemplate.evaluationSubSections)) {
                var totalPercentage = thiz.getTotalSubSectionPercentage();

                return totalPercentage === 100 ? 25 : 0;
            }

            return 0;
        }
        thiz.calcGoalPoints = function () {
            if (angular.isDefined($scope.evaluationTemplate.evaluationSubSections)) {
                var oneGoalSet = _.any($scope.evaluationTemplate.evaluationSubSections, function (subSection) {
                    return angular.isDefined(subSection.goals) && subSection.goals.length > 0;
                });

                return oneGoalSet ? 25 : 0;
            }

            return 0;
        };

        thiz.calculateProgress = function () {
            $scope.totalProgress = 0;
            $scope.totalProgress += thiz.calcDescriptionPoints();
            $scope.totalProgress += thiz.calcCoursePoints();
            $scope.totalProgress += thiz.calcSubTotalPoints();
            $scope.totalProgress += thiz.calcGoalPoints();

        };
        //initiations
        var init = function () {
            $scope.createEvaluationOptions = createEvaluationOptions;
            $scope.totalProgress = 0;

            $scope.openGeneralOptions();
        }

        init();
    }

    module.controller('createEvaluationTemplateController', createEvaluationTemplateController);
})(angular.module('app.evaluationTemplate'));

(function (module) {
    'use strict';

    evaluationTemplatesController.$inject = ["$scope", "$location", "evaluationTemplates", "$uibModal", "classesService", "evaluationTemplateService"];
    function evaluationTemplatesController($scope, $location, evaluationTemplates, $uibModal, classesService, evaluationTemplateService) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedTemplate = function (template, index) {
            $scope.selectedTemplate = template;
            $scope.selectedRow = index;
        };

        $scope.createEvaluations = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluationTemplate/views/createEvaluationsFromTemplateModal.html',
                controller: 'createEvaluationsFromTemplateModalController',
                size: 'lg',
                resolve: {
                    evaluationTemplate: function () {
                        return $scope.selectedTemplate;
                    },
                    classesForCourse: function () {
                        return classesService.classesForCourse($scope.selectedTemplate.course.id).then(function (classes) {
                            return classes;
                        });
                    }
                }
            });
        }

        $scope.hideSelectedTemplates = function () {
            console.log('test');

            var templatesToHide = [];
            _.each($scope.evaluationTemplates, function (template) {
                if (template.checkHidden === true) {
                    templatesToHide.push(template);
                }
            });

            if (templatesToHide.length > 0) {

                evaluationTemplateService.hideSelectedTemplates(templatesToHide).then(function () {
                    _.each(templatesToHide, function (template) {
                        template.hide = true;
                    });
                });
            }
        }

        //initiations
        var init = function () {
            $scope.evaluationTemplates = evaluationTemplates;
        }

        init();
    }

    module.controller('evaluationTemplatesController', evaluationTemplatesController);
})(angular.module('app.evaluationTemplate'));


(function (module) {
    'use strict';

    evaluationTemplateGoalsModalController.$inject = ["$scope", "$uibModalInstance", "subSection", "course", "availableGoals"];
    function evaluationTemplateGoalsModalController($scope, $uibModalInstance, subSection, course, availableGoals) {
        var thiz = this;

        //Variables
        $scope.goalsFilter = {};

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

            $uibModalInstance.close($scope.evaluationSubSection);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


       
        //initiations
        var init = function () {
            $scope.evaluationSubSection = subSection;
            $scope.course = course;
            $scope.availableGoals = availableGoals;
            
        }

        init();
    }

    module.controller('evaluationTemplateGoalsModalController', evaluationTemplateGoalsModalController);
})(angular.module('app.evaluationTemplate'));


(function (module) {
    'use strict';

    evaluationTemplateSubSectionModalController.$inject = ["$scope", "$uibModalInstance", "evaluationSubSections", "currentTotalWeight", "course", "subSection"];
    function evaluationTemplateSubSectionModalController($scope, $uibModalInstance, evaluationSubSections, currentTotalWeight, course, subSection) {
        var thiz = this;

        //Variables
      
      
        //private Functions

        // public functions
       
        thiz.addnewEvaluationSubSection = function () {
            $scope.evaluationSubSections.push(angular.copy($scope.newEvaluationSubSection));
        }
        
        // modal functions
        $scope.ok = function () {
            if (angular.isUndefined($scope.newEvaluationSubSection.weight) || $scope.newEvaluationSubSection.weight === null) {
                return; // error message here : no weigth entered
            }

            if (angular.isUndefined($scope.isEditing) || $scope.isEditing === false) {
                thiz.addnewEvaluationSubSection();
            }
           
            $uibModalInstance.close($scope.evaluationSubSections);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

       
        //initiations
        var init = function () {
            $scope.evaluationSubSections = evaluationSubSections;
            $scope.currentTotalWeight = currentTotalWeight;
            $scope.course = course;
            if (angular.isDefined(subSection) && subSection !==null) {
                $scope.newEvaluationSubSection = subSection;
                $scope.isEditing = true;
            }

        }

        init();
    }

    module.controller('evaluationTemplateSubSectionModalController', evaluationTemplateSubSectionModalController);
})(angular.module('app.evaluationTemplate'));


(function (module) {
    'use strict';

    generalEvaluationTemplateOptionsModalController.$inject = ["$scope", "$uibModalInstance", "generalOptions", "createEvaluationOptions"];
    function generalEvaluationTemplateOptionsModalController($scope, $uibModalInstance, generalOptions, createEvaluationOptions) {
        var thiz = this;

        //Variables


        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.ok = function () {
            if (angular.isUndefined($scope.generalOptions.description) || $scope.generalOptions.description === null || $scope.generalOptions.description === "") {
                return; // replace with error method
            }
            if (angular.isUndefined($scope.generalOptions.course) || $scope.generalOptions.course === null) {
                return; // replace with error method
            }
            $uibModalInstance.close($scope.generalOptions);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.selectCourse = function (course, index) {
            $scope.generalOptions.course = course;
            $scope.selectedRow = index;

        };

        //initiations
        var init = function () {
            $scope.generalOptions = generalOptions;
            $scope.createEvaluationOptions = createEvaluationOptions;

        }

        init();
    }

    module.controller('generalEvaluationTemplateOptionsModalController', generalEvaluationTemplateOptionsModalController);
})(angular.module('app.evaluationTemplate'));

(function(module) {

    evaluationTemplateService.$inject = ["$http", "configurationService"];
    function evaluationTemplateService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions
        thiz.getCreateEvaluationOptions = function() {
            return $http.get(baseWebApiUrl + 'evaluationTemplate/getCreateEvaluationOptions').then(function(result) {
                return result.data;
            });
        };

        thiz.createTemplate = function(evaluationTemplate) {
            return $http.post(baseWebApiUrl + 'evaluationTemplate/createTemplate', evaluationTemplate).then(function(result) {
                return result.data;
            });
        };

        thiz.getEvaluationTemplates = function() {
            return $http.get(baseWebApiUrl + 'evaluationTemplate/getEvaluationTemplates').then(function(result) {
                return result.data;
            });
        };

        thiz.createEvaluationFromTemplate = function(command) {
            return $http.post(baseWebApiUrl + 'evaluationTemplate/createEvaluationFromTemplate', command).then(function(result) {
                return result.data;
            });
        };

        thiz.hideSelectedTemplates = function(templatesIds) {
            return $http.post(baseWebApiUrl + 'evaluationTemplate/hideTemplates', templatesIds).then(function (result) {
                return result.data;
            });
        };

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('evaluationTemplateService', evaluationTemplateService);
})(angular.module('app.evaluationTemplate'));
(function(module) {
    "use strict";

    homeController.$inject = ["$http", "$scope"];
    function homeController($http, $scope) {

        var init = function() {
            $scope.message = "Welkom";
        }

        init();
    }

    module.controller('homeController', homeController);

})(angular.module('app.home'));



(function (model) {
    'use strict';

    indexController.$inject = ["$scope", "$location", "authenticationService", "$rootScope"];
    function indexController($scope, $location, authenticationService, $rootScope) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
       
        $scope.logOut = function() {
            authenticationService.logOut();
        };

        //initiations
        var init = function () {
           
            var userName = authenticationService.userName;
            if (angular.isDefined(userName) && userName !== "") {
                $scope.userName = userName;
            }

        };

        $rootScope.$on('userLoggedIn',function (event,data) {
            $scope.userName = data.userName;
        });
        
        $rootScope.$on('userLoggedOut', function (event, data) {
            $scope.userName = undefined;
        });

        init();
    }

    model.controller('indexController', indexController);
})(angular.module('app.index'));
(function(module) {

    indexService.$inject = ["$http", "configurationService"];
    function indexService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('serviceName', indexService);
})(angular.module('app.index'));
(function (model) {
    'use strict';

    loginController.$inject = ["$scope", "$location", "authenticationService", "toastr"];
    function loginController($scope, $location, authenticationService,toastr) {
        var init = function () {
            $scope.errorMessage = undefined;
            $scope.userName = undefined;
            $scope.password = undefined;
            $scope.testTitle = "TestTitle";

            toastr.error("Vul alle velden in aub.");
        }

        init();

        $scope.login = function () {
            $scope.errorMessage = undefined;
            if (angular.isUndefined($scope.userName) || angular.isUndefined($scope.password)) {
              
                return;
            }

            var loginData = {
                userName: $scope.userName,
                password: $scope.password
            }

            authenticationService.login(loginData).then(function (response) {
                $location.path("/home");
            });
        }
    }

    model.controller('loginController', loginController);
})(angular.module('app.login'));

'use strict';
app.factory('authInterceptorFactory', ['$q', '$location',
'localStorageService', function ($q, $location, localStorageService) {

    var authInterceptorFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorFactory.request = _request;
    authInterceptorFactory.responseError = _responseError;

    return authInterceptorFactory;
}]);

(function(module) {
    'use strict';

    authenticationService.$inject = ["$http", "localStorageService", "configurationService", "$q", "$rootScope"];
    function authenticationService($http, localStorageService, configurationService, $q, $rootScope) {
        var thiz = this;


        thiz.logOut = function() {

            localStorageService.remove('authorizationData');

            thiz.isAuth = false;
            thiz.userName = "";

            $rootScope.$broadcast('userLoggedOut', {

            });
        };

        thiz.login = function(loginData) {

            var deferred = $q.defer();

            var data = "grant_type=password&username=" +
                loginData.userName + "&password=" + loginData.password;

            $http.post(configurationService.tokenPath, data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function(response) {

                localStorageService.set('authorizationData', { token: response.data.access_token, userName: loginData.userName, expires: response.data.expires_in });

                thiz.userName = loginData.userName;
                thiz.isAuth = true;

                $rootScope.$broadcast('userLoggedIn', {
                    userName: thiz.userName
                });

                deferred.resolve(response);

            }), function(error) {
                this.logOut();
                deferred.reject(error);
            };

            return deferred.promise;
        };

        thiz.getAuthData = function() {

            var authData = localStorageService.get('authorizationData');
            if (authData) {

                thiz.isAuth = true;
                thiz.userName = authData.userName;
            }
        }
    }

    module.service('authenticationService', authenticationService);
})(angular.module('app.login'));
(function (module) {
    'use strict';

    messageService.$inject = ["toastr"];
    function messageService(toastr) {
        var thiz = this;

        thiz.handleReject = handleReject;
        thiz.handleSucces = handleSucces;
        thiz.handleWarning = handleWarning;
        thiz.handleError = handleError;

        function handleReject(rejection) {

            if (rejection.status === 500) {
                toastr.error(rejection.data.exceptionMessage, 'Fout');
            }
        }
        
        function handleSucces(text, title) {
            toastr.success(text, title);
        }

        function handleWarning(text, title) {
            toastr.warning(text, title);
        }

        function handleError(text, title) {
            toastr.error(text, title);
        }
    }

    module.service('messageService', messageService);
})(angular.module('app')); //test
(function (module) {
    'use strict';

    createStudentController.$inject = ["$scope", "$location"];
    function createStudentController($scope, $location) {
        var thiz = this;
       
        //Variables
        $scope.test = "Hello world";

        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('createStudentController', createStudentController);
})(angular.module('app.student'));
(function(module) {

    studentService.$inject = ["$http", "configurationService"];
    function studentService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('studentService', studentService);
})(angular.module('app.student'));
(function (module) {
    'use strict';

    manageStudyPlanController.$inject = ["$scope", "$location"];
    function manageStudyPlanController($scope, $location) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('manageStudyPlanController', manageStudyPlanController);
})(angular.module('app.studyPlan'));
(function (module) {
    'use strict';

    selectStudyPlanModalController.$inject = ["$scope", "$location", "$uibModalInstance", "studyplans"];
    function selectStudyPlanModalController($scope, $location, $uibModalInstance, studyplans) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedStudyplan = function (studyplan, index) {
            $scope.selectedStudyplan = studyplan;
            $scope.selectedRow = index;
        };

        $scope.ok = function () {
            // nog checken op geen resultaat geselecteerd
            $uibModalInstance.close($scope.selectedStudyplan);
           
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        }

        //initiations
        var init = function () {
            $scope.studyplans = studyplans;
            console.log(studyplans);

        }

        init();
    }

    module.controller('selectStudyPlanModalController', selectStudyPlanModalController);
})(angular.module('app.studyPlan'));
(function(module) {

    studyPlanService.$inject = ["$http", "configurationService"];
    function studyPlanService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        
        thiz.getStudyPlans = function() {
            return $http.get(baseWebApiUrl + "/studyPlans/allStudyPlans").then(function(result) {
                return result.data;
            });
        }

    }

    module.service('studyPlanService', studyPlanService);
})(angular.module('app.studyPlan'));

(function (module) {
    'use strict';

    addCourseModalController.$inject = ["$scope", "$uibModalInstance", "teacherService", "teacher", "courses"];
    function addCourseModalController($scope, $uibModalInstance, teacherService, teacher, courses) {
        var thiz = this;

        //Variables


        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedCourse = function (course, index) {
            $scope.selectedCourse = course;
            $scope.selectedRow = index;
        };

        // modal functions
        $scope.ok = function () {
            if (angular.isUndefined($scope.selectedCourse)) {
                return;  //handle with error in future
            }

            var addCourseToTeacherCommand={};
            addCourseToTeacherCommand.teacherId = teacher.id; 
            addCourseToTeacherCommand.courseId= $scope.selectedCourse.id ;

            teacherService.addCourse(addCourseToTeacherCommand).then(function (result) {
                $uibModalInstance.close();

            });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        //initiations
        var init = function () {
            $scope.courses = courses;
            $scope.teacher = teacher;
            console.log(teacher);
            console.log(courses);

        }

        init();
    }

    module.controller('addCourseModalController', addCourseModalController);
})(angular.module('app.teacher'));

(function (module) {
    'use strict';

    manageTeacherController.$inject = ["$scope", "$location", "teacherService", "$uibModal", "teachers"];
    function manageTeacherController($scope, $location, teacherService, $uibModal, teachers) {
        var thiz = this;

        //Variables
        $scope.selectedRow = null;
        $scope.setSelectedTeacher = function (teacher, index) {
            $scope.selectedTeacher = teacher;
            $scope.selectedRow = index;
        };

        //private Functions

        // public functions
        $scope.openCoursesModal = function () {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/Teacher/views/addCourseModal.html',
                controller: 'addCourseModalController',
                size: 'lg',
                resolve: {
                    teacher: function () {
                        return $scope.selectedTeacher;
                    },
                    courses: ["courseService", function (courseService) {
                        return courseService.allCourses().then(function (courses) {
                            return courses;
                        });
                    }]
                }
            });
        };

        $scope.openClassModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/classes/views/selectClassesModal.html',
                controller: 'selectClassModalController',
                size: 'lg',
                resolve: {
                    classes: ["classesService", function (classesService) {
                        return classesService.availableClassesForTeacher($scope.selectedTeacher.id).then(function (classes) {
                            return classes;
                        });
                    }]
                }
          });

            modalInstance.result.then(function (selectedClass) {
                var addClassToTeacherCommand = {};
                addClassToTeacherCommand.teacherId = $scope.selectedTeacher.id;
                addClassToTeacherCommand.classId = selectedClass.id;

                teacherService.addClass(addClassToTeacherCommand).then(function(result) {
                    // succes toaster
                },function () {
                    //error toaster
                });
            }, function () {
              // Console.log('Modal general options dismissed at: ' + new Date());
          });
        };

        //initiations
        var init = function () {
            //teacherService.getAccounts().then(function (accounts) {
            //    $scope.accountList = accounts;
            //});

            $scope.teachers = teachers;
            console.log($scope.teachers);


        }

        init();
    }

    module.controller('manageTeacherController', manageTeacherController);
})(angular.module('app.teacher'));
(function(module) {

    teacherService.$inject = ["$http", "configurationService"];
    function teacherService($http, configurationService) {
        var thiz = this;
        var basePath = configurationService.baseApiPath;


        thiz.getAccounts = function() {
            return $http.get(basePath + 'accounts/getAccounts').then(function(result) {
                return result.data;
            });
        }

        thiz.addCourse = function(addCourseToTeacherCommand) {
            return $http.post(basePath + '/teacher/addCourse', addCourseToTeacherCommand).then(function(result) {
                return result.data;
            });
        }

        thiz.teachers = function() { // use query object in future change method to post then probably
            return $http.get(basePath + '/teacher/teachers').then(function(result) {
                return result.data;
            });
        }

        thiz.addClass = function(addClassToTeacherCommand) {
            return $http.post(basePath + '/teacher/addClass', addClassToTeacherCommand).then(function(result) {
                return result.data;
            });
        }


    }

    module.service('teacherService', teacherService);
})(angular.module('app.teacher'));
(function (module) {
    'use strict';

    controllerName.$inject = ["$scope", "$location"];
    function controllerName($scope, $location) {
        var thiz = this;
       // testgulp
        //Variables

        //private Functions
        
        // public functions

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('controllerName', controllerName);
})(angular.module('app.replace'));
(function(module) {
    'use strict';
    serviceName.$inject = ["$http", "configurationService"];
    function serviceName($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;

        //testgulp
        // Variables

        //private Functions

        // public functions

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('serviceName', serviceName);
})(angular.module('app.replace')); //test
(function (module) {
    'use strict';

    calendarController.$inject = ["$scope", "$location", "dashboardService"];
    function calendarController($scope, $location, dashboardService) {
        var thiz = this;

        //Variables

        //private Functions

        // public functions

        $scope.selectedRow = null;

        $scope.setSelectedEvaluation = function(evaluation, index) {
            $scope.selectedEvaluation = evaluation;
            $scope.selectedRow = index;
        };

        $scope.startEvaluation = function() {
            $location.path("/evaluation/" + $scope.selectedEvaluation.bundleId);
        };

        //initiations
        var init = function() {
            dashboardService.plannedEvaluations().then(function(evaluations) {
                $scope.plannedEvaluations = evaluations;
            });
        }

        init();

    }
    module.controller('calendarController', calendarController);
})(angular.module('app.dashboard'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJkYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZS5qcyIsImV2YWx1YXRpb24vZXZhbHVhdGlvbi1tb2R1bGUuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvZXZhbHVhdGlvblRlbXBsYXRlLW1vZHVsZS5qcyIsIkhvbWUvaG9tZS1tb2R1bGUuanMiLCJJbmRleC9pbmRleC1tb2R1bGUuanMiLCJMb2dpbi9sb2dpbi1tb2R1bGUuanMiLCJTdHVkZW50L3N0dWRlbnQtbW9kdWxlLmpzIiwiU3R1ZHlQbGFuL3N0dWR5UGxhbi1tb2R1bGUuanMiLCJUZWFjaGVyL3RlYWNoZXItbW9kdWxlLmpzIiwienp6Y29weU1lL3JlcGxhY2UtbW9kdWxlLmpzIiwibWVzc2FnZS9tZXNzYWdlQ29uZmlnLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9jcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9tYW5hZ2VBY2NvdW50Q29udHJvbGxlci5qcyIsIkFjY291bnQvc2VydmljZXMvYWNjb3VudFNlcnZpY2UuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9tYW5hZ2VDbGFzc2VzQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL3Rlc3RDbGFzc0N0cmwuanMiLCJjbGFzc2VzL3NlcnZpY2VzL2NsYXNzZXNTdmMuanMiLCJjb25maWd1cmF0aW9uL3NlcnZpY2VzL2NvbmZpZ3VyYXRpb25TZXJ2aWNlLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL2NvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY3JlYXRlQ291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9tYW5hZ2VDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL3NlcnZpY2VzL2NvdXJzZVNlcnZpY2UuanMiLCJkYXNoYm9hcmQvY29udHJvbGxlcnMvZGFzaGJvYXJkQ29udHJvbGxlci5qcyIsImRhc2hib2FyZC9zZXJ2aWNlcy9kYXNoYm9hcmRTZXJ2aWNlLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbnNDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9zZXJ2aWNlcy9ldmFsdWF0aW9uU2VydmljZS5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9jcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDdHJsLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9nZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9zZXJ2aWNlcy9ldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmpzIiwiSG9tZS9Db250cm9sbGVycy9ob21lQ3RybC5qcyIsIkluZGV4L2NvbnRyb2xsZXJzL2luZGV4Q3RybC5qcyIsIkluZGV4L3NlcnZpY2VzL2luZGV4U2VydmljZS5qcyIsIkxvZ2luL2NvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsIkxvZ2luL2ZhY3Rvcmllcy9hdXRoSW50ZXJjZXB0b3JGYWN0b3J5LmpzIiwiTG9naW4vU2VydmljZXMvYXV0aGVudGljYXRpb25TZXJ2aWNlLmpzIiwibWVzc2FnZS9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsIlN0dWRlbnQvY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanMiLCJTdHVkZW50L3NlcnZpY2VzL3N0dWRlbnRTZXJ2aWNlLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIuanMiLCJTdHVkeVBsYW4vY29udHJvbGxlcnMvc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL3NlcnZpY2VzL1N0dWR5UGxhblNlcnZpY2UuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL2FkZENvdXJzZU1vZGFsQ29udHJvbGxlci5qcyIsIlRlYWNoZXIvY29udHJvbGxlcnMvbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIuanMiLCJUZWFjaGVyL3NlcnZpY2VzL3RlYWNoZXJTZXJ2aWNlLmpzIiwienp6Y29weU1lL2NvbnRyb2xsZXJzL3JlcGxhY2VDdHJsLmpzIiwienp6Y29weU1lL3NlcnZpY2VzL3JlcGxhY2VTZXJ2aWNlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL3BhcnRpYWxzL2NhbGVuZGFyQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLE1BQU0sUUFBUSxPQUFPO0lBQ3JCLENBQUMsV0FBVyxVQUFVLGFBQWEsZ0JBQWdCLHNCQUFzQix1QkFBdUI7TUFDOUYsWUFBWSxlQUFlLGFBQWEsZUFB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QUFPOzs7Ozs7Ozs7UUFTWCxJQUFJLE9BQU8sWUFBWTs7OztRQUl2Qjs7O0lBR0osT0FBTyxXQUFXLGtCQUFrQjtHQUNyQyxRQUFRLE9BQU8sZ0JBQWdCO0FDckJsQyxDQUFDLFNBQVMsUUFBUTtJQUNkOztJQUNBLFNBQVMsWUFBWSxPQUFPLHNCQUFzQjtRQUM5QyxJQUFJLE9BQU87UUFDWCxJQUFJLGdCQUFnQixxQkFBcUI7Ozs7Ozs7Ozs7UUFVekMsSUFBSSxPQUFPLFdBQVc7Ozs7UUFJdEI7Ozs7SUFJSixPQUFPLFFBQVEsZUFBZTtHQUMvQixRQUFRLE9BQU8sdUJBQXVCO0FDdkJ6QyxDQUFDLFVBQVUsUUFBUTtJQUNmOzs7SUFFQSxTQUFTLG1CQUFtQixRQUFRLFdBQVcsa0JBQWtCO1FBQzdELElBQUksT0FBTzs7Ozs7Ozs7UUFRWCxPQUFPLGNBQWM7O1FBRXJCLE9BQU8sd0JBQXdCLFNBQVMsWUFBWSxPQUFPO1lBQ3ZELE9BQU8scUJBQXFCO1lBQzVCLE9BQU8sY0FBYzs7O1FBR3pCLE9BQU8sa0JBQWtCLFdBQVc7WUFDaEMsVUFBVSxLQUFLLGlCQUFpQixPQUFPLG1CQUFtQjs7OztRQUk5RCxJQUFJLE9BQU8sV0FBVztZQUNsQixpQkFBaUIscUJBQXFCLEtBQUssU0FBUyxhQUFhO2dCQUM3RCxPQUFPLHFCQUFxQjs7OztRQUlwQzs7O0lBR0osT0FBTyxXQUFXLHNCQUFzQjtHQUN6QyxRQUFRLE9BQU8sa0JBQWtCIiwiZmlsZSI6ImNvbmNhdEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcclxuICAgIFsnbmdSb3V0ZScsICd0b2FzdHInLCAnbmdBbmltYXRlJywgXCJ1aS5ib290c3RyYXBcIiwgJ0xvY2FsU3RvcmFnZU1vZHVsZScsICdhbmd1bGFyLWxvYWRpbmctYmFyJywgJ25nVG91Y2gnXHJcbiAgICAsICdhcHAuaG9tZScsICdhcHAuY2xhc3NlcycsICdhcHAubG9naW4nLCAnYXBwLmFjY291bnQnLCAnYXBwLmluZGV4JywgJ2FwcC5zdHVkZW50JywgJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCAnYXBwLmV2YWx1YXRpb24nLCAnYXBwLmRhc2hib2FyZCdcclxuICAgICwgJ2FwcC50ZWFjaGVyJywgJ2FwcC5jb3Vyc2UnLCAnYXBwLnN0dWR5UGxhbiddKVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VBY2NvdW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0FjY291bnQvdmlld3MvbWFuYWdlQWNjb3VudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQWNjb3VudENvbnRyb2xsZXInXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgXHJcblxyXG5cclxuICAgIH0pO1xyXG4iLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NsYXNzZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NsYXNzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGZ1bmN0aW9uKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yVGVhY2hlcigpLnRoZW4oZnVuY3Rpb24oY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUNsYXNzZXMnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9tYW5hZ2VDbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9tYW5hZ2VDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUNvdXJzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgLndoZW4oJy9jb3Vyc2VzJywge1xyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NvdXJzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NyZWF0ZUNvdXJzZScsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9jcmVhdGVDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ291cnNlQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbi86YnVuZGxlSWQ/Jywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25TZXJ2aWNlLCAkcm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bmRsZUlkID0gJHJvdXRlLmN1cnJlbnQucGFyYW1zLmJ1bmRsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblNlcnZpY2UuZXZhbHVhdGlvbnNGb3JCdW5kbGUoYnVuZGxlSWQpLnRoZW4oZnVuY3Rpb24gKGV2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9ucycsIHtcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9ucy5odG1sJyxcclxuICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvZXZhbHVhdGlvblRlbXBsYXRlcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oICcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9sb2dpbi92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuYXBwLnJ1bihbJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uIChhdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcclxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRBdXRoRGF0YSgpO1xyXG59XSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5Jyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbnRyb2xsZXJzL2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyLmpzXCIgLz5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlU3R1ZGVudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkZW50L3ZpZXdzL2NyZWF0ZVN0dWRlbnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlU3R1ZHlQbGFuJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9tYW5hZ2VTdHVkeVBsYW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlVGVhY2hlcicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL21hbmFnZVRlYWNoZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRlYWNoZXJzIDogZnVuY3Rpb24odGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyU2VydmljZS50ZWFjaGVycygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnJlcGxhY2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAvLyRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy8gIC53aGVuKCcvcmVwbGFjZScsIHtcclxuICAgICAgICAvLyAgICAgIHRlbXBsYXRlVXJsOiAndmlldyBIZXJlJyxcclxuICAgICAgICAvLyAgICAgIGNvbnRyb2xsZXI6ICdjb250cm9sbGVyIGZvciB2aWV3IGhlcmUnXHJcbiAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uICh0b2FzdHJDb25maWcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRvYXN0ckNvbmZpZywge1xyXG4gICAgICAgIGF1dG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIGNvbnRhaW5lcklkOiAndG9hc3QtY29udGFpbmVyJyxcclxuICAgICAgICBtYXhPcGVuZWQ6IDEwLFxyXG4gICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxyXG4gICAgICAgIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcclxuICAgICAgICBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHRhcmdldDogJ2JvZHknLFxyXG5cclxuICAgICAgICBhbGxvd0h0bWw6IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjbG9zZUh0bWw6ICc8YnV0dG9uPiZ0aW1lczs8L2J1dHRvbj4nLFxyXG4gICAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMCxcclxuICAgICAgICBpY29uQ2xhc3Nlczoge1xyXG4gICAgICAgICAgICBlcnJvcjogJ3RvYXN0LWVycm9yJyxcclxuICAgICAgICAgICAgaW5mbzogJ3RvYXN0LWluZm8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6ICd0b2FzdC13YXJuaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZUNsYXNzOiAndG9hc3QtbWVzc2FnZScsXHJcbiAgICAgICAgb25IaWRkZW46IG51bGwsXHJcbiAgICAgICAgb25TaG93bjogbnVsbCxcclxuICAgICAgICBvblRhcDogbnVsbCxcclxuICAgICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXHJcbiAgICAgICAgdGFwVG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgICAgICB0b2FzdDogJ2RpcmVjdGl2ZXMvdG9hc3QvdG9hc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIHByb2dyZXNzYmFyOiAnZGlyZWN0aXZlcy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5odG1sJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZU91dDogNDAwMCxcclxuICAgICAgICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxyXG4gICAgICAgIHRvYXN0Q2xhc3M6ICd0b2FzdCdcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkcHJvdmlkZSwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgJHByb3ZpZGUuZmFjdG9yeSgnZXJyb3JJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgdG9hc3RyID0gJGluamVjdG9yLmdldCgndG9hc3RyJyk7XHJcbiAgICAgICAgICAgICAgICAvLyB0b2FzdHIuZXJyb3IoJ0ZvdXQnLCByZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlU2VydmljZSA9ICRpbmplY3Rvci5nZXQoJ21lc3NhZ2VTZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVJlamVjdChyZWplY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdlcnJvckludGVyY2VwdG9yJyk7XHJcbn0pOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcigkc2NvcGUsIGFjY291bnRTZXJ2aWNlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBtZXNzYWdlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRBY2NvdW50Um9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5yb2xlVHlwZSA9IHJvbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyByb2VwIGhpZXIgZGUgYWNjb3VudHNlcnZpY2Ugb3Agb20gZWVuIG5pZXV3ZSBhY2NvdW50IHRlIG1ha2VuIG1ldCBkZSBkYXRhIGRpZSB2aWEgZGUgdmlldyBpcyBpbmdldnVsZC5cclxuICAgICAgICAgICAgLy8gZ2VlZiAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gbWVlIGluIGluIGRlIGFjY291bnRTZXJ2aWNlIG1ldGhvZGUuXHJcbiAgICAgICAgICAgIC8vLnRoZW4gb20gdGUgd2FjaHRlbiB0b3RkYXQgZGUgc2VydmVyIGdlYW50d29vcmQgaGVlZnRcclxuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuY3JlYXRlQWNjb3VudCgkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQWNjb3VudCBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpOyAvLyBnZWJydWlrIGRpdCBpbiB0aGUgLnRoZW4gZnVuY3RpZSB6b2RhdCBkZSBtb2RhbCBzbHVpdCBuYSBkZSBzZXJ2ZXJjYWxsLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0ge307IC8vIGdlYnJ1aWsgZGl0IG9tIGFsbGUgaW5mbyBhYW4gdGUgaGFuZ2VuIGluIGRlIHZpZXcgKGRpdCBtb2RlbCBtb2V0IGplIHNlcnZlcnNpZGUgbm9nIG9wYm91d2VuKVxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSBcIlVzZXJSb2xlXCI7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5pc1RlYWNoZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyJywgY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUFjY291bnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhY2NvdW50U2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBjdHJsICsgaCByZXBsYWNlIGFsbGUgY29udHJvbGxlcm5hbWVuIGRvb3IgaHVpZGlnZSBjb250cm9sbGVyXHJcbiAgICAgICAgLy8gdmVydmFuZyBhcHAucmVwbGFjZSBkb29yIGRlIGp1aXN0ZSBtb2R1bGUgaW4gZGl0IGdldmFsIGFwcC5hY2NvdW50IHN0YWF0IGluIGFjY291bnQtbW9kdWxlLmpzXHJcblxyXG4gICAgICAgIC8vY29udHJvbGxlciBpbiBpbmRleC5odG1sIHNsZXBlbi90b2V2b2VnZW4gb25kZXJhYW4gYmlqIHNjcmlwdHMgY29udHJvbGxlcnNcclxuXHJcbiAgICAgICAgLy92aWV3IGFhbm1ha2VuIGtvcGllZXIgdWl0IGNvcHkgZm9sZGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW4gbW9kdWxlIGFjY291bnQtbW9kdWxlIHJvdXRlIGFhbm1ha2VuICgkcm91dGVQcm92aWRlcilcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHNlbGVjdGVyZW4gdmFuIHJpaiBpbiBhY2NvdW50c3RhYmVsXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gZnVuY3Rpb24gKGFjY291bnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9jcmVhdGVBY2NvdW50TW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLy8gbmlldHMgZG9vciB0ZSBnZXZlbi5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hY2NvdW50TGlzdCA9IGFjY291bnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcicsIG1hbmFnZUFjY291bnRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBhY2NvdW50U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vdGhpei5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChjaGFuZ2VQYXNzd29yZEJpbmRpbmdNb2RlbCkge1xyXG4gICAgICAgIC8vICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJ2FjY291bnRzL2NoYW5nZXBhc3N3b3JkJywgY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vdGhpei5jcmVhdGVUZXN0QWNjb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICB2YXIgY3JlYXRlVXNlck1vZGVsID0ge1xyXG4gICAgICAgIC8vICAgICAgICB1c2VybmFtZTogXCJUZXN0ZXJcIixcclxuICAgICAgICAvLyAgICAgICAgZW1haWw6IFwiYmVybmR2ZXJ0b21tZW5AbXNuLmNvbVwiLFxyXG4gICAgICAgIC8vICAgICAgICBmaXJzdE5hbWU6IFwiVGVzdFwiLFxyXG4gICAgICAgIC8vICAgICAgICBsYXN0bmFtZTogXCJlclwiLFxyXG4gICAgICAgIC8vICAgICAgICBwYXNzd29yZDogXCJARG1pbjEyM1wiLFxyXG4gICAgICAgIC8vICAgICAgICBjb25maXJtUGFzc3dvcmQgOlwiQERtaW4xMjNcIlxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aCArICdhY2NvdW50cy9jcmVhdGVUZXN0ZXInLCBjcmVhdGVVc2VyTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uaWV1d2UgbWV0aG9kZSBvbSBhY2NvdW50IHRlIGNyZWVlcmVuIGFhbmdlbWFha3RcclxuICAgICAgICB0aGl6LmNyZWF0ZUFjY291bnQgPSBmdW5jdGlvbihjcmVhdGVBY2NvdW50SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jcmVhdGVBY2NvdW50JywgY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jcmVlZXIgaGllciBkZSBtZXRob2RlIGRpZSBuYWFyIGJpaiBkZSBhY2NvdW50Y29udHJvbGxlciBjcmVhdGVBY2NvdW50IGdlYnJ1aWt0LlxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhY2NvdW50U2VydmljZScsIGFjY291bnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcicsIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGtsYXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZENsYXNzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJywgc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgZnVuY3Rpb24gdGVzdENsYXNzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmdldFRlc3RDbGFzcygpLnRoZW4oZnVuY3Rpb24gKGNsYXNzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RDbGFzcyA9IGNsYXNzUmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignVGVzdENsYXNzQ29udHJvbGxlcicsIHRlc3RDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsYXNzZXNTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yVGVhY2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvclRlYWNoZXInKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY2xhc3Nlc0ZvckNvdXJzZSA9IGZ1bmN0aW9uKGNvdXJzZUlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvckNvdXJzZScsIHsgJ2lkJzogY291cnNlSWQgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24odGVhY2hlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXInLCB7ICdpZCc6IHRlYWNoZXJJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjbGFzc2VzU2VydmljZScsIGNsYXNzZXNTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWd1cmF0aW9uU2VydmljZSgkaHR0cCwgdG9hc3RyQ29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgYXBpVXJsID0gJ2h0dHA6Ly90ZXN0cGxhdGZvcm1BcGkvJztcclxuXHJcbiAgICAgICAgdGhpei5iYXNlQXBpUGF0aCA9IGFwaVVybCArICdhcGkvJztcclxuXHJcbiAgICAgICAgdGhpei50b2tlblBhdGggPSBhcGlVcmwgKyAnb2F1dGgvdG9rZW4nO1xyXG5cclxuICAgICAgICB0aGl6LmdldFNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodGhpei5iYXNlQXBpUGF0aCArIFwiL2dlbmVyYWxJbmZvL2dldHNjaG9vbHllYXJzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnY29uZmlndXJhdGlvblNlcnZpY2UnLCBjb25maWd1cmF0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvdXJzZUNvbnRyb2xsZXInLCBjb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VTZXJ2aWNlLCAkdWliTW9kYWwsIHN0dWR5UGxhblNlcnZpY2UsIG1lc3NhZ2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDb3Vyc2VcIik7XHJcbiAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiMvbWFuYWdlQ291cnNlXCI7IC8vYmlqIGxvY2F0aW9uLnBhdGggZ2VlbiAjIGJpamRvZW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb3Vyc2VTZXJ2aWNlLmNyZWF0ZUNvdXJzZSgkc2NvcGUuY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIkN1cnN1cyBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY3JlYXRlQ291cnNlSW5mbyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TdHVkeXBsYW5Nb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkeVBsYW4vdmlld3Mvc2VsZWN0U3R1ZHlQbGFuTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZHlwbGFuczogc3R1ZHlQbGFuU2VydmljZS5nZXRTdHVkeVBsYW5zKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkU3R1ZHlQbGFuKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mby5zdHVkeVBsYW4gPSBzZWxlY3RlZFN0dWR5UGxhbjtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2VlbiBTdHVkeXBsYW4gZ2VzZWxlY3RlZXJkIGVycm9yPyBoaWVyIGtvbSBqZSBpbiBhbHMgamUgbmlrcyBzZWxlY3RlZXJkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvID0ge307XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInLCBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ291cnNlQ29udHJvbGxlcicsIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5nZXRDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jb3Vyc2VzRm9yVGVhY2hlclwiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENvdXJzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2FsbENvdXJzZXNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDb3Vyc2UgPSBmdW5jdGlvbiAoY3JlYXRlQ291cnNlSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2NyZWF0ZUNvdXJzZVwiLCBjcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvdXJzZVNlcnZpY2UnLCBjb3Vyc2VTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBkYXNoYm9hcmRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuY2FsZW5kZXJQYXRoID0gJ2FwcC9kYXNoYm9hcmQvdmlld3MvcGFydGlhbHMvY2FsZW5kYXJQYXJ0aWFsLmh0bWwnO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2Rhc2hib2FyZENvbnRyb2xsZXInLCBkYXNoYm9hcmRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhc2hib2FyZFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5wbGFubmVkRXZhbHVhdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJldmFsdWF0aW9uL3BsYW5uZWRFdmFsdWF0aW9uc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdkYXNoYm9hcmRTZXJ2aWNlJywgZGFzaGJvYXJkU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlLCBldmFsdWF0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcygpOyAvLyBmaW5kIG90aGVyIHNvbHV0aW9uIHRvIG1hcCBzY29yZXMgbm90IG9uIGV2cnkgc2VsZWN0LlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTY29yZSA9IGZ1bmN0aW9uIChldmFsdWF0aW9uSXRlbSwgc2NvcmUpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbkl0ZW0uc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbigkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhFdmEgPSBfLmZpbmRJbmRleCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkID09PSBldmFsdWF0aW9uLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zW2luZGV4RXZhXSA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBoYXNoa2V5ID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXk7XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleSA9IGhhc2hrZXk7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVwZGF0ZUV2YWx1YXRpb25zKCRzY29wZS5ldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Tm90U2NvcmVkUmVhc29uID0gZnVuY3Rpb24oZXZhbHVhdGlvbml0ZW0sIG51bWJlcikge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5ub3RTY29yZWRSZWFzb24gPSBudW1iZXI7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25pdGVtLnNjb3JlID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLmdyb3VwQnkoZXZhbHVhdGlvbi5ldmFsdWF0aW9uSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZXZhbHVhdGlvblN1YlNlY3Rpb24uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5zb3J0QnkoZGlmZmVyZW50U3Vic2VjdGlvbnMsIGZ1bmN0aW9uKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vLy8gdmFyIHZhbHVlID0gb2JqZWN0W2tleV0gPT4gdXNlIGRpY3Rpb25hcnkgZnJvbSBjIyB0aGlzIHdheVxyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1YnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCkgJiYgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnRvdGFsU2NvcmUgPSAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdC50b3RhbHNQZXJjYXRlZ29yeVtzdWJzZWN0aW9uWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLmlkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1hcCBldmVyeSBldmFsdWF0aW9uIG5vdCBqdXN0IHNlbGVjdGVkIHNvIGl0IGNhbiBiZSBwcm9jZXNlZCBpbiBpbnQoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzVGl0bGUgPSBldmFsdWF0aW9uc1swXS5jcmVhdGVkRm9yQ2xhc3MuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25Db250cm9sbGVyJywgZXZhbHVhdGlvbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZXMsIGNsYXNzZXMsIGV2YWx1YXRpb25TZXJ2aWNlLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbihrbGFzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gJHNjb3BlLnNlbGVjdGVkQ2xhc3MuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdGFydERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmZpbmlzaGVkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudEZpcnN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudExhc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5zZWFyY2hFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQuZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG90YWxJdGVtcyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC50b3RhbEl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zVG9QZGYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb25zVG9QZGZNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvbnM7IC8vIG1heWJlIGRvIGEgc2VhcmNoIGFnYWluIHdpdGggbW9yZSBpdGVtcyBwYWdlZD9cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkRXZhbHVhdGlvbklkcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QuRXZhbHVhdGlvbklkcyA9IHNlbGVjdGVkRXZhbHVhdGlvbklkcztcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cub3BlbihcImRhdGE6YXBwbGljYXRpb24vcGRmO2Jhc2U2NCwgXCIgKyByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbcmVzdWx0LmRhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9wZGYnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZmlsZSwgJ2ZpbGVOYW1lLnBkZicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVBcyhmaWxlLCAnZmlsZW5hbWUucGRmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9ucywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgdmFyIGdldFNlbGVjdGVkSWRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1hcCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2YS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKGdldFNlbGVjdGVkSWRzKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZXZhbHVhdGlvbnNGb3JCdW5kbGUgPSBmdW5jdGlvbihidW5kbGVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vZXZhbHVhdGlvbnNGb3JCdW5kbGUnLCB7ICdpZCc6IGJ1bmRsZUlkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9uJywgZXZhbHVhdGlvbikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vdXBkYXRlRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5zZWFyY2hFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3NlYXJjaEV2YWx1YXRpb25zJywgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2NyZWF0ZVBkZkZvckV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2V2YWx1YXRpb25TZXJ2aWNlJywgZXZhbHVhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSxldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGUsIGNsYXNzZXNGb3JDb3Vyc2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAvLyBkYXRlcGlja2VyXHJcbiAgICAgICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmV2YWx1YXRpb25EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RheTogMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGVuZCBkYXRlcGlja2VyXHJcblxyXG4gICAgICAgIC8vc2Nob29seWVhciBkcm9wZG93blxyXG4gICAgICAgICRzY29wZS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGlzb3BlbjogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnRvZ2dsZURyb3Bkb3duID0gZnVuY3Rpb24gKCRldmVudCkge1xyXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzLmlzb3BlbiA9ICEkc2NvcGUuc3RhdHVzLmlzb3BlbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc0ZvckNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZC5jbGFzc0lkID0gY2xhc3NGb3JDb3Vyc2UuaWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gY2xhc3NGb3JDb3Vyc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL2VuZCBzY2hvb2x5ZWFyIGRyb3Bkb3duXHJcblxyXG4gICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvL21ha2UgY2FsbCBoZXJlXHJcbiAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUoJHNjb3BlLmNyZWF0ZUNvbW1hbmQpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnb2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzRm9yQ291cnNlID0gY2xhc3Nlc0ZvckNvdXJzZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlID0gZXZhbHVhdGlvblRlbXBsYXRlO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZCA9IHtcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25UZW1wbGF0ZUlkOiBldmFsdWF0aW9uVGVtcGxhdGUuaWQsXHJcbiAgICAgICAgICAgICAgICBFdmFsdWF0aW9uRGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NJZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucywgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICRzY29wZS50YWJzID0gMTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zYXZlVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBkZXZlbG9wIHZhbGlkYXRpb24gYW5kIGFkanVzdCAxMDAgcGVyc2NlbnQgY29kZS5cclxuICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5jcmVhdGVUZW1wbGF0ZSgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9ldmFsdWF0aW9uVGVtcGxhdGVzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFdmFsdWF0aW9uT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgJ2Rlc2NyaXB0aW9uJzogXCJcIiwgJ2NvdXJzZSc6IG51bGwgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChnZW5lcmFsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiA9IGdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UgPSBnZW5lcmFsT3B0aW9ucy5jb3Vyc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlblN1YlNlY3Rpb25zID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblN1YlNlY3Rpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VG90YWxXZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IGV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5kZWxldGVTdWJTZWN0aW9uID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuaW5kZXhPZihzdWJTZWN0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkdvYWxzID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJTZWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlR29hbHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNob3NlbkdvYWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdWJTZWN0aW9uLmdvYWxzLCBmdW5jdGlvbihnb2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuR29hbHMucHVzaChnb2FsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNob3NlbkdvYWxzLmxlbmd0aCA+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHMgPSBfLnJlamVjdCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZSwgZnVuY3Rpb24gKGdvYWxGcm9tQ291cnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluR29hbHMgPSBfLmFueShjaG9zZW5Hb2FscywgZnVuY3Rpb24gKGdvYWxmcm9tU3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnb2FsRnJvbUNvdXJzZS5pZCA9PT0gZ29hbGZyb21TdWIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2aWFsYWJsZUdvYWxzPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZpYWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9lbCB0b2VnZXZvZWdkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZUdvYWwgPSBmdW5jdGlvbihzdWJzZWN0aW9uLCBnb2FsKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHN1YnNlY3Rpb24uZ29hbHMuaW5kZXhPZihnb2FsKTtcclxuICAgICAgICAgICAgc3Vic2VjdGlvbi5nb2Fscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBlcmNlbnRhZ2UgKz0gcGFyc2VJbnQoc3ViU2VjdGlvbi53ZWlnaHQsMTApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjRGVzY3JpcHRpb25Qb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uICE9PSBudWxsICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAyNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0NvdXJzZVBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjU3ViVG90YWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3RhbFBlcmNlbnRhZ2UgPSB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxQZXJjZW50YWdlID09PSAxMDAgPyAyNSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNHb2FsUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb25lR29hbFNldCA9IF8uYW55KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uLmdvYWxzKSAmJiBzdWJTZWN0aW9uLmdvYWxzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb25lR29hbFNldCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNDb3Vyc2VQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjU3ViVG90YWxQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjR29hbFBvaW50cygpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcicsIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblRlbXBsYXRlcywgJHVpYk1vZGFsLCBjbGFzc2VzU2VydmljZSwgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc0ZvckNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvckNvdXJzZSgkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZS5jb3Vyc2UuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZXNUb0hpZGUgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzLCBmdW5jdGlvbiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5jaGVja0hpZGRlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlc1RvSGlkZS5wdXNoKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVzVG9IaWRlLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyh0ZW1wbGF0ZXNUb0hpZGUpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0ZW1wbGF0ZXNUb0hpZGUsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5oaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzID0gZXZhbHVhdGlvblRlbXBsYXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBzdWJTZWN0aW9uLCBjb3Vyc2UsIGF2YWlsYWJsZUdvYWxzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5nb2Fsc0ZpbHRlciA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7IFxyXG4gICAgICBcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRHb2FsID0gZnVuY3Rpb24gKGdvYWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEdvYWwgPSBnb2FsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpIHx8ICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMucHVzaCgkc2NvcGUuc2VsZWN0ZWRHb2FsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZEdvYWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVHb2FscyA9IGF2YWlsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGV2YWx1YXRpb25TdWJTZWN0aW9ucywgY3VycmVudFRvdGFsV2VpZ2h0LCBjb3Vyc2UsIHN1YlNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXouYWRkbmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMucHVzaChhbmd1bGFyLmNvcHkoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCkgfHwgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBlcnJvciBtZXNzYWdlIGhlcmUgOiBubyB3ZWlndGggZW50ZXJlZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNFZGl0aW5nKSB8fCAkc2NvcGUuaXNFZGl0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFRvdGFsV2VpZ2h0ID0gY3VycmVudFRvdGFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3ViU2VjdGlvbikgJiYgc3ViU2VjdGlvbiAhPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGdlbmVyYWxPcHRpb25zLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IG51bGwgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMgPSBnZW5lcmFsT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlVGVtcGxhdGUgPSBmdW5jdGlvbihldmFsdWF0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlVGVtcGxhdGUnLCBldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0RXZhbHVhdGlvblRlbXBsYXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldEV2YWx1YXRpb25UZW1wbGF0ZXMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUgPSBmdW5jdGlvbihjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2NyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUnLCBjb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uKHRlbXBsYXRlc0lkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9oaWRlVGVtcGxhdGVzJywgdGVtcGxhdGVzSWRzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZScsIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBob21lQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJXZWxrb21cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBob21lQ29udHJvbGxlcik7XHJcblxyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnKSk7XHJcblxyXG5cclxuIiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgICRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ091dCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHVzZXJOYW1lID0gYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodXNlck5hbWUpICYmIHVzZXJOYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1c2VyTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigndXNlckxvZ2dlZEluJyxmdW5jdGlvbiAoZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkT3V0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsLmNvbnRyb2xsZXIoJ2luZGV4Q29udHJvbGxlcicsIGluZGV4Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2VydmljZU5hbWUnLCBpbmRleFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JykpOyIsIihmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGF1dGhlbnRpY2F0aW9uU2VydmljZSx0b2FzdHIpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUucGFzc3dvcmQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXN0VGl0bGUgPSBcIlRlc3RUaXRsZVwiO1xyXG5cclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiVnVsIGFsbGUgdmVsZGVuIGluIGF1Yi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnVzZXJOYW1lKSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxvZ2luRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiAkc2NvcGUudXNlck5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dpbihsb2dpbkRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ob21lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgbG9naW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicpKTsiLCJcclxuJ3VzZSBzdHJpY3QnO1xyXG5hcHAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScsIFsnJHEnLCAnJGxvY2F0aW9uJyxcclxuJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHEsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSkge1xyXG5cclxuICAgIHZhciBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5ID0ge307XHJcblxyXG4gICAgdmFyIF9yZXF1ZXN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cclxuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3Jlc3BvbnNlRXJyb3IgPSBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlcXVlc3QgPSBfcmVxdWVzdDtcclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVzcG9uc2VFcnJvciA9IF9yZXNwb25zZUVycm9yO1xyXG5cclxuICAgIHJldHVybiBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5O1xyXG59XSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXoubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkT3V0Jywge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXCJncmFudF90eXBlPXBhc3N3b3JkJnVzZXJuYW1lPVwiICtcclxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YS51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgbG9naW5EYXRhLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS50b2tlblBhdGgsIGRhdGEsIHsgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sIHVzZXJOYW1lOiBsb2dpbkRhdGEudXNlck5hbWUsIGV4cGlyZXM6IHJlc3BvbnNlLmRhdGEuZXhwaXJlc19pbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gbG9naW5EYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZEluJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGl6LnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEF1dGhEYXRhID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGF1dGhEYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBhdXRoZW50aWNhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVzc2FnZVNlcnZpY2UodG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGl6LmhhbmRsZVJlamVjdCA9IGhhbmRsZVJlamVjdDtcclxuICAgICAgICB0aGl6LmhhbmRsZVN1Y2NlcyA9IGhhbmRsZVN1Y2NlcztcclxuICAgICAgICB0aGl6LmhhbmRsZVdhcm5pbmcgPSBoYW5kbGVXYXJuaW5nO1xyXG4gICAgICAgIHRoaXouaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UsICdGb3V0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3VjY2VzKHRleHQsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVdhcm5pbmcodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcodGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ21lc3NhZ2VTZXJ2aWNlJywgbWVzc2FnZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0dWRlbnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUudGVzdCA9IFwiSGVsbG8gd29ybGRcIjtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlU3R1ZGVudENvbnRyb2xsZXInLCBjcmVhdGVTdHVkZW50Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZGVudCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gc3R1ZGVudFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3N0dWRlbnRTZXJ2aWNlJywgc3R1ZGVudFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcicsIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgJHVpYk1vZGFsSW5zdGFuY2UsIHN0dWR5cGxhbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFN0dWR5cGxhbiA9IGZ1bmN0aW9uIChzdHVkeXBsYW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbiA9IHN0dWR5cGxhbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBub2cgY2hlY2tlbiBvcCBnZWVuIHJlc3VsdGFhdCBnZXNlbGVjdGVlcmRcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkU3R1ZHlwbGFuKTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcyhcImNhbmNlbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBzdHVkeXBsYW5zO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdHVkeXBsYW5zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcicsIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBzdHVkeVBsYW5TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc3R1ZHlQbGFuU2VydmljZScsIHN0dWR5UGxhblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgdGVhY2hlclNlcnZpY2UsIHRlYWNoZXIsIGNvdXJzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkQ291cnNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQ9e307XHJcbiAgICAgICAgICAgIGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQudGVhY2hlcklkID0gdGVhY2hlci5pZDsgXHJcbiAgICAgICAgICAgIGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQuY291cnNlSWQ9ICRzY29wZS5zZWxlY3RlZENvdXJzZS5pZCA7XHJcblxyXG4gICAgICAgICAgICB0ZWFjaGVyU2VydmljZS5hZGRDb3Vyc2UoYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAkc2NvcGUudGVhY2hlciA9IHRlYWNoZXI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRlYWNoZXIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2FkZENvdXJzZU1vZGFsQ29udHJvbGxlcicsIGFkZENvdXJzZU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAudGVhY2hlcicpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgdGVhY2hlclNlcnZpY2UsICR1aWJNb2RhbCwgdGVhY2hlcnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRUZWFjaGVyID0gZnVuY3Rpb24gKHRlYWNoZXIsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRlYWNoZXIgPSB0ZWFjaGVyO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub3BlbkNvdXJzZXNNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvVGVhY2hlci92aWV3cy9hZGRDb3Vyc2VNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICB0ZWFjaGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuYWxsQ291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuQ2xhc3NNb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL3NlbGVjdENsYXNzZXNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGZ1bmN0aW9uIChjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXIoJHNjb3BlLnNlbGVjdGVkVGVhY2hlci5pZCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9ICRzY29wZS5zZWxlY3RlZFRlYWNoZXIuaWQ7XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQuY2xhc3NJZCA9IHNlbGVjdGVkQ2xhc3MuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ2xhc3MoYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN1Y2NlcyB0b2FzdGVyXHJcbiAgICAgICAgICAgICAgICB9LGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL2Vycm9yIHRvYXN0ZXJcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy90ZWFjaGVyU2VydmljZS5nZXRBY2NvdW50cygpLnRoZW4oZnVuY3Rpb24gKGFjY291bnRzKSB7XHJcbiAgICAgICAgICAgIC8vICAgICRzY29wZS5hY2NvdW50TGlzdCA9IGFjY291bnRzO1xyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnRlYWNoZXJzID0gdGVhY2hlcnM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS50ZWFjaGVycyk7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlVGVhY2hlckNvbnRyb2xsZXInLCBtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAudGVhY2hlcicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gdGVhY2hlclNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlUGF0aCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuXHJcbiAgICAgICAgdGhpei5nZXRBY2NvdW50cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VQYXRoICsgJ2FjY291bnRzL2dldEFjY291bnRzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmFkZENvdXJzZSA9IGZ1bmN0aW9uKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVBhdGggKyAnL3RlYWNoZXIvYWRkQ291cnNlJywgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LnRlYWNoZXJzID0gZnVuY3Rpb24oKSB7IC8vIHVzZSBxdWVyeSBvYmplY3QgaW4gZnV0dXJlIGNoYW5nZSBtZXRob2QgdG8gcG9zdCB0aGVuIHByb2JhYmx5XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnL3RlYWNoZXIvdGVhY2hlcnMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ2xhc3MgPSBmdW5jdGlvbihhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVBhdGggKyAnL3RlYWNoZXIvYWRkQ2xhc3MnLCBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCd0ZWFjaGVyU2VydmljZScsIHRlYWNoZXJTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY29udHJvbGxlck5hbWUoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAvLyB0ZXN0Z3VscFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvbnRyb2xsZXJOYW1lJywgY29udHJvbGxlck5hbWUpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnJlcGxhY2UnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgZnVuY3Rpb24gc2VydmljZU5hbWUoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vdGVzdGd1bHBcclxuICAgICAgICAvLyBWYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3NlcnZpY2VOYW1lJywgc2VydmljZU5hbWUpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnJlcGxhY2UnKSk7IC8vdGVzdCIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsZW5kYXJDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBkYXNoYm9hcmRTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkRXZhbHVhdGlvbiA9IGZ1bmN0aW9uKGV2YWx1YXRpb24sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc3RhcnRFdmFsdWF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2V2YWx1YXRpb24vXCIgKyAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLmJ1bmRsZUlkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZGFzaGJvYXJkU2VydmljZS5wbGFubmVkRXZhbHVhdGlvbnMoKS50aGVuKGZ1bmN0aW9uKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGxhbm5lZEV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjYWxlbmRhckNvbnRyb2xsZXInLCBjYWxlbmRhckNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
