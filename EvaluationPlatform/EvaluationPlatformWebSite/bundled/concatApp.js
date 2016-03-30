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

        //klassen volledig oproepen filteren clientside
        //studenten 10/10 van server ophalen

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

        this.handlePdfData = function (data) {
            var file = new Blob([data], { type: 'application/pdf' });
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(file, 'fileName.pdf');
            } else {
                saveAs(file, 'filename.pdf');
            };

            return data;
        }

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
           // evaluationService.setSubsectionScores(); // find other solution to map scores not on evry select.
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
            $scope.evaluations = evaluationService.mapItemsToSubSection($scope.evaluations);
         // evaluationService.setSubsectionScores();
        };

        /*
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
        */

        /*
        thiz.setSubsectionScores = function () {
            //// var value = object[key] => use dictionary from c# this way
            _.each($scope.selectedEvaluation.mappedSubsections, function (subsection) {
                if (angular.isDefined($scope.selectedEvaluation.result) && $scope.selectedEvaluation.result !== null) {
                    subsection.totalScore = $scope.selectedEvaluation.result.totalsPercategory[subsection[0].evaluationSubSection.id];
                }
            });
            // map every evaluation not just selected so it can be procesed in int()
        };
        */

        //initiations
        var init = function () {
            console.log(evaluations[0]);
            $scope.classTitle = evaluations[0].createdForClass.description;
            $scope.selectEvaluation(evaluations[0]);
            $scope.evaluations = evaluationService.mapItemsToSubSection(evaluations);
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

                evaluationService.createPdfForEvaluations(pdfForEvaluationsQueryObject);

            }, function () {
                // Console.log('Modal general options dismissed at: ' + new Date());
            });
        };

        $scope.openScoredEvaluationModal = function (evaluation) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/evaluation/views/scoredEvaluationModal.html',
                controller: 'scoredEvaluationModalController',
                size: 'lg',
                resolve: {
                    evaluation: evaluation
                }
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

    scoredEvaluationModalController.$inject = ["$scope", "$location", "evaluation", "evaluationService", "$uibModalInstance"];
    function scoredEvaluationModalController($scope, $location, evaluation, evaluationService, $uibModalInstance) {
        var thiz = this;

        $scope.ok = function () {

            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.evaluationToPdf = function () {
            evaluationService.createPdfForEvaluation($scope.evaluation);
            $scope.ok();
        };

        //initiations
        var init = function () {
            $scope.evaluation = evaluation;
            evaluationService.mapSubsectionToEvaluation(evaluation);

            console.log(evaluation);
        }

        init();
    }

    module.controller('scoredEvaluationModalController', scoredEvaluationModalController);
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
                return configurationService.handlePdfData(result.data).then(function(data) {
                    return data;
                });
            });
        };

        thiz.createPdfForEvaluation = function (evaluation) {
            var pdfForEvaluationsQueryObject = {};
            pdfForEvaluationsQueryObject.EvaluationIds = [evaluation.id];

            return thiz.createPdfForEvaluations(pdfForEvaluationsQueryObject);
        };


        //initiations
        var init = function() {

        }

        init();

        // calculation functions
        thiz.mapSubsectionToEvaluation = function (evaluation) {
                var differentSubsections = _.groupBy(evaluation.evaluationItems, function (item) {
                    return item.evaluationSubSection.description;
                });
                differentSubsections = _.sortBy(differentSubsections, function (sub) {
                    return sub[0].evaluationSubSection.weight;
                });
                evaluation.mappedSubsections = differentSubsections;

                thiz.setSubsectionScores(evaluation);
        };

        /*Maps subsections to evaluationitems*/
        thiz.mapItemsToSubSection = function (evaluations) {
            _.each(evaluations, function (evaluation) {
                thiz.mapSubsectionToEvaluation(evaluation);
            });
            
            return evaluations;
        };

        /*Use this to map the scores to the mapped subsections of a evaluation*/
        thiz.setSubsectionScores = function (evaluation) {
            //// var value = object[key] => use dictionary from c# this way
            _.each(evaluation.mappedSubsections, function (subsection) {
                if (angular.isDefined(evaluation.result) && evaluation.result !== null) {
                    subsection.totalScore = evaluation.result.totalsPercategory[subsection[0].evaluationSubSection.id];
                }
            });
            // map every evaluation not just selected so it can be procesed in int()
        };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJkYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZS5qcyIsImV2YWx1YXRpb24vZXZhbHVhdGlvbi1tb2R1bGUuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvZXZhbHVhdGlvblRlbXBsYXRlLW1vZHVsZS5qcyIsImhvbWUvaG9tZS1tb2R1bGUuanMiLCJJbmRleC9pbmRleC1tb2R1bGUuanMiLCJsb2dpbi9sb2dpbi1tb2R1bGUuanMiLCJTdHVkZW50L3N0dWRlbnQtbW9kdWxlLmpzIiwiVGVhY2hlci90ZWFjaGVyLW1vZHVsZS5qcyIsIlN0dWR5UGxhbi9zdHVkeVBsYW4tbW9kdWxlLmpzIiwienp6Y29weU1lL3JlcGxhY2UtbW9kdWxlLmpzIiwibWVzc2FnZS9tZXNzYWdlQ29uZmlnLmpzIiwiQWNjb3VudC9zZXJ2aWNlcy9hY2NvdW50U2VydmljZS5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvY2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL21hbmFnZUNsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9zZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvdGVzdENsYXNzQ3RybC5qcyIsImNsYXNzZXMvc2VydmljZXMvY2xhc3Nlc1N2Yy5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jcmVhdGVDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL21hbmFnZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsIkFjY291bnQvY29udHJvbGxlcnMvY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlci5qcyIsIkFjY291bnQvY29udHJvbGxlcnMvbWFuYWdlQWNjb3VudENvbnRyb2xsZXIuanMiLCJkYXNoYm9hcmQvY29udHJvbGxlcnMvZGFzaGJvYXJkQ29udHJvbGxlci5qcyIsImRhc2hib2FyZC9zZXJ2aWNlcy9kYXNoYm9hcmRTZXJ2aWNlLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbnNDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9zY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9zZXJ2aWNlcy9ldmFsdWF0aW9uU2VydmljZS5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9jcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDdHJsLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9nZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9zZXJ2aWNlcy9ldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmpzIiwiaG9tZS9jb250cm9sbGVycy9ob21lQ3RybC5qcyIsIkluZGV4L2NvbnRyb2xsZXJzL2luZGV4Q3RybC5qcyIsIkluZGV4L3NlcnZpY2VzL2luZGV4U2VydmljZS5qcyIsImxvZ2luL2NvbnRyb2xsZXJzL2xvZ2luQ3RybC5qcyIsImxvZ2luL2ZhY3Rvcmllcy9hdXRoSW50ZXJjZXB0b3JGYWN0b3J5LmpzIiwibG9naW4vc2VydmljZXMvYXV0aGVudGljYXRpb25TZXJ2aWNlLmpzIiwibWVzc2FnZS9zZXJ2aWNlcy9tZXNzYWdlU2VydmljZS5qcyIsIlN0dWRlbnQvY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanMiLCJTdHVkZW50L3NlcnZpY2VzL3N0dWRlbnRTZXJ2aWNlLmpzIiwiVGVhY2hlci9zZXJ2aWNlcy90ZWFjaGVyU2VydmljZS5qcyIsIlRlYWNoZXIvY29udHJvbGxlcnMvYWRkQ291cnNlTW9kYWxDb250cm9sbGVyLmpzIiwiVGVhY2hlci9jb250cm9sbGVycy9tYW5hZ2VUZWFjaGVyQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9jb250cm9sbGVycy9tYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9zZXJ2aWNlcy9TdHVkeVBsYW5TZXJ2aWNlLmpzIiwienp6Y29weU1lL2NvbnRyb2xsZXJzL3JlcGxhY2VDdHJsLmpzIiwienp6Y29weU1lL3NlcnZpY2VzL3JlcGxhY2VTZXJ2aWNlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL3BhcnRpYWxzL2NhbGVuZGFyQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLE1BQU0sUUFBUSxPQUFPO0lBQ3JCLENBQUMs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QUFTLFlBQVksT0FBTyxzQkFBc0I7UUFDOUMsSUFBSSxPQUFPO1FBQ1gsSUFBSSxnQkFBZ0IscUJBQXFCOzs7Ozs7Ozs7O1FBVXpDLElBQUksT0FBTyxXQUFXOzs7O1FBSXRCOzs7O0lBSUosT0FBTyxRQUFRLGVBQWU7R0FDL0IsUUFBUSxPQUFPLHVCQUF1QjtBQ3ZCekMsQ0FBQyxVQUFVLFFBQVE7SUFDZjs7O0lBRUEsU0FBUyxtQkFBbUIsUUFBUSxXQUFXLGtCQUFrQjtRQUM3RCxJQUFJLE9BQU87Ozs7Ozs7O1FBUVgsT0FBTyxjQUFjOztRQUVyQixPQUFPLHdCQUF3QixTQUFTLFlBQVksT0FBTztZQUN2RCxPQUFPLHFCQUFxQjtZQUM1QixPQUFPLGNBQWM7OztRQUd6QixPQUFPLGtCQUFrQixXQUFXO1lBQ2hDLFVBQVUsS0FBSyxpQkFBaUIsT0FBTyxtQkFBbUI7Ozs7UUFJOUQsSUFBSSxPQUFPLFdBQVc7WUFDbEIsaUJBQWlCLHFCQUFxQixLQUFLLFNBQVMsYUFBYTtnQkFDN0QsT0FBTyxxQkFBcUI7Ozs7UUFJcEM7OztJQUdKLE9BQU8sV0FBVyxzQkFBc0I7R0FDekMsUUFBUSxPQUFPLGtCQUFrQiIsImZpbGUiOiJjb25jYXRBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXHJcbiAgICBbJ25nUm91dGUnLCAndG9hc3RyJywgJ25nQW5pbWF0ZScsIFwidWkuYm9vdHN0cmFwXCIsICdMb2NhbFN0b3JhZ2VNb2R1bGUnLCAnYW5ndWxhci1sb2FkaW5nLWJhcicsICduZ1RvdWNoJ1xyXG4gICAgLCAnYXBwLmhvbWUnLCAnYXBwLmNsYXNzZXMnLCAnYXBwLmxvZ2luJywgJ2FwcC5hY2NvdW50JywgJ2FwcC5pbmRleCcsICdhcHAuc3R1ZGVudCcsICdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJywgJ2FwcC5ldmFsdWF0aW9uJywgJ2FwcC5kYXNoYm9hcmQnXHJcbiAgICAsICdhcHAudGVhY2hlcicsICdhcHAuY291cnNlJywgJ2FwcC5zdHVkeVBsYW4nXSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9BY2NvdW50L3ZpZXdzL21hbmFnZUFjY291bnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUFjY291bnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9jbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbihjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3MvbWFuYWdlQ2xhc3Nlcy5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUNvdXJzZScsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvbWFuYWdlQ291cnNlLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VDb3Vyc2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuYWxsQ291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgIC53aGVuKCcvY291cnNlcycsIHtcclxuICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9jb3Vyc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgY29udHJvbGxlcjogJ2NvdXJzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jcmVhdGVDb3Vyc2UnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvY3JlYXRlQ291cnNlLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL2Rhc2hib2FyZCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9kYXNoYm9hcmQvdmlld3MvZGFzaGJvYXJkLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdkYXNoYm9hcmRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2V2YWx1YXRpb24vOmJ1bmRsZUlkPycsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3MvZXZhbHVhdGlvbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbnM6IGZ1bmN0aW9uIChldmFsdWF0aW9uU2VydmljZSwgJHJvdXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidW5kbGVJZCA9ICRyb3V0ZS5jdXJyZW50LnBhcmFtcy5idW5kbGVJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25TZXJ2aWNlLmV2YWx1YXRpb25zRm9yQnVuZGxlKGJ1bmRsZUlkKS50aGVuKGZ1bmN0aW9uIChldmFscykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbnMnLCB7XHJcbiAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3MvZXZhbHVhdGlvbnMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgIGNsYXNzZXM6IGZ1bmN0aW9uIChjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yVGVhY2hlcigpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5nZXRDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZScsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICBjcmVhdGVFdmFsdWF0aW9uT3B0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmdldENyZWF0ZUV2YWx1YXRpb25PcHRpb25zKCk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL2V2YWx1YXRpb25UZW1wbGF0ZXMnLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZXM6IGZ1bmN0aW9uIChldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0RXZhbHVhdGlvblRlbXBsYXRlcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgIFxyXG4gICAgfSk7XHJcbiIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCAnLycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC53aGVuKCcvaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2hvbWUvdmlld3MvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm90aGVyd2lzZSh7XHJcbiAgICAgICAgICAgIHJlZGlyZWN0VG86ICcvJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAvLyRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy8gIC53aGVuKCcvcmVwbGFjZScsIHtcclxuICAgICAgICAvLyAgICAgIHRlbXBsYXRlVXJsOiAndmlldyBIZXJlJyxcclxuICAgICAgICAvLyAgICAgIGNvbnRyb2xsZXI6ICdjb250cm9sbGVyIGZvciB2aWV3IGhlcmUnXHJcbiAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2xvZ2luJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbG9naW4vdmlld3MvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5Db250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbmFwcC5ydW4oWydhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbiAoYXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0QXV0aERhdGEoKTtcclxufV0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJjb250cm9sbGVycy9jcmVhdGVTdHVkZW50Q29udHJvbGxlci5qc1wiIC8+XHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZGVudCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL2NyZWF0ZVN0dWRlbnQnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvU3R1ZGVudC92aWV3cy9jcmVhdGVTdHVkZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVTdHVkZW50Q29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VUZWFjaGVyJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1RlYWNoZXIvdmlld3MvbWFuYWdlVGVhY2hlci5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlVGVhY2hlckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgdGVhY2hlcnMgOiBmdW5jdGlvbih0ZWFjaGVyU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlYWNoZXJTZXJ2aWNlLnRlYWNoZXJzKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlU3R1ZHlQbGFuJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9tYW5hZ2VTdHVkeVBsYW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5yZXBsYWNlJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgLy8kcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vICAud2hlbignL3JlcGxhY2UnLCB7XHJcbiAgICAgICAgLy8gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXcgSGVyZScsXHJcbiAgICAgICAgLy8gICAgICBjb250cm9sbGVyOiAnY29udHJvbGxlciBmb3IgdmlldyBoZXJlJ1xyXG4gICAgICAgIC8vICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbiAodG9hc3RyQ29uZmlnKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLmV4dGVuZCh0b2FzdHJDb25maWcsIHtcclxuICAgICAgICBhdXRvRGlzbWlzczogdHJ1ZSxcclxuICAgICAgICBjb250YWluZXJJZDogJ3RvYXN0LWNvbnRhaW5lcicsXHJcbiAgICAgICAgbWF4T3BlbmVkOiAxMCxcclxuICAgICAgICBuZXdlc3RPblRvcDogdHJ1ZSxcclxuICAgICAgICBwb3NpdGlvbkNsYXNzOiAndG9hc3QtYm90dG9tLXJpZ2h0JyxcclxuICAgICAgICBwcmV2ZW50RHVwbGljYXRlczogZmFsc2UsXHJcbiAgICAgICAgcHJldmVudE9wZW5EdXBsaWNhdGVzOiBmYWxzZSxcclxuICAgICAgICB0YXJnZXQ6ICdib2R5JyxcclxuXHJcbiAgICAgICAgYWxsb3dIdG1sOiBmYWxzZSxcclxuICAgICAgICBjbG9zZUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgICAgY2xvc2VIdG1sOiAnPGJ1dHRvbj4mdGltZXM7PC9idXR0b24+JyxcclxuICAgICAgICBleHRlbmRlZFRpbWVPdXQ6IDEwMDAsXHJcbiAgICAgICAgaWNvbkNsYXNzZXM6IHtcclxuICAgICAgICAgICAgZXJyb3I6ICd0b2FzdC1lcnJvcicsXHJcbiAgICAgICAgICAgIGluZm86ICd0b2FzdC1pbmZvJyxcclxuICAgICAgICAgICAgc3VjY2VzczogJ3RvYXN0LXN1Y2Nlc3MnLFxyXG4gICAgICAgICAgICB3YXJuaW5nOiAndG9hc3Qtd2FybmluZydcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1lc3NhZ2VDbGFzczogJ3RvYXN0LW1lc3NhZ2UnLFxyXG4gICAgICAgIG9uSGlkZGVuOiBudWxsLFxyXG4gICAgICAgIG9uU2hvd246IG51bGwsXHJcbiAgICAgICAgb25UYXA6IG51bGwsXHJcbiAgICAgICAgcHJvZ3Jlc3NCYXI6IGZhbHNlLFxyXG4gICAgICAgIHRhcFRvRGlzbWlzczogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZXM6IHtcclxuICAgICAgICAgICAgdG9hc3Q6ICdkaXJlY3RpdmVzL3RvYXN0L3RvYXN0Lmh0bWwnLFxyXG4gICAgICAgICAgICBwcm9ncmVzc2JhcjogJ2RpcmVjdGl2ZXMvcHJvZ3Jlc3NiYXIvcHJvZ3Jlc3NiYXIuaHRtbCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRpbWVPdXQ6IDQwMDAsXHJcbiAgICAgICAgdGl0bGVDbGFzczogJ3RvYXN0LXRpdGxlJyxcclxuICAgICAgICB0b2FzdENsYXNzOiAndG9hc3QnXHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJHByb3ZpZGUsICRodHRwUHJvdmlkZXIpIHtcclxuICAgICRwcm92aWRlLmZhY3RvcnkoJ2Vycm9ySW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHEsICRpbmplY3Rvcikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZWplY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdmFyIHRvYXN0ciA9ICRpbmplY3Rvci5nZXQoJ3RvYXN0cicpO1xyXG4gICAgICAgICAgICAgICAgLy8gdG9hc3RyLmVycm9yKCdGb3V0JywgcmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGVycm9yTWVzc2FnZVNlcnZpY2UgPSAkaW5qZWN0b3IuZ2V0KCdtZXNzYWdlU2VydmljZScpO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlU2VydmljZS5oYW5kbGVSZWplY3QocmVqZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnZXJyb3JJbnRlcmNlcHRvcicpO1xyXG59KTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gYWNjb3VudFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlUGF0aCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3RoaXouY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAoY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jaGFuZ2VwYXNzd29yZCcsIGNoYW5nZVBhc3N3b3JkQmluZGluZ01vZGVsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3RoaXouY3JlYXRlVGVzdEFjY291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIGNyZWF0ZVVzZXJNb2RlbCA9IHtcclxuICAgICAgICAvLyAgICAgICAgdXNlcm5hbWU6IFwiVGVzdGVyXCIsXHJcbiAgICAgICAgLy8gICAgICAgIGVtYWlsOiBcImJlcm5kdmVydG9tbWVuQG1zbi5jb21cIixcclxuICAgICAgICAvLyAgICAgICAgZmlyc3ROYW1lOiBcIlRlc3RcIixcclxuICAgICAgICAvLyAgICAgICAgbGFzdG5hbWU6IFwiZXJcIixcclxuICAgICAgICAvLyAgICAgICAgcGFzc3dvcmQ6IFwiQERtaW4xMjNcIixcclxuICAgICAgICAvLyAgICAgICAgY29uZmlybVBhc3N3b3JkIDpcIkBEbWluMTIzXCJcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuICRodHRwLnBvc3QoY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGggKyAnYWNjb3VudHMvY3JlYXRlVGVzdGVyJywgY3JlYXRlVXNlck1vZGVsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmlldXdlIG1ldGhvZGUgb20gYWNjb3VudCB0ZSBjcmVlZXJlbiBhYW5nZW1hYWt0XHJcbiAgICAgICAgdGhpei5jcmVhdGVBY2NvdW50ID0gZnVuY3Rpb24oY3JlYXRlQWNjb3VudEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVBhdGggKyAnYWNjb3VudHMvY3JlYXRlQWNjb3VudCcsIGNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY3JlZWVyIGhpZXIgZGUgbWV0aG9kZSBkaWUgbmFhciBiaWogZGUgYWNjb3VudGNvbnRyb2xsZXIgY3JlYXRlQWNjb3VudCBnZWJydWlrdC5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnYWNjb3VudFNlcnZpY2UnLCBhY2NvdW50U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsYXNzZXNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY2xhc3Nlc0NvbnRyb2xsZXInLCBjbGFzc2VzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9rbGFzc2VuIHZvbGxlZGlnIG9wcm9lcGVuIGZpbHRlcmVuIGNsaWVudHNpZGVcclxuICAgICAgICAvL3N0dWRlbnRlbiAxMC8xMCB2YW4gc2VydmVyIG9waGFsZW5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLCBtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgY2xhc3Nlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDbGFzcyA9IGZ1bmN0aW9uIChrbGFzLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGtsYXM7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuc2VsZWN0ZWRDbGFzcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlcicsIHNlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgIGZ1bmN0aW9uIHRlc3RDbGFzc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICBjbGFzc2VzU2VydmljZS5nZXRUZXN0Q2xhc3MoKS50aGVuKGZ1bmN0aW9uIChjbGFzc1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICRzY29wZS50ZXN0Q2xhc3MgPSBjbGFzc1Jlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ1Rlc3RDbGFzc0NvbnRyb2xsZXInLCB0ZXN0Q2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjbGFzc2VzU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouY2xhc3Nlc0ZvclRlYWNoZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL2NsYXNzZXNGb3JUZWFjaGVyJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmNsYXNzZXNGb3JDb3Vyc2UgPSBmdW5jdGlvbihjb3Vyc2VJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL2NsYXNzZXNGb3JDb3Vyc2UnLCB7ICdpZCc6IGNvdXJzZUlkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlciA9IGZ1bmN0aW9uKHRlYWNoZXJJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL2F2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyJywgeyAnaWQnOiB0ZWFjaGVySWQgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnY2xhc3Nlc1NlcnZpY2UnLCBjbGFzc2VzU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlndXJhdGlvblNlcnZpY2UoJGh0dHAsIHRvYXN0ckNvbmZpZykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGFwaVVybCA9ICdodHRwOi8vdGVzdHBsYXRmb3JtQXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXouYmFzZUFwaVBhdGggPSBhcGlVcmwgKyAnYXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXoudG9rZW5QYXRoID0gYXBpVXJsICsgJ29hdXRoL3Rva2VuJztcclxuXHJcbiAgICAgICAgdGhpei5nZXRTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRoaXouYmFzZUFwaVBhdGggKyBcIi9nZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFyc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVBkZkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vcGRmJyB9KTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZmlsZSwgJ2ZpbGVOYW1lLnBkZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUFzKGZpbGUsICdmaWxlbmFtZS5wZGYnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjb25maWd1cmF0aW9uU2VydmljZScsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvdXJzZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY291cnNlQ29udHJvbGxlcicsIGNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvdXJzZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZVNlcnZpY2UsICR1aWJNb2RhbCwgc3R1ZHlQbGFuU2VydmljZSwgbWVzc2FnZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9wdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKTtcclxuICAgICAgICAgICAgLy93aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiIy9tYW5hZ2VDb3Vyc2VcIjsgLy9iaWogbG9jYXRpb24ucGF0aCBnZWVuICMgYmlqZG9lblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvdXJzZVNlcnZpY2UuY3JlYXRlQ291cnNlKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQ3Vyc3VzIGFhbmdlbWFha3QhXCIpO1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ291cnNlXCIpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub3BlblN0dWR5cGxhbk1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9zZWxlY3RTdHVkeVBsYW5Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkeXBsYW5zOiBzdHVkeVBsYW5TZXJ2aWNlLmdldFN0dWR5UGxhbnMoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRTdHVkeVBsYW4pIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvLnN0dWR5UGxhbiA9IHNlbGVjdGVkU3R1ZHlQbGFuO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBnZWVuIFN0dWR5cGxhbiBnZXNlbGVjdGVlcmQgZXJyb3I/IGhpZXIga29tIGplIGluIGFscyBqZSBuaWtzIHNlbGVjdGVlcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8gPSB7fTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQ291cnNlQ29udHJvbGxlcicsIGNyZWF0ZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDb3Vyc2VDb250cm9sbGVyJywgbWFuYWdlQ291cnNlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmdldENvdXJzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2NvdXJzZXNGb3JUZWFjaGVyXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouYWxsQ291cnNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImNvdXJzZXMvYWxsQ291cnNlc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUNvdXJzZSA9IGZ1bmN0aW9uIChjcmVhdGVDb3Vyc2VJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyBcImNvdXJzZXMvY3JlYXRlQ291cnNlXCIsIGNyZWF0ZUNvdXJzZUluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnY291cnNlU2VydmljZScsIGNvdXJzZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCBhY2NvdW50U2VydmljZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgbWVzc2FnZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0QWNjb3VudFJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSByb2xlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gcm9lcCBoaWVyIGRlIGFjY291bnRzZXJ2aWNlIG9wIG9tIGVlbiBuaWV1d2UgYWNjb3VudCB0ZSBtYWtlbiBtZXQgZGUgZGF0YSBkaWUgdmlhIGRlIHZpZXcgaXMgaW5nZXZ1bGQuXHJcbiAgICAgICAgICAgIC8vIGdlZWYgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvIG1lZSBpbiBpbiBkZSBhY2NvdW50U2VydmljZSBtZXRob2RlLlxyXG4gICAgICAgICAgICAvLy50aGVuIG9tIHRlIHdhY2h0ZW4gdG90ZGF0IGRlIHNlcnZlciBnZWFudHdvb3JkIGhlZWZ0XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmNyZWF0ZUFjY291bnQoJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIkFjY291bnQgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTsgLy8gZ2VicnVpayBkaXQgaW4gdGhlIC50aGVuIGZ1bmN0aWUgem9kYXQgZGUgbW9kYWwgc2x1aXQgbmEgZGUgc2VydmVyY2FsbC5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mbyA9IHt9OyAvLyBnZWJydWlrIGRpdCBvbSBhbGxlIGluZm8gYWFuIHRlIGhhbmdlbiBpbiBkZSB2aWV3IChkaXQgbW9kZWwgbW9ldCBqZSBzZXJ2ZXJzaWRlIG5vZyBvcGJvdXdlbilcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvLnJvbGVUeXBlID0gXCJVc2VyUm9sZVwiO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8uaXNUZWFjaGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VBY2NvdW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYWNjb3VudFNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gY3RybCArIGggcmVwbGFjZSBhbGxlIGNvbnRyb2xsZXJuYW1lbiBkb29yIGh1aWRpZ2UgY29udHJvbGxlclxyXG4gICAgICAgIC8vIHZlcnZhbmcgYXBwLnJlcGxhY2UgZG9vciBkZSBqdWlzdGUgbW9kdWxlIGluIGRpdCBnZXZhbCBhcHAuYWNjb3VudCBzdGFhdCBpbiBhY2NvdW50LW1vZHVsZS5qc1xyXG5cclxuICAgICAgICAvL2NvbnRyb2xsZXIgaW4gaW5kZXguaHRtbCBzbGVwZW4vdG9ldm9lZ2VuIG9uZGVyYWFuIGJpaiBzY3JpcHRzIGNvbnRyb2xsZXJzXHJcblxyXG4gICAgICAgIC8vdmlldyBhYW5tYWtlbiBrb3BpZWVyIHVpdCBjb3B5IGZvbGRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGluIG1vZHVsZSBhY2NvdW50LW1vZHVsZSByb3V0ZSBhYW5tYWtlbiAoJHJvdXRlUHJvdmlkZXIpXHJcblxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBzZWxlY3RlcmVuIHZhbiByaWogaW4gYWNjb3VudHN0YWJlbFxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQWNjb3VudCA9IGZ1bmN0aW9uIChhY2NvdW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gYWNjb3VudDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0FjY291bnQvdmlld3MvY3JlYXRlQWNjb3VudE1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8vIG5pZXRzIGRvb3IgdGUgZ2V2ZW4uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY2NvdW50U2VydmljZS5nZXRBY2NvdW50cygpLnRoZW4oZnVuY3Rpb24gKGFjY291bnRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQWNjb3VudENvbnRyb2xsZXInLCBtYW5hZ2VBY2NvdW50Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhc2hib2FyZENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5jYWxlbmRlclBhdGggPSAnYXBwL2Rhc2hib2FyZC92aWV3cy9wYXJ0aWFscy9jYWxlbmRhclBhcnRpYWwuaHRtbCc7XHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZGFzaGJvYXJkQ29udHJvbGxlcicsIGRhc2hib2FyZENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LnBsYW5uZWRFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImV2YWx1YXRpb24vcGxhbm5lZEV2YWx1YXRpb25zXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2Rhc2hib2FyZFNlcnZpY2UnLCBkYXNoYm9hcmRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblNlcnZpY2UsIGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdEV2YWx1YXRpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAvLyBldmFsdWF0aW9uU2VydmljZS5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7IC8vIGZpbmQgb3RoZXIgc29sdXRpb24gdG8gbWFwIHNjb3JlcyBub3Qgb24gZXZyeSBzZWxlY3QuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNjb3JlID0gZnVuY3Rpb24gKGV2YWx1YXRpb25JdGVtLCBzY29yZSkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uSXRlbS5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS51cGRhdGVFdmFsdWF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS51cGRhdGVFdmFsdWF0aW9uKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24pLnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleEV2YSA9IF8uZmluZEluZGV4KCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQgPT09IGV2YWx1YXRpb24uaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNbaW5kZXhFdmFdID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGhhc2hrZXkgPSAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleTtcclxuICAgICAgICAgICAgICAgIC8vJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uJCRoYXNoS2V5ID0gaGFzaGtleTtcclxuICAgICAgICAgICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS51cGRhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbnMoJHNjb3BlLmV2YWx1YXRpb25zKS50aGVuKGZ1bmN0aW9uKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXROb3RTY29yZWRSZWFzb24gPSBmdW5jdGlvbihldmFsdWF0aW9uaXRlbSwgbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25pdGVtLm5vdFNjb3JlZFJlYXNvbiA9IG51bWJlcjtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbml0ZW0uc2NvcmUgPSBudWxsO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvblNlcnZpY2UubWFwSXRlbXNUb1N1YlNlY3Rpb24oJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuICAgICAgICAgLy8gZXZhbHVhdGlvblNlcnZpY2Uuc2V0U3Vic2VjdGlvblNjb3JlcygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLmdyb3VwQnkoZXZhbHVhdGlvbi5ldmFsdWF0aW9uSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZXZhbHVhdGlvblN1YlNlY3Rpb24uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5zb3J0QnkoZGlmZmVyZW50U3Vic2VjdGlvbnMsIGZ1bmN0aW9uKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vLy8gdmFyIHZhbHVlID0gb2JqZWN0W2tleV0gPT4gdXNlIGRpY3Rpb25hcnkgZnJvbSBjIyB0aGlzIHdheVxyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1YnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCkgJiYgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnRvdGFsU2NvcmUgPSAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdC50b3RhbHNQZXJjYXRlZ29yeVtzdWJzZWN0aW9uWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLmlkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1hcCBldmVyeSBldmFsdWF0aW9uIG5vdCBqdXN0IHNlbGVjdGVkIHNvIGl0IGNhbiBiZSBwcm9jZXNlZCBpbiBpbnQoKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgKi9cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmFsdWF0aW9uc1swXSk7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc1RpdGxlID0gZXZhbHVhdGlvbnNbMF0uY3JlYXRlZEZvckNsYXNzLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0RXZhbHVhdGlvbihldmFsdWF0aW9uc1swXSk7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25TZXJ2aWNlLm1hcEl0ZW1zVG9TdWJTZWN0aW9uKGV2YWx1YXRpb25zKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25Db250cm9sbGVyJywgZXZhbHVhdGlvbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNvdXJzZXMsIGNsYXNzZXMsIGV2YWx1YXRpb25TZXJ2aWNlLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbihrbGFzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gJHNjb3BlLnNlbGVjdGVkQ2xhc3MuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdGFydERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmZpbmlzaGVkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudEZpcnN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudExhc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5zZWFyY2hFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQuZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG90YWxJdGVtcyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC50b3RhbEl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zVG9QZGYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb25zVG9QZGZNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvbnM7IC8vIG1heWJlIGRvIGEgc2VhcmNoIGFnYWluIHdpdGggbW9yZSBpdGVtcyBwYWdlZD9cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkRXZhbHVhdGlvbklkcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QuRXZhbHVhdGlvbklkcyA9IHNlbGVjdGVkRXZhbHVhdGlvbklkcztcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuU2NvcmVkRXZhbHVhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9zY29yZWRFdmFsdWF0aW9uTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb246IGV2YWx1YXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9ucywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgdmFyIGdldFNlbGVjdGVkSWRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1hcCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2YS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKGdldFNlbGVjdGVkSWRzKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNjb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRvUGRmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9uKCRzY29wZS5ldmFsdWF0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLm9rKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24oZXZhbHVhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcicsIHNjb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmV2YWx1YXRpb25zRm9yQnVuZGxlID0gZnVuY3Rpb24oYnVuZGxlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2V2YWx1YXRpb25zRm9yQnVuZGxlJywgeyAnaWQnOiBidW5kbGVJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVFdmFsdWF0aW9uID0gZnVuY3Rpb24oZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vdXBkYXRlRXZhbHVhdGlvbicsIGV2YWx1YXRpb24pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3VwZGF0ZUV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouc2VhcmNoRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9zZWFyY2hFdmFsdWF0aW9ucycsIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2NyZWF0ZVBkZkZvckV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmhhbmRsZVBkZkRhdGEocmVzdWx0LmRhdGEpLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlUGRmRm9yRXZhbHVhdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QuRXZhbHVhdGlvbklkcyA9IFtldmFsdWF0aW9uLmlkXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGl6LmNyZWF0ZVBkZkZvckV2YWx1YXRpb25zKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXoubWFwU3Vic2VjdGlvblRvRXZhbHVhdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLmdyb3VwQnkoZXZhbHVhdGlvbi5ldmFsdWF0aW9uSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uZXZhbHVhdGlvblN1YlNlY3Rpb24uZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5zb3J0QnkoZGlmZmVyZW50U3Vic2VjdGlvbnMsIGZ1bmN0aW9uIChzdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucyA9IGRpZmZlcmVudFN1YnNlY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyhldmFsdWF0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKk1hcHMgc3Vic2VjdGlvbnMgdG8gZXZhbHVhdGlvbml0ZW1zKi9cclxuICAgICAgICB0aGl6Lm1hcEl0ZW1zVG9TdWJTZWN0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaChldmFsdWF0aW9ucywgZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXoubWFwU3Vic2VjdGlvblRvRXZhbHVhdGlvbihldmFsdWF0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypVc2UgdGhpcyB0byBtYXAgdGhlIHNjb3JlcyB0byB0aGUgbWFwcGVkIHN1YnNlY3Rpb25zIG9mIGEgZXZhbHVhdGlvbiovXHJcbiAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgLy8vLyB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSA9PiB1c2UgZGljdGlvbmFyeSBmcm9tIGMjIHRoaXMgd2F5XHJcbiAgICAgICAgICAgIF8uZWFjaChldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zLCBmdW5jdGlvbiAoc3Vic2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGV2YWx1YXRpb24ucmVzdWx0KSAmJiBldmFsdWF0aW9uLnJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNlY3Rpb24udG90YWxTY29yZSA9IGV2YWx1YXRpb24ucmVzdWx0LnRvdGFsc1BlcmNhdGVnb3J5W3N1YnNlY3Rpb25bMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24uaWRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbWFwIGV2ZXJ5IGV2YWx1YXRpb24gbm90IGp1c3Qgc2VsZWN0ZWQgc28gaXQgY2FuIGJlIHByb2Nlc2VkIGluIGludCgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2V2YWx1YXRpb25TZXJ2aWNlJywgZXZhbHVhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSxldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGUsIGNsYXNzZXNGb3JDb3Vyc2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAvLyBkYXRlcGlja2VyXHJcbiAgICAgICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmV2YWx1YXRpb25EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RheTogMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGVuZCBkYXRlcGlja2VyXHJcblxyXG4gICAgICAgIC8vc2Nob29seWVhciBkcm9wZG93blxyXG4gICAgICAgICRzY29wZS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGlzb3BlbjogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnRvZ2dsZURyb3Bkb3duID0gZnVuY3Rpb24gKCRldmVudCkge1xyXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzLmlzb3BlbiA9ICEkc2NvcGUuc3RhdHVzLmlzb3BlbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc0ZvckNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZC5jbGFzc0lkID0gY2xhc3NGb3JDb3Vyc2UuaWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gY2xhc3NGb3JDb3Vyc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL2VuZCBzY2hvb2x5ZWFyIGRyb3Bkb3duXHJcblxyXG4gICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvL21ha2UgY2FsbCBoZXJlXHJcbiAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUoJHNjb3BlLmNyZWF0ZUNvbW1hbmQpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnb2snKTtcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzRm9yQ291cnNlID0gY2xhc3Nlc0ZvckNvdXJzZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlID0gZXZhbHVhdGlvblRlbXBsYXRlO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZCA9IHtcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25UZW1wbGF0ZUlkOiBldmFsdWF0aW9uVGVtcGxhdGUuaWQsXHJcbiAgICAgICAgICAgICAgICBFdmFsdWF0aW9uRGF0ZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgY2xhc3NJZDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucywgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSB7fTtcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IFtdO1xyXG4gICAgICAgICRzY29wZS50YWJzID0gMTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zYXZlVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBkZXZlbG9wIHZhbGlkYXRpb24gYW5kIGFkanVzdCAxMDAgcGVyc2NlbnQgY29kZS5cclxuICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5jcmVhdGVUZW1wbGF0ZSgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9ldmFsdWF0aW9uVGVtcGxhdGVzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFdmFsdWF0aW9uT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgJ2Rlc2NyaXB0aW9uJzogXCJcIiwgJ2NvdXJzZSc6IG51bGwgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChnZW5lcmFsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiA9IGdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UgPSBnZW5lcmFsT3B0aW9ucy5jb3Vyc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlblN1YlNlY3Rpb25zID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblN1YlNlY3Rpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VG90YWxXZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IGV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5kZWxldGVTdWJTZWN0aW9uID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuaW5kZXhPZihzdWJTZWN0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkdvYWxzID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJTZWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlR29hbHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNob3NlbkdvYWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdWJTZWN0aW9uLmdvYWxzLCBmdW5jdGlvbihnb2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuR29hbHMucHVzaChnb2FsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNob3NlbkdvYWxzLmxlbmd0aCA+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHMgPSBfLnJlamVjdCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZSwgZnVuY3Rpb24gKGdvYWxGcm9tQ291cnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluR29hbHMgPSBfLmFueShjaG9zZW5Hb2FscywgZnVuY3Rpb24gKGdvYWxmcm9tU3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnb2FsRnJvbUNvdXJzZS5pZCA9PT0gZ29hbGZyb21TdWIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2aWFsYWJsZUdvYWxzPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZpYWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9lbCB0b2VnZXZvZWdkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZUdvYWwgPSBmdW5jdGlvbihzdWJzZWN0aW9uLCBnb2FsKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHN1YnNlY3Rpb24uZ29hbHMuaW5kZXhPZihnb2FsKTtcclxuICAgICAgICAgICAgc3Vic2VjdGlvbi5nb2Fscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBlcmNlbnRhZ2UgKz0gcGFyc2VJbnQoc3ViU2VjdGlvbi53ZWlnaHQsMTApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjRGVzY3JpcHRpb25Qb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uICE9PSBudWxsICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAyNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0NvdXJzZVBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjU3ViVG90YWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3RhbFBlcmNlbnRhZ2UgPSB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxQZXJjZW50YWdlID09PSAxMDAgPyAyNSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNHb2FsUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb25lR29hbFNldCA9IF8uYW55KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uLmdvYWxzKSAmJiBzdWJTZWN0aW9uLmdvYWxzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb25lR29hbFNldCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNDb3Vyc2VQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjU3ViVG90YWxQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjR29hbFBvaW50cygpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcicsIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblRlbXBsYXRlcywgJHVpYk1vZGFsLCBjbGFzc2VzU2VydmljZSwgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNGb3JDb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JDb3Vyc2UoJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGUuY291cnNlLmlkKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5oaWRlU2VsZWN0ZWRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGVzVG9IaWRlID0gW107XHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlcywgZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGUuY2hlY2tIaWRkZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXNUb0hpZGUucHVzaCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlc1RvSGlkZS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5oaWRlU2VsZWN0ZWRUZW1wbGF0ZXModGVtcGxhdGVzVG9IaWRlKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGVtcGxhdGVzVG9IaWRlLCBmdW5jdGlvbiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGUuaGlkZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlcyA9IGV2YWx1YXRpb25UZW1wbGF0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyJywgZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgc3ViU2VjdGlvbiwgY291cnNlLCBhdmFpbGFibGVHb2Fscykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZ29hbHNGaWx0ZXIgPSB7fTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsOyBcclxuICAgICAgXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkR29hbCA9IGZ1bmN0aW9uIChnb2FsLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRHb2FsID0gZ29hbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChzdWJTZWN0aW9uLmdvYWxzKSB8fCAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uLmdvYWxzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uLmdvYWxzLnB1c2goJHNjb3BlLnNlbGVjdGVkR29hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICggYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRHb2FsKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXouQWRkR29hbFRvTmV3RXZhbHVhdGlvblN1YlNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYXZhaWxhYmxlR29hbHMgPSBhdmFpbGFibGVHb2FscztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGN1cnJlbnRUb3RhbFdlaWdodCwgY291cnNlLCBzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICBcclxuICAgICAgXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICBcclxuICAgICAgICB0aGl6LmFkZG5ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLnB1c2goYW5ndWxhci5jb3B5KCRzY29wZS5uZXdFdmFsdWF0aW9uU3ViU2VjdGlvbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5uZXdFdmFsdWF0aW9uU3ViU2VjdGlvbi53ZWlnaHQpIHx8ICRzY29wZS5uZXdFdmFsdWF0aW9uU3ViU2VjdGlvbi53ZWlnaHQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gZXJyb3IgbWVzc2FnZSBoZXJlIDogbm8gd2VpZ3RoIGVudGVyZWRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmlzRWRpdGluZykgfHwgJHNjb3BlLmlzRWRpdGluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXouYWRkbmV3RXZhbHVhdGlvblN1YlNlY3Rpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IGV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLmN1cnJlbnRUb3RhbFdlaWdodCA9IGN1cnJlbnRUb3RhbFdlaWdodDtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHN1YlNlY3Rpb24pICYmIHN1YlNlY3Rpb24gIT09bnVsbCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgICAgICRzY29wZS5pc0VkaXRpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBnZW5lcmFsT3B0aW9ucywgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5nZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbikgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uID09PSBudWxsIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbiA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyByZXBsYWNlIHdpdGggZXJyb3IgbWV0aG9kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmdlbmVyYWxPcHRpb25zLmNvdXJzZSkgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmNvdXJzZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyByZXBsYWNlIHdpdGggZXJyb3IgbWV0aG9kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmdlbmVyYWxPcHRpb25zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0Q291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmNvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmdlbmVyYWxPcHRpb25zID0gZ2VuZXJhbE9wdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVFdmFsdWF0aW9uT3B0aW9ucyA9IGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXInLCBnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LmdldENyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZVRlbXBsYXRlID0gZnVuY3Rpb24oZXZhbHVhdGlvblRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2NyZWF0ZVRlbXBsYXRlJywgZXZhbHVhdGlvblRlbXBsYXRlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEV2YWx1YXRpb25UZW1wbGF0ZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9nZXRFdmFsdWF0aW9uVGVtcGxhdGVzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVFdmFsdWF0aW9uRnJvbVRlbXBsYXRlID0gZnVuY3Rpb24oY29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9jcmVhdGVFdmFsdWF0aW9uRnJvbVRlbXBsYXRlJywgY29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5oaWRlU2VsZWN0ZWRUZW1wbGF0ZXMgPSBmdW5jdGlvbih0ZW1wbGF0ZXNJZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvaGlkZVRlbXBsYXRlcycsIHRlbXBsYXRlc0lkcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2V2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UnLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgZnVuY3Rpb24gaG9tZUNvbnRyb2xsZXIoJGh0dHAsICRzY29wZSkge1xyXG5cclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubWVzc2FnZSA9IFwiV2Vsa29tXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJywgaG9tZUNvbnRyb2xsZXIpO1xyXG5cclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ob21lJykpO1xyXG5cclxuXHJcbiIsIihmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBpbmRleENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGF1dGhlbnRpY2F0aW9uU2VydmljZSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICBcclxuICAgICAgICAkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dPdXQoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB1c2VyTmFtZSA9IGF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyTmFtZTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHVzZXJOYW1lKSAmJiB1c2VyTmFtZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdXNlck5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3VzZXJMb2dnZWRJbicsZnVuY3Rpb24gKGV2ZW50LGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gZGF0YS51c2VyTmFtZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigndXNlckxvZ2dlZE91dCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RlbC5jb250cm9sbGVyKCdpbmRleENvbnRyb2xsZXInLCBpbmRleENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBpbmRleFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3NlcnZpY2VOYW1lJywgaW5kZXhTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcpKTsiLCIoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbG9naW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsdG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnBhc3N3b3JkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUudGVzdFRpdGxlID0gXCJUZXN0VGl0bGVcIjtcclxuXHJcbiAgICAgICAgICAgIHRvYXN0ci5lcnJvcihcIlZ1bCBhbGxlIHZlbGRlbiBpbiBhdWIuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS51c2VyTmFtZSkgfHwgYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsb2dpbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogJHNjb3BlLnVzZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9naW4obG9naW5EYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvaG9tZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIGxvZ2luQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nKSk7IiwiXHJcbid1c2Ugc3RyaWN0JztcclxuYXBwLmZhY3RvcnkoJ2F1dGhJbnRlcmNlcHRvckZhY3RvcnknLCBbJyRxJywgJyRsb2NhdGlvbicsXHJcbidsb2NhbFN0b3JhZ2VTZXJ2aWNlJywgZnVuY3Rpb24gKCRxLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2UpIHtcclxuXHJcbiAgICB2YXIgYXV0aEludGVyY2VwdG9yRmFjdG9yeSA9IHt9O1xyXG5cclxuICAgIHZhciBfcmVxdWVzdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHJcbiAgICAgICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgdmFyIGF1dGhEYXRhID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcbiAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyBhdXRoRGF0YS50b2tlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9yZXNwb25zZUVycm9yID0gZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG4gICAgICAgIGlmIChyZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0aEludGVyY2VwdG9yRmFjdG9yeS5yZXF1ZXN0ID0gX3JlcXVlc3Q7XHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlc3BvbnNlRXJyb3IgPSBfcmVzcG9uc2VFcnJvcjtcclxuXHJcbiAgICByZXR1cm4gYXV0aEludGVyY2VwdG9yRmFjdG9yeTtcclxufV0pO1xyXG4iLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYXV0aGVudGljYXRpb25TZXJ2aWNlKCRodHRwLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCBjb25maWd1cmF0aW9uU2VydmljZSwgJHEsICRyb290U2NvcGUpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmxvZ091dCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5yZW1vdmUoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcblxyXG4gICAgICAgICAgICB0aGl6LmlzQXV0aCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZE91dCcsIHtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXoubG9naW4gPSBmdW5jdGlvbihsb2dpbkRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IFwiZ3JhbnRfdHlwZT1wYXNzd29yZCZ1c2VybmFtZT1cIiArXHJcbiAgICAgICAgICAgICAgICBsb2dpbkRhdGEudXNlck5hbWUgKyBcIiZwYXNzd29yZD1cIiArIGxvZ2luRGF0YS5wYXNzd29yZDtcclxuXHJcbiAgICAgICAgICAgICRodHRwLnBvc3QoY29uZmlndXJhdGlvblNlcnZpY2UudG9rZW5QYXRoLCBkYXRhLCB7IGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0gfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KCdhdXRob3JpemF0aW9uRGF0YScsIHsgdG9rZW46IHJlc3BvbnNlLmRhdGEuYWNjZXNzX3Rva2VuLCB1c2VyTmFtZTogbG9naW5EYXRhLnVzZXJOYW1lLCBleHBpcmVzOiByZXNwb25zZS5kYXRhLmV4cGlyZXNfaW4gfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGxvZ2luRGF0YS51c2VyTmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXouaXNBdXRoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3VzZXJMb2dnZWRJbicsIHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyTmFtZTogdGhpei51c2VyTmFtZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShyZXNwb25zZSk7XHJcblxyXG4gICAgICAgICAgICB9KSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0KCk7XHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRBdXRoRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGF1dGhEYXRhID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcbiAgICAgICAgICAgIGlmIChhdXRoRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouaXNBdXRoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBhdXRoRGF0YS51c2VyTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnYXV0aGVudGljYXRpb25TZXJ2aWNlJywgYXV0aGVudGljYXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1lc3NhZ2VTZXJ2aWNlKHRvYXN0cikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpei5oYW5kbGVSZWplY3QgPSBoYW5kbGVSZWplY3Q7XHJcbiAgICAgICAgdGhpei5oYW5kbGVTdWNjZXMgPSBoYW5kbGVTdWNjZXM7XHJcbiAgICAgICAgdGhpei5oYW5kbGVXYXJuaW5nID0gaGFuZGxlV2FybmluZztcclxuICAgICAgICB0aGl6LmhhbmRsZUVycm9yID0gaGFuZGxlRXJyb3I7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVJlamVjdChyZWplY3Rpb24pIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZWplY3Rpb24uc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5lcnJvcihyZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlLCAnRm91dCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVN1Y2Nlcyh0ZXh0LCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuc3VjY2Vzcyh0ZXh0LCB0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVXYXJuaW5nKHRleHQsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci53YXJuaW5nKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUVycm9yKHRleHQsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5lcnJvcih0ZXh0LCB0aXRsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdtZXNzYWdlU2VydmljZScsIG1lc3NhZ2VTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcCcpKTsgLy90ZXN0IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIkhlbGxvIHdvcmxkXCI7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJywgY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZWFjaGVyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlID0gZnVuY3Rpb24oYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDb3Vyc2UnLCBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoudGVhY2hlcnMgPSBmdW5jdGlvbigpIHsgLy8gdXNlIHF1ZXJ5IG9iamVjdCBpbiBmdXR1cmUgY2hhbmdlIG1ldGhvZCB0byBwb3N0IHRoZW4gcHJvYmFibHlcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICcvdGVhY2hlci90ZWFjaGVycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDbGFzcyA9IGZ1bmN0aW9uKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDbGFzcycsIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3RlYWNoZXJTZXJ2aWNlJywgdGVhY2hlclNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlYWNoZXJTZXJ2aWNlLCB0ZWFjaGVyLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZENvdXJzZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kPXt9O1xyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9IHRlYWNoZXIuaWQ7IFxyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLmNvdXJzZUlkPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQgO1xyXG5cclxuICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ291cnNlKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLnRlYWNoZXIgPSB0ZWFjaGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZWFjaGVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXInLCBhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIHRlYWNoZXJTZXJ2aWNlLCAkdWliTW9kYWwsIHRlYWNoZXJzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVhY2hlciA9IGZ1bmN0aW9uICh0ZWFjaGVyLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9wZW5Db3Vyc2VzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1RlYWNoZXIvdmlld3MvYWRkQ291cnNlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVhY2hlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkNsYXNzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9zZWxlY3RDbGFzc2VzTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyKCRzY29wZS5zZWxlY3RlZFRlYWNoZXIuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC50ZWFjaGVySWQgPSAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kLmNsYXNzSWQgPSBzZWxlY3RlZENsYXNzLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmFkZENsYXNzKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdWNjZXMgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvciB0b2FzdGVyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vdGVhY2hlclNlcnZpY2UuZ2V0QWNjb3VudHMoKS50aGVuKGZ1bmN0aW9uIChhY2NvdW50cykge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVycyA9IHRlYWNoZXJzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudGVhY2hlcnMpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJywgbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcicsIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgJHVpYk1vZGFsSW5zdGFuY2UsIHN0dWR5cGxhbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFN0dWR5cGxhbiA9IGZ1bmN0aW9uIChzdHVkeXBsYW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbiA9IHN0dWR5cGxhbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBub2cgY2hlY2tlbiBvcCBnZWVuIHJlc3VsdGFhdCBnZXNlbGVjdGVlcmRcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkU3R1ZHlwbGFuKTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcyhcImNhbmNlbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBzdHVkeXBsYW5zO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdHVkeXBsYW5zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcicsIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBzdHVkeVBsYW5TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc3R1ZHlQbGFuU2VydmljZScsIHN0dWR5UGxhblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnRyb2xsZXJOYW1lKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgLy8gdGVzdGd1bHBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjb250cm9sbGVyTmFtZScsIGNvbnRyb2xsZXJOYW1lKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5yZXBsYWNlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlcnZpY2VOYW1lKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3Rlc3RndWxwXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2aWNlTmFtZScsIHNlcnZpY2VOYW1lKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5yZXBsYWNlJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZGFzaGJvYXJkU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnN0YXJ0RXZhbHVhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ldmFsdWF0aW9uL1wiICsgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5idW5kbGVJZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRhc2hib2FyZFNlcnZpY2UucGxhbm5lZEV2YWx1YXRpb25zKCkudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBsYW5uZWRFdmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY2FsZW5kYXJDb250cm9sbGVyJywgY2FsZW5kYXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
