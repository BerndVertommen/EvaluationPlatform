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
            progressBar: true,
            tapToDismiss: true,
            templates: {
                toast: 'directives/toast/toast.html',
                progressbar: 'directives/progressbar/progressbar.html'
            },
            timeOut: 2000,
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

                var errorMessageService = $injector.get('errorMessageService');
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

(function (module) {
    'use strict';

    createAccountModalController.$inject = ["$scope", "accountService", "$location", "$uibModalInstance"];
    function createAccountModalController($scope, accountService, $location, $uibModalInstance) {
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

    createCourseController.$inject = ["$scope", "$location", "courseService", "$uibModal", "studyPlanService"];
    function createCourseController($scope, $location, courseService, $uibModal, studyPlanService) {
        var thiz = this;

        //Variables

        //private Functions

        //public functions
        $scope.cancel = function () {

            $location.path("/manageCourse");
            //window.location.href = "#/manageCourse"; //bij location.path geen # bijdoen
        }

        $scope.ok = function () {
            courseService.createCourse($scope.createCourseInfo).then(function () { $location.path("/manageCourse") });
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
            modalInstance.result.then(function(selectedStudyPlan) {
                $scope.createCourseInfo.studyPlan = selectedStudyPlan;
            }, function() {
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
(function (module) {
    'use strict';

    errorMessageService.$inject = ["toastr"];
    function errorMessageService(toastr) {
        var thiz = this;

        thiz.handleReject = handleReject;

        function handleReject(rejection) {

            if (rejection.status === 500) {
                toastr.error('Fout', rejection.data.exceptionMessage);
            }
        }
    }

module.service('errorMessageService', errorMessageService);
})(angular.module('app')); //test
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJkYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZS5qcyIsImV2YWx1YXRpb24vZXZhbHVhdGlvbi1tb2R1bGUuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvZXZhbHVhdGlvblRlbXBsYXRlLW1vZHVsZS5qcyIsImhvbWUvaG9tZS1tb2R1bGUuanMiLCJJbmRleC9pbmRleC1tb2R1bGUuanMiLCJsb2dpbi9sb2dpbi1tb2R1bGUuanMiLCJTdHVkeVBsYW4vc3R1ZHlQbGFuLW1vZHVsZS5qcyIsIlN0dWRlbnQvc3R1ZGVudC1tb2R1bGUuanMiLCJUZWFjaGVyL3RlYWNoZXItbW9kdWxlLmpzIiwienp6Y29weU1lL3JlcGxhY2UtbW9kdWxlLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9jcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9tYW5hZ2VBY2NvdW50Q29udHJvbGxlci5qcyIsIkFjY291bnQvc2VydmljZXMvYWNjb3VudFNlcnZpY2UuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9tYW5hZ2VDbGFzc2VzQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL3Rlc3RDbGFzc0N0cmwuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jcmVhdGVDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL21hbmFnZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJjbGFzc2VzL3NlcnZpY2VzL2NsYXNzZXNTdmMuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJkYXNoYm9hcmQvc2VydmljZXMvZGFzaGJvYXJkU2VydmljZS5qcyIsImRhc2hib2FyZC9jb250cm9sbGVycy9kYXNoYm9hcmRDb250cm9sbGVyLmpzIiwiZXJyb3Ivc2VydmljZXMvZXJyb3JNZXNzYWdlU2VydmljZS5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbkNvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25zQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vc2VydmljZXMvZXZhbHVhdGlvblNlcnZpY2UuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ3RybC5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvc2VydmljZXMvZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5qcyIsImhvbWUvY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJJbmRleC9jb250cm9sbGVycy9pbmRleEN0cmwuanMiLCJJbmRleC9zZXJ2aWNlcy9pbmRleFNlcnZpY2UuanMiLCJsb2dpbi9mYWN0b3JpZXMvYXV0aEludGVyY2VwdG9yRmFjdG9yeS5qcyIsImxvZ2luL2NvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImxvZ2luL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uU2VydmljZS5qcyIsIlN0dWR5UGxhbi9jb250cm9sbGVycy9tYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9zZXJ2aWNlcy9TdHVkeVBsYW5TZXJ2aWNlLmpzIiwiU3R1ZGVudC9jb250cm9sbGVycy9jcmVhdGVTdHVkZW50Q29udHJvbGxlci5qcyIsIlN0dWRlbnQvc2VydmljZXMvc3R1ZGVudFNlcnZpY2UuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL2FkZENvdXJzZU1vZGFsQ29udHJvbGxlci5qcyIsIlRlYWNoZXIvY29udHJvbGxlcnMvbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIuanMiLCJUZWFjaGVyL3NlcnZpY2VzL3RlYWNoZXJTZXJ2aWNlLmpzIiwienp6Y29weU1lL2NvbnRyb2xsZXJzL3JlcGxhY2VDdHJsLmpzIiwienp6Y29weU1lL3NlcnZpY2VzL3JlcGxhY2VTZXJ2aWNlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL3BhcnRpYWxzL2NhbGVuZGFyQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLE1BQU0sUUFBUSxPQUFPLE9BQU8sQ0FBQyxXQUFXLFVBQVUsYUFBYSxnQkFBZ0Isc0JBQXNCLFlBQVksZUFBZSxhQUFhLGVBQWUsYUFBYSxlQUFlLDBCQUEwQixrQkFBa0IsaUJBQWlCLHVCQUF1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QUN2QnpDLENBQUMsVUFBVSxRQUFRO0lBQ2Y7OztJQUVBLFNBQVMsbUJBQW1CLFFBQVEsV0FBVyxrQkFBa0I7UUFDN0QsSUFBSSxPQUFPOzs7Ozs7OztRQVFYLE9BQU8sY0FBYzs7UUFFckIsT0FBTyx3QkFBd0IsU0FBUyxZQUFZLE9BQU87WUFDdkQsT0FBTyxxQkFBcUI7WUFDNUIsT0FBTyxjQUFjOzs7UUFHekIsT0FBTyxrQkFBa0IsV0FBVztZQUNoQyxVQUFVLEtBQUssaUJBQWlCLE9BQU8sbUJBQW1COzs7O1FBSTlELElBQUksT0FBTyxXQUFXO1lBQ2xCLGlCQUFpQixxQkFBcUIsS0FBSyxTQUFTLGFBQWE7Z0JBQzdELE9BQU8scUJBQXFCOzs7O1FBSXBDOzs7SUFHSixPQUFPLFdBQVcsc0JBQXNCO0dBQ3pDLFFBQVEsT0FBTyxrQkFBa0IiLCJmaWxlIjoiY29uY2F0QXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUm91dGUnLCAndG9hc3RyJywgJ25nQW5pbWF0ZScsIFwidWkuYm9vdHN0cmFwXCIsICdMb2NhbFN0b3JhZ2VNb2R1bGUnLCAnYXBwLmhvbWUnLCAnYXBwLmNsYXNzZXMnLCAnYXBwLmxvZ2luJywgJ2FwcC5hY2NvdW50JywgJ2FwcC5pbmRleCcsICdhcHAuc3R1ZGVudCcsICdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJywgJ2FwcC5ldmFsdWF0aW9uJywgJ2FwcC5kYXNoYm9hcmQnLCAnYW5ndWxhci1sb2FkaW5nLWJhcicsICduZ1RvdWNoJywgJ2FwcC50ZWFjaGVyJywgJ2FwcC5jb3Vyc2UnLCAnYXBwLnN0dWR5UGxhbiddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIsICRodHRwUHJvdmlkZXIsIHRvYXN0ckNvbmZpZykge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICBhbmd1bGFyLmV4dGVuZCh0b2FzdHJDb25maWcsIHtcclxuICAgICAgICAgICAgYXV0b0Rpc21pc3M6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRhaW5lcklkOiAndG9hc3QtY29udGFpbmVyJyxcclxuICAgICAgICAgICAgbWF4T3BlbmVkOiAxMCxcclxuICAgICAgICAgICAgbmV3ZXN0T25Ub3A6IHRydWUsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxyXG4gICAgICAgICAgICBwcmV2ZW50RHVwbGljYXRlczogZmFsc2UsXHJcbiAgICAgICAgICAgIHByZXZlbnRPcGVuRHVwbGljYXRlczogZmFsc2UsXHJcbiAgICAgICAgICAgIHRhcmdldDogJ2JvZHknLFxyXG5cclxuICAgICAgICAgICAgYWxsb3dIdG1sOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICBjbG9zZUh0bWw6ICc8YnV0dG9uPiZ0aW1lczs8L2J1dHRvbj4nLFxyXG4gICAgICAgICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDAsXHJcbiAgICAgICAgICAgIGljb25DbGFzc2VzOiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvcjogJ3RvYXN0LWVycm9yJyxcclxuICAgICAgICAgICAgICAgIGluZm86ICd0b2FzdC1pbmZvJyxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICd0b2FzdC1zdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIHdhcm5pbmc6ICd0b2FzdC13YXJuaW5nJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBtZXNzYWdlQ2xhc3M6ICd0b2FzdC1tZXNzYWdlJyxcclxuICAgICAgICAgICAgb25IaWRkZW46IG51bGwsXHJcbiAgICAgICAgICAgIG9uU2hvd246IG51bGwsXHJcbiAgICAgICAgICAgIG9uVGFwOiBudWxsLFxyXG4gICAgICAgICAgICBwcm9ncmVzc0JhcjogdHJ1ZSxcclxuICAgICAgICAgICAgdGFwVG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZXM6IHtcclxuICAgICAgICAgICAgICAgIHRvYXN0OiAnZGlyZWN0aXZlcy90b2FzdC90b2FzdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzYmFyOiAnZGlyZWN0aXZlcy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5odG1sJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aW1lT3V0OiAyMDAwLFxyXG4gICAgICAgICAgICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxyXG4gICAgICAgICAgICB0b2FzdENsYXNzOiAndG9hc3QnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkcHJvdmlkZSwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgJHByb3ZpZGUuZmFjdG9yeSgnZXJyb3JJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgLy92YXIgdG9hc3RyID0gJGluamVjdG9yLmdldCgndG9hc3RyJyk7XHJcbiAgICAgICAgICAgICAgIC8vIHRvYXN0ci5lcnJvcignRm91dCcsIHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2VTZXJ2aWNlID0gJGluamVjdG9yLmdldCgnZXJyb3JNZXNzYWdlU2VydmljZScpO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlU2VydmljZS5oYW5kbGVSZWplY3QocmVqZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnZXJyb3JJbnRlcmNlcHRvcicpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VBY2NvdW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0FjY291bnQvdmlld3MvbWFuYWdlQWNjb3VudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQWNjb3VudENvbnRyb2xsZXInXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgXHJcblxyXG5cclxuICAgIH0pO1xyXG4iLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NsYXNzZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NsYXNzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGZ1bmN0aW9uKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yVGVhY2hlcigpLnRoZW4oZnVuY3Rpb24oY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUNsYXNzZXMnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9tYW5hZ2VDbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9tYW5hZ2VDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUNvdXJzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgLndoZW4oJy9jb3Vyc2VzJywge1xyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NvdXJzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NyZWF0ZUNvdXJzZScsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9jcmVhdGVDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ291cnNlQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbi86YnVuZGxlSWQ/Jywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25TZXJ2aWNlLCAkcm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bmRsZUlkID0gJHJvdXRlLmN1cnJlbnQucGFyYW1zLmJ1bmRsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblNlcnZpY2UuZXZhbHVhdGlvbnNGb3JCdW5kbGUoYnVuZGxlSWQpLnRoZW4oZnVuY3Rpb24gKGV2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9ucycsIHtcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9ucy5odG1sJyxcclxuICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvZXZhbHVhdGlvblRlbXBsYXRlcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oICcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9sb2dpbi92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuYXBwLnJ1bihbJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uIChhdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcclxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRBdXRoRGF0YSgpO1xyXG59XSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5Jyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VTdHVkeVBsYW4nLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvU3R1ZHlQbGFuL3ZpZXdzL21hbmFnZVN0dWR5UGxhbi5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanNcIiAvPlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9jcmVhdGVTdHVkZW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWRlbnQvdmlld3MvY3JlYXRlU3R1ZGVudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlU3R1ZGVudENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlVGVhY2hlcicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL21hbmFnZVRlYWNoZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRlYWNoZXJzIDogZnVuY3Rpb24odGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyU2VydmljZS50ZWFjaGVycygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnJlcGxhY2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAvLyRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy8gIC53aGVuKCcvcmVwbGFjZScsIHtcclxuICAgICAgICAvLyAgICAgIHRlbXBsYXRlVXJsOiAndmlldyBIZXJlJyxcclxuICAgICAgICAvLyAgICAgIGNvbnRyb2xsZXI6ICdjb250cm9sbGVyIGZvciB2aWV3IGhlcmUnXHJcbiAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCBhY2NvdW50U2VydmljZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRBY2NvdW50Um9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5yb2xlVHlwZSA9IHJvbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyByb2VwIGhpZXIgZGUgYWNjb3VudHNlcnZpY2Ugb3Agb20gZWVuIG5pZXV3ZSBhY2NvdW50IHRlIG1ha2VuIG1ldCBkZSBkYXRhIGRpZSB2aWEgZGUgdmlldyBpcyBpbmdldnVsZC5cclxuICAgICAgICAgICAgLy8gZ2VlZiAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gbWVlIGluIGluIGRlIGFjY291bnRTZXJ2aWNlIG1ldGhvZGUuXHJcbiAgICAgICAgICAgIC8vLnRoZW4gb20gdGUgd2FjaHRlbiB0b3RkYXQgZGUgc2VydmVyIGdlYW50d29vcmQgaGVlZnRcclxuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuY3JlYXRlQWNjb3VudCgkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpOyAvLyBnZWJydWlrIGRpdCBpbiB0aGUgLnRoZW4gZnVuY3RpZSB6b2RhdCBkZSBtb2RhbCBzbHVpdCBuYSBkZSBzZXJ2ZXJjYWxsLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0ge307IC8vIGdlYnJ1aWsgZGl0IG9tIGFsbGUgaW5mbyBhYW4gdGUgaGFuZ2VuIGluIGRlIHZpZXcgKGRpdCBtb2RlbCBtb2V0IGplIHNlcnZlcnNpZGUgbm9nIG9wYm91d2VuKVxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSBcIlVzZXJSb2xlXCI7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5pc1RlYWNoZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyJywgY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUFjY291bnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhY2NvdW50U2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBjdHJsICsgaCByZXBsYWNlIGFsbGUgY29udHJvbGxlcm5hbWVuIGRvb3IgaHVpZGlnZSBjb250cm9sbGVyXHJcbiAgICAgICAgLy8gdmVydmFuZyBhcHAucmVwbGFjZSBkb29yIGRlIGp1aXN0ZSBtb2R1bGUgaW4gZGl0IGdldmFsIGFwcC5hY2NvdW50IHN0YWF0IGluIGFjY291bnQtbW9kdWxlLmpzXHJcblxyXG4gICAgICAgIC8vY29udHJvbGxlciBpbiBpbmRleC5odG1sIHNsZXBlbi90b2V2b2VnZW4gb25kZXJhYW4gYmlqIHNjcmlwdHMgY29udHJvbGxlcnNcclxuXHJcbiAgICAgICAgLy92aWV3IGFhbm1ha2VuIGtvcGllZXIgdWl0IGNvcHkgZm9sZGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW4gbW9kdWxlIGFjY291bnQtbW9kdWxlIHJvdXRlIGFhbm1ha2VuICgkcm91dGVQcm92aWRlcilcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHNlbGVjdGVyZW4gdmFuIHJpaiBpbiBhY2NvdW50c3RhYmVsXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gZnVuY3Rpb24gKGFjY291bnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9jcmVhdGVBY2NvdW50TW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLy8gbmlldHMgZG9vciB0ZSBnZXZlbi5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hY2NvdW50TGlzdCA9IGFjY291bnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcicsIG1hbmFnZUFjY291bnRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBhY2NvdW50U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vdGhpei5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChjaGFuZ2VQYXNzd29yZEJpbmRpbmdNb2RlbCkge1xyXG4gICAgICAgIC8vICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJ2FjY291bnRzL2NoYW5nZXBhc3N3b3JkJywgY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vdGhpei5jcmVhdGVUZXN0QWNjb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICB2YXIgY3JlYXRlVXNlck1vZGVsID0ge1xyXG4gICAgICAgIC8vICAgICAgICB1c2VybmFtZTogXCJUZXN0ZXJcIixcclxuICAgICAgICAvLyAgICAgICAgZW1haWw6IFwiYmVybmR2ZXJ0b21tZW5AbXNuLmNvbVwiLFxyXG4gICAgICAgIC8vICAgICAgICBmaXJzdE5hbWU6IFwiVGVzdFwiLFxyXG4gICAgICAgIC8vICAgICAgICBsYXN0bmFtZTogXCJlclwiLFxyXG4gICAgICAgIC8vICAgICAgICBwYXNzd29yZDogXCJARG1pbjEyM1wiLFxyXG4gICAgICAgIC8vICAgICAgICBjb25maXJtUGFzc3dvcmQgOlwiQERtaW4xMjNcIlxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aCArICdhY2NvdW50cy9jcmVhdGVUZXN0ZXInLCBjcmVhdGVVc2VyTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uaWV1d2UgbWV0aG9kZSBvbSBhY2NvdW50IHRlIGNyZWVlcmVuIGFhbmdlbWFha3RcclxuICAgICAgICB0aGl6LmNyZWF0ZUFjY291bnQgPSBmdW5jdGlvbihjcmVhdGVBY2NvdW50SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jcmVhdGVBY2NvdW50JywgY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jcmVlZXIgaGllciBkZSBtZXRob2RlIGRpZSBuYWFyIGJpaiBkZSBhY2NvdW50Y29udHJvbGxlciBjcmVhdGVBY2NvdW50IGdlYnJ1aWt0LlxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhY2NvdW50U2VydmljZScsIGFjY291bnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcicsIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGtsYXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZENsYXNzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJywgc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgZnVuY3Rpb24gdGVzdENsYXNzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmdldFRlc3RDbGFzcygpLnRoZW4oZnVuY3Rpb24gKGNsYXNzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RDbGFzcyA9IGNsYXNzUmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignVGVzdENsYXNzQ29udHJvbGxlcicsIHRlc3RDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvdXJzZUNvbnRyb2xsZXInLCBjb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VTZXJ2aWNlLCAkdWliTW9kYWwsIHN0dWR5UGxhblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKTtcclxuICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9tYW5hZ2VDb3Vyc2VcIjsgLy9iaWogbG9jYXRpb24ucGF0aCBnZWVuICMgYmlqZG9lblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb3Vyc2VTZXJ2aWNlLmNyZWF0ZUNvdXJzZSgkc2NvcGUuY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbiAoKSB7ICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKSB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TdHVkeXBsYW5Nb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkeVBsYW4vdmlld3Mvc2VsZWN0U3R1ZHlQbGFuTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZHlwbGFuczogc3R1ZHlQbGFuU2VydmljZS5nZXRTdHVkeVBsYW5zKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24oc2VsZWN0ZWRTdHVkeVBsYW4pIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvLnN0dWR5UGxhbiA9IHNlbGVjdGVkU3R1ZHlQbGFuO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZWVuIFN0dWR5cGxhbiBnZXNlbGVjdGVlcmQgZXJyb3I/IGhpZXIga29tIGplIGluIGFscyBqZSBuaWtzIHNlbGVjdGVlcmRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8gPSB7fTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInLCBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ291cnNlQ29udHJvbGxlcicsIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc1NlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yVGVhY2hlcicpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yQ291cnNlID0gZnVuY3Rpb24oY291cnNlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yQ291cnNlJywgeyAnaWQnOiBjb3Vyc2VJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXIgPSBmdW5jdGlvbih0ZWFjaGVySWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcicsIHsgJ2lkJzogdGVhY2hlcklkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NsYXNzZXNTZXJ2aWNlJywgY2xhc3Nlc1NlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvdXJzZVNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZ2V0Q291cnNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImNvdXJzZXMvY291cnNlc0ZvclRlYWNoZXJcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5hbGxDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9hbGxDb3Vyc2VzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlQ291cnNlID0gZnVuY3Rpb24gKGNyZWF0ZUNvdXJzZUluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jcmVhdGVDb3Vyc2VcIiwgY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjb3Vyc2VTZXJ2aWNlJywgY291cnNlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWd1cmF0aW9uU2VydmljZSgkaHR0cCwgdG9hc3RyQ29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgYXBpVXJsID0gJ2h0dHA6Ly90ZXN0cGxhdGZvcm1BcGkvJztcclxuXHJcbiAgICAgICAgdGhpei5iYXNlQXBpUGF0aCA9IGFwaVVybCArICdhcGkvJztcclxuXHJcbiAgICAgICAgdGhpei50b2tlblBhdGggPSBhcGlVcmwgKyAnb2F1dGgvdG9rZW4nO1xyXG5cclxuICAgICAgICB0aGl6LmdldFNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQodGhpei5iYXNlQXBpUGF0aCArIFwiL2dlbmVyYWxJbmZvL2dldHNjaG9vbHllYXJzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnY29uZmlndXJhdGlvblNlcnZpY2UnLCBjb25maWd1cmF0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhc2hib2FyZFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5wbGFubmVkRXZhbHVhdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJldmFsdWF0aW9uL3BsYW5uZWRFdmFsdWF0aW9uc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdkYXNoYm9hcmRTZXJ2aWNlJywgZGFzaGJvYXJkU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmNhbGVuZGVyUGF0aCA9ICdhcHAvZGFzaGJvYXJkL3ZpZXdzL3BhcnRpYWxzL2NhbGVuZGFyUGFydGlhbC5odG1sJztcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdkYXNoYm9hcmRDb250cm9sbGVyJywgZGFzaGJvYXJkQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXJyb3JNZXNzYWdlU2VydmljZSh0b2FzdHIpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXouaGFuZGxlUmVqZWN0ID0gaGFuZGxlUmVqZWN0O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZWplY3QocmVqZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IoJ0ZvdXQnLCByZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbm1vZHVsZS5zZXJ2aWNlKCdlcnJvck1lc3NhZ2VTZXJ2aWNlJywgZXJyb3JNZXNzYWdlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAnKSk7IC8vdGVzdCIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlLCBldmFsdWF0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcygpOyAvLyBmaW5kIG90aGVyIHNvbHV0aW9uIHRvIG1hcCBzY29yZXMgbm90IG9uIGV2cnkgc2VsZWN0LlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTY29yZSA9IGZ1bmN0aW9uIChldmFsdWF0aW9uSXRlbSwgc2NvcmUpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbkl0ZW0uc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbigkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhFdmEgPSBfLmZpbmRJbmRleCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkID09PSBldmFsdWF0aW9uLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zW2luZGV4RXZhXSA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBoYXNoa2V5ID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXk7XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleSA9IGhhc2hrZXk7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVwZGF0ZUV2YWx1YXRpb25zKCRzY29wZS5ldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Tm90U2NvcmVkUmVhc29uID0gZnVuY3Rpb24oZXZhbHVhdGlvbml0ZW0sIG51bWJlcikge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5ub3RTY29yZWRSZWFzb24gPSBudW1iZXI7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25pdGVtLnNjb3JlID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLmdyb3VwQnkoZXZhbHVhdGlvbi5ldmFsdWF0aW9uSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZXZhbHVhdGlvblN1YlNlY3Rpb24uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5zb3J0QnkoZGlmZmVyZW50U3Vic2VjdGlvbnMsIGZ1bmN0aW9uKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vLy8gdmFyIHZhbHVlID0gb2JqZWN0W2tleV0gPT4gdXNlIGRpY3Rpb25hcnkgZnJvbSBjIyB0aGlzIHdheVxyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1YnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCkgJiYgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnRvdGFsU2NvcmUgPSAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdC50b3RhbHNQZXJjYXRlZ29yeVtzdWJzZWN0aW9uWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLmlkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1hcCBldmVyeSBldmFsdWF0aW9uIG5vdCBqdXN0IHNlbGVjdGVkIHNvIGl0IGNhbiBiZSBwcm9jZXNlZCBpbiBpbnQoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzVGl0bGUgPSBldmFsdWF0aW9uc1swXS5jcmVhdGVkRm9yQ2xhc3MuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25Db250cm9sbGVyJywgZXZhbHVhdGlvbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZXMsIGNsYXNzZXMsIGV2YWx1YXRpb25TZXJ2aWNlLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbihrbGFzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gJHNjb3BlLnNlbGVjdGVkQ2xhc3MuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdGFydERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmZpbmlzaGVkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudEZpcnN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudExhc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5zZWFyY2hFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQuZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG90YWxJdGVtcyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC50b3RhbEl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zVG9QZGYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb25zVG9QZGZNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvbnM7IC8vIG1heWJlIGRvIGEgc2VhcmNoIGFnYWluIHdpdGggbW9yZSBpdGVtcyBwYWdlZD9cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkRXZhbHVhdGlvbklkcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QuRXZhbHVhdGlvbklkcyA9IHNlbGVjdGVkRXZhbHVhdGlvbklkcztcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAvLyB3aW5kb3cub3BlbihcImRhdGE6YXBwbGljYXRpb24vcGRmO2Jhc2U2NCwgXCIgKyByZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbcmVzdWx0LmRhdGFdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9wZGYnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZmlsZSwgJ2ZpbGVOYW1lLnBkZicpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVBcyhmaWxlLCAnZmlsZW5hbWUucGRmJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9ucywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgdmFyIGdldFNlbGVjdGVkSWRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1hcCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2YS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKGdldFNlbGVjdGVkSWRzKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZXZhbHVhdGlvbnNGb3JCdW5kbGUgPSBmdW5jdGlvbihidW5kbGVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vZXZhbHVhdGlvbnNGb3JCdW5kbGUnLCB7ICdpZCc6IGJ1bmRsZUlkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9uJywgZXZhbHVhdGlvbikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vdXBkYXRlRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5zZWFyY2hFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3NlYXJjaEV2YWx1YXRpb25zJywgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2NyZWF0ZVBkZkZvckV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2V2YWx1YXRpb25TZXJ2aWNlJywgZXZhbHVhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSxldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGUsIGNsYXNzZXNGb3JDb3Vyc2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAvLyBkYXRlcGlja2VyXHJcbiAgICAgICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmV2YWx1YXRpb25EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RheTogMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGVuZCBkYXRlcGlja2VyXHJcblxyXG4gICAgICAgIC8vc2Nob29seWVhciBkcm9wZG93blxyXG4gICAgICAgICRzY29wZS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGlzb3BlbjogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnRvZ2dsZURyb3Bkb3duID0gZnVuY3Rpb24gKCRldmVudCkge1xyXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzLmlzb3BlbiA9ICEkc2NvcGUuc3RhdHVzLmlzb3BlbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc0ZvckNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZC5jbGFzc0lkID0gY2xhc3NGb3JDb3Vyc2UuaWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gY2xhc3NGb3JDb3Vyc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL2VuZCBzY2hvb2x5ZWFyIGRyb3Bkb3duXHJcblxyXG4gICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvL21ha2UgY2FsbCBoZXJlXHJcbiAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUoJHNjb3BlLmNyZWF0ZUNvbW1hbmQpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnb2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzRm9yQ291cnNlID0gY2xhc3Nlc0ZvckNvdXJzZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlID0gZXZhbHVhdGlvblRlbXBsYXRlO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZCA9IHtcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25UZW1wbGF0ZUlkOiBldmFsdWF0aW9uVGVtcGxhdGUuaWQsXHJcbiAgICAgICAgICAgICAgICBFdmFsdWF0aW9uRGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NJZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucywgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICRzY29wZS50YWJzID0gMTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zYXZlVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBkZXZlbG9wIHZhbGlkYXRpb24gYW5kIGFkanVzdCAxMDAgcGVyc2NlbnQgY29kZS5cclxuICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5jcmVhdGVUZW1wbGF0ZSgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9ldmFsdWF0aW9uVGVtcGxhdGVzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFdmFsdWF0aW9uT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgJ2Rlc2NyaXB0aW9uJzogXCJcIiwgJ2NvdXJzZSc6IG51bGwgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChnZW5lcmFsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiA9IGdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UgPSBnZW5lcmFsT3B0aW9ucy5jb3Vyc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlblN1YlNlY3Rpb25zID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblN1YlNlY3Rpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VG90YWxXZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IGV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5kZWxldGVTdWJTZWN0aW9uID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuaW5kZXhPZihzdWJTZWN0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkdvYWxzID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJTZWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlR29hbHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNob3NlbkdvYWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdWJTZWN0aW9uLmdvYWxzLCBmdW5jdGlvbihnb2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuR29hbHMucHVzaChnb2FsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNob3NlbkdvYWxzLmxlbmd0aCA+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHMgPSBfLnJlamVjdCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZSwgZnVuY3Rpb24gKGdvYWxGcm9tQ291cnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluR29hbHMgPSBfLmFueShjaG9zZW5Hb2FscywgZnVuY3Rpb24gKGdvYWxmcm9tU3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnb2FsRnJvbUNvdXJzZS5pZCA9PT0gZ29hbGZyb21TdWIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2aWFsYWJsZUdvYWxzPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZpYWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9lbCB0b2VnZXZvZWdkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZUdvYWwgPSBmdW5jdGlvbihzdWJzZWN0aW9uLCBnb2FsKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHN1YnNlY3Rpb24uZ29hbHMuaW5kZXhPZihnb2FsKTtcclxuICAgICAgICAgICAgc3Vic2VjdGlvbi5nb2Fscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBlcmNlbnRhZ2UgKz0gcGFyc2VJbnQoc3ViU2VjdGlvbi53ZWlnaHQsMTApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjRGVzY3JpcHRpb25Qb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uICE9PSBudWxsICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAyNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0NvdXJzZVBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjU3ViVG90YWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3RhbFBlcmNlbnRhZ2UgPSB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxQZXJjZW50YWdlID09PSAxMDAgPyAyNSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNHb2FsUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb25lR29hbFNldCA9IF8uYW55KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uLmdvYWxzKSAmJiBzdWJTZWN0aW9uLmdvYWxzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb25lR29hbFNldCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNDb3Vyc2VQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjU3ViVG90YWxQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjR29hbFBvaW50cygpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcicsIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblRlbXBsYXRlcywgJHVpYk1vZGFsLCBjbGFzc2VzU2VydmljZSwgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc0ZvckNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvckNvdXJzZSgkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZS5jb3Vyc2UuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZXNUb0hpZGUgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzLCBmdW5jdGlvbiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5jaGVja0hpZGRlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlc1RvSGlkZS5wdXNoKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVzVG9IaWRlLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyh0ZW1wbGF0ZXNUb0hpZGUpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0ZW1wbGF0ZXNUb0hpZGUsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5oaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzID0gZXZhbHVhdGlvblRlbXBsYXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBzdWJTZWN0aW9uLCBjb3Vyc2UsIGF2YWlsYWJsZUdvYWxzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5nb2Fsc0ZpbHRlciA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7IFxyXG4gICAgICBcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRHb2FsID0gZnVuY3Rpb24gKGdvYWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEdvYWwgPSBnb2FsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpIHx8ICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMucHVzaCgkc2NvcGUuc2VsZWN0ZWRHb2FsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZEdvYWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVHb2FscyA9IGF2YWlsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGV2YWx1YXRpb25TdWJTZWN0aW9ucywgY3VycmVudFRvdGFsV2VpZ2h0LCBjb3Vyc2UsIHN1YlNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXouYWRkbmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMucHVzaChhbmd1bGFyLmNvcHkoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCkgfHwgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBlcnJvciBtZXNzYWdlIGhlcmUgOiBubyB3ZWlndGggZW50ZXJlZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNFZGl0aW5nKSB8fCAkc2NvcGUuaXNFZGl0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFRvdGFsV2VpZ2h0ID0gY3VycmVudFRvdGFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3ViU2VjdGlvbikgJiYgc3ViU2VjdGlvbiAhPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGdlbmVyYWxPcHRpb25zLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IG51bGwgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMgPSBnZW5lcmFsT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlVGVtcGxhdGUgPSBmdW5jdGlvbihldmFsdWF0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlVGVtcGxhdGUnLCBldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0RXZhbHVhdGlvblRlbXBsYXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldEV2YWx1YXRpb25UZW1wbGF0ZXMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUgPSBmdW5jdGlvbihjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2NyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUnLCBjb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uKHRlbXBsYXRlc0lkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9oaWRlVGVtcGxhdGVzJywgdGVtcGxhdGVzSWRzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZScsIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBob21lQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJXZWxrb21cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBob21lQ29udHJvbGxlcik7XHJcblxyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnKSk7XHJcblxyXG5cclxuIiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgICRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ091dCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHVzZXJOYW1lID0gYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodXNlck5hbWUpICYmIHVzZXJOYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1c2VyTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigndXNlckxvZ2dlZEluJyxmdW5jdGlvbiAoZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkT3V0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsLmNvbnRyb2xsZXIoJ2luZGV4Q29udHJvbGxlcicsIGluZGV4Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2VydmljZU5hbWUnLCBpbmRleFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JykpOyIsIlxyXG4ndXNlIHN0cmljdCc7XHJcbmFwcC5mYWN0b3J5KCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5JywgWyckcScsICckbG9jYXRpb24nLFxyXG4nbG9jYWxTdG9yYWdlU2VydmljZScsIGZ1bmN0aW9uICgkcSwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgdmFyIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkgPSB7fTtcclxuXHJcbiAgICB2YXIgX3JlcXVlc3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblxyXG4gICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XHJcblxyXG4gICAgICAgIHZhciBhdXRoRGF0YSA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdhdXRob3JpemF0aW9uRGF0YScpO1xyXG4gICAgICAgIGlmIChhdXRoRGF0YSkge1xyXG4gICAgICAgICAgICBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgYXV0aERhdGEudG9rZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzcG9uc2VFcnJvciA9IGZ1bmN0aW9uIChyZWplY3Rpb24pIHtcclxuICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVxdWVzdCA9IF9yZXF1ZXN0O1xyXG4gICAgYXV0aEludGVyY2VwdG9yRmFjdG9yeS5yZXNwb25zZUVycm9yID0gX3Jlc3BvbnNlRXJyb3I7XHJcblxyXG4gICAgcmV0dXJuIGF1dGhJbnRlcmNlcHRvckZhY3Rvcnk7XHJcbn1dKTtcclxuIiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYXV0aGVudGljYXRpb25TZXJ2aWNlLHRvYXN0cikge1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5wYXNzd29yZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnRlc3RUaXRsZSA9IFwiVGVzdFRpdGxlXCI7XHJcblxyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IoXCJWdWwgYWxsZSB2ZWxkZW4gaW4gYXViLlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUudXNlck5hbWUpIHx8IGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnBhc3N3b3JkKSkge1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgbG9naW5EYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgdXNlck5hbWU6ICRzY29wZS51c2VyTmFtZSxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUucGFzc3dvcmRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ2luKGxvZ2luRGF0YSkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2hvbWVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2RlbC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBsb2dpbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXoubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkT3V0Jywge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXCJncmFudF90eXBlPXBhc3N3b3JkJnVzZXJuYW1lPVwiICtcclxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YS51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgbG9naW5EYXRhLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS50b2tlblBhdGgsIGRhdGEsIHsgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sIHVzZXJOYW1lOiBsb2dpbkRhdGEudXNlck5hbWUsIGV4cGlyZXM6IHJlc3BvbnNlLmRhdGEuZXhwaXJlc19pbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gbG9naW5EYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZEluJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGl6LnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEF1dGhEYXRhID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGF1dGhEYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBhdXRoZW50aWNhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInLCBtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBzdHVkeXBsYW5zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRTdHVkeXBsYW4gPSBmdW5jdGlvbiAoc3R1ZHlwbGFuLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdHVkeXBsYW4gPSBzdHVkeXBsYW47XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gbm9nIGNoZWNrZW4gb3AgZ2VlbiByZXN1bHRhYXQgZ2VzZWxlY3RlZXJkXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zdHVkeXBsYW5zID0gc3R1ZHlwbGFucztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3R1ZHlwbGFucyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXInLCBzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gc3R1ZHlQbGFuU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICBcclxuICAgICAgICB0aGl6LmdldFN0dWR5UGxhbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCIvc3R1ZHlQbGFucy9hbGxTdHVkeVBsYW5zXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3N0dWR5UGxhblNlcnZpY2UnLCBzdHVkeVBsYW5TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIkhlbGxvIHdvcmxkXCI7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJywgY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENvdXJzZU1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCB0ZWFjaGVyU2VydmljZSwgdGVhY2hlciwgY291cnNlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZD17fTtcclxuICAgICAgICAgICAgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZC50ZWFjaGVySWQgPSB0ZWFjaGVyLmlkOyBcclxuICAgICAgICAgICAgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZC5jb3Vyc2VJZD0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkIDtcclxuXHJcbiAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmFkZENvdXJzZShhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGVhY2hlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJywgYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCB0ZWFjaGVyU2VydmljZSwgJHVpYk1vZGFsLCB0ZWFjaGVycykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFRlYWNoZXIgPSBmdW5jdGlvbiAodGVhY2hlciwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVhY2hlciA9IHRlYWNoZXI7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vcGVuQ291cnNlc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL2FkZENvdXJzZU1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkZENvdXJzZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlYWNoZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5DbGFzc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3Mvc2VsZWN0Q2xhc3Nlc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcigkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kID0ge307XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQudGVhY2hlcklkID0gJHNjb3BlLnNlbGVjdGVkVGVhY2hlci5pZDtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC5jbGFzc0lkID0gc2VsZWN0ZWRDbGFzcy5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZWFjaGVyU2VydmljZS5hZGRDbGFzcyhhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3VjY2VzIHRvYXN0ZXJcclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3IgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3RlYWNoZXJTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgLy8gICAgJHNjb3BlLmFjY291bnRMaXN0ID0gYWNjb3VudHM7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGVhY2hlcnMgPSB0ZWFjaGVycztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnRlYWNoZXJzKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcicsIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZWFjaGVyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlID0gZnVuY3Rpb24oYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDb3Vyc2UnLCBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoudGVhY2hlcnMgPSBmdW5jdGlvbigpIHsgLy8gdXNlIHF1ZXJ5IG9iamVjdCBpbiBmdXR1cmUgY2hhbmdlIG1ldGhvZCB0byBwb3N0IHRoZW4gcHJvYmFibHlcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICcvdGVhY2hlci90ZWFjaGVycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDbGFzcyA9IGZ1bmN0aW9uKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDbGFzcycsIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3RlYWNoZXJTZXJ2aWNlJywgdGVhY2hlclNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb250cm9sbGVyTmFtZSgkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIC8vIHRlc3RndWxwXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY29udHJvbGxlck5hbWUnLCBjb250cm9sbGVyTmFtZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAucmVwbGFjZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzZXJ2aWNlTmFtZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcbiAgICAgICAgLy90ZXN0Z3VscFxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2VydmljZU5hbWUnLCBzZXJ2aWNlTmFtZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAucmVwbGFjZScpKTsgLy90ZXN0IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxlbmRhckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGRhc2hib2FyZFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRFdmFsdWF0aW9uID0gZnVuY3Rpb24oZXZhbHVhdGlvbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zdGFydEV2YWx1YXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvZXZhbHVhdGlvbi9cIiArICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uYnVuZGxlSWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLnBsYW5uZWRFdmFsdWF0aW9ucygpLnRoZW4oZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5wbGFubmVkRXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NhbGVuZGFyQ29udHJvbGxlcicsIGNhbGVuZGFyQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
