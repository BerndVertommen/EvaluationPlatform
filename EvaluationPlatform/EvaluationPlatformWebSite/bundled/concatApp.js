var app = angular.module('app',
    ['ngRoute', 'toastr', 'ngAnimate', "ui.bootstrap", 'LocalStorageModule', 'angular-loading-bar', 'ngTouch', 'ngFileUpload'
    , 'app.customDirectives', 'app.home', 'app.classes', 'app.login', 'app.account', 'app.index', 'app.student', 'app.evaluationTemplate', 'app.evaluation', 'app.dashboard'
    , 'app.teacher', 'app.course', 'app.studyPlan', 'app.schoolyear'])




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
              controller: 'manageClassesController',
              resolve: {
                  allClasses: ["classesService", function(classesService) {
                      return classesService.allClasses().then(function (allClasses) {
                          return allClasses;
                      });
                  }]
              }
          });

        $routeProvider
        .when('/createClass', {
            templateUrl: 'app/classes/views/createClass.html',
            controller: 'createClassController'

        });

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

angular.module('app.customDirectives', ['ngRoute'])
    .config(function () {
        "use strict";

       
    });
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





angular.module('app.schoolyear', ['ngRoute'])
    .config(["$routeProvider", function ($routeProvider) {
        "use strict";
        
        // define routes

        //$routeProvider
        //  .when('/replace', {
        //      templateUrl: 'view Here',
        //      controller: 'controller for view here'
        //  });

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

    createClassController.$inject = ["$scope", "$location", "classesService", "messageService", "teacherService"];
    function createClassController($scope, $location, classesService, messageService, teacherService) {
        var thiz = this;
       
        //Variables
        $scope.selectedTeacher = null;
        $scope.selectedTeachers = [];

        //private Functions
        
        // public functions
        $scope.cancel = function() {
            $location.path("/manageClasses");
        }

        $scope.ok = function () {
            classesService.createClass($scope.createClassInfo).then(function () {
                messageService.handleSucces("Klas aangemaakt!");
                $location.path("/manageClasses");
            });

        }

        // todo remove this 
        $scope.$watch('selectedTeacher', function (value) {
            if (value == null) {
                return null;
            }
            console.log('Geselecteerde leerkacht :' + value.person.firstName + ' ' + value.person.lastName);
        });

        // todo remove this 
        $scope.$watch('selectedTeachers', function (teachers) {
            if (teachers.length < 1 ) {
                return null;
            }
            _.each(teachers, function(teacher) {
                console.log('Leerkracht :' + teacher.person.firstName + ' ' + teacher.person.lastName);
            });
        });


        //initiations
        var init = function () {
            $scope.createClassInfo = {};
            $scope.createClassInfo.nextYear = false;

            teacherService.getTeachers().then(function (result) {
                $scope.teachers = result;
            });
        }

        init();
    }

    module.controller('createClassController', createClassController);
})(angular.module('app.classes'));
(function (module) {
    'use strict';

    manageClassesController.$inject = ["$scope", "classesService", "schoolyearService", "toastr", "$location", "allClasses"];
    function manageClassesController($scope, classesService,schoolyearService, toastr, $location, allClasses) {
        var thiz = this;
       
        //Variables

        //private Functions
        
        // public functions
        $scope.setSelectedSchoolYear = function(schoolyear) {
            $scope.selectedSchoolYear = schoolyear;
        }

        $scope.uploadCsv = function() {
            classesService.uploadClassCsv($scope.file, $scope.selectedSchoolYear).then(function(parameters) {
                toastr.success('Het CSV bestand is met success opgeslagen.');
            });

        };

        //klassen volledig oproepen filteren clientside
        //studenten 10/10 van server ophalen

        $scope.selectedRow = null;

        $scope.setSelectedClass = function (classX, index) {
            $scope.setSelectedClass = classX;
            $scope.selectedRow = index;
        }

        //initiations
        var init = function () {
          schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
              $scope.schoolYears = schoolyears;

              $scope.selectedSchoolYear = $scope.schoolYears[0];

              console.log($scope.schoolYears);
              console.log($scope.selectedSchoolyear);
            });
           

            $scope.allClasses = allClasses;
            console.log($scope.allClasses);
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

    classesService.$inject = ["$http", "configurationService", "Upload"];
    function classesService($http, configurationService, Upload) {
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

        thiz.uploadClassCsv = function(file, schoolYear) {
            //return $http.post(baseWebApiUrl + 'class/uploadClassCsv', { file: file }
              return   Upload.upload({
                        url: baseWebApiUrl + 'class/uploadClassCsv/' + schoolYear.id,
                        data: { file: file }
                    }
                ).then(function (resp) {
               console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
               // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        thiz.allClasses = function() {
            return $http.get(baseWebApiUrl + "class/allClasses").then(function(result) {
                return result.data;
            });
        }

        thiz.createClass = function(createClassInfo) {
            return $http.post(baseWebApiUrl + "class/createClass", createClassInfo).then(function(result) {
                return result.data;
            });
        }

        //initiations

    };

    module.service('classesService', classesService);
})(angular.module('app.classes'));
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
    selectModal.$inject = ["selectModalService"];
    function selectModal(selectModalService) {
        return {
            restrict: 'E',
            template: "<a class='btn btn-default btn-sm' ><i class='fa fa-plus-square'></i></a>",
            scope: {
                modalname: '@',
                items: '=',
                selection:'='
            },
            link: function (scope, element) {

                element.bind('click', function() {
                    selectModalService.openModal(scope.modalname, scope.items).then(function (result) {
                        scope.selection = result;
                    });
                });
            }
        };
    }

    module.directive('selectModal', selectModal);
})(angular.module('app.customDirectives'));
(function (module) {
    'use strict';
    selectModalService.$inject = ["$uibModal"];
    function selectModalService($uibModal) {
        var thiz = this;

        var modalSettings = [
           /*selectTeacherModalSetting*/
           {
               modalName: "selectTeacherModal", template: "app/customDirectives/selectModalDirective/searchTeachersModal/selectTeacherModal.html", controller: "selectItemModalController",
               content: { title: "Leerkrachten", itemDescription: "Selecteer een leerkracht" }
           },
           /*selectTeachersModalSetting  => multiple teachers*/
           {
               modalName: "selectTeachersModal", template: "app/customDirectives/selectModalDirective/searchTeachersModal/selectTeachersModal.html", controller: "selectItemsModalController",
               content: { title: "Leerkrachten", itemDescription: "Selecteer leerkrachten" }
           },
           /*Other settings*/
        ];

        var getModalSetting = function (modalName) {
            var result = _.find(modalSettings, function (modalSetting) {
                return modalSetting.modalName.toLowerCase() === modalName.toLowerCase();
            });

            if (result == null) {
                console.log("Geen modal setting gevonden");
            };

            return result;
        };

        // public functions
        thiz.openModal = function (modalName, items) {

            var modalSetting = getModalSetting(modalName);
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: modalSetting.template,
                controller: modalSetting.controller,
                size: 'lg',
                resolve: {
                    items: function () {
                        return items;
                    },
                    content: function () {
                        return modalSetting.content;
                    }
                }
            });

            return modalInstance.result.then(function (selectedItem) {
                return selectedItem;
            });
        }
    }

    module.service('selectModalService', selectModalService);
})(angular.module('app.customDirectives')); //test
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
(function(module) {
    'use strict';
    schoolyearService.$inject = ["$http", "configurationService"];
    function schoolyearService($http, configurationService) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;

        //testgulp
        // Variables

        //private Functions

        // public functions
        thiz.getSchoolYears = function() {
            return $http.get(baseWebApiUrl + 'generalInfo/getschoolyears').then(function(result) {
                return result.data;
            });
        }

        thiz.getFutureSchoolYears = function() {
            return thiz.getSchoolYears().then(function(allSchoolYears) {
                var currentYear = new Date().getFullYear();
                var currentMonth = new Date().getMonth();
                if (currentMonth < 8) {
                    currentYear = currentYear - 1;
                }

                return _.filter(allSchoolYears, function (schoolyear) {
                    return schoolyear.startYear >= currentYear;
                });
            });
        }

    }

    module.service('schoolyearService', schoolyearService);
})(angular.module('app.schoolyear')); 
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

        thiz.getTeachers = function() { // use query object in future change method to post then probably
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
(function (module) {
    'use strict';

    selectItemModalController.$inject = ["$scope", "$uibModalInstance", "toastr", "items", "content"];
    function selectItemModalController($scope, $uibModalInstance, toastr, items, content) {
        var thiz = this;

        //private Functions

        // public functions
        $scope.selectedRow = null;

        $scope.setSelectedItem = function (item, index) {
            $scope.selectedItem = item;
            $scope.selectedRow = index;
        };

        // modal functions
        $scope.ok = function () {
            if (angular.isUndefined($scope.selectedItem)) {
                toastr.info('Selecteer een item uit de lijst om verder te kunnen gaan.');
                return;  //handle with error in future
            }

            $uibModalInstance.close($scope.selectedItem);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };



        //initiations
        var init = function () {
            $scope.items = items;
            $scope.content = content;

        }

        init();
    }

    module.controller('selectItemModalController', selectItemModalController);
})(angular.module('app.customDirectives'));

(function (module) {
    'use strict';

    selectItemsModalController.$inject = ["$scope", "$uibModalInstance", "toastr", "items", "content"];
    function selectItemsModalController($scope, $uibModalInstance, toastr, items, content) {
        var thiz = this;

        //private Functions
        var getSelectedItems = function () {
            return _.filter($scope.items, function (item) {
                if (item.selected === true) {
                    return item;
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
            angular.forEach($scope.items, function (item) {
                item.selected = $scope.selectedAll;
            });

        };

        // modal functions
        $scope.ok = function () {
            var selectedItems = getSelectedItems();
            if (angular.isUndefined(selectedItems) || selectedItems.length < 1) {
                toastr.info('Selecteer minstens één item uit de lijst om verder te kunnen gaan.');
                return;  //handle with error in future
            }

            $uibModalInstance.close(selectedItems);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };



        //initiations
        var init = function () {
            $scope.items = items;
            $scope.content = content;

        }

        init();
    }

    module.controller('selectItemsModalController', selectItemsModalController);
})(angular.module('app.customDirectives'));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNsYXNzZXMvY2xhc3Nlcy1tb2R1bGUuanMiLCJBY2NvdW50L2FjY291bnQtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJkYXNoYm9hcmQvZGFzaGJvYXJkLW1vZHVsZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvY3VzdG9tRGlyZWN0aXZlcy1tb2R1bGUuanMiLCJldmFsdWF0aW9uL2V2YWx1YXRpb24tbW9kdWxlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2V2YWx1YXRpb25UZW1wbGF0ZS1tb2R1bGUuanMiLCJob21lL2hvbWUtbW9kdWxlLmpzIiwibG9naW4vbG9naW4tbW9kdWxlLmpzIiwic2Nob29seWVhci9zY2hvb2x5ZWFyLW1vZHVsZS5qcyIsIkluZGV4L2luZGV4LW1vZHVsZS5qcyIsIlN0dWRlbnQvc3R1ZGVudC1tb2R1bGUuanMiLCJUZWFjaGVyL3RlYWNoZXItbW9kdWxlLmpzIiwiU3R1ZHlQbGFuL3N0dWR5UGxhbi1tb2R1bGUuanMiLCJtZXNzYWdlL21lc3NhZ2VDb25maWcuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9jcmVhdGVDbGFzc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL21hbmFnZUNsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9zZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvdGVzdENsYXNzQ3RybC5qcyIsImNsYXNzZXMvc2VydmljZXMvY2xhc3Nlc1NlcnZpY2UuanMiLCJBY2NvdW50L3NlcnZpY2VzL2FjY291bnRTZXJ2aWNlLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9jcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyLmpzIiwiQWNjb3VudC9jb250cm9sbGVycy9tYW5hZ2VBY2NvdW50Q29udHJvbGxlci5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvbWFuYWdlQ291cnNlQ29udHJvbGxlci5qcyIsImRhc2hib2FyZC9jb250cm9sbGVycy9kYXNoYm9hcmRDb250cm9sbGVyLmpzIiwiZGFzaGJvYXJkL3NlcnZpY2VzL2Rhc2hib2FyZFNlcnZpY2UuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlbGVjdE1vZGFsRGlyZWN0aXZlLmpzIiwiY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9zZWxlY3RNb2RhbFNlcnZpY2UuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25Db250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uc0NvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL3NlcnZpY2VzL2V2YWx1YXRpb25TZXJ2aWNlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUN0cmwuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL3NlcnZpY2VzL2V2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuanMiLCJob21lL2NvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwibG9naW4vZmFjdG9yaWVzL2F1dGhJbnRlcmNlcHRvckZhY3RvcnkuanMiLCJsb2dpbi9jb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJsb2dpbi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvblNlcnZpY2UuanMiLCJtZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwic2Nob29seWVhci9zZXJ2aWNlcy9zY2hvb2x5ZWFyU2VydmljZS5qcyIsIkluZGV4L3NlcnZpY2VzL2luZGV4U2VydmljZS5qcyIsIkluZGV4L2NvbnRyb2xsZXJzL2luZGV4Q3RybC5qcyIsIlN0dWRlbnQvY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanMiLCJTdHVkZW50L3NlcnZpY2VzL3N0dWRlbnRTZXJ2aWNlLmpzIiwiVGVhY2hlci9jb250cm9sbGVycy9hZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL21hbmFnZVRlYWNoZXJDb250cm9sbGVyLmpzIiwiVGVhY2hlci9zZXJ2aWNlcy90ZWFjaGVyU2VydmljZS5qcyIsIlN0dWR5UGxhbi9jb250cm9sbGVycy9tYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9zZXJ2aWNlcy9TdHVkeVBsYW5TZXJ2aWNlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL3BhcnRpYWxzL2NhbGVuZGFyQ29udHJvbGxlci5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvZ2VuZXJhbENvbnRyb2xsZXJzL3NlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXIuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL2dlbmVyYWxDb250cm9sbGVycy9zZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLE1BQU0sUUFBUSxPQUFPO0lBQ3JCLENBQUMsV0FBVyxVQUFVLGFBQWEsZ0JBQWdCLHNCQUFzQix1QkFBdUIsV0FBVztNQUN6Ryx3QkFBd0IsWUFBWSxlQUFlLGFBQWEsZUFBZSxhQUFhLGVBQWUsMEJBQTBCLGtCQUFrQjtNQUN2SixlQUFlLGNBQWMsaUJBQWlCOzs7QUFHcEQ7QUNOQTtBQUNBLFFBQVEsT0FBTyxlQUFlLENBQUM7S0FDMUIsMEJBQU8sU0FBUyxnQkFBZ0I7UUFDN0I7O1FBRUE7YUFDSyxLQUFLLFlBQVk7Z0JBQ2QsYUFBYTtnQkFDYixZQUFZO2dCQUNaLFNBQVM7O29CQUVMLDRCQUFTLFNBQVMsZ0JBQWdCO3dCQUM5QixPQUFPLGVBQWUsb0JBQW9CLEtBQUssU0FBUyxTQUFTOzRCQUM3RCxPQUFPOzs7Ozs7UUFNM0I7V0FDRyxLQUFLLGtCQUFrQjtjQUNwQixhQUFhO2NBQ2IsWUFBWTtjQUNaLFNBQVM7a0JBQ0wsK0JBQVksU0FBUyxnQkFBZ0I7c0JBQ2pDLE9BQU8sZUFBZSxhQUFhLEtBQUssVUFBVSxZQUFZOzBCQUMxRCxPQUFPOzs7Ozs7UUFNekI7U0FDQyxLQUFLLGdCQUFnQjtZQUNsQixhQUFhO1lBQ2IsWUFBWTs7OztRQUlqQjtBQ3ZDUCxRQUFRLE9BQU8sZUFBZSxD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QVcsWUFBWTtZQUMxQixJQUFJLE9BQU8sYUFBYTtnQkFDcEIsT0FBTyxjQUFjO21CQUNsQjtnQkFDSCxPQUFPLGNBQWM7O1lBRXpCLFFBQVEsUUFBUSxPQUFPLE9BQU8sVUFBVSxNQUFNO2dCQUMxQyxLQUFLLFdBQVcsT0FBTzs7Ozs7O1FBTS9CLE9BQU8sS0FBSyxZQUFZO1lBQ3BCLElBQUksZ0JBQWdCO1lBQ3BCLElBQUksUUFBUSxZQUFZLGtCQUFrQixjQUFjLFNBQVMsR0FBRztnQkFDaEUsT0FBTyxLQUFLO2dCQUNaOzs7WUFHSixrQkFBa0IsTUFBTTs7O1FBRzVCLE9BQU8sU0FBUyxZQUFZO1lBQ3hCLGtCQUFrQixRQUFROzs7Ozs7UUFNOUIsSUFBSSxPQUFPLFlBQVk7WUFDbkIsT0FBTyxRQUFRO1lBQ2YsT0FBTyxVQUFVOzs7O1FBSXJCOzs7SUFHSixPQUFPLFdBQVcsOEJBQThCO0dBQ2pELFFBQVEsT0FBTztBQUNsQiIsImZpbGUiOiJjb25jYXRBcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXHJcbiAgICBbJ25nUm91dGUnLCAndG9hc3RyJywgJ25nQW5pbWF0ZScsIFwidWkuYm9vdHN0cmFwXCIsICdMb2NhbFN0b3JhZ2VNb2R1bGUnLCAnYW5ndWxhci1sb2FkaW5nLWJhcicsICduZ1RvdWNoJywgJ25nRmlsZVVwbG9hZCdcclxuICAgICwgJ2FwcC5jdXN0b21EaXJlY3RpdmVzJywgJ2FwcC5ob21lJywgJ2FwcC5jbGFzc2VzJywgJ2FwcC5sb2dpbicsICdhcHAuYWNjb3VudCcsICdhcHAuaW5kZXgnLCAnYXBwLnN0dWRlbnQnLCAnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScsICdhcHAuZXZhbHVhdGlvbicsICdhcHAuZGFzaGJvYXJkJ1xyXG4gICAgLCAnYXBwLnRlYWNoZXInLCAnYXBwLmNvdXJzZScsICdhcHAuc3R1ZHlQbGFuJywgJ2FwcC5zY2hvb2x5ZWFyJ10pXHJcblxyXG5cclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9jbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbihjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3MvbWFuYWdlQ2xhc3Nlcy5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgYWxsQ2xhc3NlczogZnVuY3Rpb24oY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hbGxDbGFzc2VzKCkudGhlbihmdW5jdGlvbiAoYWxsQ2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGxDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL2NyZWF0ZUNsYXNzJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NyZWF0ZUNsYXNzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ2xhc3NDb250cm9sbGVyJ1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUFjY291bnQnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9tYW5hZ2VBY2NvdW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcidcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICBcclxuXHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUNvdXJzZScsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvbWFuYWdlQ291cnNlLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VDb3Vyc2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuYWxsQ291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgIC53aGVuKCcvY291cnNlcycsIHtcclxuICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9jb3Vyc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgY29udHJvbGxlcjogJ2NvdXJzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jcmVhdGVDb3Vyc2UnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvY3JlYXRlQ291cnNlLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL2Rhc2hib2FyZCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9kYXNoYm9hcmQvdmlld3MvZGFzaGJvYXJkLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdkYXNoYm9hcmRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9uLzpidW5kbGVJZD8nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb24uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblNlcnZpY2UsICRyb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVuZGxlSWQgPSAkcm91dGUuY3VycmVudC5wYXJhbXMuYnVuZGxlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9uU2VydmljZS5ldmFsdWF0aW9uc0ZvckJ1bmRsZShidW5kbGVJZCkudGhlbihmdW5jdGlvbiAoZXZhbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAud2hlbignL2V2YWx1YXRpb25zJywge1xyXG4gICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb25zLmh0bWwnLFxyXG4gICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvbnNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM6IGZ1bmN0aW9uIChldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9uVGVtcGxhdGVzJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVzOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmdldEV2YWx1YXRpb25UZW1wbGF0ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICBcclxuICAgIH0pO1xyXG4iLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5ob21lJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbiggJy8nLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2hvbWUvdmlld3MvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAud2hlbignL2hvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2xvZ2luJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvbG9naW4vdmlld3MvbG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbG9naW5Db250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbmFwcC5ydW4oWydhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBmdW5jdGlvbiAoYXV0aGVudGljYXRpb25TZXJ2aWNlKSB7XHJcbiAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UuZ2V0QXV0aERhdGEoKTtcclxufV0pO1xyXG5cclxuYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xyXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuc2Nob29seWVhcicsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAvLyRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy8gIC53aGVuKCcvcmVwbGFjZScsIHtcclxuICAgICAgICAvLyAgICAgIHRlbXBsYXRlVXJsOiAndmlldyBIZXJlJyxcclxuICAgICAgICAvLyAgICAgIGNvbnRyb2xsZXI6ICdjb250cm9sbGVyIGZvciB2aWV3IGhlcmUnXHJcbiAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanNcIiAvPlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9jcmVhdGVTdHVkZW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWRlbnQvdmlld3MvY3JlYXRlU3R1ZGVudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlU3R1ZGVudENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlVGVhY2hlcicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL21hbmFnZVRlYWNoZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRlYWNoZXJzIDogZnVuY3Rpb24odGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyU2VydmljZS50ZWFjaGVycygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZVN0dWR5UGxhbicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkeVBsYW4vdmlld3MvbWFuYWdlU3R1ZHlQbGFuLmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFwcC5jb25maWcoZnVuY3Rpb24gKHRvYXN0ckNvbmZpZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5leHRlbmQodG9hc3RyQ29uZmlnLCB7XHJcbiAgICAgICAgYXV0b0Rpc21pc3M6IHRydWUsXHJcbiAgICAgICAgY29udGFpbmVySWQ6ICd0b2FzdC1jb250YWluZXInLFxyXG4gICAgICAgIG1heE9wZW5lZDogMTAsXHJcbiAgICAgICAgbmV3ZXN0T25Ub3A6IHRydWUsXHJcbiAgICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LWJvdHRvbS1yaWdodCcsXHJcbiAgICAgICAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHByZXZlbnRPcGVuRHVwbGljYXRlczogZmFsc2UsXHJcbiAgICAgICAgdGFyZ2V0OiAnYm9keScsXHJcblxyXG4gICAgICAgIGFsbG93SHRtbDogZmFsc2UsXHJcbiAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlSHRtbDogJzxidXR0b24+JnRpbWVzOzwvYnV0dG9uPicsXHJcbiAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxyXG4gICAgICAgIGljb25DbGFzc2VzOiB7XHJcbiAgICAgICAgICAgIGVycm9yOiAndG9hc3QtZXJyb3InLFxyXG4gICAgICAgICAgICBpbmZvOiAndG9hc3QtaW5mbycsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICd0b2FzdC1zdWNjZXNzJyxcclxuICAgICAgICAgICAgd2FybmluZzogJ3RvYXN0LXdhcm5pbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlQ2xhc3M6ICd0b2FzdC1tZXNzYWdlJyxcclxuICAgICAgICBvbkhpZGRlbjogbnVsbCxcclxuICAgICAgICBvblNob3duOiBudWxsLFxyXG4gICAgICAgIG9uVGFwOiBudWxsLFxyXG4gICAgICAgIHByb2dyZXNzQmFyOiBmYWxzZSxcclxuICAgICAgICB0YXBUb0Rpc21pc3M6IHRydWUsXHJcbiAgICAgICAgdGVtcGxhdGVzOiB7XHJcbiAgICAgICAgICAgIHRvYXN0OiAnZGlyZWN0aXZlcy90b2FzdC90b2FzdC5odG1sJyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NiYXI6ICdkaXJlY3RpdmVzL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmh0bWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lT3V0OiA0MDAwLFxyXG4gICAgICAgIHRpdGxlQ2xhc3M6ICd0b2FzdC10aXRsZScsXHJcbiAgICAgICAgdG9hc3RDbGFzczogJ3RvYXN0J1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRwcm92aWRlLCAkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkcHJvdmlkZS5mYWN0b3J5KCdlcnJvckludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRxLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0b2FzdHIgPSAkaW5qZWN0b3IuZ2V0KCd0b2FzdHInKTtcclxuICAgICAgICAgICAgICAgIC8vIHRvYXN0ci5lcnJvcignRm91dCcsIHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2VTZXJ2aWNlID0gJGluamVjdG9yLmdldCgnbWVzc2FnZVNlcnZpY2UnKTtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZVNlcnZpY2UuaGFuZGxlUmVqZWN0KHJlamVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2Vycm9ySW50ZXJjZXB0b3InKTtcclxufSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjbGFzc2VzQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY2xhc3Nlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXMgPSBjbGFzc2VzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjbGFzc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NsYXNzZXNDb250cm9sbGVyJywgY2xhc3Nlc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXNTZXJ2aWNlLCBtZXNzYWdlU2VydmljZSwgdGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFRlYWNoZXIgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFRlYWNoZXJzID0gW107XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDbGFzc2VzXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS5jcmVhdGVDbGFzcygkc2NvcGUuY3JlYXRlQ2xhc3NJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIktsYXMgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDbGFzc2VzXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB0b2RvIHJlbW92ZSB0aGlzIFxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ3NlbGVjdGVkVGVhY2hlcicsIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlc2VsZWN0ZWVyZGUgbGVlcmthY2h0IDonICsgdmFsdWUucGVyc29uLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLnBlcnNvbi5sYXN0TmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIHRvZG8gcmVtb3ZlIHRoaXMgXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWRUZWFjaGVycycsIGZ1bmN0aW9uICh0ZWFjaGVycykge1xyXG4gICAgICAgICAgICBpZiAodGVhY2hlcnMubGVuZ3RoIDwgMSApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF8uZWFjaCh0ZWFjaGVycywgZnVuY3Rpb24odGVhY2hlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0xlZXJrcmFjaHQgOicgKyB0ZWFjaGVyLnBlcnNvbi5maXJzdE5hbWUgKyAnICcgKyB0ZWFjaGVyLnBlcnNvbi5sYXN0TmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ2xhc3NJbmZvID0ge307XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDbGFzc0luZm8ubmV4dFllYXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmdldFRlYWNoZXJzKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudGVhY2hlcnMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVDbGFzc0NvbnRyb2xsZXInLCBjcmVhdGVDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlLHNjaG9vbHllYXJTZXJ2aWNlLCB0b2FzdHIsICRsb2NhdGlvbiwgYWxsQ2xhc3Nlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkU2Nob29sWWVhciA9IGZ1bmN0aW9uKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkU2Nob29sWWVhciA9IHNjaG9vbHllYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUudXBsb2FkQ3N2ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLnVwbG9hZENsYXNzQ3N2KCRzY29wZS5maWxlLCAkc2NvcGUuc2VsZWN0ZWRTY2hvb2xZZWFyKS50aGVuKGZ1bmN0aW9uKHBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKCdIZXQgQ1NWIGJlc3RhbmQgaXMgbWV0IHN1Y2Nlc3Mgb3BnZXNsYWdlbi4nKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8va2xhc3NlbiB2b2xsZWRpZyBvcHJvZXBlbiBmaWx0ZXJlbiBjbGllbnRzaWRlXHJcbiAgICAgICAgLy9zdHVkZW50ZW4gMTAvMTAgdmFuIHNlcnZlciBvcGhhbGVuXHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzWCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ2xhc3MgPSBjbGFzc1g7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgc2Nob29seWVhclNlcnZpY2UuZ2V0RnV0dXJlU2Nob29sWWVhcnMoKS50aGVuKGZ1bmN0aW9uIChzY2hvb2x5ZWFycykge1xyXG4gICAgICAgICAgICAgICRzY29wZS5zY2hvb2xZZWFycyA9IHNjaG9vbHllYXJzO1xyXG5cclxuICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTY2hvb2xZZWFyID0gJHNjb3BlLnNjaG9vbFllYXJzWzBdO1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2Nob29sWWVhcnMpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZFNjaG9vbHllYXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5hbGxDbGFzc2VzID0gYWxsQ2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmFsbENsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcicsIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGtsYXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZENsYXNzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJywgc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgZnVuY3Rpb24gdGVzdENsYXNzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmdldFRlc3RDbGFzcygpLnRoZW4oZnVuY3Rpb24gKGNsYXNzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RDbGFzcyA9IGNsYXNzUmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignVGVzdENsYXNzQ29udHJvbGxlcicsIHRlc3RDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsYXNzZXNTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSwgVXBsb2FkKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yVGVhY2hlcicpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yQ291cnNlID0gZnVuY3Rpb24oY291cnNlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yQ291cnNlJywgeyAnaWQnOiBjb3Vyc2VJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXIgPSBmdW5jdGlvbih0ZWFjaGVySWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcicsIHsgJ2lkJzogdGVhY2hlcklkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei51cGxvYWRDbGFzc0NzdiA9IGZ1bmN0aW9uKGZpbGUsIHNjaG9vbFllYXIpIHtcclxuICAgICAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL3VwbG9hZENsYXNzQ3N2JywgeyBmaWxlOiBmaWxlIH1cclxuICAgICAgICAgICAgICByZXR1cm4gICBVcGxvYWQudXBsb2FkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL3VwbG9hZENsYXNzQ3N2LycgKyBzY2hvb2xZZWFyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGZpbGU6IGZpbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU3VjY2VzcyAnICsgcmVzcC5jb25maWcuZGF0YS5maWxlLm5hbWUgKyAndXBsb2FkZWQuIFJlc3BvbnNlOiAnICsgcmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBzdGF0dXM6ICcgKyByZXNwLnN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzc1BlcmNlbnRhZ2UgPSBwYXJzZUludCgxMDAuMCAqIGV2dC5sb2FkZWQgLyBldnQudG90YWwpO1xyXG4gICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncHJvZ3Jlc3M6ICcgKyBwcm9ncmVzc1BlcmNlbnRhZ2UgKyAnJSAnICsgZXZ0LmNvbmZpZy5kYXRhLmZpbGUubmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouYWxsQ2xhc3NlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImNsYXNzL2FsbENsYXNzZXNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUNsYXNzID0gZnVuY3Rpb24oY3JlYXRlQ2xhc3NJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyBcImNsYXNzL2NyZWF0ZUNsYXNzXCIsIGNyZWF0ZUNsYXNzSW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnY2xhc3Nlc1NlcnZpY2UnLCBjbGFzc2VzU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gYWNjb3VudFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlUGF0aCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3RoaXouY2hhbmdlUGFzc3dvcmQgPSBmdW5jdGlvbiAoY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpIHtcclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jaGFuZ2VwYXNzd29yZCcsIGNoYW5nZVBhc3N3b3JkQmluZGluZ01vZGVsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL3RoaXouY3JlYXRlVGVzdEFjY291bnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgdmFyIGNyZWF0ZVVzZXJNb2RlbCA9IHtcclxuICAgICAgICAvLyAgICAgICAgdXNlcm5hbWU6IFwiVGVzdGVyXCIsXHJcbiAgICAgICAgLy8gICAgICAgIGVtYWlsOiBcImJlcm5kdmVydG9tbWVuQG1zbi5jb21cIixcclxuICAgICAgICAvLyAgICAgICAgZmlyc3ROYW1lOiBcIlRlc3RcIixcclxuICAgICAgICAvLyAgICAgICAgbGFzdG5hbWU6IFwiZXJcIixcclxuICAgICAgICAvLyAgICAgICAgcGFzc3dvcmQ6IFwiQERtaW4xMjNcIixcclxuICAgICAgICAvLyAgICAgICAgY29uZmlybVBhc3N3b3JkIDpcIkBEbWluMTIzXCJcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8gICAgcmV0dXJuICRodHRwLnBvc3QoY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGggKyAnYWNjb3VudHMvY3JlYXRlVGVzdGVyJywgY3JlYXRlVXNlck1vZGVsKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmlldXdlIG1ldGhvZGUgb20gYWNjb3VudCB0ZSBjcmVlZXJlbiBhYW5nZW1hYWt0XHJcbiAgICAgICAgdGhpei5jcmVhdGVBY2NvdW50ID0gZnVuY3Rpb24oY3JlYXRlQWNjb3VudEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVBhdGggKyAnYWNjb3VudHMvY3JlYXRlQWNjb3VudCcsIGNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY3JlZWVyIGhpZXIgZGUgbWV0aG9kZSBkaWUgbmFhciBiaWogZGUgYWNjb3VudGNvbnRyb2xsZXIgY3JlYXRlQWNjb3VudCBnZWJydWlrdC5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnYWNjb3VudFNlcnZpY2UnLCBhY2NvdW50U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCBhY2NvdW50U2VydmljZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgbWVzc2FnZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0QWNjb3VudFJvbGUgPSBmdW5jdGlvbiAocm9sZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSByb2xlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gcm9lcCBoaWVyIGRlIGFjY291bnRzZXJ2aWNlIG9wIG9tIGVlbiBuaWV1d2UgYWNjb3VudCB0ZSBtYWtlbiBtZXQgZGUgZGF0YSBkaWUgdmlhIGRlIHZpZXcgaXMgaW5nZXZ1bGQuXHJcbiAgICAgICAgICAgIC8vIGdlZWYgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvIG1lZSBpbiBpbiBkZSBhY2NvdW50U2VydmljZSBtZXRob2RlLlxyXG4gICAgICAgICAgICAvLy50aGVuIG9tIHRlIHdhY2h0ZW4gdG90ZGF0IGRlIHNlcnZlciBnZWFudHdvb3JkIGhlZWZ0XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmNyZWF0ZUFjY291bnQoJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIkFjY291bnQgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTsgLy8gZ2VicnVpayBkaXQgaW4gdGhlIC50aGVuIGZ1bmN0aWUgem9kYXQgZGUgbW9kYWwgc2x1aXQgbmEgZGUgc2VydmVyY2FsbC5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mbyA9IHt9OyAvLyBnZWJydWlrIGRpdCBvbSBhbGxlIGluZm8gYWFuIHRlIGhhbmdlbiBpbiBkZSB2aWV3IChkaXQgbW9kZWwgbW9ldCBqZSBzZXJ2ZXJzaWRlIG5vZyBvcGJvdXdlbilcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvLnJvbGVUeXBlID0gXCJVc2VyUm9sZVwiO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8uaXNUZWFjaGVyID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsIGNyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VBY2NvdW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYWNjb3VudFNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy8gY3RybCArIGggcmVwbGFjZSBhbGxlIGNvbnRyb2xsZXJuYW1lbiBkb29yIGh1aWRpZ2UgY29udHJvbGxlclxyXG4gICAgICAgIC8vIHZlcnZhbmcgYXBwLnJlcGxhY2UgZG9vciBkZSBqdWlzdGUgbW9kdWxlIGluIGRpdCBnZXZhbCBhcHAuYWNjb3VudCBzdGFhdCBpbiBhY2NvdW50LW1vZHVsZS5qc1xyXG5cclxuICAgICAgICAvL2NvbnRyb2xsZXIgaW4gaW5kZXguaHRtbCBzbGVwZW4vdG9ldm9lZ2VuIG9uZGVyYWFuIGJpaiBzY3JpcHRzIGNvbnRyb2xsZXJzXHJcblxyXG4gICAgICAgIC8vdmlldyBhYW5tYWtlbiBrb3BpZWVyIHVpdCBjb3B5IGZvbGRlclxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGluIG1vZHVsZSBhY2NvdW50LW1vZHVsZSByb3V0ZSBhYW5tYWtlbiAoJHJvdXRlUHJvdmlkZXIpXHJcblxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBzZWxlY3RlcmVuIHZhbiByaWogaW4gYWNjb3VudHN0YWJlbFxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQWNjb3VudCA9IGZ1bmN0aW9uIChhY2NvdW50LCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gYWNjb3VudDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0FjY291bnQvdmlld3MvY3JlYXRlQWNjb3VudE1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8vIG5pZXRzIGRvb3IgdGUgZ2V2ZW4uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBhY2NvdW50U2VydmljZS5nZXRBY2NvdW50cygpLnRoZW4oZnVuY3Rpb24gKGFjY291bnRzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQWNjb3VudENvbnRyb2xsZXInLCBtYW5hZ2VBY2NvdW50Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlndXJhdGlvblNlcnZpY2UoJGh0dHAsIHRvYXN0ckNvbmZpZykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGFwaVVybCA9ICdodHRwOi8vdGVzdHBsYXRmb3JtQXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXouYmFzZUFwaVBhdGggPSBhcGlVcmwgKyAnYXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXoudG9rZW5QYXRoID0gYXBpVXJsICsgJ29hdXRoL3Rva2VuJztcclxuXHJcbiAgICAgICAgdGhpei5nZXRTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRoaXouYmFzZUFwaVBhdGggKyBcIi9nZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFyc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVBkZkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vcGRmJyB9KTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZmlsZSwgJ2ZpbGVOYW1lLnBkZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUFzKGZpbGUsICdmaWxlbmFtZS5wZGYnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjb25maWd1cmF0aW9uU2VydmljZScsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5nZXRDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jb3Vyc2VzRm9yVGVhY2hlclwiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENvdXJzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2FsbENvdXJzZXNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDb3Vyc2UgPSBmdW5jdGlvbiAoY3JlYXRlQ291cnNlSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2NyZWF0ZUNvdXJzZVwiLCBjcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvdXJzZVNlcnZpY2UnLCBjb3Vyc2VTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvdXJzZUNvbnRyb2xsZXInLCBjb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VTZXJ2aWNlLCAkdWliTW9kYWwsIHN0dWR5UGxhblNlcnZpY2UsIG1lc3NhZ2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDb3Vyc2VcIik7XHJcbiAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiMvbWFuYWdlQ291cnNlXCI7IC8vYmlqIGxvY2F0aW9uLnBhdGggZ2VlbiAjIGJpamRvZW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb3Vyc2VTZXJ2aWNlLmNyZWF0ZUNvdXJzZSgkc2NvcGUuY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIkN1cnN1cyBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY3JlYXRlQ291cnNlSW5mbyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TdHVkeXBsYW5Nb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkeVBsYW4vdmlld3Mvc2VsZWN0U3R1ZHlQbGFuTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZHlwbGFuczogc3R1ZHlQbGFuU2VydmljZS5nZXRTdHVkeVBsYW5zKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkU3R1ZHlQbGFuKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mby5zdHVkeVBsYW4gPSBzZWxlY3RlZFN0dWR5UGxhbjtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2VlbiBTdHVkeXBsYW4gZ2VzZWxlY3RlZXJkIGVycm9yPyBoaWVyIGtvbSBqZSBpbiBhbHMgamUgbmlrcyBzZWxlY3RlZXJkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvID0ge307XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInLCBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ291cnNlQ29udHJvbGxlcicsIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhc2hib2FyZENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5jYWxlbmRlclBhdGggPSAnYXBwL2Rhc2hib2FyZC92aWV3cy9wYXJ0aWFscy9jYWxlbmRhclBhcnRpYWwuaHRtbCc7XHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZGFzaGJvYXJkQ29udHJvbGxlcicsIGRhc2hib2FyZENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LnBsYW5uZWRFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImV2YWx1YXRpb24vcGxhbm5lZEV2YWx1YXRpb25zXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2Rhc2hib2FyZFNlcnZpY2UnLCBkYXNoYm9hcmRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsKHNlbGVjdE1vZGFsU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxhIGNsYXNzPSdidG4gYnRuLWRlZmF1bHQgYnRuLXNtJyA+PGkgY2xhc3M9J2ZhIGZhLXBsdXMtc3F1YXJlJz48L2k+PC9hPlwiLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOic9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbChzY29wZS5tb2RhbG5hbWUsIHNjb3BlLml0ZW1zKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0aW9uID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5kaXJlY3RpdmUoJ3NlbGVjdE1vZGFsJywgc2VsZWN0TW9kYWwpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsU2VydmljZSgkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBtb2RhbFNldHRpbmdzID0gW1xyXG4gICAgICAgICAgIC8qc2VsZWN0VGVhY2hlck1vZGFsU2V0dGluZyovXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBtb2RhbE5hbWU6IFwic2VsZWN0VGVhY2hlck1vZGFsXCIsIHRlbXBsYXRlOiBcImFwcC9jdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlYXJjaFRlYWNoZXJzTW9kYWwvc2VsZWN0VGVhY2hlck1vZGFsLmh0bWxcIiwgY29udHJvbGxlcjogXCJzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiTGVlcmtyYWNodGVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgZWVuIGxlZXJrcmFjaHRcIiB9XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICAvKnNlbGVjdFRlYWNoZXJzTW9kYWxTZXR0aW5nICA9PiBtdWx0aXBsZSB0ZWFjaGVycyovXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBtb2RhbE5hbWU6IFwic2VsZWN0VGVhY2hlcnNNb2RhbFwiLCB0ZW1wbGF0ZTogXCJhcHAvY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9zZWFyY2hUZWFjaGVyc01vZGFsL3NlbGVjdFRlYWNoZXJzTW9kYWwuaHRtbFwiLCBjb250cm9sbGVyOiBcInNlbGVjdEl0ZW1zTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiTGVlcmtyYWNodGVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgbGVlcmtyYWNodGVuXCIgfVxyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgLypPdGhlciBzZXR0aW5ncyovXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFyIGdldE1vZGFsU2V0dGluZyA9IGZ1bmN0aW9uIChtb2RhbE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF8uZmluZChtb2RhbFNldHRpbmdzLCBmdW5jdGlvbiAobW9kYWxTZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWxTZXR0aW5nLm1vZGFsTmFtZS50b0xvd2VyQ2FzZSgpID09PSBtb2RhbE5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2VlbiBtb2RhbCBzZXR0aW5nIGdldm9uZGVuXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5vcGVuTW9kYWwgPSBmdW5jdGlvbiAobW9kYWxOYW1lLCBpdGVtcykge1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vZGFsU2V0dGluZyA9IGdldE1vZGFsU2V0dGluZyhtb2RhbE5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBtb2RhbFNldHRpbmcudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBtb2RhbFNldHRpbmcuY29udHJvbGxlcixcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWxTZXR0aW5nLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2VsZWN0TW9kYWxTZXJ2aWNlJywgc2VsZWN0TW9kYWxTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uU2VydmljZSwgZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0RXZhbHVhdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgIC8vIGV2YWx1YXRpb25TZXJ2aWNlLnNldFN1YnNlY3Rpb25TY29yZXMoKTsgLy8gZmluZCBvdGhlciBzb2x1dGlvbiB0byBtYXAgc2NvcmVzIG5vdCBvbiBldnJ5IHNlbGVjdC5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2NvcmUgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbkl0ZW0sIHNjb3JlKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25JdGVtLnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwZGF0ZUV2YWx1YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVwZGF0ZUV2YWx1YXRpb24oJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbikudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4RXZhID0gXy5maW5kSW5kZXgoJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YS5pZCA9PT0gZXZhbHVhdGlvbi5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1tpbmRleEV2YV0gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgaGFzaGtleSA9ICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uJCRoYXNoS2V5O1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgICAgIC8vJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXkgPSBoYXNoa2V5O1xyXG4gICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwZGF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS51cGRhdGVFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnMpLnRoZW4oZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldE5vdFNjb3JlZFJlYXNvbiA9IGZ1bmN0aW9uKGV2YWx1YXRpb25pdGVtLCBudW1iZXIpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbml0ZW0ubm90U2NvcmVkUmVhc29uID0gbnVtYmVyO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5zY29yZSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uU2VydmljZS5tYXBJdGVtc1RvU3ViU2VjdGlvbigkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG4gICAgICAgICAvLyBldmFsdWF0aW9uU2VydmljZS5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGl6Lm1hcEl0ZW1zVG9TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uZ3JvdXBCeShldmFsdWF0aW9uLmV2YWx1YXRpb25JdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLnNvcnRCeShkaWZmZXJlbnRTdWJzZWN0aW9ucywgZnVuY3Rpb24oc3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi53ZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMgPSBkaWZmZXJlbnRTdWJzZWN0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8vLyB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSA9PiB1c2UgZGljdGlvbmFyeSBmcm9tIGMjIHRoaXMgd2F5XHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zLCBmdW5jdGlvbiAoc3Vic2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0KSAmJiAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNlY3Rpb24udG90YWxTY29yZSA9ICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0LnRvdGFsc1BlcmNhdGVnb3J5W3N1YnNlY3Rpb25bMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24uaWRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbWFwIGV2ZXJ5IGV2YWx1YXRpb24gbm90IGp1c3Qgc2VsZWN0ZWQgc28gaXQgY2FuIGJlIHByb2Nlc2VkIGluIGludCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzVGl0bGUgPSBldmFsdWF0aW9uc1swXS5jcmVhdGVkRm9yQ2xhc3MuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvblNlcnZpY2UubWFwSXRlbXNUb1N1YlNlY3Rpb24oZXZhbHVhdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvbkNvbnRyb2xsZXInLCBldmFsdWF0aW9uQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25zQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcywgY2xhc3NlcywgZXZhbHVhdGlvblNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uKGtsYXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBrbGFzO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNsYXNzSWQgPSAkc2NvcGUuc2VsZWN0ZWRDbGFzcy5pZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Q291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY291cnNlSWQgPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsZWFyU2VhcmNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnN0YXJ0RGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuZW5kRGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuZmluaXNoZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNsYXNzSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdHVkZW50Rmlyc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdHVkZW50TGFzdG5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd3BhZ2luYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnNlYXJjaEV2YWx1YXRpb25zKCRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QpLnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC5ldmFsdWF0aW9ucztcclxuICAgICAgICAgICAgICAgICRzY29wZS50b3RhbEl0ZW1zID0gZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5UmVzdWx0LnRvdGFsSXRlbXM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd3BhZ2luYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNUb1BkZiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3MvZXZhbHVhdGlvbnNUb1BkZk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uczsgLy8gbWF5YmUgZG8gYSBzZWFyY2ggYWdhaW4gd2l0aCBtb3JlIGl0ZW1zIHBhZ2VkP1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRFdmFsdWF0aW9uSWRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdC5FdmFsdWF0aW9uSWRzID0gc2VsZWN0ZWRFdmFsdWF0aW9uSWRzO1xyXG5cclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLmNyZWF0ZVBkZkZvckV2YWx1YXRpb25zKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TY29yZWRFdmFsdWF0aW9uTW9kYWwgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL3Njb3JlZEV2YWx1YXRpb25Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbjogZXZhbHVhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXMgPSBjbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsIGV2YWx1YXRpb25zQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25zLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICB2YXIgZ2V0U2VsZWN0ZWRJZHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8ubWFwKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24oZXZhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZhLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZEFsbCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gJHNjb3BlLnNlbGVjdGVkQWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoZ2V0U2VsZWN0ZWRJZHMoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvbiwgZXZhbHVhdGlvblNlcnZpY2UsICR1aWJNb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVG9QZGYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLmNyZWF0ZVBkZkZvckV2YWx1YXRpb24oJHNjb3BlLmV2YWx1YXRpb24pO1xyXG4gICAgICAgICAgICAkc2NvcGUub2soKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UubWFwU3Vic2VjdGlvblRvRXZhbHVhdGlvbihldmFsdWF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyJywgc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZXZhbHVhdGlvbnNGb3JCdW5kbGUgPSBmdW5jdGlvbihidW5kbGVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vZXZhbHVhdGlvbnNGb3JCdW5kbGUnLCB7ICdpZCc6IGJ1bmRsZUlkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9uJywgZXZhbHVhdGlvbikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vdXBkYXRlRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5zZWFyY2hFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3NlYXJjaEV2YWx1YXRpb25zJywgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QsIHsgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlndXJhdGlvblNlcnZpY2UuaGFuZGxlUGRmRGF0YShyZXN1bHQuZGF0YSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdC5FdmFsdWF0aW9uSWRzID0gW2V2YWx1YXRpb24uaWRdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXouY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMocGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRpb24gZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uZ3JvdXBCeShldmFsdWF0aW9uLmV2YWx1YXRpb25JdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLnNvcnRCeShkaWZmZXJlbnRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzKGV2YWx1YXRpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qTWFwcyBzdWJzZWN0aW9ucyB0byBldmFsdWF0aW9uaXRlbXMqL1xyXG4gICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgXy5lYWNoKGV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpei5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uKGV2YWx1YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9ucztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKlVzZSB0aGlzIHRvIG1hcCB0aGUgc2NvcmVzIHRvIHRoZSBtYXBwZWQgc3Vic2VjdGlvbnMgb2YgYSBldmFsdWF0aW9uKi9cclxuICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAvLy8vIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldID0+IHVzZSBkaWN0aW9uYXJ5IGZyb20gYyMgdGhpcyB3YXlcclxuICAgICAgICAgICAgXy5lYWNoKGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJzZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoZXZhbHVhdGlvbi5yZXN1bHQpICYmIGV2YWx1YXRpb24ucmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Vic2VjdGlvbi50b3RhbFNjb3JlID0gZXZhbHVhdGlvbi5yZXN1bHQudG90YWxzUGVyY2F0ZWdvcnlbc3Vic2VjdGlvblswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5pZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBtYXAgZXZlcnkgZXZhbHVhdGlvbiBub3QganVzdCBzZWxlY3RlZCBzbyBpdCBjYW4gYmUgcHJvY2VzZWQgaW4gaW50KClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblNlcnZpY2UnLCBldmFsdWF0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGV2YWx1YXRpb25UZW1wbGF0ZSwgY2xhc3Nlc0ZvckNvdXJzZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vIGRhdGVwaWNrZXJcclxuICAgICAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cy5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoLCBkYXkpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQuZXZhbHVhdGlvbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF5OiAxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZW5kIGRhdGVwaWNrZXJcclxuXHJcbiAgICAgICAgLy9zY2hvb2x5ZWFyIGRyb3Bkb3duXHJcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgaXNvcGVuOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMuaXNvcGVuID0gISRzY29wZS5zdGF0dXMuaXNvcGVuO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ge307XHJcbiAgICAgICAgJHNjb3BlLnNldENsYXNzID0gZnVuY3Rpb24gKGNsYXNzRm9yQ291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmNsYXNzSWQgPSBjbGFzc0ZvckNvdXJzZS5pZDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBjbGFzc0ZvckNvdXJzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vZW5kIHNjaG9vbHllYXIgZHJvcGRvd25cclxuXHJcbiAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vbWFrZSBjYWxsIGhlcmVcclxuICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSgkc2NvcGUuY3JlYXRlQ29tbWFuZCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdvaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXNGb3JDb3Vyc2UgPSBjbGFzc2VzRm9yQ291cnNlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSBldmFsdWF0aW9uVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kID0ge1xyXG4gICAgICAgICAgICAgICAgRXZhbHVhdGlvblRlbXBsYXRlSWQ6IGV2YWx1YXRpb25UZW1wbGF0ZS5pZCxcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25EYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBjbGFzc0lkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLCBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gW107XHJcbiAgICAgICAgJHNjb3BlLnRhYnMgPSAxO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNhdmVUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGRldmVsb3AgdmFsaWRhdGlvbiBhbmQgYWRqdXN0IDEwMCBwZXJzY2VudCBjb2RlLlxyXG4gICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmNyZWF0ZVRlbXBsYXRlKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2V2YWx1YXRpb25UZW1wbGF0ZXMnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmFsT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAnZGVzY3JpcHRpb24nOiBcIlwiLCAnY291cnNlJzogbnVsbCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKGdlbmVyYWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uID0gZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSA9IGdlbmVyYWxPcHRpb25zLmNvdXJzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuU3ViU2VjdGlvbnMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uU3ViU2VjdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViU2VjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUb3RhbFdlaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5pbmRleE9mKHN1YlNlY3Rpb24pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR29hbHMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVHb2FsczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hvc2VuR29hbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN1YlNlY3Rpb24uZ29hbHMsIGZ1bmN0aW9uKGdvYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5Hb2Fscy5wdXNoKGdvYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF2aWFsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hvc2VuR29hbHMubGVuZ3RoID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmlhbGFibGVHb2FscyA9IF8ucmVqZWN0KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlLCBmdW5jdGlvbiAoZ29hbEZyb21Db3Vyc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5Hb2FscyA9IF8uYW55KGNob3NlbkdvYWxzLCBmdW5jdGlvbiAoZ29hbGZyb21TdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdvYWxGcm9tQ291cnNlLmlkID09PSBnb2FsZnJvbVN1Yi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5Hb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHM9ICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb2VsIHRvZWdldm9lZ2RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlR29hbCA9IGZ1bmN0aW9uKHN1YnNlY3Rpb24sIGdvYWwpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3Vic2VjdGlvbi5nb2Fscy5pbmRleE9mKGdvYWwpO1xyXG4gICAgICAgICAgICBzdWJzZWN0aW9uLmdvYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG90YWxQZXJjZW50YWdlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudGFnZSArPSBwYXJzZUludChzdWJTZWN0aW9uLndlaWdodCwxMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24pICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IG51bGwgJiYgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjQ291cnNlUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UpICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2UgPT09IDEwMCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0dvYWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbmVHb2FsU2V0ID0gXy5hbnkoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpICYmIHN1YlNlY3Rpb24uZ29hbHMubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvbmVHb2FsU2V0ID8gMjUgOiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0Rlc2NyaXB0aW9uUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0NvdXJzZVBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNHb2FsUG9pbnRzKCk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVzLCAkdWliTW9kYWwsIGNsYXNzZXNTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc0ZvckNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvckNvdXJzZSgkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZS5jb3Vyc2UuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZXNUb0hpZGUgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzLCBmdW5jdGlvbiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5jaGVja0hpZGRlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlc1RvSGlkZS5wdXNoKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVzVG9IaWRlLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyh0ZW1wbGF0ZXNUb0hpZGUpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0ZW1wbGF0ZXNUb0hpZGUsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5oaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzID0gZXZhbHVhdGlvblRlbXBsYXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBzdWJTZWN0aW9uLCBjb3Vyc2UsIGF2YWlsYWJsZUdvYWxzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5nb2Fsc0ZpbHRlciA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7IFxyXG4gICAgICBcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRHb2FsID0gZnVuY3Rpb24gKGdvYWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEdvYWwgPSBnb2FsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpIHx8ICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMucHVzaCgkc2NvcGUuc2VsZWN0ZWRHb2FsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZEdvYWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVHb2FscyA9IGF2YWlsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGV2YWx1YXRpb25TdWJTZWN0aW9ucywgY3VycmVudFRvdGFsV2VpZ2h0LCBjb3Vyc2UsIHN1YlNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXouYWRkbmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMucHVzaChhbmd1bGFyLmNvcHkoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCkgfHwgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBlcnJvciBtZXNzYWdlIGhlcmUgOiBubyB3ZWlndGggZW50ZXJlZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNFZGl0aW5nKSB8fCAkc2NvcGUuaXNFZGl0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFRvdGFsV2VpZ2h0ID0gY3VycmVudFRvdGFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3ViU2VjdGlvbikgJiYgc3ViU2VjdGlvbiAhPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGdlbmVyYWxPcHRpb25zLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IG51bGwgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMgPSBnZW5lcmFsT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlVGVtcGxhdGUgPSBmdW5jdGlvbihldmFsdWF0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlVGVtcGxhdGUnLCBldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0RXZhbHVhdGlvblRlbXBsYXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldEV2YWx1YXRpb25UZW1wbGF0ZXMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUgPSBmdW5jdGlvbihjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2NyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUnLCBjb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uKHRlbXBsYXRlc0lkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9oaWRlVGVtcGxhdGVzJywgdGVtcGxhdGVzSWRzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZScsIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBob21lQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJXZWxrb21cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBob21lQ29udHJvbGxlcik7XHJcblxyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnKSk7XHJcblxyXG5cclxuIiwiXHJcbid1c2Ugc3RyaWN0JztcclxuYXBwLmZhY3RvcnkoJ2F1dGhJbnRlcmNlcHRvckZhY3RvcnknLCBbJyRxJywgJyRsb2NhdGlvbicsXHJcbidsb2NhbFN0b3JhZ2VTZXJ2aWNlJywgZnVuY3Rpb24gKCRxLCAkbG9jYXRpb24sIGxvY2FsU3RvcmFnZVNlcnZpY2UpIHtcclxuXHJcbiAgICB2YXIgYXV0aEludGVyY2VwdG9yRmFjdG9yeSA9IHt9O1xyXG5cclxuICAgIHZhciBfcmVxdWVzdCA9IGZ1bmN0aW9uIChjb25maWcpIHtcclxuXHJcbiAgICAgICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcclxuXHJcbiAgICAgICAgdmFyIGF1dGhEYXRhID0gbG9jYWxTdG9yYWdlU2VydmljZS5nZXQoJ2F1dGhvcml6YXRpb25EYXRhJyk7XHJcbiAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyBhdXRoRGF0YS50b2tlbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIF9yZXNwb25zZUVycm9yID0gZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG4gICAgICAgIGlmIChyZWplY3Rpb24uc3RhdHVzID09PSA0MDEpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXV0aEludGVyY2VwdG9yRmFjdG9yeS5yZXF1ZXN0ID0gX3JlcXVlc3Q7XHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlc3BvbnNlRXJyb3IgPSBfcmVzcG9uc2VFcnJvcjtcclxuXHJcbiAgICByZXR1cm4gYXV0aEludGVyY2VwdG9yRmFjdG9yeTtcclxufV0pO1xyXG4iLCIoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbG9naW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsdG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnBhc3N3b3JkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUudGVzdFRpdGxlID0gXCJUZXN0VGl0bGVcIjtcclxuXHJcbiAgICAgICAgICAgIHRvYXN0ci5lcnJvcihcIlZ1bCBhbGxlIHZlbGRlbiBpbiBhdWIuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvck1lc3NhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS51c2VyTmFtZSkgfHwgYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUucGFzc3dvcmQpKSB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsb2dpbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogJHNjb3BlLnVzZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9naW4obG9naW5EYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvaG9tZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsLmNvbnRyb2xsZXIoJ2xvZ2luQ29udHJvbGxlcicsIGxvZ2luQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGF1dGhlbnRpY2F0aW9uU2VydmljZSgkaHR0cCwgbG9jYWxTdG9yYWdlU2VydmljZSwgY29uZmlndXJhdGlvblNlcnZpY2UsICRxLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdGhpei5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlKCdhdXRob3JpemF0aW9uRGF0YScpO1xyXG5cclxuICAgICAgICAgICAgdGhpei5pc0F1dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3VzZXJMb2dnZWRPdXQnLCB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmxvZ2luID0gZnVuY3Rpb24obG9naW5EYXRhKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBcImdyYW50X3R5cGU9cGFzc3dvcmQmdXNlcm5hbWU9XCIgK1xyXG4gICAgICAgICAgICAgICAgbG9naW5EYXRhLnVzZXJOYW1lICsgXCImcGFzc3dvcmQ9XCIgKyBsb2dpbkRhdGEucGFzc3dvcmQ7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5wb3N0KGNvbmZpZ3VyYXRpb25TZXJ2aWNlLnRva2VuUGF0aCwgZGF0YSwgeyBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9IH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYXV0aG9yaXphdGlvbkRhdGEnLCB7IHRva2VuOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbiwgdXNlck5hbWU6IGxvZ2luRGF0YS51c2VyTmFtZSwgZXhwaXJlczogcmVzcG9uc2UuZGF0YS5leHBpcmVzX2luIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBsb2dpbkRhdGEudXNlck5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGl6LmlzQXV0aCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkSW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6IHRoaXoudXNlck5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgfSksIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ091dCgpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QXV0aERhdGEgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhdXRoRGF0YSA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdhdXRob3JpemF0aW9uRGF0YScpO1xyXG4gICAgICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmlzQXV0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gYXV0aERhdGEudXNlck5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGF1dGhlbnRpY2F0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtZXNzYWdlU2VydmljZSh0b2FzdHIpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXouaGFuZGxlUmVqZWN0ID0gaGFuZGxlUmVqZWN0O1xyXG4gICAgICAgIHRoaXouaGFuZGxlU3VjY2VzID0gaGFuZGxlU3VjY2VzO1xyXG4gICAgICAgIHRoaXouaGFuZGxlV2FybmluZyA9IGhhbmRsZVdhcm5pbmc7XHJcbiAgICAgICAgdGhpei5oYW5kbGVFcnJvciA9IGhhbmRsZUVycm9yO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZWplY3QocmVqZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSwgJ0ZvdXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVTdWNjZXModGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3ModGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlV2FybmluZyh0ZXh0LCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIud2FybmluZyh0ZXh0LCB0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcih0ZXh0LCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IodGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnbWVzc2FnZVNlcnZpY2UnLCBtZXNzYWdlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAnKSk7IC8vdGVzdCIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNjaG9vbHllYXJTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3Rlc3RndWxwXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0U2Nob29sWWVhcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2dlbmVyYWxJbmZvL2dldHNjaG9vbHllYXJzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmdldEZ1dHVyZVNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGl6LmdldFNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbihhbGxTY2hvb2xZZWFycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TW9udGggPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFllYXIgPSBjdXJyZW50WWVhciAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFsbFNjaG9vbFllYXJzLCBmdW5jdGlvbiAoc2Nob29seWVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2hvb2x5ZWFyLnN0YXJ0WWVhciA+PSBjdXJyZW50WWVhcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzY2hvb2x5ZWFyU2VydmljZScsIHNjaG9vbHllYXJTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zY2hvb2x5ZWFyJykpOyAiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2aWNlTmFtZScsIGluZGV4U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgICRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ091dCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHVzZXJOYW1lID0gYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodXNlck5hbWUpICYmIHVzZXJOYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1c2VyTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigndXNlckxvZ2dlZEluJyxmdW5jdGlvbiAoZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkT3V0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsLmNvbnRyb2xsZXIoJ2luZGV4Q29udHJvbGxlcicsIGluZGV4Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIkhlbGxvIHdvcmxkXCI7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJywgY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENvdXJzZU1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCB0ZWFjaGVyU2VydmljZSwgdGVhY2hlciwgY291cnNlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZD17fTtcclxuICAgICAgICAgICAgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZC50ZWFjaGVySWQgPSB0ZWFjaGVyLmlkOyBcclxuICAgICAgICAgICAgYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZC5jb3Vyc2VJZD0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkIDtcclxuXHJcbiAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmFkZENvdXJzZShhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGVhY2hlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJywgYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCB0ZWFjaGVyU2VydmljZSwgJHVpYk1vZGFsLCB0ZWFjaGVycykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFRlYWNoZXIgPSBmdW5jdGlvbiAodGVhY2hlciwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVhY2hlciA9IHRlYWNoZXI7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vcGVuQ291cnNlc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL2FkZENvdXJzZU1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkZENvdXJzZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlYWNoZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5DbGFzc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3Mvc2VsZWN0Q2xhc3Nlc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcigkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kID0ge307XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQudGVhY2hlcklkID0gJHNjb3BlLnNlbGVjdGVkVGVhY2hlci5pZDtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC5jbGFzc0lkID0gc2VsZWN0ZWRDbGFzcy5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZWFjaGVyU2VydmljZS5hZGRDbGFzcyhhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3VjY2VzIHRvYXN0ZXJcclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3IgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3RlYWNoZXJTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgLy8gICAgJHNjb3BlLmFjY291bnRMaXN0ID0gYWNjb3VudHM7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGVhY2hlcnMgPSB0ZWFjaGVycztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnRlYWNoZXJzKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcicsIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZWFjaGVyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlID0gZnVuY3Rpb24oYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDb3Vyc2UnLCBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VGVhY2hlcnMgPSBmdW5jdGlvbigpIHsgLy8gdXNlIHF1ZXJ5IG9iamVjdCBpbiBmdXR1cmUgY2hhbmdlIG1ldGhvZCB0byBwb3N0IHRoZW4gcHJvYmFibHlcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICcvdGVhY2hlci90ZWFjaGVycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDbGFzcyA9IGZ1bmN0aW9uKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDbGFzcycsIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3RlYWNoZXJTZXJ2aWNlJywgdGVhY2hlclNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcicsIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgJHVpYk1vZGFsSW5zdGFuY2UsIHN0dWR5cGxhbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFN0dWR5cGxhbiA9IGZ1bmN0aW9uIChzdHVkeXBsYW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbiA9IHN0dWR5cGxhbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBub2cgY2hlY2tlbiBvcCBnZWVuIHJlc3VsdGFhdCBnZXNlbGVjdGVlcmRcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkU3R1ZHlwbGFuKTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcyhcImNhbmNlbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBzdHVkeXBsYW5zO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdHVkeXBsYW5zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcicsIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBzdHVkeVBsYW5TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc3R1ZHlQbGFuU2VydmljZScsIHN0dWR5UGxhblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZGFzaGJvYXJkU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnN0YXJ0RXZhbHVhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ldmFsdWF0aW9uL1wiICsgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5idW5kbGVJZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRhc2hib2FyZFNlcnZpY2UucGxhbm5lZEV2YWx1YXRpb25zKCkudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBsYW5uZWRFdmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY2FsZW5kYXJDb250cm9sbGVyJywgY2FsZW5kYXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRvYXN0ciwgaXRlbXMsIGNvbnRlbnQpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkSXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5pbmZvKCdTZWxlY3RlZXIgZWVuIGl0ZW0gdWl0IGRlIGxpanN0IG9tIHZlcmRlciB0ZSBrdW5uZW4gZ2Fhbi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgJHNjb3BlLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlcicsIHNlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgdG9hc3RyLCBpdGVtcywgY29udGVudCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIHZhciBnZXRTZWxlY3RlZEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5maWx0ZXIoJHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZEFsbCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gJHNjb3BlLnNlbGVjdGVkQWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJdGVtcyA9IGdldFNlbGVjdGVkSXRlbXMoKTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoc2VsZWN0ZWRJdGVtcykgfHwgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuaW5mbygnU2VsZWN0ZWVyIG1pbnN0ZW5zIMOpw6luIGl0ZW0gdWl0IGRlIGxpanN0IG9tIHZlcmRlciB0ZSBrdW5uZW4gZ2Fhbi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgJHNjb3BlLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXInLCBzZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
