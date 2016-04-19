var app = angular.module('app',
    ['ngRoute', 'toastr', 'ngAnimate', "ui.bootstrap", 'LocalStorageModule', 'angular-loading-bar', 'ngTouch', 'ngFileUpload'
    , 'app.customDirectives', 'app.home', 'app.classes', 'app.login', 'app.account', 'app.index', 'app.student', 'app.evaluationTemplate', 'app.evaluation', 'app.dashboard'
    , 'app.teacher', 'app.course', 'app.studyPlan', 'app.schoolyear'])



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

angular.module('app.customDirectives', ['ngRoute'])
    .config(function () {
        "use strict";

       
    });
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

    createClassController.$inject = ["$scope", "$location", "classesService", "messageService", "teacherService"];
    function createClassController($scope, $location, classesService, messageService, teacherService) {
        var thiz = this;
       
        //Variables
        $scope.selectedTeacher = null;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJjdXN0b21EaXJlY3RpdmVzL2N1c3RvbURpcmVjdGl2ZXMtbW9kdWxlLmpzIiwiZGFzaGJvYXJkL2Rhc2hib2FyZC1tb2R1bGUuanMiLCJldmFsdWF0aW9uL2V2YWx1YXRpb24tbW9kdWxlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2V2YWx1YXRpb25UZW1wbGF0ZS1tb2R1bGUuanMiLCJob21lL2hvbWUtbW9kdWxlLmpzIiwiSW5kZXgvaW5kZXgtbW9kdWxlLmpzIiwibG9naW4vbG9naW4tbW9kdWxlLmpzIiwic2Nob29seWVhci9zY2hvb2x5ZWFyLW1vZHVsZS5qcyIsIlN0dWRlbnQvc3R1ZGVudC1tb2R1bGUuanMiLCJTdHVkeVBsYW4vc3R1ZHlQbGFuLW1vZHVsZS5qcyIsIlRlYWNoZXIvdGVhY2hlci1tb2R1bGUuanMiLCJtZXNzYWdlL21lc3NhZ2VDb25maWcuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL21hbmFnZUFjY291bnRDb250cm9sbGVyLmpzIiwiQWNjb3VudC9zZXJ2aWNlcy9hY2NvdW50U2VydmljZS5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvY2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NyZWF0ZUNsYXNzQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy90ZXN0Q2xhc3NDdHJsLmpzIiwiY2xhc3Nlcy9zZXJ2aWNlcy9jbGFzc2VzU2VydmljZS5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jcmVhdGVDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL21hbmFnZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvc2VsZWN0TW9kYWxEaXJlY3RpdmUuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlbGVjdE1vZGFsU2VydmljZS5qcyIsImRhc2hib2FyZC9jb250cm9sbGVycy9kYXNoYm9hcmRDb250cm9sbGVyLmpzIiwiZGFzaGJvYXJkL3NlcnZpY2VzL2Rhc2hib2FyZFNlcnZpY2UuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25Db250cm9sbGVyLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uc0NvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL3NlcnZpY2VzL2V2YWx1YXRpb25TZXJ2aWNlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUN0cmwuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL3NlcnZpY2VzL2V2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuanMiLCJob21lL2NvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiSW5kZXgvY29udHJvbGxlcnMvaW5kZXhDdHJsLmpzIiwiSW5kZXgvc2VydmljZXMvaW5kZXhTZXJ2aWNlLmpzIiwibG9naW4vY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwibG9naW4vZmFjdG9yaWVzL2F1dGhJbnRlcmNlcHRvckZhY3RvcnkuanMiLCJsb2dpbi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvblNlcnZpY2UuanMiLCJtZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwic2Nob29seWVhci9zZXJ2aWNlcy9zY2hvb2x5ZWFyU2VydmljZS5qcyIsIlN0dWRlbnQvY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanMiLCJTdHVkZW50L3NlcnZpY2VzL3N0dWRlbnRTZXJ2aWNlLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIuanMiLCJTdHVkeVBsYW4vY29udHJvbGxlcnMvc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL3NlcnZpY2VzL1N0dWR5UGxhblNlcnZpY2UuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL2FkZENvdXJzZU1vZGFsQ29udHJvbGxlci5qcyIsIlRlYWNoZXIvY29udHJvbGxlcnMvbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIuanMiLCJUZWFjaGVyL3NlcnZpY2VzL3RlYWNoZXJTZXJ2aWNlLmpzIiwiY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9nZW5lcmFsQ29udHJvbGxlcnMvc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlci5qcyIsImRhc2hib2FyZC9jb250cm9sbGVycy9wYXJ0aWFscy9jYWxlbmRhckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxNQUFNLFFBQVEsT0FBTztJQUNyQixDQUFDLFdBQVcsVUFBVSxhQUFhLGdCQUFnQixzQkFBc0IsdUJBQXVCLFdBQVc7TUFDekcsd0JBQXdCLFlBQVksZUFBZSxhQUFhLGVBQWUsYUFBYSxlQUFlLDBCQUEwQixrQkFBa0I7TUFDdkosZUFBZSxjQUFjLGlCQUFpQjs7O0FBR3BEO0FDTkEsUUFBUSxPQUFPLGVBQWUsQ0FBQztLQUMxQiwwQkFBTyxVQUFVLGdCQUFnQjtRQUM5Qjs7UUFFQTtXQUNHLEtBQUssa0JBQWtCO2NBQ3BCLGFBQWE7Y0FDYixZQUFZOzs7Ozs7OztBQVExQjtBQ2ZBO0FBQ0EsUUFBUSxPQUFPLGVBQWUsQ0FBQztLQUMxQiwwQkFBTyxTQUFTLGdCQUFnQjtRQUM3Qjs7UUFFQTthQUNLLEtBQUssWUFBWTtnQkFDZCxhQUFhO2dCQUNiLFlBQVk7Z0JBQ1osU0FBUzs7b0JBRUwsNEJBQVMsU0FBUyxnQkFBZ0I7d0JBQzlCLE9BQU8sZUFBZSxvQkFBb0IsS0FBSyxTQUFTLFNBQVM7NEJBQzdELE9BQU87Ozs7OztRQU0zQjtXQUNHLEtBQUssa0JBQWtCO2NBQ3BCLGFBQWE7Y0FDYixZQUFZO2NBQ1osU0FBUztrQkFDTCwrQkFBWSxTQUFTLGdCQUFnQjtzQkFDakMsT0FBTyxlQUFlLGFBQWEsS0FBSyxVQUFVLFlBQVk7MEJBQzFELE9BQU87Ozs7OztRQU16QjtTQUNDLEtBQUssZ0JBQWdCO1lBQ2xCLGFBQWE7WUFDYixZQUFZOzs7O1FBSWpC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QUFRO0lBQ2Y7OztJQUVBLFNBQVMsbUJBQW1CLFFBQVEsV0FBVyxrQkFBa0I7UUFDN0QsSUFBSSxPQUFPOzs7Ozs7OztRQVFYLE9BQU8sY0FBYzs7UUFFckIsT0FBTyx3QkFBd0IsU0FBUyxZQUFZLE9BQU87WUFDdkQsT0FBTyxxQkFBcUI7WUFDNUIsT0FBTyxjQUFjOzs7UUFHekIsT0FBTyxrQkFBa0IsV0FBVztZQUNoQyxVQUFVLEtBQUssaUJBQWlCLE9BQU8sbUJBQW1COzs7O1FBSTlELElBQUksT0FBTyxXQUFXO1lBQ2xCLGlCQUFpQixxQkFBcUIsS0FBSyxTQUFTLGFBQWE7Z0JBQzdELE9BQU8scUJBQXFCOzs7O1FBSXBDOzs7SUFHSixPQUFPLFdBQVcsc0JBQXNCO0dBQ3pDLFFBQVEsT0FBTyxrQkFBa0IiLCJmaWxlIjoiY29uY2F0QXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG4gICAgWyduZ1JvdXRlJywgJ3RvYXN0cicsICduZ0FuaW1hdGUnLCBcInVpLmJvb3RzdHJhcFwiLCAnTG9jYWxTdG9yYWdlTW9kdWxlJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInLCAnbmdUb3VjaCcsICduZ0ZpbGVVcGxvYWQnXHJcbiAgICAsICdhcHAuY3VzdG9tRGlyZWN0aXZlcycsICdhcHAuaG9tZScsICdhcHAuY2xhc3NlcycsICdhcHAubG9naW4nLCAnYXBwLmFjY291bnQnLCAnYXBwLmluZGV4JywgJ2FwcC5zdHVkZW50JywgJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCAnYXBwLmV2YWx1YXRpb24nLCAnYXBwLmRhc2hib2FyZCdcclxuICAgICwgJ2FwcC50ZWFjaGVyJywgJ2FwcC5jb3Vyc2UnLCAnYXBwLnN0dWR5UGxhbicsICdhcHAuc2Nob29seWVhciddKVxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9BY2NvdW50L3ZpZXdzL21hbmFnZUFjY291bnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUFjY291bnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9jbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbihjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3MvbWFuYWdlQ2xhc3Nlcy5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgYWxsQ2xhc3NlczogZnVuY3Rpb24oY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hbGxDbGFzc2VzKCkudGhlbihmdW5jdGlvbiAoYWxsQ2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGxDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL2NyZWF0ZUNsYXNzJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NyZWF0ZUNsYXNzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ2xhc3NDb250cm9sbGVyJ1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDb3Vyc2UnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL21hbmFnZUNvdXJzZS5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAud2hlbignL2NvdXJzZXMnLCB7XHJcbiAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvY291cnNlcy5odG1sJyxcclxuICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3Vyc2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5nZXRDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvY3JlYXRlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NyZWF0ZUNvdXJzZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVDb3Vyc2VDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbi86YnVuZGxlSWQ/Jywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25TZXJ2aWNlLCAkcm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bmRsZUlkID0gJHJvdXRlLmN1cnJlbnQucGFyYW1zLmJ1bmRsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblNlcnZpY2UuZXZhbHVhdGlvbnNGb3JCdW5kbGUoYnVuZGxlSWQpLnRoZW4oZnVuY3Rpb24gKGV2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9ucycsIHtcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9ucy5odG1sJyxcclxuICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvZXZhbHVhdGlvblRlbXBsYXRlcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oICcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9sb2dpbi92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuYXBwLnJ1bihbJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uIChhdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcclxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRBdXRoRGF0YSgpO1xyXG59XSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5Jyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5zY2hvb2x5ZWFyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgLy8kcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vICAud2hlbignL3JlcGxhY2UnLCB7XHJcbiAgICAgICAgLy8gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXcgSGVyZScsXHJcbiAgICAgICAgLy8gICAgICBjb250cm9sbGVyOiAnY29udHJvbGxlciBmb3IgdmlldyBoZXJlJ1xyXG4gICAgICAgIC8vICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbnRyb2xsZXJzL2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyLmpzXCIgLz5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlU3R1ZGVudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkZW50L3ZpZXdzL2NyZWF0ZVN0dWRlbnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlU3R1ZHlQbGFuJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9tYW5hZ2VTdHVkeVBsYW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlVGVhY2hlcicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL21hbmFnZVRlYWNoZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRlYWNoZXJzIDogZnVuY3Rpb24odGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyU2VydmljZS50ZWFjaGVycygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uICh0b2FzdHJDb25maWcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRvYXN0ckNvbmZpZywge1xyXG4gICAgICAgIGF1dG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIGNvbnRhaW5lcklkOiAndG9hc3QtY29udGFpbmVyJyxcclxuICAgICAgICBtYXhPcGVuZWQ6IDEwLFxyXG4gICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxyXG4gICAgICAgIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcclxuICAgICAgICBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHRhcmdldDogJ2JvZHknLFxyXG5cclxuICAgICAgICBhbGxvd0h0bWw6IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjbG9zZUh0bWw6ICc8YnV0dG9uPiZ0aW1lczs8L2J1dHRvbj4nLFxyXG4gICAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMCxcclxuICAgICAgICBpY29uQ2xhc3Nlczoge1xyXG4gICAgICAgICAgICBlcnJvcjogJ3RvYXN0LWVycm9yJyxcclxuICAgICAgICAgICAgaW5mbzogJ3RvYXN0LWluZm8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6ICd0b2FzdC13YXJuaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZUNsYXNzOiAndG9hc3QtbWVzc2FnZScsXHJcbiAgICAgICAgb25IaWRkZW46IG51bGwsXHJcbiAgICAgICAgb25TaG93bjogbnVsbCxcclxuICAgICAgICBvblRhcDogbnVsbCxcclxuICAgICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXHJcbiAgICAgICAgdGFwVG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgICAgICB0b2FzdDogJ2RpcmVjdGl2ZXMvdG9hc3QvdG9hc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIHByb2dyZXNzYmFyOiAnZGlyZWN0aXZlcy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5odG1sJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZU91dDogNDAwMCxcclxuICAgICAgICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxyXG4gICAgICAgIHRvYXN0Q2xhc3M6ICd0b2FzdCdcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkcHJvdmlkZSwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgJHByb3ZpZGUuZmFjdG9yeSgnZXJyb3JJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgdG9hc3RyID0gJGluamVjdG9yLmdldCgndG9hc3RyJyk7XHJcbiAgICAgICAgICAgICAgICAvLyB0b2FzdHIuZXJyb3IoJ0ZvdXQnLCByZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlU2VydmljZSA9ICRpbmplY3Rvci5nZXQoJ21lc3NhZ2VTZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVJlamVjdChyZWplY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdlcnJvckludGVyY2VwdG9yJyk7XHJcbn0pOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcigkc2NvcGUsIGFjY291bnRTZXJ2aWNlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBtZXNzYWdlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRBY2NvdW50Um9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5yb2xlVHlwZSA9IHJvbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyByb2VwIGhpZXIgZGUgYWNjb3VudHNlcnZpY2Ugb3Agb20gZWVuIG5pZXV3ZSBhY2NvdW50IHRlIG1ha2VuIG1ldCBkZSBkYXRhIGRpZSB2aWEgZGUgdmlldyBpcyBpbmdldnVsZC5cclxuICAgICAgICAgICAgLy8gZ2VlZiAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gbWVlIGluIGluIGRlIGFjY291bnRTZXJ2aWNlIG1ldGhvZGUuXHJcbiAgICAgICAgICAgIC8vLnRoZW4gb20gdGUgd2FjaHRlbiB0b3RkYXQgZGUgc2VydmVyIGdlYW50d29vcmQgaGVlZnRcclxuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuY3JlYXRlQWNjb3VudCgkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQWNjb3VudCBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpOyAvLyBnZWJydWlrIGRpdCBpbiB0aGUgLnRoZW4gZnVuY3RpZSB6b2RhdCBkZSBtb2RhbCBzbHVpdCBuYSBkZSBzZXJ2ZXJjYWxsLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0ge307IC8vIGdlYnJ1aWsgZGl0IG9tIGFsbGUgaW5mbyBhYW4gdGUgaGFuZ2VuIGluIGRlIHZpZXcgKGRpdCBtb2RlbCBtb2V0IGplIHNlcnZlcnNpZGUgbm9nIG9wYm91d2VuKVxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSBcIlVzZXJSb2xlXCI7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5pc1RlYWNoZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyJywgY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUFjY291bnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhY2NvdW50U2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBjdHJsICsgaCByZXBsYWNlIGFsbGUgY29udHJvbGxlcm5hbWVuIGRvb3IgaHVpZGlnZSBjb250cm9sbGVyXHJcbiAgICAgICAgLy8gdmVydmFuZyBhcHAucmVwbGFjZSBkb29yIGRlIGp1aXN0ZSBtb2R1bGUgaW4gZGl0IGdldmFsIGFwcC5hY2NvdW50IHN0YWF0IGluIGFjY291bnQtbW9kdWxlLmpzXHJcblxyXG4gICAgICAgIC8vY29udHJvbGxlciBpbiBpbmRleC5odG1sIHNsZXBlbi90b2V2b2VnZW4gb25kZXJhYW4gYmlqIHNjcmlwdHMgY29udHJvbGxlcnNcclxuXHJcbiAgICAgICAgLy92aWV3IGFhbm1ha2VuIGtvcGllZXIgdWl0IGNvcHkgZm9sZGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW4gbW9kdWxlIGFjY291bnQtbW9kdWxlIHJvdXRlIGFhbm1ha2VuICgkcm91dGVQcm92aWRlcilcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHNlbGVjdGVyZW4gdmFuIHJpaiBpbiBhY2NvdW50c3RhYmVsXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gZnVuY3Rpb24gKGFjY291bnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9jcmVhdGVBY2NvdW50TW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLy8gbmlldHMgZG9vciB0ZSBnZXZlbi5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hY2NvdW50TGlzdCA9IGFjY291bnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcicsIG1hbmFnZUFjY291bnRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBhY2NvdW50U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vdGhpei5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChjaGFuZ2VQYXNzd29yZEJpbmRpbmdNb2RlbCkge1xyXG4gICAgICAgIC8vICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJ2FjY291bnRzL2NoYW5nZXBhc3N3b3JkJywgY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vdGhpei5jcmVhdGVUZXN0QWNjb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICB2YXIgY3JlYXRlVXNlck1vZGVsID0ge1xyXG4gICAgICAgIC8vICAgICAgICB1c2VybmFtZTogXCJUZXN0ZXJcIixcclxuICAgICAgICAvLyAgICAgICAgZW1haWw6IFwiYmVybmR2ZXJ0b21tZW5AbXNuLmNvbVwiLFxyXG4gICAgICAgIC8vICAgICAgICBmaXJzdE5hbWU6IFwiVGVzdFwiLFxyXG4gICAgICAgIC8vICAgICAgICBsYXN0bmFtZTogXCJlclwiLFxyXG4gICAgICAgIC8vICAgICAgICBwYXNzd29yZDogXCJARG1pbjEyM1wiLFxyXG4gICAgICAgIC8vICAgICAgICBjb25maXJtUGFzc3dvcmQgOlwiQERtaW4xMjNcIlxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aCArICdhY2NvdW50cy9jcmVhdGVUZXN0ZXInLCBjcmVhdGVVc2VyTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uaWV1d2UgbWV0aG9kZSBvbSBhY2NvdW50IHRlIGNyZWVlcmVuIGFhbmdlbWFha3RcclxuICAgICAgICB0aGl6LmNyZWF0ZUFjY291bnQgPSBmdW5jdGlvbihjcmVhdGVBY2NvdW50SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jcmVhdGVBY2NvdW50JywgY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jcmVlZXIgaGllciBkZSBtZXRob2RlIGRpZSBuYWFyIGJpaiBkZSBhY2NvdW50Y29udHJvbGxlciBjcmVhdGVBY2NvdW50IGdlYnJ1aWt0LlxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhY2NvdW50U2VydmljZScsIGFjY291bnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjbGFzc2VzU2VydmljZSwgbWVzc2FnZVNlcnZpY2UsIHRlYWNoZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNsYXNzZXNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmNyZWF0ZUNsYXNzKCRzY29wZS5jcmVhdGVDbGFzc0luZm8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiS2xhcyBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNsYXNzZXNcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHRvZG8gcmVtb3ZlIHRoaXMgXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWRUZWFjaGVyJywgZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnR2VzZWxlY3RlZXJkZSBsZWVya2FjaHQgOicgKyB2YWx1ZS5wZXJzb24uZmlyc3ROYW1lICsgJyAnICsgdmFsdWUucGVyc29uLmxhc3ROYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNsYXNzSW5mbyA9IHt9O1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ2xhc3NJbmZvLm5leHRZZWFyID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0ZWFjaGVyU2VydmljZS5nZXRUZWFjaGVycygpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRlYWNoZXJzID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQ2xhc3NDb250cm9sbGVyJywgY3JlYXRlQ2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSxzY2hvb2x5ZWFyU2VydmljZSwgdG9hc3RyLCAkbG9jYXRpb24sIGFsbENsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFNjaG9vbFllYXIgPSBmdW5jdGlvbihzY2hvb2x5ZWFyKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFNjaG9vbFllYXIgPSBzY2hvb2x5ZWFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnVwbG9hZENzdiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS51cGxvYWRDbGFzc0Nzdigkc2NvcGUuZmlsZSwgJHNjb3BlLnNlbGVjdGVkU2Nob29sWWVhcikudGhlbihmdW5jdGlvbihwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcygnSGV0IENTViBiZXN0YW5kIGlzIG1ldCBzdWNjZXNzIG9wZ2VzbGFnZW4uJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2tsYXNzZW4gdm9sbGVkaWcgb3Byb2VwZW4gZmlsdGVyZW4gY2xpZW50c2lkZVxyXG4gICAgICAgIC8vc3R1ZGVudGVuIDEwLzEwIHZhbiBzZXJ2ZXIgb3BoYWxlblxyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc1gsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gY2xhc3NYO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbiAoc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgICAkc2NvcGUuc2Nob29sWWVhcnMgPSBzY2hvb2x5ZWFycztcclxuXHJcbiAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkU2Nob29sWWVhciA9ICRzY29wZS5zY2hvb2xZZWFyc1swXTtcclxuXHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNjaG9vbFllYXJzKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRTY2hvb2x5ZWFyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuYWxsQ2xhc3NlcyA9IGFsbENsYXNzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5hbGxDbGFzc2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLCBtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgY2xhc3Nlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDbGFzcyA9IGZ1bmN0aW9uIChrbGFzLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGtsYXM7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuc2VsZWN0ZWRDbGFzcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlcicsIHNlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgIGZ1bmN0aW9uIHRlc3RDbGFzc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICBjbGFzc2VzU2VydmljZS5nZXRUZXN0Q2xhc3MoKS50aGVuKGZ1bmN0aW9uIChjbGFzc1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICRzY29wZS50ZXN0Q2xhc3MgPSBjbGFzc1Jlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ1Rlc3RDbGFzc0NvbnRyb2xsZXInLCB0ZXN0Q2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjbGFzc2VzU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UsIFVwbG9hZCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yVGVhY2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvclRlYWNoZXInKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY2xhc3Nlc0ZvckNvdXJzZSA9IGZ1bmN0aW9uKGNvdXJzZUlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvckNvdXJzZScsIHsgJ2lkJzogY291cnNlSWQgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24odGVhY2hlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXInLCB7ICdpZCc6IHRlYWNoZXJJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoudXBsb2FkQ2xhc3NDc3YgPSBmdW5jdGlvbihmaWxlLCBzY2hvb2xZZWFyKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy91cGxvYWRDbGFzc0NzdicsIHsgZmlsZTogZmlsZSB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuICAgVXBsb2FkLnVwbG9hZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYmFzZVdlYkFwaVVybCArICdjbGFzcy91cGxvYWRDbGFzc0Nzdi8nICsgc2Nob29sWWVhci5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBmaWxlOiBmaWxlIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3MgJyArIHJlc3AuY29uZmlnLmRhdGEuZmlsZS5uYW1lICsgJ3VwbG9hZGVkLiBSZXNwb25zZTogJyArIHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3RhdHVzOiAnICsgcmVzcC5zdGF0dXMpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NQZXJjZW50YWdlID0gcGFyc2VJbnQoMTAwLjAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsKTtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Byb2dyZXNzOiAnICsgcHJvZ3Jlc3NQZXJjZW50YWdlICsgJyUgJyArIGV2dC5jb25maWcuZGF0YS5maWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENsYXNzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjbGFzcy9hbGxDbGFzc2VzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uKGNyZWF0ZUNsYXNzSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjbGFzcy9jcmVhdGVDbGFzc1wiLCBjcmVhdGVDbGFzc0luZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NsYXNzZXNTZXJ2aWNlJywgY2xhc3Nlc1NlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKCRodHRwLCB0b2FzdHJDb25maWcpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBhcGlVcmwgPSAnaHR0cDovL3Rlc3RwbGF0Zm9ybUFwaS8nO1xyXG5cclxuICAgICAgICB0aGl6LmJhc2VBcGlQYXRoID0gYXBpVXJsICsgJ2FwaS8nO1xyXG5cclxuICAgICAgICB0aGl6LnRva2VuUGF0aCA9IGFwaVVybCArICdvYXV0aC90b2tlbic7XHJcblxyXG4gICAgICAgIHRoaXouZ2V0U2Nob29sWWVhcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh0aGl6LmJhc2VBcGlQYXRoICsgXCIvZ2VuZXJhbEluZm8vZ2V0c2Nob29seWVhcnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVQZGZEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL3BkZicgfSk7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc1NhdmVCbG9iKGZpbGUsICdmaWxlTmFtZS5wZGYnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhmaWxlLCAnZmlsZW5hbWUucGRmJyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnY29uZmlndXJhdGlvblNlcnZpY2UnLCBjb25maWd1cmF0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvdXJzZUNvbnRyb2xsZXInLCBjb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VTZXJ2aWNlLCAkdWliTW9kYWwsIHN0dWR5UGxhblNlcnZpY2UsIG1lc3NhZ2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDb3Vyc2VcIik7XHJcbiAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiMvbWFuYWdlQ291cnNlXCI7IC8vYmlqIGxvY2F0aW9uLnBhdGggZ2VlbiAjIGJpamRvZW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb3Vyc2VTZXJ2aWNlLmNyZWF0ZUNvdXJzZSgkc2NvcGUuY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIkN1cnN1cyBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL21hbmFnZUNvdXJzZVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY3JlYXRlQ291cnNlSW5mbyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TdHVkeXBsYW5Nb2RhbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkeVBsYW4vdmlld3Mvc2VsZWN0U3R1ZHlQbGFuTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZHlwbGFuczogc3R1ZHlQbGFuU2VydmljZS5nZXRTdHVkeVBsYW5zKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkU3R1ZHlQbGFuKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mby5zdHVkeVBsYW4gPSBzZWxlY3RlZFN0dWR5UGxhbjtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gZ2VlbiBTdHVkeXBsYW4gZ2VzZWxlY3RlZXJkIGVycm9yPyBoaWVyIGtvbSBqZSBpbiBhbHMgamUgbmlrcyBzZWxlY3RlZXJkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvID0ge307XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInLCBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ291cnNlQ29udHJvbGxlcicsIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5nZXRDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jb3Vyc2VzRm9yVGVhY2hlclwiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENvdXJzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2FsbENvdXJzZXNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDb3Vyc2UgPSBmdW5jdGlvbiAoY3JlYXRlQ291cnNlSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2NyZWF0ZUNvdXJzZVwiLCBjcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvdXJzZVNlcnZpY2UnLCBjb3Vyc2VTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsKHNlbGVjdE1vZGFsU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxhIGNsYXNzPSdidG4gYnRuLWRlZmF1bHQgYnRuLXNtJyA+PGkgY2xhc3M9J2ZhIGZhLXBsdXMtc3F1YXJlJz48L2k+PC9hPlwiLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOic9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbChzY29wZS5tb2RhbG5hbWUsIHNjb3BlLml0ZW1zKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0aW9uID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5kaXJlY3RpdmUoJ3NlbGVjdE1vZGFsJywgc2VsZWN0TW9kYWwpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsU2VydmljZSgkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBtb2RhbFNldHRpbmdzID0gW1xyXG4gICAgICAgICAgIC8qc2VsZWN0VGVhY2hlck1vZGFsU2V0dGluZyovXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBtb2RhbE5hbWU6IFwic2VsZWN0VGVhY2hlck1vZGFsXCIsIHRlbXBsYXRlOiBcImFwcC9jdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlYXJjaFRlYWNoZXJzTW9kYWwvc2VsZWN0VGVhY2hlck1vZGFsLmh0bWxcIiwgY29udHJvbGxlcjogXCJzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiTGVlcmtyYWNodGVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgZWVuIGxlZXJrcmFjaHRcIiB9XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICAvKk90aGVyIHNldHRpbmdzKi9cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICB2YXIgZ2V0TW9kYWxTZXR0aW5nID0gZnVuY3Rpb24gKG1vZGFsTmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gXy5maW5kKG1vZGFsU2V0dGluZ3MsIGZ1bmN0aW9uIChtb2RhbFNldHRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbFNldHRpbmcubW9kYWxOYW1lLnRvTG93ZXJDYXNlKCkgPT09IG1vZGFsTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJHZWVuIG1vZGFsIHNldHRpbmcgZ2V2b25kZW5cIik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6Lm9wZW5Nb2RhbCA9IGZ1bmN0aW9uIChtb2RhbE5hbWUsIGl0ZW1zKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kYWxTZXR0aW5nID0gZ2V0TW9kYWxTZXR0aW5nKG1vZGFsTmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IG1vZGFsU2V0dGluZy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IG1vZGFsU2V0dGluZy5jb250cm9sbGVyLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbFNldHRpbmcuY29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGVjdGVkSXRlbTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZWxlY3RNb2RhbFNlcnZpY2UnLCBzZWxlY3RNb2RhbFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7IC8vdGVzdCIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmNhbGVuZGVyUGF0aCA9ICdhcHAvZGFzaGJvYXJkL3ZpZXdzL3BhcnRpYWxzL2NhbGVuZGFyUGFydGlhbC5odG1sJztcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdkYXNoYm9hcmRDb250cm9sbGVyJywgZGFzaGJvYXJkQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBkYXNoYm9hcmRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXoucGxhbm5lZEV2YWx1YXRpb25zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiZXZhbHVhdGlvbi9wbGFubmVkRXZhbHVhdGlvbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZGFzaGJvYXJkU2VydmljZScsIGRhc2hib2FyZFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uU2VydmljZSwgZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0RXZhbHVhdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgIC8vIGV2YWx1YXRpb25TZXJ2aWNlLnNldFN1YnNlY3Rpb25TY29yZXMoKTsgLy8gZmluZCBvdGhlciBzb2x1dGlvbiB0byBtYXAgc2NvcmVzIG5vdCBvbiBldnJ5IHNlbGVjdC5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2NvcmUgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbkl0ZW0sIHNjb3JlKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25JdGVtLnNjb3JlID0gc2NvcmU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwZGF0ZUV2YWx1YXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVwZGF0ZUV2YWx1YXRpb24oJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbikudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4RXZhID0gXy5maW5kSW5kZXgoJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YS5pZCA9PT0gZXZhbHVhdGlvbi5pZDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1tpbmRleEV2YV0gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgaGFzaGtleSA9ICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uJCRoYXNoS2V5O1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgICAgIC8vJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXkgPSBoYXNoa2V5O1xyXG4gICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwZGF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS51cGRhdGVFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnMpLnRoZW4oZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldE5vdFNjb3JlZFJlYXNvbiA9IGZ1bmN0aW9uKGV2YWx1YXRpb25pdGVtLCBudW1iZXIpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbml0ZW0ubm90U2NvcmVkUmVhc29uID0gbnVtYmVyO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5zY29yZSA9IG51bGw7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uU2VydmljZS5tYXBJdGVtc1RvU3ViU2VjdGlvbigkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG4gICAgICAgICAvLyBldmFsdWF0aW9uU2VydmljZS5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGl6Lm1hcEl0ZW1zVG9TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uZ3JvdXBCeShldmFsdWF0aW9uLmV2YWx1YXRpb25JdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLnNvcnRCeShkaWZmZXJlbnRTdWJzZWN0aW9ucywgZnVuY3Rpb24oc3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi53ZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMgPSBkaWZmZXJlbnRTdWJzZWN0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8vLyB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSA9PiB1c2UgZGljdGlvbmFyeSBmcm9tIGMjIHRoaXMgd2F5XHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zLCBmdW5jdGlvbiAoc3Vic2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0KSAmJiAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNlY3Rpb24udG90YWxTY29yZSA9ICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0LnRvdGFsc1BlcmNhdGVnb3J5W3N1YnNlY3Rpb25bMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24uaWRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbWFwIGV2ZXJ5IGV2YWx1YXRpb24gbm90IGp1c3Qgc2VsZWN0ZWQgc28gaXQgY2FuIGJlIHByb2Nlc2VkIGluIGludCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzVGl0bGUgPSBldmFsdWF0aW9uc1swXS5jcmVhdGVkRm9yQ2xhc3MuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uKGV2YWx1YXRpb25zWzBdKTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvblNlcnZpY2UubWFwSXRlbXNUb1N1YlNlY3Rpb24oZXZhbHVhdGlvbnMpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvbkNvbnRyb2xsZXInLCBldmFsdWF0aW9uQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25zQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcywgY2xhc3NlcywgZXZhbHVhdGlvblNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uKGtsYXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBrbGFzO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNsYXNzSWQgPSAkc2NvcGUuc2VsZWN0ZWRDbGFzcy5pZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Q291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY291cnNlSWQgPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsZWFyU2VhcmNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnBhZ2UgPSAxO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnN0YXJ0RGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuZW5kRGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuZmluaXNoZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNsYXNzSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdHVkZW50Rmlyc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdHVkZW50TGFzdG5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd3BhZ2luYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnNlYXJjaEV2YWx1YXRpb25zKCRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QpLnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC5ldmFsdWF0aW9ucztcclxuICAgICAgICAgICAgICAgICRzY29wZS50b3RhbEl0ZW1zID0gZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5UmVzdWx0LnRvdGFsSXRlbXM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2hvd3BhZ2luYXRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNUb1BkZiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3MvZXZhbHVhdGlvbnNUb1BkZk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uczsgLy8gbWF5YmUgZG8gYSBzZWFyY2ggYWdhaW4gd2l0aCBtb3JlIGl0ZW1zIHBhZ2VkP1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRFdmFsdWF0aW9uSWRzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdC5FdmFsdWF0aW9uSWRzID0gc2VsZWN0ZWRFdmFsdWF0aW9uSWRzO1xyXG5cclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLmNyZWF0ZVBkZkZvckV2YWx1YXRpb25zKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TY29yZWRFdmFsdWF0aW9uTW9kYWwgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL3Njb3JlZEV2YWx1YXRpb25Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbjogZXZhbHVhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXMgPSBjbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsIGV2YWx1YXRpb25zQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25zLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICB2YXIgZ2V0U2VsZWN0ZWRJZHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8ubWFwKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24oZXZhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZhLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YS5pZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5jaGVja0FsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCRzY29wZS5zZWxlY3RlZEFsbCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQWxsID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gJHNjb3BlLnNlbGVjdGVkQWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoZ2V0U2VsZWN0ZWRJZHMoKSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvbiwgZXZhbHVhdGlvblNlcnZpY2UsICR1aWJNb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVG9QZGYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLmNyZWF0ZVBkZkZvckV2YWx1YXRpb24oJHNjb3BlLmV2YWx1YXRpb24pO1xyXG4gICAgICAgICAgICAkc2NvcGUub2soKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UubWFwU3Vic2VjdGlvblRvRXZhbHVhdGlvbihldmFsdWF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2YWx1YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyJywgc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZXZhbHVhdGlvbnNGb3JCdW5kbGUgPSBmdW5jdGlvbihidW5kbGVJZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vZXZhbHVhdGlvbnNGb3JCdW5kbGUnLCB7ICdpZCc6IGJ1bmRsZUlkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9uJywgZXZhbHVhdGlvbikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vdXBkYXRlRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5zZWFyY2hFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3NlYXJjaEV2YWx1YXRpb25zJywgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QsIHsgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlndXJhdGlvblNlcnZpY2UuaGFuZGxlUGRmRGF0YShyZXN1bHQuZGF0YSkudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdC5FdmFsdWF0aW9uSWRzID0gW2V2YWx1YXRpb24uaWRdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXouY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMocGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICAgICAgLy8gY2FsY3VsYXRpb24gZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uZ3JvdXBCeShldmFsdWF0aW9uLmV2YWx1YXRpb25JdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLnNvcnRCeShkaWZmZXJlbnRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzKGV2YWx1YXRpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qTWFwcyBzdWJzZWN0aW9ucyB0byBldmFsdWF0aW9uaXRlbXMqL1xyXG4gICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgXy5lYWNoKGV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpei5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uKGV2YWx1YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9ucztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKlVzZSB0aGlzIHRvIG1hcCB0aGUgc2NvcmVzIHRvIHRoZSBtYXBwZWQgc3Vic2VjdGlvbnMgb2YgYSBldmFsdWF0aW9uKi9cclxuICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAvLy8vIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldID0+IHVzZSBkaWN0aW9uYXJ5IGZyb20gYyMgdGhpcyB3YXlcclxuICAgICAgICAgICAgXy5lYWNoKGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJzZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoZXZhbHVhdGlvbi5yZXN1bHQpICYmIGV2YWx1YXRpb24ucmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Vic2VjdGlvbi50b3RhbFNjb3JlID0gZXZhbHVhdGlvbi5yZXN1bHQudG90YWxzUGVyY2F0ZWdvcnlbc3Vic2VjdGlvblswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5pZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBtYXAgZXZlcnkgZXZhbHVhdGlvbiBub3QganVzdCBzZWxlY3RlZCBzbyBpdCBjYW4gYmUgcHJvY2VzZWQgaW4gaW50KClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblNlcnZpY2UnLCBldmFsdWF0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGV2YWx1YXRpb25UZW1wbGF0ZSwgY2xhc3Nlc0ZvckNvdXJzZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vIGRhdGVwaWNrZXJcclxuICAgICAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cy5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoLCBkYXkpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQuZXZhbHVhdGlvbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF5OiAxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZW5kIGRhdGVwaWNrZXJcclxuXHJcbiAgICAgICAgLy9zY2hvb2x5ZWFyIGRyb3Bkb3duXHJcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgaXNvcGVuOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMuaXNvcGVuID0gISRzY29wZS5zdGF0dXMuaXNvcGVuO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ge307XHJcbiAgICAgICAgJHNjb3BlLnNldENsYXNzID0gZnVuY3Rpb24gKGNsYXNzRm9yQ291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmNsYXNzSWQgPSBjbGFzc0ZvckNvdXJzZS5pZDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBjbGFzc0ZvckNvdXJzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vZW5kIHNjaG9vbHllYXIgZHJvcGRvd25cclxuXHJcbiAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vbWFrZSBjYWxsIGhlcmVcclxuICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSgkc2NvcGUuY3JlYXRlQ29tbWFuZCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdvaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXNGb3JDb3Vyc2UgPSBjbGFzc2VzRm9yQ291cnNlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSBldmFsdWF0aW9uVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kID0ge1xyXG4gICAgICAgICAgICAgICAgRXZhbHVhdGlvblRlbXBsYXRlSWQ6IGV2YWx1YXRpb25UZW1wbGF0ZS5pZCxcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25EYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBjbGFzc0lkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLCBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gW107XHJcbiAgICAgICAgJHNjb3BlLnRhYnMgPSAxO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNhdmVUZW1wbGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPIGRldmVsb3AgdmFsaWRhdGlvbiBhbmQgYWRqdXN0IDEwMCBwZXJzY2VudCBjb2RlLlxyXG4gICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmNyZWF0ZVRlbXBsYXRlKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2V2YWx1YXRpb25UZW1wbGF0ZXMnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmFsT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAnZGVzY3JpcHRpb24nOiBcIlwiLCAnY291cnNlJzogbnVsbCB9O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKGdlbmVyYWxPcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uID0gZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb247XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSA9IGdlbmVyYWxPcHRpb25zLmNvdXJzZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuU3ViU2VjdGlvbnMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uU3ViU2VjdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViU2VjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUb3RhbFdlaWdodDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5pbmRleE9mKHN1YlNlY3Rpb24pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR29hbHMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVHb2FsczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hvc2VuR29hbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN1YlNlY3Rpb24uZ29hbHMsIGZ1bmN0aW9uKGdvYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5Hb2Fscy5wdXNoKGdvYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF2aWFsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hvc2VuR29hbHMubGVuZ3RoID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmlhbGFibGVHb2FscyA9IF8ucmVqZWN0KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlLCBmdW5jdGlvbiAoZ29hbEZyb21Db3Vyc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5Hb2FscyA9IF8uYW55KGNob3NlbkdvYWxzLCBmdW5jdGlvbiAoZ29hbGZyb21TdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdvYWxGcm9tQ291cnNlLmlkID09PSBnb2FsZnJvbVN1Yi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5Hb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHM9ICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb2VsIHRvZWdldm9lZ2RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlR29hbCA9IGZ1bmN0aW9uKHN1YnNlY3Rpb24sIGdvYWwpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3Vic2VjdGlvbi5nb2Fscy5pbmRleE9mKGdvYWwpO1xyXG4gICAgICAgICAgICBzdWJzZWN0aW9uLmdvYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG90YWxQZXJjZW50YWdlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudGFnZSArPSBwYXJzZUludChzdWJTZWN0aW9uLndlaWdodCwxMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24pICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IG51bGwgJiYgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjQ291cnNlUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UpICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2UgPT09IDEwMCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0dvYWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbmVHb2FsU2V0ID0gXy5hbnkoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpICYmIHN1YlNlY3Rpb24uZ29hbHMubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvbmVHb2FsU2V0ID8gMjUgOiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0Rlc2NyaXB0aW9uUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0NvdXJzZVBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNHb2FsUG9pbnRzKCk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVzLCAkdWliTW9kYWwsIGNsYXNzZXNTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGUsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlID0gdGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc0ZvckNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvckNvdXJzZSgkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZS5jb3Vyc2UuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rlc3QnKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZXNUb0hpZGUgPSBbXTtcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzLCBmdW5jdGlvbiAodGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0ZW1wbGF0ZS5jaGVja0hpZGRlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlc1RvSGlkZS5wdXNoKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVzVG9IaWRlLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmhpZGVTZWxlY3RlZFRlbXBsYXRlcyh0ZW1wbGF0ZXNUb0hpZGUpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0ZW1wbGF0ZXNUb0hpZGUsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5oaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzID0gZXZhbHVhdGlvblRlbXBsYXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBzdWJTZWN0aW9uLCBjb3Vyc2UsIGF2YWlsYWJsZUdvYWxzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5nb2Fsc0ZpbHRlciA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7IFxyXG4gICAgICBcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRHb2FsID0gZnVuY3Rpb24gKGdvYWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEdvYWwgPSBnb2FsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpIHx8ICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMucHVzaCgkc2NvcGUuc2VsZWN0ZWRHb2FsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZEdvYWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVHb2FscyA9IGF2YWlsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGV2YWx1YXRpb25TdWJTZWN0aW9ucywgY3VycmVudFRvdGFsV2VpZ2h0LCBjb3Vyc2UsIHN1YlNlY3Rpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgIHRoaXouYWRkbmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMucHVzaChhbmd1bGFyLmNvcHkoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCkgfHwgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBlcnJvciBtZXNzYWdlIGhlcmUgOiBubyB3ZWlndGggZW50ZXJlZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNFZGl0aW5nKSB8fCAkc2NvcGUuaXNFZGl0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFRvdGFsV2VpZ2h0ID0gY3VycmVudFRvdGFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3ViU2VjdGlvbikgJiYgc3ViU2VjdGlvbiAhPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGdlbmVyYWxPcHRpb25zLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IG51bGwgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMgPSBnZW5lcmFsT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlVGVtcGxhdGUgPSBmdW5jdGlvbihldmFsdWF0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlVGVtcGxhdGUnLCBldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0RXZhbHVhdGlvblRlbXBsYXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldEV2YWx1YXRpb25UZW1wbGF0ZXMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUgPSBmdW5jdGlvbihjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2NyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUnLCBjb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uKHRlbXBsYXRlc0lkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9oaWRlVGVtcGxhdGVzJywgdGVtcGxhdGVzSWRzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZScsIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBob21lQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJXZWxrb21cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBob21lQ29udHJvbGxlcik7XHJcblxyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnKSk7XHJcblxyXG5cclxuIiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgIFxyXG4gICAgICAgICRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ091dCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIHVzZXJOYW1lID0gYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodXNlck5hbWUpICYmIHVzZXJOYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1c2VyTmFtZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigndXNlckxvZ2dlZEluJyxmdW5jdGlvbiAoZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkT3V0JywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZGVsLmNvbnRyb2xsZXIoJ2luZGV4Q29udHJvbGxlcicsIGluZGV4Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2VydmljZU5hbWUnLCBpbmRleFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JykpOyIsIihmdW5jdGlvbiAobW9kZWwpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGF1dGhlbnRpY2F0aW9uU2VydmljZSx0b2FzdHIpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUucGFzc3dvcmQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXN0VGl0bGUgPSBcIlRlc3RUaXRsZVwiO1xyXG5cclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKFwiVnVsIGFsbGUgdmVsZGVuIGluIGF1Yi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnVzZXJOYW1lKSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5wYXNzd29yZCkpIHtcclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxvZ2luRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiAkc2NvcGUudXNlck5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dpbihsb2dpbkRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ob21lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgbG9naW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicpKTsiLCJcclxuJ3VzZSBzdHJpY3QnO1xyXG5hcHAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScsIFsnJHEnLCAnJGxvY2F0aW9uJyxcclxuJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHEsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSkge1xyXG5cclxuICAgIHZhciBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5ID0ge307XHJcblxyXG4gICAgdmFyIF9yZXF1ZXN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cclxuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3Jlc3BvbnNlRXJyb3IgPSBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlcXVlc3QgPSBfcmVxdWVzdDtcclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVzcG9uc2VFcnJvciA9IF9yZXNwb25zZUVycm9yO1xyXG5cclxuICAgIHJldHVybiBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5O1xyXG59XSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXoubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkT3V0Jywge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXCJncmFudF90eXBlPXBhc3N3b3JkJnVzZXJuYW1lPVwiICtcclxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YS51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgbG9naW5EYXRhLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS50b2tlblBhdGgsIGRhdGEsIHsgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sIHVzZXJOYW1lOiBsb2dpbkRhdGEudXNlck5hbWUsIGV4cGlyZXM6IHJlc3BvbnNlLmRhdGEuZXhwaXJlc19pbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gbG9naW5EYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZEluJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGl6LnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEF1dGhEYXRhID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGF1dGhEYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBhdXRoZW50aWNhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVzc2FnZVNlcnZpY2UodG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGl6LmhhbmRsZVJlamVjdCA9IGhhbmRsZVJlamVjdDtcclxuICAgICAgICB0aGl6LmhhbmRsZVN1Y2NlcyA9IGhhbmRsZVN1Y2NlcztcclxuICAgICAgICB0aGl6LmhhbmRsZVdhcm5pbmcgPSBoYW5kbGVXYXJuaW5nO1xyXG4gICAgICAgIHRoaXouaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UsICdGb3V0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3VjY2VzKHRleHQsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVdhcm5pbmcodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcodGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ21lc3NhZ2VTZXJ2aWNlJywgbWVzc2FnZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzY2hvb2x5ZWFyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcbiAgICAgICAgLy90ZXN0Z3VscFxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LmdldFNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdnZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5nZXRGdXR1cmVTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpei5nZXRTY2hvb2xZZWFycygpLnRoZW4oZnVuY3Rpb24oYWxsU2Nob29sWWVhcnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TW9udGggPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE1vbnRoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyID0gY3VycmVudFllYXIgLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihhbGxTY2hvb2xZZWFycywgZnVuY3Rpb24gKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2Nob29seWVhci5zdGFydFllYXIgPj0gY3VycmVudFllYXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2Nob29seWVhclNlcnZpY2UnLCBzY2hvb2x5ZWFyU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc2Nob29seWVhcicpKTsgIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIkhlbGxvIHdvcmxkXCI7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJywgY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInLCBtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBzdHVkeXBsYW5zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRTdHVkeXBsYW4gPSBmdW5jdGlvbiAoc3R1ZHlwbGFuLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdHVkeXBsYW4gPSBzdHVkeXBsYW47XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gbm9nIGNoZWNrZW4gb3AgZ2VlbiByZXN1bHRhYXQgZ2VzZWxlY3RlZXJkXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbik7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zdHVkeXBsYW5zID0gc3R1ZHlwbGFucztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coc3R1ZHlwbGFucyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXInLCBzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gc3R1ZHlQbGFuU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICBcclxuICAgICAgICB0aGl6LmdldFN0dWR5UGxhbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCIvc3R1ZHlQbGFucy9hbGxTdHVkeVBsYW5zXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3N0dWR5UGxhblNlcnZpY2UnLCBzdHVkeVBsYW5TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlYWNoZXJTZXJ2aWNlLCB0ZWFjaGVyLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZENvdXJzZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kPXt9O1xyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9IHRlYWNoZXIuaWQ7IFxyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLmNvdXJzZUlkPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQgO1xyXG5cclxuICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ291cnNlKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLnRlYWNoZXIgPSB0ZWFjaGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZWFjaGVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXInLCBhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIHRlYWNoZXJTZXJ2aWNlLCAkdWliTW9kYWwsIHRlYWNoZXJzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVhY2hlciA9IGZ1bmN0aW9uICh0ZWFjaGVyLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9wZW5Db3Vyc2VzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1RlYWNoZXIvdmlld3MvYWRkQ291cnNlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVhY2hlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkNsYXNzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9zZWxlY3RDbGFzc2VzTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyKCRzY29wZS5zZWxlY3RlZFRlYWNoZXIuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC50ZWFjaGVySWQgPSAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kLmNsYXNzSWQgPSBzZWxlY3RlZENsYXNzLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmFkZENsYXNzKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdWNjZXMgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvciB0b2FzdGVyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vdGVhY2hlclNlcnZpY2UuZ2V0QWNjb3VudHMoKS50aGVuKGZ1bmN0aW9uIChhY2NvdW50cykge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVycyA9IHRlYWNoZXJzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudGVhY2hlcnMpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJywgbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHRlYWNoZXJTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVBhdGggPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDb3Vyc2UgPSBmdW5jdGlvbihhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJy90ZWFjaGVyL2FkZENvdXJzZScsIGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5nZXRUZWFjaGVycyA9IGZ1bmN0aW9uKCkgeyAvLyB1c2UgcXVlcnkgb2JqZWN0IGluIGZ1dHVyZSBjaGFuZ2UgbWV0aG9kIHRvIHBvc3QgdGhlbiBwcm9iYWJseVxyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VQYXRoICsgJy90ZWFjaGVyL3RlYWNoZXJzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmFkZENsYXNzID0gZnVuY3Rpb24oYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJy90ZWFjaGVyL2FkZENsYXNzJywgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgndGVhY2hlclNlcnZpY2UnLCB0ZWFjaGVyU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAudGVhY2hlcicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgdG9hc3RyLCBpdGVtcywgY29udGVudCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmluZm8oJ1NlbGVjdGVlciBlZW4gaXRlbSB1aXQgZGUgbGlqc3Qgb20gdmVyZGVyIHRlIGt1bm5lbiBnYWFuLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY29udGVudCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyJywgc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxlbmRhckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGRhc2hib2FyZFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRFdmFsdWF0aW9uID0gZnVuY3Rpb24oZXZhbHVhdGlvbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zdGFydEV2YWx1YXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvZXZhbHVhdGlvbi9cIiArICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uYnVuZGxlSWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLnBsYW5uZWRFdmFsdWF0aW9ucygpLnRoZW4oZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5wbGFubmVkRXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NhbGVuZGFyQ29udHJvbGxlcicsIGNhbGVuZGFyQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
