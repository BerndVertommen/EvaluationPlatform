var app = angular.module('app', ['ngRoute', 'toastr', 'ngAnimate', "ui.bootstrap", 'LocalStorageModule', 'app.home', 'app.classes', 'app.login', 'app.account', 'app.index', 'app.student', 'app.evaluationTemplate', 'app.evaluation', 'app.dashboard', 'angular-loading-bar', 'ngTouch', 'app.teacher', 'app.course', 'app.studyPlan'])
    .config(["$routeProvider", "$httpProvider", "toastrConfig", function ($routeProvider, $httpProvider, toastrConfig) {
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

    createCourseController.$inject = ["$scope", "$location", "courseService", "$uibModal", "studyPlanService", "toastr"];
    function createCourseController($scope, $location, courseService, $uibModal, studyPlanService, toastr) {
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
                toastr.success("Cursus aangemaakt.");
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

    messageService.$inject = ["toastr"];
    function messageService(toastr) {
        var thiz = this;

        thiz.handleReject = handleReject;
        thiz.handleSucces = handleSucces;

        function handleReject(rejection) {

            if (rejection.status === 500) {
                toastr.error(rejection.data.exceptionMessage, 'Fout');
            }
        }


        function handleSucces(text, title) {
            toastr.success(text, title);
            }
    }

    module.service('messageService', messageService);
})(angular.module('app')); //test
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJkYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZS5qcyIsImV2YWx1YXRpb24vZXZhbHVhdGlvbi1tb2R1bGUuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvZXZhbHVhdGlvblRlbXBsYXRlLW1vZHVsZS5qcyIsIkhvbWUvaG9tZS1tb2R1bGUuanMiLCJJbmRleC9pbmRleC1tb2R1bGUuanMiLCJTdHVkZW50L3N0dWRlbnQtbW9kdWxlLmpzIiwiTG9naW4vbG9naW4tbW9kdWxlLmpzIiwiVGVhY2hlci90ZWFjaGVyLW1vZHVsZS5qcyIsIlN0dWR5UGxhbi9zdHVkeVBsYW4tbW9kdWxlLmpzIiwienp6Y29weU1lL3JlcGxhY2UtbW9kdWxlLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9jcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9tYW5hZ2VBY2NvdW50Q29udHJvbGxlci5qcyIsIkFjY291bnQvc2VydmljZXMvYWNjb3VudFNlcnZpY2UuanMiLCJjb25maWd1cmF0aW9uL3NlcnZpY2VzL2NvbmZpZ3VyYXRpb25TZXJ2aWNlLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9jbGFzc2VzQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy90ZXN0Q2xhc3NDdHJsLmpzIiwiY2xhc3Nlcy9zZXJ2aWNlcy9jbGFzc2VzU3ZjLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL2NvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY3JlYXRlQ291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9tYW5hZ2VDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL3NlcnZpY2VzL2NvdXJzZVNlcnZpY2UuanMiLCJlcnJvci9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsImRhc2hib2FyZC9zZXJ2aWNlcy9kYXNoYm9hcmRTZXJ2aWNlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL2Rhc2hib2FyZENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL3NlcnZpY2VzL2V2YWx1YXRpb25TZXJ2aWNlLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbnNDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUN0cmwuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL3NlcnZpY2VzL2V2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuanMiLCJIb21lL0NvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiSW5kZXgvY29udHJvbGxlcnMvaW5kZXhDdHJsLmpzIiwiSW5kZXgvc2VydmljZXMvaW5kZXhTZXJ2aWNlLmpzIiwiU3R1ZGVudC9jb250cm9sbGVycy9jcmVhdGVTdHVkZW50Q29udHJvbGxlci5qcyIsIlN0dWRlbnQvc2VydmljZXMvc3R1ZGVudFNlcnZpY2UuanMiLCJMb2dpbi9jb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJMb2dpbi9mYWN0b3JpZXMvYXV0aEludGVyY2VwdG9yRmFjdG9yeS5qcyIsIkxvZ2luL1NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uU2VydmljZS5qcyIsIlRlYWNoZXIvc2VydmljZXMvdGVhY2hlclNlcnZpY2UuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL2FkZENvdXJzZU1vZGFsQ29udHJvbGxlci5qcyIsIlRlYWNoZXIvY29udHJvbGxlcnMvbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIuanMiLCJTdHVkeVBsYW4vY29udHJvbGxlcnMvbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9jb250cm9sbGVycy9zZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXIuanMiLCJTdHVkeVBsYW4vc2VydmljZXMvU3R1ZHlQbGFuU2VydmljZS5qcyIsInp6emNvcHlNZS9jb250cm9sbGVycy9yZXBsYWNlQ3RybC5qcyIsInp6emNvcHlNZS9zZXJ2aWNlcy9yZXBsYWNlU2VydmljZS5qcyIsImRhc2hib2FyZC9jb250cm9sbGVycy9wYXJ0aWFscy9jYWxlbmRhckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxNQUFNLFFBQVEsT0FBTyxPQUFPLENBQUMsV0FBVyxVQUFVLGFBQWEsZ0JBQWdCLHNCQUFzQixZQUFZLGVBQWUsYUFBYSxlQUFlLGFBQWEsZUFBZSwwQkFBMEIsa0JBQWtCLGlCQUFpQix1QkFBdUIsV0FB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QU87UUFDWCxJQUFJLGdCQUFnQixxQkFBcUI7Ozs7Ozs7Ozs7UUFVekMsSUFBSSxPQUFPLFdBQVc7Ozs7UUFJdEI7Ozs7SUFJSixPQUFPLFFBQVEsZUFBZTtHQUMvQixRQUFRLE9BQU8sdUJBQXVCO0FDdkJ6QyxDQUFDLFVBQVUsUUFBUTtJQUNmOzs7SUFFQSxTQUFTLG1CQUFtQixRQUFRLFdBQVcsa0JBQWtCO1FBQzdELElBQUksT0FBTzs7Ozs7Ozs7UUFRWCxPQUFPLGNBQWM7O1FBRXJCLE9BQU8sd0JBQXdCLFNBQVMsWUFBWSxPQUFPO1lBQ3ZELE9BQU8scUJBQXFCO1lBQzVCLE9BQU8sY0FBYzs7O1FBR3pCLE9BQU8sa0JBQWtCLFdBQVc7WUFDaEMsVUFBVSxLQUFLLGlCQUFpQixPQUFPLG1CQUFtQjs7OztRQUk5RCxJQUFJLE9BQU8sV0FBVztZQUNsQixpQkFBaUIscUJBQXFCLEtBQUssU0FBUyxhQUFhO2dCQUM3RCxPQUFPLHFCQUFxQjs7OztRQUlwQzs7O0lBR0osT0FBTyxXQUFXLHNCQUFzQjtHQUN6QyxRQUFRLE9BQU8sa0JBQWtCIiwiZmlsZSI6ImNvbmNhdEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyduZ1JvdXRlJywgJ3RvYXN0cicsICduZ0FuaW1hdGUnLCBcInVpLmJvb3RzdHJhcFwiLCAnTG9jYWxTdG9yYWdlTW9kdWxlJywgJ2FwcC5ob21lJywgJ2FwcC5jbGFzc2VzJywgJ2FwcC5sb2dpbicsICdhcHAuYWNjb3VudCcsICdhcHAuaW5kZXgnLCAnYXBwLnN0dWRlbnQnLCAnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScsICdhcHAuZXZhbHVhdGlvbicsICdhcHAuZGFzaGJvYXJkJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInLCAnbmdUb3VjaCcsICdhcHAudGVhY2hlcicsICdhcHAuY291cnNlJywgJ2FwcC5zdHVkeVBsYW4nXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyLCB0b2FzdHJDb25maWcpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgYW5ndWxhci5leHRlbmQodG9hc3RyQ29uZmlnLCB7XHJcbiAgICAgICAgICAgIGF1dG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250YWluZXJJZDogJ3RvYXN0LWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIG1heE9wZW5lZDogMTAsXHJcbiAgICAgICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcclxuICAgICAgICAgICAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgICAgICB0YXJnZXQ6ICdib2R5JyxcclxuXHJcbiAgICAgICAgICAgIGFsbG93SHRtbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xvc2VIdG1sOiAnPGJ1dHRvbj4mdGltZXM7PC9idXR0b24+JyxcclxuICAgICAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxyXG4gICAgICAgICAgICBpY29uQ2xhc3Nlczoge1xyXG4gICAgICAgICAgICAgICAgZXJyb3I6ICd0b2FzdC1lcnJvcicsXHJcbiAgICAgICAgICAgICAgICBpbmZvOiAndG9hc3QtaW5mbycsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nOiAndG9hc3Qtd2FybmluZydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWVzc2FnZUNsYXNzOiAndG9hc3QtbWVzc2FnZScsXHJcbiAgICAgICAgICAgIG9uSGlkZGVuOiBudWxsLFxyXG4gICAgICAgICAgICBvblNob3duOiBudWxsLFxyXG4gICAgICAgICAgICBvblRhcDogbnVsbCxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxyXG4gICAgICAgICAgICB0YXBUb0Rpc21pc3M6IHRydWUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgICAgICAgICAgdG9hc3Q6ICdkaXJlY3RpdmVzL3RvYXN0L3RvYXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NiYXI6ICdkaXJlY3RpdmVzL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmh0bWwnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpbWVPdXQ6IDQwMDAsXHJcbiAgICAgICAgICAgIHRpdGxlQ2xhc3M6ICd0b2FzdC10aXRsZScsXHJcbiAgICAgICAgICAgIHRvYXN0Q2xhc3M6ICd0b2FzdCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRwcm92aWRlLCAkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkcHJvdmlkZS5mYWN0b3J5KCdlcnJvckludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRxLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAvL3ZhciB0b2FzdHIgPSAkaW5qZWN0b3IuZ2V0KCd0b2FzdHInKTtcclxuICAgICAgICAgICAgICAgLy8gdG9hc3RyLmVycm9yKCdGb3V0JywgcmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZVNlcnZpY2UgPSAkaW5qZWN0b3IuZ2V0KCdtZXNzYWdlU2VydmljZScpO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlU2VydmljZS5oYW5kbGVSZWplY3QocmVqZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnZXJyb3JJbnRlcmNlcHRvcicpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VBY2NvdW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0FjY291bnQvdmlld3MvbWFuYWdlQWNjb3VudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQWNjb3VudENvbnRyb2xsZXInXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgXHJcblxyXG5cclxuICAgIH0pO1xyXG4iLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NsYXNzZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NsYXNzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGZ1bmN0aW9uKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yVGVhY2hlcigpLnRoZW4oZnVuY3Rpb24oY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUNsYXNzZXMnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9tYW5hZ2VDbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9tYW5hZ2VDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUNvdXJzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgLndoZW4oJy9jb3Vyc2VzJywge1xyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NvdXJzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NyZWF0ZUNvdXJzZScsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9jcmVhdGVDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ291cnNlQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbi86YnVuZGxlSWQ/Jywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25TZXJ2aWNlLCAkcm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bmRsZUlkID0gJHJvdXRlLmN1cnJlbnQucGFyYW1zLmJ1bmRsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblNlcnZpY2UuZXZhbHVhdGlvbnNGb3JCdW5kbGUoYnVuZGxlSWQpLnRoZW4oZnVuY3Rpb24gKGV2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9ucycsIHtcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9ucy5odG1sJyxcclxuICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvZXZhbHVhdGlvblRlbXBsYXRlcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oICcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb250cm9sbGVycy9jcmVhdGVTdHVkZW50Q29udHJvbGxlci5qc1wiIC8+XHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZGVudCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL2NyZWF0ZVN0dWRlbnQnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvU3R1ZGVudC92aWV3cy9jcmVhdGVTdHVkZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVTdHVkZW50Q29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2xvZ2luJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbG9naW4vdmlld3MvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5Db250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbmFwcC5ydW4oWydhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbiAoYXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0QXV0aERhdGEoKTtcclxufV0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAudGVhY2hlcicsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZVRlYWNoZXInLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvVGVhY2hlci92aWV3cy9tYW5hZ2VUZWFjaGVyLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICB0ZWFjaGVycyA6IGZ1bmN0aW9uKHRlYWNoZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVhY2hlclNlcnZpY2UudGVhY2hlcnMoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VTdHVkeVBsYW4nLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvU3R1ZHlQbGFuL3ZpZXdzL21hbmFnZVN0dWR5UGxhbi5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnJlcGxhY2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAvLyRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy8gIC53aGVuKCcvcmVwbGFjZScsIHtcclxuICAgICAgICAvLyAgICAgIHRlbXBsYXRlVXJsOiAndmlldyBIZXJlJyxcclxuICAgICAgICAvLyAgICAgIGNvbnRyb2xsZXI6ICdjb250cm9sbGVyIGZvciB2aWV3IGhlcmUnXHJcbiAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCBhY2NvdW50U2VydmljZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgbWVzc2FnZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0QWNjb3VudFJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSByb2xlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gcm9lcCBoaWVyIGRlIGFjY291bnRzZXJ2aWNlIG9wIG9tIGVlbiBuaWV1d2UgYWNjb3VudCB0ZSBtYWtlbiBtZXQgZGUgZGF0YSBkaWUgdmlhIGRlIHZpZXcgaXMgaW5nZXZ1bGQuXHJcbiAgICAgICAgICAgIC8vIGdlZWYgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvIG1lZSBpbiBpbiBkZSBhY2NvdW50U2VydmljZSBtZXRob2RlLlxyXG4gICAgICAgICAgICAvLy50aGVuIG9tIHRlIHdhY2h0ZW4gdG90ZGF0IGRlIHNlcnZlciBnZWFudHdvb3JkIGhlZWZ0XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmNyZWF0ZUFjY291bnQoJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIkFjY291bnQgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTsgLy8gZ2VicnVpayBkaXQgaW4gdGhlIC50aGVuIGZ1bmN0aWUgem9kYXQgZGUgbW9kYWwgc2x1aXQgbmEgZGUgc2VydmVyY2FsbC5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mbyA9IHt9OyAvLyBnZWJydWlrIGRpdCBvbSBhbGxlIGluZm8gYWFuIHRlIGhhbmdlbiBpbiBkZSB2aWV3IChkaXQgbW9kZWwgbW9ldCBqZSBzZXJ2ZXJzaWRlIG5vZyBvcGJvdXdlbilcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvLnJvbGVUeXBlID0gXCJVc2VyUm9sZVwiO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8uaXNUZWFjaGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VBY2NvdW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYWNjb3VudFNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gY3RybCArIGggcmVwbGFjZSBhbGxlIGNvbnRyb2xsZXJuYW1lbiBkb29yIGh1aWRpZ2UgY29udHJvbGxlclxyXG4gICAgICAgIC8vIHZlcnZhbmcgYXBwLnJlcGxhY2UgZG9vciBkZSBqdWlzdGUgbW9kdWxlIGluIGRpdCBnZXZhbCBhcHAuYWNjb3VudCBzdGFhdCBpbiBhY2NvdW50LW1vZHVsZS5qc1xyXG5cclxuICAgICAgICAvL2NvbnRyb2xsZXIgaW4gaW5kZXguaHRtbCBzbGVwZW4vdG9ldm9lZ2VuIG9uZGVyYWFuIGJpaiBzY3JpcHRzIGNvbnRyb2xsZXJzXHJcblxyXG4gICAgICAgIC8vdmlldyBhYW5tYWtlbiBrb3BpZWVyIHVpdCBjb3B5IGZvbGRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGluIG1vZHVsZSBhY2NvdW50LW1vZHVsZSByb3V0ZSBhYW5tYWtlbiAoJHJvdXRlUHJvdmlkZXIpXHJcblxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBzZWxlY3RlcmVuIHZhbiByaWogaW4gYWNjb3VudHN0YWJlbFxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQWNjb3VudCA9IGZ1bmN0aW9uIChhY2NvdW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gYWNjb3VudDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0FjY291bnQvdmlld3MvY3JlYXRlQWNjb3VudE1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8vIG5pZXRzIGRvb3IgdGUgZ2V2ZW4uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY2NvdW50U2VydmljZS5nZXRBY2NvdW50cygpLnRoZW4oZnVuY3Rpb24gKGFjY291bnRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQWNjb3VudENvbnRyb2xsZXInLCBtYW5hZ2VBY2NvdW50Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gYWNjb3VudFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlUGF0aCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3RoaXouY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAoY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jaGFuZ2VwYXNzd29yZCcsIGNoYW5nZVBhc3N3b3JkQmluZGluZ01vZGVsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3RoaXouY3JlYXRlVGVzdEFjY291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIGNyZWF0ZVVzZXJNb2RlbCA9IHtcclxuICAgICAgICAvLyAgICAgICAgdXNlcm5hbWU6IFwiVGVzdGVyXCIsXHJcbiAgICAgICAgLy8gICAgICAgIGVtYWlsOiBcImJlcm5kdmVydG9tbWVuQG1zbi5jb21cIixcclxuICAgICAgICAvLyAgICAgICAgZmlyc3ROYW1lOiBcIlRlc3RcIixcclxuICAgICAgICAvLyAgICAgICAgbGFzdG5hbWU6IFwiZXJcIixcclxuICAgICAgICAvLyAgICAgICAgcGFzc3dvcmQ6IFwiQERtaW4xMjNcIixcclxuICAgICAgICAvLyAgICAgICAgY29uZmlybVBhc3N3b3JkIDpcIkBEbWluMTIzXCJcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuICRodHRwLnBvc3QoY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGggKyAnYWNjb3VudHMvY3JlYXRlVGVzdGVyJywgY3JlYXRlVXNlck1vZGVsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmlldXdlIG1ldGhvZGUgb20gYWNjb3VudCB0ZSBjcmVlZXJlbiBhYW5nZW1hYWt0XHJcbiAgICAgICAgdGhpei5jcmVhdGVBY2NvdW50ID0gZnVuY3Rpb24oY3JlYXRlQWNjb3VudEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVBhdGggKyAnYWNjb3VudHMvY3JlYXRlQWNjb3VudCcsIGNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY3JlZWVyIGhpZXIgZGUgbWV0aG9kZSBkaWUgbmFhciBiaWogZGUgYWNjb3VudGNvbnRyb2xsZXIgY3JlYXRlQWNjb3VudCBnZWJydWlrdC5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnYWNjb3VudFNlcnZpY2UnLCBhY2NvdW50U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlndXJhdGlvblNlcnZpY2UoJGh0dHAsIHRvYXN0ckNvbmZpZykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGFwaVVybCA9ICdodHRwOi8vdGVzdHBsYXRmb3JtQXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXouYmFzZUFwaVBhdGggPSBhcGlVcmwgKyAnYXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXoudG9rZW5QYXRoID0gYXBpVXJsICsgJ29hdXRoL3Rva2VuJztcclxuXHJcbiAgICAgICAgdGhpei5nZXRTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRoaXouYmFzZUFwaVBhdGggKyBcIi9nZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFyc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvbmZpZ3VyYXRpb25TZXJ2aWNlJywgY29uZmlndXJhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcicsIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGtsYXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZENsYXNzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJywgc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgZnVuY3Rpb24gdGVzdENsYXNzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmdldFRlc3RDbGFzcygpLnRoZW4oZnVuY3Rpb24gKGNsYXNzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RDbGFzcyA9IGNsYXNzUmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignVGVzdENsYXNzQ29udHJvbGxlcicsIHRlc3RDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsYXNzZXNTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yVGVhY2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvclRlYWNoZXInKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY2xhc3Nlc0ZvckNvdXJzZSA9IGZ1bmN0aW9uKGNvdXJzZUlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvckNvdXJzZScsIHsgJ2lkJzogY291cnNlSWQgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24odGVhY2hlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXInLCB7ICdpZCc6IHRlYWNoZXJJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjbGFzc2VzU2VydmljZScsIGNsYXNzZXNTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjb3Vyc2VDb250cm9sbGVyJywgY291cnNlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ291cnNlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlU2VydmljZSwgJHVpYk1vZGFsLCBzdHVkeVBsYW5TZXJ2aWNlLCB0b2FzdHIpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKTtcclxuICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9tYW5hZ2VDb3Vyc2VcIjsgLy9iaWogbG9jYXRpb24ucGF0aCBnZWVuICMgYmlqZG9lblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvdXJzZVNlcnZpY2UuY3JlYXRlQ291cnNlKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoXCJDdXJzdXMgYWFuZ2VtYWFrdC5cIik7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDb3Vyc2VcIik7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuU3R1ZHlwbGFuTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvU3R1ZHlQbGFuL3ZpZXdzL3NlbGVjdFN0dWR5UGxhbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0dWR5cGxhbnM6IHN0dWR5UGxhblNlcnZpY2UuZ2V0U3R1ZHlQbGFucygpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZFN0dWR5UGxhbikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8uc3R1ZHlQbGFuID0gc2VsZWN0ZWRTdHVkeVBsYW47XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIGdlZW4gU3R1ZHlwbGFuIGdlc2VsZWN0ZWVyZCBlcnJvcj8gaGllciBrb20gamUgaW4gYWxzIGplIG5pa3Mgc2VsZWN0ZWVyZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mbyA9IHt9O1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVDb3Vyc2VDb250cm9sbGVyJywgY3JlYXRlQ291cnNlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ291cnNlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZUNvdXJzZUNvbnRyb2xsZXInLCBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvdXJzZVNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZ2V0Q291cnNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImNvdXJzZXMvY291cnNlc0ZvclRlYWNoZXJcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5hbGxDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9hbGxDb3Vyc2VzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlQ291cnNlID0gZnVuY3Rpb24gKGNyZWF0ZUNvdXJzZUluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jcmVhdGVDb3Vyc2VcIiwgY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjb3Vyc2VTZXJ2aWNlJywgY291cnNlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVzc2FnZVNlcnZpY2UodG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGl6LmhhbmRsZVJlamVjdCA9IGhhbmRsZVJlamVjdDtcclxuICAgICAgICB0aGl6LmhhbmRsZVN1Y2NlcyA9IGhhbmRsZVN1Y2NlcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UsICdGb3V0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVTdWNjZXModGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3ModGV4dCwgdGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ21lc3NhZ2VTZXJ2aWNlJywgbWVzc2FnZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LnBsYW5uZWRFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImV2YWx1YXRpb24vcGxhbm5lZEV2YWx1YXRpb25zXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2Rhc2hib2FyZFNlcnZpY2UnLCBkYXNoYm9hcmRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBkYXNoYm9hcmRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuY2FsZW5kZXJQYXRoID0gJ2FwcC9kYXNoYm9hcmQvdmlld3MvcGFydGlhbHMvY2FsZW5kYXJQYXJ0aWFsLmh0bWwnO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2Rhc2hib2FyZENvbnRyb2xsZXInLCBkYXNoYm9hcmRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmV2YWx1YXRpb25zRm9yQnVuZGxlID0gZnVuY3Rpb24oYnVuZGxlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2V2YWx1YXRpb25zRm9yQnVuZGxlJywgeyAnaWQnOiBidW5kbGVJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVFdmFsdWF0aW9uID0gZnVuY3Rpb24oZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vdXBkYXRlRXZhbHVhdGlvbicsIGV2YWx1YXRpb24pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3VwZGF0ZUV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouc2VhcmNoRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9zZWFyY2hFdmFsdWF0aW9ucycsIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucycsIGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCwgeyByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdldmFsdWF0aW9uU2VydmljZScsIGV2YWx1YXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlLCBldmFsdWF0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcygpOyAvLyBmaW5kIG90aGVyIHNvbHV0aW9uIHRvIG1hcCBzY29yZXMgbm90IG9uIGV2cnkgc2VsZWN0LlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTY29yZSA9IGZ1bmN0aW9uIChldmFsdWF0aW9uSXRlbSwgc2NvcmUpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbkl0ZW0uc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbigkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhFdmEgPSBfLmZpbmRJbmRleCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkID09PSBldmFsdWF0aW9uLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zW2luZGV4RXZhXSA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBoYXNoa2V5ID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXk7XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleSA9IGhhc2hrZXk7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVwZGF0ZUV2YWx1YXRpb25zKCRzY29wZS5ldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Tm90U2NvcmVkUmVhc29uID0gZnVuY3Rpb24oZXZhbHVhdGlvbml0ZW0sIG51bWJlcikge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5ub3RTY29yZWRSZWFzb24gPSBudW1iZXI7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25pdGVtLnNjb3JlID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLmdyb3VwQnkoZXZhbHVhdGlvbi5ldmFsdWF0aW9uSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZXZhbHVhdGlvblN1YlNlY3Rpb24uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5zb3J0QnkoZGlmZmVyZW50U3Vic2VjdGlvbnMsIGZ1bmN0aW9uKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vLy8gdmFyIHZhbHVlID0gb2JqZWN0W2tleV0gPT4gdXNlIGRpY3Rpb25hcnkgZnJvbSBjIyB0aGlzIHdheVxyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1YnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCkgJiYgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnRvdGFsU2NvcmUgPSAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdC50b3RhbHNQZXJjYXRlZ29yeVtzdWJzZWN0aW9uWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLmlkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1hcCBldmVyeSBldmFsdWF0aW9uIG5vdCBqdXN0IHNlbGVjdGVkIHNvIGl0IGNhbiBiZSBwcm9jZXNlZCBpbiBpbnQoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzVGl0bGUgPSBldmFsdWF0aW9uc1swXS5jcmVhdGVkRm9yQ2xhc3MuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25Db250cm9sbGVyJywgZXZhbHVhdGlvbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZXMsIGNsYXNzZXMsIGV2YWx1YXRpb25TZXJ2aWNlLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbihrbGFzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gJHNjb3BlLnNlbGVjdGVkQ2xhc3MuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdGFydERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmZpbmlzaGVkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudEZpcnN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudExhc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5zZWFyY2hFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQuZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG90YWxJdGVtcyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC50b3RhbEl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zVG9QZGYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb25zVG9QZGZNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvbnM7IC8vIG1heWJlIGRvIGEgc2VhcmNoIGFnYWluIHdpdGggbW9yZSBpdGVtcyBwYWdlZD9cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkRXZhbHVhdGlvbklkcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QuRXZhbHVhdGlvbklkcyA9IHNlbGVjdGVkRXZhbHVhdGlvbklkcztcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cub3BlbihcImRhdGE6YXBwbGljYXRpb24vcGRmO2Jhc2U2NCwgXCIgKyByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbcmVzdWx0LmRhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9wZGYnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZmlsZSwgJ2ZpbGVOYW1lLnBkZicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVBcyhmaWxlLCAnZmlsZW5hbWUucGRmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9ucywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgdmFyIGdldFNlbGVjdGVkSWRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1hcCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2YS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKGdldFNlbGVjdGVkSWRzKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGV2YWx1YXRpb25UZW1wbGF0ZSwgY2xhc3Nlc0ZvckNvdXJzZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vIGRhdGVwaWNrZXJcclxuICAgICAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cy5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoLCBkYXkpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQuZXZhbHVhdGlvbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF5OiAxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZW5kIGRhdGVwaWNrZXJcclxuXHJcbiAgICAgICAgLy9zY2hvb2x5ZWFyIGRyb3Bkb3duXHJcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgaXNvcGVuOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMuaXNvcGVuID0gISRzY29wZS5zdGF0dXMuaXNvcGVuO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ge307XHJcbiAgICAgICAgJHNjb3BlLnNldENsYXNzID0gZnVuY3Rpb24gKGNsYXNzRm9yQ291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmNsYXNzSWQgPSBjbGFzc0ZvckNvdXJzZS5pZDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBjbGFzc0ZvckNvdXJzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vZW5kIHNjaG9vbHllYXIgZHJvcGRvd25cclxuXHJcbiAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vbWFrZSBjYWxsIGhlcmVcclxuICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSgkc2NvcGUuY3JlYXRlQ29tbWFuZCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdvaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXNGb3JDb3Vyc2UgPSBjbGFzc2VzRm9yQ291cnNlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSBldmFsdWF0aW9uVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kID0ge1xyXG4gICAgICAgICAgICAgICAgRXZhbHVhdGlvblRlbXBsYXRlSWQ6IGV2YWx1YXRpb25UZW1wbGF0ZS5pZCxcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25EYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBjbGFzc0lkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLCBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gW107XHJcbiAgICAgICAgJHNjb3BlLnRhYnMgPSAxO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNhdmVUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGRldmVsb3AgdmFsaWRhdGlvbiBhbmQgYWRqdXN0IDEwMCBwZXJzY2VudCBjb2RlLlxyXG4gICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmNyZWF0ZVRlbXBsYXRlKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2V2YWx1YXRpb25UZW1wbGF0ZXMnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmFsT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAnZGVzY3JpcHRpb24nOiBcIlwiLCAnY291cnNlJzogbnVsbCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKGdlbmVyYWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uID0gZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSA9IGdlbmVyYWxPcHRpb25zLmNvdXJzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuU3ViU2VjdGlvbnMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uU3ViU2VjdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViU2VjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUb3RhbFdlaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5pbmRleE9mKHN1YlNlY3Rpb24pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR29hbHMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVHb2FsczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hvc2VuR29hbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN1YlNlY3Rpb24uZ29hbHMsIGZ1bmN0aW9uKGdvYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5Hb2Fscy5wdXNoKGdvYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF2aWFsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hvc2VuR29hbHMubGVuZ3RoID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmlhbGFibGVHb2FscyA9IF8ucmVqZWN0KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlLCBmdW5jdGlvbiAoZ29hbEZyb21Db3Vyc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5Hb2FscyA9IF8uYW55KGNob3NlbkdvYWxzLCBmdW5jdGlvbiAoZ29hbGZyb21TdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdvYWxGcm9tQ291cnNlLmlkID09PSBnb2FsZnJvbVN1Yi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5Hb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHM9ICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb2VsIHRvZWdldm9lZ2RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlR29hbCA9IGZ1bmN0aW9uKHN1YnNlY3Rpb24sIGdvYWwpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3Vic2VjdGlvbi5nb2Fscy5pbmRleE9mKGdvYWwpO1xyXG4gICAgICAgICAgICBzdWJzZWN0aW9uLmdvYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG90YWxQZXJjZW50YWdlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudGFnZSArPSBwYXJzZUludChzdWJTZWN0aW9uLndlaWdodCwxMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24pICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IG51bGwgJiYgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjQ291cnNlUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UpICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2UgPT09IDEwMCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0dvYWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbmVHb2FsU2V0ID0gXy5hbnkoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpICYmIHN1YlNlY3Rpb24uZ29hbHMubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvbmVHb2FsU2V0ID8gMjUgOiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0Rlc2NyaXB0aW9uUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0NvdXJzZVBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNHb2FsUG9pbnRzKCk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVzLCAkdWliTW9kYWwsIGNsYXNzZXNTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzRm9yQ291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yQ291cnNlKCRzY29wZS5zZWxlY3RlZFRlbXBsYXRlLmNvdXJzZS5pZCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuaGlkZVNlbGVjdGVkVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlc1RvSGlkZSA9IFtdO1xyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZXMsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlLmNoZWNrSGlkZGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVzVG9IaWRlLnB1c2godGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZXNUb0hpZGUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuaGlkZVNlbGVjdGVkVGVtcGxhdGVzKHRlbXBsYXRlc1RvSGlkZSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRlbXBsYXRlc1RvSGlkZSwgZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmhpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZXMgPSBldmFsdWF0aW9uVGVtcGxhdGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHN1YlNlY3Rpb24sIGNvdXJzZSwgYXZhaWxhYmxlR29hbHMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmdvYWxzRmlsdGVyID0ge307XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDsgXHJcbiAgICAgIFxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEdvYWwgPSBmdW5jdGlvbiAoZ29hbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkR29hbCA9IGdvYWw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXouQWRkR29hbFRvTmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoc3ViU2VjdGlvbi5nb2FscykgfHwgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uLmdvYWxzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2FscyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5wdXNoKCRzY29wZS5zZWxlY3RlZEdvYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkR29hbCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uID0gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUdvYWxzID0gYXZhaWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBjdXJyZW50VG90YWxXZWlnaHQsIGNvdXJzZSwgc3ViU2VjdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5wdXNoKGFuZ3VsYXIuY29weSgkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0KSB8fCAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGVycm9yIG1lc3NhZ2UgaGVyZSA6IG5vIHdlaWd0aCBlbnRlcmVkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5pc0VkaXRpbmcpIHx8ICRzY29wZS5pc0VkaXRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGl6LmFkZG5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMgPSBldmFsdWF0aW9uU3ViU2VjdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VG90YWxXZWlnaHQgPSBjdXJyZW50VG90YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uKSAmJiBzdWJTZWN0aW9uICE9PW51bGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5uZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgZ2VuZXJhbE9wdGlvbnMsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24pIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gcmVwbGFjZSB3aXRoIGVycm9yIG1ldGhvZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UpIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gcmVwbGFjZSB3aXRoIGVycm9yIG1ldGhvZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5nZW5lcmFsT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5nZW5lcmFsT3B0aW9ucyA9IGdlbmVyYWxPcHRpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyJywgZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldENyZWF0ZUV2YWx1YXRpb25PcHRpb25zJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKGV2YWx1YXRpb25UZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9jcmVhdGVUZW1wbGF0ZScsIGV2YWx1YXRpb25UZW1wbGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvZ2V0RXZhbHVhdGlvblRlbXBsYXRlcycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZScsIGNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouaGlkZVNlbGVjdGVkVGVtcGxhdGVzID0gZnVuY3Rpb24odGVtcGxhdGVzSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2hpZGVUZW1wbGF0ZXMnLCB0ZW1wbGF0ZXNJZHMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlJywgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhvbWVDb250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIldlbGtvbVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGhvbWVDb250cm9sbGVyKTtcclxuXHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScpKTtcclxuXHJcblxyXG4iLCIoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsICRyb290U2NvcGUpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9nT3V0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdXNlck5hbWUgPSBhdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck5hbWU7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh1c2VyTmFtZSkgJiYgdXNlck5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLGZ1bmN0aW9uIChldmVudCxkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IGRhdGEudXNlck5hbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3VzZXJMb2dnZWRPdXQnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignaW5kZXhDb250cm9sbGVyJywgaW5kZXhDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2aWNlTmFtZScsIGluZGV4U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIkhlbGxvIHdvcmxkXCI7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJywgY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIihmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGF1dGhlbnRpY2F0aW9uU2VydmljZSx0b2FzdHIpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUucGFzc3dvcmQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXN0VGl0bGUgPSBcIlRlc3RUaXRsZVwiO1xyXG5cclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiVnVsIGFsbGUgdmVsZGVuIGluIGF1Yi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnVzZXJOYW1lKSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxvZ2luRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiAkc2NvcGUudXNlck5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dpbihsb2dpbkRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ob21lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgbG9naW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicpKTsiLCJcclxuJ3VzZSBzdHJpY3QnO1xyXG5hcHAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScsIFsnJHEnLCAnJGxvY2F0aW9uJyxcclxuJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHEsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSkge1xyXG5cclxuICAgIHZhciBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5ID0ge307XHJcblxyXG4gICAgdmFyIF9yZXF1ZXN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cclxuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3Jlc3BvbnNlRXJyb3IgPSBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlcXVlc3QgPSBfcmVxdWVzdDtcclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVzcG9uc2VFcnJvciA9IF9yZXNwb25zZUVycm9yO1xyXG5cclxuICAgIHJldHVybiBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5O1xyXG59XSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXoubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkT3V0Jywge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXCJncmFudF90eXBlPXBhc3N3b3JkJnVzZXJuYW1lPVwiICtcclxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YS51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgbG9naW5EYXRhLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS50b2tlblBhdGgsIGRhdGEsIHsgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sIHVzZXJOYW1lOiBsb2dpbkRhdGEudXNlck5hbWUsIGV4cGlyZXM6IHJlc3BvbnNlLmRhdGEuZXhwaXJlc19pbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gbG9naW5EYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZEluJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGl6LnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEF1dGhEYXRhID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGF1dGhEYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBhdXRoZW50aWNhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZWFjaGVyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlID0gZnVuY3Rpb24oYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDb3Vyc2UnLCBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoudGVhY2hlcnMgPSBmdW5jdGlvbigpIHsgLy8gdXNlIHF1ZXJ5IG9iamVjdCBpbiBmdXR1cmUgY2hhbmdlIG1ldGhvZCB0byBwb3N0IHRoZW4gcHJvYmFibHlcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICcvdGVhY2hlci90ZWFjaGVycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDbGFzcyA9IGZ1bmN0aW9uKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDbGFzcycsIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3RlYWNoZXJTZXJ2aWNlJywgdGVhY2hlclNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlYWNoZXJTZXJ2aWNlLCB0ZWFjaGVyLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZENvdXJzZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kPXt9O1xyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9IHRlYWNoZXIuaWQ7IFxyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLmNvdXJzZUlkPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQgO1xyXG5cclxuICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ291cnNlKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLnRlYWNoZXIgPSB0ZWFjaGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZWFjaGVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXInLCBhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIHRlYWNoZXJTZXJ2aWNlLCAkdWliTW9kYWwsIHRlYWNoZXJzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVhY2hlciA9IGZ1bmN0aW9uICh0ZWFjaGVyLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9wZW5Db3Vyc2VzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1RlYWNoZXIvdmlld3MvYWRkQ291cnNlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVhY2hlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkNsYXNzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9zZWxlY3RDbGFzc2VzTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyKCRzY29wZS5zZWxlY3RlZFRlYWNoZXIuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC50ZWFjaGVySWQgPSAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kLmNsYXNzSWQgPSBzZWxlY3RlZENsYXNzLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmFkZENsYXNzKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdWNjZXMgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvciB0b2FzdGVyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vdGVhY2hlclNlcnZpY2UuZ2V0QWNjb3VudHMoKS50aGVuKGZ1bmN0aW9uIChhY2NvdW50cykge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVycyA9IHRlYWNoZXJzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudGVhY2hlcnMpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJywgbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcicsIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgJHVpYk1vZGFsSW5zdGFuY2UsIHN0dWR5cGxhbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFN0dWR5cGxhbiA9IGZ1bmN0aW9uIChzdHVkeXBsYW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbiA9IHN0dWR5cGxhbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBub2cgY2hlY2tlbiBvcCBnZWVuIHJlc3VsdGFhdCBnZXNlbGVjdGVlcmRcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkU3R1ZHlwbGFuKTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcyhcImNhbmNlbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBzdHVkeXBsYW5zO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdHVkeXBsYW5zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcicsIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBzdHVkeVBsYW5TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc3R1ZHlQbGFuU2VydmljZScsIHN0dWR5UGxhblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXJOYW1lKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgLy8gdGVzdGd1bHBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjb250cm9sbGVyTmFtZScsIGNvbnRyb2xsZXJOYW1lKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5yZXBsYWNlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlcnZpY2VOYW1lKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3Rlc3RndWxwXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2aWNlTmFtZScsIHNlcnZpY2VOYW1lKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5yZXBsYWNlJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZGFzaGJvYXJkU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnN0YXJ0RXZhbHVhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ldmFsdWF0aW9uL1wiICsgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5idW5kbGVJZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRhc2hib2FyZFNlcnZpY2UucGxhbm5lZEV2YWx1YXRpb25zKCkudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBsYW5uZWRFdmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY2FsZW5kYXJDb250cm9sbGVyJywgY2FsZW5kYXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
