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
                      return teacherService.getTeachers().then(function(result) {
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

    createClassController.$inject = ["$scope", "$location", "classesService", "messageService", "courseService"];
    function createClassController($scope, $location, classesService, messageService, courseService) {
        var thiz = this;
       
        //Variables
        $scope.selectedTeacher = null;
        $scope.selectedCourses = [];

        //private Functions
        
        // public functions
        $scope.cancel = function () {
            
            $location.path("/manageClasses");
        }

        $scope.ok = function () {
            
            console.log($scope.selectedCourses);
            classesService.createClass($scope.createClassInfo).then(function () {
                messageService.handleSucces("Klas aangemaakt!");
                $location.path("/manageClasses");
            });

        }

        //// todo remove this 
        //$scope.$watch('selectedTeacher', function (value) {
        //    if (value == null) {
        //        return null;
        //    }
        //    console.log('Geselecteerde leerkacht :' + value.person.firstName + ' ' + value.person.lastName);
        //});

        //// todo remove this 
        //$scope.$watch('selectedTeachers', function (teachers) {
        //    if (teachers.length < 1 ) {
        //        return null;
        //    }
        //    _.each(teachers, function(teacher) {
        //        console.log('Leerkracht :' + teacher.person.firstName + ' ' + teacher.person.lastName);
        //    });
        //});


        //initiations
        var init = function () {
            $scope.createClassInfo = {};
            $scope.createClassInfo.nextYear = false;

            courseService.allCourses().then(function (result) {
                $scope.courses = result;
                console.log($scope.courses);

            });

            //teacherService.getTeachers().then(function (result) {
            //    $scope.teachers = result;
            //});

            
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
            $scope.selectedClass = classX;
            $scope.selectedRow = index;
        }

        //initiations
        var init = function () {
          schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
              $scope.schoolYears = schoolyears;
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

    createCourseController.$inject = ["$scope", "$location", "courseService", "$uibModal", "studyPlanService", "messageService", "schoolyearService"];
    function createCourseController($scope, $location, courseService, $uibModal, studyPlanService, messageService, schoolyearService) {
        var thiz = this;

        $scope.createCourseInfo = {};

        //Variables

        //private Functions

        //public functions
        $scope.cancel = function () {

            $location.path("/manageCourse");
            //window.location.href = "#/manageCourse"; //bij location.path geen # bijdoen
        }

        $scope.ok = function () {
           
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

        $scope.setSelectedSchoolYear = function (schoolyear) {
            $scope.createCourseInfo.schoolYear = schoolyear;
        }

        //initiations
        var init = function () {

            $scope.createCourseInfo = {};

            schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
                $scope.schoolYears = schoolyears;

                $scope.createCourseInfo.schoolYear = $scope.schoolYears[0];
                
            });
           
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
           //selectCoursesModal
        {
            modalName: "selectCoursesModal", template: "app/customDirectives/selectModalDirective/searchCoursesModal/selectCoursesModal.html", controller: "selectItemsModalController",
            content: { title: "Cursussen", itemDescription: "Selecteer cursussen" }
        }
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
/* Guide :
Use the directive by adding the folowing html code to your page :
<select-schoolyear selected="selectedSchoolYear"></select-schoolyear>
Adjust the value of the selected attribute to the one link to the views controller scope.
 */

(function (module) {
    'use strict';
    selectSchoolyear.$inject = ["$rootScope", "schoolyearService"];
    function selectSchoolyear($rootScope, schoolyearService) {
        var setupScope = function (scope,schoolyears) {
            scope.schoolyears = schoolyears;
            scope.selected = scope.schoolyears[0];
        }

        return {
            restrict: 'E',
            template: '<label for="schoolyearSelector" class="control-label">Schooljaar:</label><div id="schoolyearSelector" class="btn btn-default" uib-dropdown><a uib-dropdown-toggle>{{selected.notation}} <i class="fa fa-caret-down"></i></a><ul uib-dropdown-menu role="menu" aria-labelledby="single-button"><li ng-repeat="schoolyear in schoolyears | orderBy:\'startYear\'"role="menuitem" ng-click="setSelectedSchoolYear(schoolyear)"><a>{{schoolyear.notation}}</a></li></ul></div>',
            scope: {
                selected: '=',
                schoolyears: '='
            },
            link: function (scope, element, attrs) {

                if (angular.isUndefined($rootScope.futureSchoolYears) || $rootScope.futureSchoolYears == null) {
                    schoolyearService.getFutureSchoolYears().then(function(schoolyears) {
                        setupScope(scope, schoolyears);
                    });
                } else {
                    setupScope(scope, $rootScope.futureSchoolYears);
                }

                scope.setSelectedSchoolYear = function (schoolyear) {
                    scope.selected = schoolyear;
                }
            }
        };
    }

    module.directive('selectSchoolyear', selectSchoolyear);
})(angular.module('app.customDirectives'));
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


    loginController.$inject = ["$q", "$scope", "$location", "authenticationService", "toastr", "schoolyearService", "$rootScope"];
    function loginController($q, $scope, $location, authenticationService, toastr, schoolyearService, $rootScope) {
        var init = function () {
            $scope.errorMessage = undefined;
            $scope.userName = undefined;
            $scope.password = undefined;
            $scope.testTitle = "TestTitle";
        }

        init();

        var setupRootScope = function () {
            $q.all([
                schoolyearService.getFutureSchoolYears() //, define mutiple if needed
            ]).then(function (data) {
                $rootScope.futureSchoolYears = data[0];
                console.log($rootScope.futureSchoolYears);
            });        
        }

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
                setupRootScope();
               
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

    selectItemsModalController.$inject = ["$scope", "$uibModalInstance", "toastr", "items", "content"];
    function selectItemsModalController($scope, $uibModalInstance, toastr, items, content) {
        var thiz = this;
        $scope.itemFilter = {};
        $scope.items = [];

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

        $scope.clearFilter = function () {
            var keys = Object.keys($scope.itemFilter);
            for (var i = 0; i < keys.length; i++) {
                $scope.itemFilter[keys[i]] = undefined;
            }
        };

        $scope.clearSelected = function () {
            _.each($scope.items, function (item) {
                item.selected = false;
            });

        };

        $scope.clearSelectedFilter = function () {
            /*Set the checkbox to no value instead of false when checked.*/
            if ($scope.itemFilter.selected === false) {
                $scope.itemFilter.selected = undefined;
                return;
            }

            $scope.clearFilter();
            $scope.itemFilter.selected = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJjdXN0b21EaXJlY3RpdmVzL2N1c3RvbURpcmVjdGl2ZXMtbW9kdWxlLmpzIiwiZGFzaGJvYXJkL2Rhc2hib2FyZC1tb2R1bGUuanMiLCJldmFsdWF0aW9uL2V2YWx1YXRpb24tbW9kdWxlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2V2YWx1YXRpb25UZW1wbGF0ZS1tb2R1bGUuanMiLCJob21lL2hvbWUtbW9kdWxlLmpzIiwiSW5kZXgvaW5kZXgtbW9kdWxlLmpzIiwibG9naW4vbG9naW4tbW9kdWxlLmpzIiwic2Nob29seWVhci9zY2hvb2x5ZWFyLW1vZHVsZS5qcyIsIlN0dWRlbnQvc3R1ZGVudC1tb2R1bGUuanMiLCJTdHVkeVBsYW4vc3R1ZHlQbGFuLW1vZHVsZS5qcyIsIlRlYWNoZXIvdGVhY2hlci1tb2R1bGUuanMiLCJtZXNzYWdlL21lc3NhZ2VDb25maWcuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL21hbmFnZUFjY291bnRDb250cm9sbGVyLmpzIiwiQWNjb3VudC9zZXJ2aWNlcy9hY2NvdW50U2VydmljZS5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvY2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NyZWF0ZUNsYXNzQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy90ZXN0Q2xhc3NDdHJsLmpzIiwiY2xhc3Nlcy9zZXJ2aWNlcy9jbGFzc2VzU2VydmljZS5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvbWFuYWdlQ291cnNlQ29udHJvbGxlci5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvc2VsZWN0TW9kYWxEaXJlY3RpdmUuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlbGVjdE1vZGFsU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0U2Nob29seWVhckRpcmVjdGl2ZS9zZWxlY3RTY2hvb2x5ZWFyRGlyZWN0aXZlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL2Rhc2hib2FyZENvbnRyb2xsZXIuanMiLCJkYXNoYm9hcmQvc2VydmljZXMvZGFzaGJvYXJkU2VydmljZS5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbkNvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25zQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vc2VydmljZXMvZXZhbHVhdGlvblNlcnZpY2UuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ3RybC5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvc2VydmljZXMvZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5qcyIsImhvbWUvY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJJbmRleC9jb250cm9sbGVycy9pbmRleEN0cmwuanMiLCJJbmRleC9zZXJ2aWNlcy9pbmRleFNlcnZpY2UuanMiLCJsb2dpbi9jb250cm9sbGVycy9sb2dpbkN0cmwuanMiLCJsb2dpbi9mYWN0b3JpZXMvYXV0aEludGVyY2VwdG9yRmFjdG9yeS5qcyIsImxvZ2luL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uU2VydmljZS5qcyIsIm1lc3NhZ2Uvc2VydmljZXMvbWVzc2FnZVNlcnZpY2UuanMiLCJzY2hvb2x5ZWFyL3NlcnZpY2VzL3NjaG9vbHllYXJTZXJ2aWNlLmpzIiwiU3R1ZGVudC9jb250cm9sbGVycy9jcmVhdGVTdHVkZW50Q29udHJvbGxlci5qcyIsIlN0dWRlbnQvc2VydmljZXMvc3R1ZGVudFNlcnZpY2UuanMiLCJTdHVkeVBsYW4vc2VydmljZXMvU3R1ZHlQbGFuU2VydmljZS5qcyIsIlN0dWR5UGxhbi9jb250cm9sbGVycy9tYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlci5qcyIsIlRlYWNoZXIvY29udHJvbGxlcnMvYWRkQ291cnNlTW9kYWxDb250cm9sbGVyLmpzIiwiVGVhY2hlci9jb250cm9sbGVycy9tYW5hZ2VUZWFjaGVyQ29udHJvbGxlci5qcyIsIlRlYWNoZXIvc2VydmljZXMvdGVhY2hlclNlcnZpY2UuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL2dlbmVyYWxDb250cm9sbGVycy9zZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyLmpzIiwiY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9nZW5lcmFsQ29udHJvbGxlcnMvc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXIuanMiLCJkYXNoYm9hcmQvY29udHJvbGxlcnMvcGFydGlhbHMvY2FsZW5kYXJDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxRQUFRLE9BQU87SUFDckIsQ0FBQyxXQUFXLFVBQVUsYUFBYSxnQkFBZ0Isc0JBQXNCLHVCQUF1QixXQUFXO01BQ3pHLHdCQUF3QixZQUFZLGVBQWUsYUFBYSxlQUFlLGFBQWEsZUFBZSwwQkFBMEIsa0JBQWtCO01BQ3ZKLGVBQWUsY0FBYyxpQkFBaUI7OztBQUdwRDtBQ05BLFFBQVEsT0FBTyxlQUFlLENBQUM7S0FDMUIsMEJBQU8sVUFBVSxnQkFBZ0I7UUFDOUI7O1FBRUE7V0FDRyxLQUFLLGtCQUFrQjtjQUNwQixhQUFhO2NBQ2IsWUFBWTs7Ozs7Ozs7QUFRMUI7QUNmQTtBQUNBLFFBQVEsT0FBTyxlQUFlLENBQUM7S0FDMUIsMEJBQU8sU0FBUyxnQkFBZ0I7UUFDN0I7O1FBRUE7YUFDSyxLQUFLLFlBQVk7Z0JBQ2QsYUFBYTtnQkFDYixZQUFZO2dCQUNaLFNBQVM7O29CQUVMLDRCQUFTLFNBQVMsZ0JBQWdCO3dCQUM5QixPQUFPLGVBQWUsb0JBQW9CLEtBQUssU0FBUyxTQUFTOzRCQUM3RCxPQUFPOzs7Ozs7UUFNM0I7V0FDRyxLQUFLLGtCQUFr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QUFTLFlBQVk7WUFDeEIsa0JBQWtCLFFBQVE7Ozs7OztRQU05QixJQUFJLE9BQU8sWUFBWTtZQUNuQixPQUFPLFFBQVE7WUFDZixPQUFPLFVBQVU7Ozs7UUFJckI7OztJQUdKLE9BQU8sV0FBVyw4QkFBOEI7R0FDakQsUUFBUSxPQUFPO0FBQ2xCO0FDcEZBLENBQUMsVUFBVSxRQUFRO0lBQ2Y7OztJQUVBLFNBQVMsbUJBQW1CLFFBQVEsV0FBVyxrQkFBa0I7UUFDN0QsSUFBSSxPQUFPOzs7Ozs7OztRQVFYLE9BQU8sY0FBYzs7UUFFckIsT0FBTyx3QkFBd0IsU0FBUyxZQUFZLE9BQU87WUFDdkQsT0FBTyxxQkFBcUI7WUFDNUIsT0FBTyxjQUFjOzs7UUFHekIsT0FBTyxrQkFBa0IsV0FBVztZQUNoQyxVQUFVLEtBQUssaUJBQWlCLE9BQU8sbUJBQW1COzs7O1FBSTlELElBQUksT0FBTyxXQUFXO1lBQ2xCLGlCQUFpQixxQkFBcUIsS0FBSyxTQUFTLGFBQWE7Z0JBQzdELE9BQU8scUJBQXFCOzs7O1FBSXBDOzs7SUFHSixPQUFPLFdBQVcsc0JBQXNCO0dBQ3pDLFFBQVEsT0FBTyxrQkFBa0IiLCJmaWxlIjoiY29uY2F0QXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG4gICAgWyduZ1JvdXRlJywgJ3RvYXN0cicsICduZ0FuaW1hdGUnLCBcInVpLmJvb3RzdHJhcFwiLCAnTG9jYWxTdG9yYWdlTW9kdWxlJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInLCAnbmdUb3VjaCcsICduZ0ZpbGVVcGxvYWQnXHJcbiAgICAsICdhcHAuY3VzdG9tRGlyZWN0aXZlcycsICdhcHAuaG9tZScsICdhcHAuY2xhc3NlcycsICdhcHAubG9naW4nLCAnYXBwLmFjY291bnQnLCAnYXBwLmluZGV4JywgJ2FwcC5zdHVkZW50JywgJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCAnYXBwLmV2YWx1YXRpb24nLCAnYXBwLmRhc2hib2FyZCdcclxuICAgICwgJ2FwcC50ZWFjaGVyJywgJ2FwcC5jb3Vyc2UnLCAnYXBwLnN0dWR5UGxhbicsICdhcHAuc2Nob29seWVhciddKVxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9BY2NvdW50L3ZpZXdzL21hbmFnZUFjY291bnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUFjY291bnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9jbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbihjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3MvbWFuYWdlQ2xhc3Nlcy5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgYWxsQ2xhc3NlczogZnVuY3Rpb24oY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hbGxDbGFzc2VzKCkudGhlbihmdW5jdGlvbiAoYWxsQ2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGxDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL2NyZWF0ZUNsYXNzJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NyZWF0ZUNsYXNzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ2xhc3NDb250cm9sbGVyJ1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDb3Vyc2UnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL21hbmFnZUNvdXJzZS5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAud2hlbignL2NvdXJzZXMnLCB7XHJcbiAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvY291cnNlcy5odG1sJyxcclxuICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3Vyc2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5nZXRDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvY3JlYXRlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NyZWF0ZUNvdXJzZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVDb3Vyc2VDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbi86YnVuZGxlSWQ/Jywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25TZXJ2aWNlLCAkcm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bmRsZUlkID0gJHJvdXRlLmN1cnJlbnQucGFyYW1zLmJ1bmRsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblNlcnZpY2UuZXZhbHVhdGlvbnNGb3JCdW5kbGUoYnVuZGxlSWQpLnRoZW4oZnVuY3Rpb24gKGV2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9ucycsIHtcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9ucy5odG1sJyxcclxuICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25zQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvZXZhbHVhdGlvblRlbXBsYXRlcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oICcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9sb2dpbi92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuYXBwLnJ1bihbJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uIChhdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcclxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRBdXRoRGF0YSgpO1xyXG59XSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5Jyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5zY2hvb2x5ZWFyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgLy8kcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vICAud2hlbignL3JlcGxhY2UnLCB7XHJcbiAgICAgICAgLy8gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXcgSGVyZScsXHJcbiAgICAgICAgLy8gICAgICBjb250cm9sbGVyOiAnY29udHJvbGxlciBmb3IgdmlldyBoZXJlJ1xyXG4gICAgICAgIC8vICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbnRyb2xsZXJzL2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyLmpzXCIgLz5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlU3R1ZGVudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkZW50L3ZpZXdzL2NyZWF0ZVN0dWRlbnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlU3R1ZHlQbGFuJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9tYW5hZ2VTdHVkeVBsYW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlVGVhY2hlcicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL21hbmFnZVRlYWNoZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRlYWNoZXJzIDogZnVuY3Rpb24odGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyU2VydmljZS5nZXRUZWFjaGVycygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uICh0b2FzdHJDb25maWcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRvYXN0ckNvbmZpZywge1xyXG4gICAgICAgIGF1dG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIGNvbnRhaW5lcklkOiAndG9hc3QtY29udGFpbmVyJyxcclxuICAgICAgICBtYXhPcGVuZWQ6IDEwLFxyXG4gICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxyXG4gICAgICAgIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcclxuICAgICAgICBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHRhcmdldDogJ2JvZHknLFxyXG5cclxuICAgICAgICBhbGxvd0h0bWw6IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjbG9zZUh0bWw6ICc8YnV0dG9uPiZ0aW1lczs8L2J1dHRvbj4nLFxyXG4gICAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMCxcclxuICAgICAgICBpY29uQ2xhc3Nlczoge1xyXG4gICAgICAgICAgICBlcnJvcjogJ3RvYXN0LWVycm9yJyxcclxuICAgICAgICAgICAgaW5mbzogJ3RvYXN0LWluZm8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6ICd0b2FzdC13YXJuaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZUNsYXNzOiAndG9hc3QtbWVzc2FnZScsXHJcbiAgICAgICAgb25IaWRkZW46IG51bGwsXHJcbiAgICAgICAgb25TaG93bjogbnVsbCxcclxuICAgICAgICBvblRhcDogbnVsbCxcclxuICAgICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXHJcbiAgICAgICAgdGFwVG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgICAgICB0b2FzdDogJ2RpcmVjdGl2ZXMvdG9hc3QvdG9hc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIHByb2dyZXNzYmFyOiAnZGlyZWN0aXZlcy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5odG1sJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZU91dDogNDAwMCxcclxuICAgICAgICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxyXG4gICAgICAgIHRvYXN0Q2xhc3M6ICd0b2FzdCdcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkcHJvdmlkZSwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgJHByb3ZpZGUuZmFjdG9yeSgnZXJyb3JJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgdG9hc3RyID0gJGluamVjdG9yLmdldCgndG9hc3RyJyk7XHJcbiAgICAgICAgICAgICAgICAvLyB0b2FzdHIuZXJyb3IoJ0ZvdXQnLCByZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlU2VydmljZSA9ICRpbmplY3Rvci5nZXQoJ21lc3NhZ2VTZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVJlamVjdChyZWplY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdlcnJvckludGVyY2VwdG9yJyk7XHJcbn0pOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcigkc2NvcGUsIGFjY291bnRTZXJ2aWNlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBtZXNzYWdlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRBY2NvdW50Um9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5yb2xlVHlwZSA9IHJvbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyByb2VwIGhpZXIgZGUgYWNjb3VudHNlcnZpY2Ugb3Agb20gZWVuIG5pZXV3ZSBhY2NvdW50IHRlIG1ha2VuIG1ldCBkZSBkYXRhIGRpZSB2aWEgZGUgdmlldyBpcyBpbmdldnVsZC5cclxuICAgICAgICAgICAgLy8gZ2VlZiAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gbWVlIGluIGluIGRlIGFjY291bnRTZXJ2aWNlIG1ldGhvZGUuXHJcbiAgICAgICAgICAgIC8vLnRoZW4gb20gdGUgd2FjaHRlbiB0b3RkYXQgZGUgc2VydmVyIGdlYW50d29vcmQgaGVlZnRcclxuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuY3JlYXRlQWNjb3VudCgkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQWNjb3VudCBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpOyAvLyBnZWJydWlrIGRpdCBpbiB0aGUgLnRoZW4gZnVuY3RpZSB6b2RhdCBkZSBtb2RhbCBzbHVpdCBuYSBkZSBzZXJ2ZXJjYWxsLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0ge307IC8vIGdlYnJ1aWsgZGl0IG9tIGFsbGUgaW5mbyBhYW4gdGUgaGFuZ2VuIGluIGRlIHZpZXcgKGRpdCBtb2RlbCBtb2V0IGplIHNlcnZlcnNpZGUgbm9nIG9wYm91d2VuKVxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSBcIlVzZXJSb2xlXCI7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5pc1RlYWNoZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyJywgY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUFjY291bnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhY2NvdW50U2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBjdHJsICsgaCByZXBsYWNlIGFsbGUgY29udHJvbGxlcm5hbWVuIGRvb3IgaHVpZGlnZSBjb250cm9sbGVyXHJcbiAgICAgICAgLy8gdmVydmFuZyBhcHAucmVwbGFjZSBkb29yIGRlIGp1aXN0ZSBtb2R1bGUgaW4gZGl0IGdldmFsIGFwcC5hY2NvdW50IHN0YWF0IGluIGFjY291bnQtbW9kdWxlLmpzXHJcblxyXG4gICAgICAgIC8vY29udHJvbGxlciBpbiBpbmRleC5odG1sIHNsZXBlbi90b2V2b2VnZW4gb25kZXJhYW4gYmlqIHNjcmlwdHMgY29udHJvbGxlcnNcclxuXHJcbiAgICAgICAgLy92aWV3IGFhbm1ha2VuIGtvcGllZXIgdWl0IGNvcHkgZm9sZGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW4gbW9kdWxlIGFjY291bnQtbW9kdWxlIHJvdXRlIGFhbm1ha2VuICgkcm91dGVQcm92aWRlcilcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHNlbGVjdGVyZW4gdmFuIHJpaiBpbiBhY2NvdW50c3RhYmVsXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gZnVuY3Rpb24gKGFjY291bnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9jcmVhdGVBY2NvdW50TW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLy8gbmlldHMgZG9vciB0ZSBnZXZlbi5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hY2NvdW50TGlzdCA9IGFjY291bnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcicsIG1hbmFnZUFjY291bnRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBhY2NvdW50U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vdGhpei5jaGFuZ2VQYXNzd29yZCA9IGZ1bmN0aW9uIChjaGFuZ2VQYXNzd29yZEJpbmRpbmdNb2RlbCkge1xyXG4gICAgICAgIC8vICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJ2FjY291bnRzL2NoYW5nZXBhc3N3b3JkJywgY2hhbmdlUGFzc3dvcmRCaW5kaW5nTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vdGhpei5jcmVhdGVUZXN0QWNjb3VudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICB2YXIgY3JlYXRlVXNlck1vZGVsID0ge1xyXG4gICAgICAgIC8vICAgICAgICB1c2VybmFtZTogXCJUZXN0ZXJcIixcclxuICAgICAgICAvLyAgICAgICAgZW1haWw6IFwiYmVybmR2ZXJ0b21tZW5AbXNuLmNvbVwiLFxyXG4gICAgICAgIC8vICAgICAgICBmaXJzdE5hbWU6IFwiVGVzdFwiLFxyXG4gICAgICAgIC8vICAgICAgICBsYXN0bmFtZTogXCJlclwiLFxyXG4gICAgICAgIC8vICAgICAgICBwYXNzd29yZDogXCJARG1pbjEyM1wiLFxyXG4gICAgICAgIC8vICAgICAgICBjb25maXJtUGFzc3dvcmQgOlwiQERtaW4xMjNcIlxyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aCArICdhY2NvdW50cy9jcmVhdGVUZXN0ZXInLCBjcmVhdGVVc2VyTW9kZWwpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgfSk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uaWV1d2UgbWV0aG9kZSBvbSBhY2NvdW50IHRlIGNyZWVlcmVuIGFhbmdlbWFha3RcclxuICAgICAgICB0aGl6LmNyZWF0ZUFjY291bnQgPSBmdW5jdGlvbihjcmVhdGVBY2NvdW50SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jcmVhdGVBY2NvdW50JywgY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jcmVlZXIgaGllciBkZSBtZXRob2RlIGRpZSBuYWFyIGJpaiBkZSBhY2NvdW50Y29udHJvbGxlciBjcmVhdGVBY2NvdW50IGdlYnJ1aWt0LlxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhY2NvdW50U2VydmljZScsIGFjY291bnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjbGFzc2VzU2VydmljZSwgbWVzc2FnZVNlcnZpY2UsIGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFRlYWNoZXIgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZXMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ2xhc3Nlc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZENvdXJzZXMpO1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS5jcmVhdGVDbGFzcygkc2NvcGUuY3JlYXRlQ2xhc3NJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIktsYXMgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDbGFzc2VzXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vIHRvZG8gcmVtb3ZlIHRoaXMgXHJcbiAgICAgICAgLy8kc2NvcGUuJHdhdGNoKCdzZWxlY3RlZFRlYWNoZXInLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ0dlc2VsZWN0ZWVyZGUgbGVlcmthY2h0IDonICsgdmFsdWUucGVyc29uLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLnBlcnNvbi5sYXN0TmFtZSk7XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgLy8vLyB0b2RvIHJlbW92ZSB0aGlzIFxyXG4gICAgICAgIC8vJHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWRUZWFjaGVycycsIGZ1bmN0aW9uICh0ZWFjaGVycykge1xyXG4gICAgICAgIC8vICAgIGlmICh0ZWFjaGVycy5sZW5ndGggPCAxICkge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgXy5lYWNoKHRlYWNoZXJzLCBmdW5jdGlvbih0ZWFjaGVyKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCdMZWVya3JhY2h0IDonICsgdGVhY2hlci5wZXJzb24uZmlyc3ROYW1lICsgJyAnICsgdGVhY2hlci5wZXJzb24ubGFzdE5hbWUpO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDbGFzc0luZm8gPSB7fTtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNsYXNzSW5mby5uZXh0WWVhciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90ZWFjaGVyU2VydmljZS5nZXRUZWFjaGVycygpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUudGVhY2hlcnMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQ2xhc3NDb250cm9sbGVyJywgY3JlYXRlQ2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSxzY2hvb2x5ZWFyU2VydmljZSwgdG9hc3RyLCAkbG9jYXRpb24sIGFsbENsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFNjaG9vbFllYXIgPSBmdW5jdGlvbihzY2hvb2x5ZWFyKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFNjaG9vbFllYXIgPSBzY2hvb2x5ZWFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnVwbG9hZENzdiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS51cGxvYWRDbGFzc0Nzdigkc2NvcGUuZmlsZSwgJHNjb3BlLnNlbGVjdGVkU2Nob29sWWVhcikudGhlbihmdW5jdGlvbihwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuc3VjY2VzcygnSGV0IENTViBiZXN0YW5kIGlzIG1ldCBzdWNjZXNzIG9wZ2VzbGFnZW4uJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2tsYXNzZW4gdm9sbGVkaWcgb3Byb2VwZW4gZmlsdGVyZW4gY2xpZW50c2lkZVxyXG4gICAgICAgIC8vc3R1ZGVudGVuIDEwLzEwIHZhbiBzZXJ2ZXIgb3BoYWxlblxyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc1gsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gY2xhc3NYO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbiAoc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgICAkc2NvcGUuc2Nob29sWWVhcnMgPSBzY2hvb2x5ZWFycztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuYWxsQ2xhc3NlcyA9IGFsbENsYXNzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5hbGxDbGFzc2VzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLCBtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgY2xhc3Nlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDbGFzcyA9IGZ1bmN0aW9uIChrbGFzLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGtsYXM7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkQ2xhc3MpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuc2VsZWN0ZWRDbGFzcyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlcicsIHNlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgIGZ1bmN0aW9uIHRlc3RDbGFzc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICBjbGFzc2VzU2VydmljZS5nZXRUZXN0Q2xhc3MoKS50aGVuKGZ1bmN0aW9uIChjbGFzc1Jlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICRzY29wZS50ZXN0Q2xhc3MgPSBjbGFzc1Jlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ1Rlc3RDbGFzc0NvbnRyb2xsZXInLCB0ZXN0Q2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjbGFzc2VzU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UsIFVwbG9hZCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yVGVhY2hlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvclRlYWNoZXInKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY2xhc3Nlc0ZvckNvdXJzZSA9IGZ1bmN0aW9uKGNvdXJzZUlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvY2xhc3Nlc0ZvckNvdXJzZScsIHsgJ2lkJzogY291cnNlSWQgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24odGVhY2hlcklkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnY2xhc3MvYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXInLCB7ICdpZCc6IHRlYWNoZXJJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoudXBsb2FkQ2xhc3NDc3YgPSBmdW5jdGlvbihmaWxlLCBzY2hvb2xZZWFyKSB7XHJcbiAgICAgICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy91cGxvYWRDbGFzc0NzdicsIHsgZmlsZTogZmlsZSB9XHJcbiAgICAgICAgICAgICAgcmV0dXJuICAgVXBsb2FkLnVwbG9hZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogYmFzZVdlYkFwaVVybCArICdjbGFzcy91cGxvYWRDbGFzc0Nzdi8nICsgc2Nob29sWWVhci5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogeyBmaWxlOiBmaWxlIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApLnRoZW4oZnVuY3Rpb24gKHJlc3ApIHtcclxuICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1N1Y2Nlc3MgJyArIHJlc3AuY29uZmlnLmRhdGEuZmlsZS5uYW1lICsgJ3VwbG9hZGVkLiBSZXNwb25zZTogJyArIHJlc3AuZGF0YSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZXNwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRXJyb3Igc3RhdHVzOiAnICsgcmVzcC5zdGF0dXMpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3NQZXJjZW50YWdlID0gcGFyc2VJbnQoMTAwLjAgKiBldnQubG9hZGVkIC8gZXZ0LnRvdGFsKTtcclxuICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3Byb2dyZXNzOiAnICsgcHJvZ3Jlc3NQZXJjZW50YWdlICsgJyUgJyArIGV2dC5jb25maWcuZGF0YS5maWxlLm5hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENsYXNzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjbGFzcy9hbGxDbGFzc2VzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uKGNyZWF0ZUNsYXNzSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjbGFzcy9jcmVhdGVDbGFzc1wiLCBjcmVhdGVDbGFzc0luZm8pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NsYXNzZXNTZXJ2aWNlJywgY2xhc3Nlc1NlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvdXJzZUNvbnRyb2xsZXInLCBjb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VTZXJ2aWNlLCAkdWliTW9kYWwsIHN0dWR5UGxhblNlcnZpY2UsIG1lc3NhZ2VTZXJ2aWNlLCBzY2hvb2x5ZWFyU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8gPSB7fTtcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ291cnNlXCIpO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL21hbmFnZUNvdXJzZVwiOyAvL2JpaiBsb2NhdGlvbi5wYXRoIGdlZW4gIyBiaWpkb2VuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvdXJzZVNlcnZpY2UuY3JlYXRlQ291cnNlKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQ3Vyc3VzIGFhbmdlbWFha3QhXCIpO1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ291cnNlXCIpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub3BlblN0dWR5cGxhbk1vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9zZWxlY3RTdHVkeVBsYW5Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzZWxlY3RTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBzdHVkeXBsYW5zOiBzdHVkeVBsYW5TZXJ2aWNlLmdldFN0dWR5UGxhbnMoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRTdHVkeVBsYW4pIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvLnN0dWR5UGxhbiA9IHNlbGVjdGVkU3R1ZHlQbGFuO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBnZWVuIFN0dWR5cGxhbiBnZXNlbGVjdGVlcmQgZXJyb3I/IGhpZXIga29tIGplIGluIGFscyBqZSBuaWtzIHNlbGVjdGVlcmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkU2Nob29sWWVhciA9IGZ1bmN0aW9uIChzY2hvb2x5ZWFyKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvLnNjaG9vbFllYXIgPSBzY2hvb2x5ZWFyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8gPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbiAoc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zY2hvb2xZZWFycyA9IHNjaG9vbHllYXJzO1xyXG5cclxuICAgICAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvLnNjaG9vbFllYXIgPSAkc2NvcGUuc2Nob29sWWVhcnNbMF07XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInLCBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ291cnNlQ29udHJvbGxlcicsIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlndXJhdGlvblNlcnZpY2UoJGh0dHAsIHRvYXN0ckNvbmZpZykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIGFwaVVybCA9ICdodHRwOi8vdGVzdHBsYXRmb3JtQXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXouYmFzZUFwaVBhdGggPSBhcGlVcmwgKyAnYXBpLyc7XHJcblxyXG4gICAgICAgIHRoaXoudG9rZW5QYXRoID0gYXBpVXJsICsgJ29hdXRoL3Rva2VuJztcclxuXHJcbiAgICAgICAgdGhpei5nZXRTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRoaXouYmFzZUFwaVBhdGggKyBcIi9nZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFyc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVBkZkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZmlsZSA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vcGRmJyB9KTtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYikge1xyXG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zU2F2ZUJsb2IoZmlsZSwgJ2ZpbGVOYW1lLnBkZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2F2ZUFzKGZpbGUsICdmaWxlbmFtZS5wZGYnKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjb25maWd1cmF0aW9uU2VydmljZScsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5nZXRDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jb3Vyc2VzRm9yVGVhY2hlclwiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENvdXJzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2FsbENvdXJzZXNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDb3Vyc2UgPSBmdW5jdGlvbiAoY3JlYXRlQ291cnNlSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2NyZWF0ZUNvdXJzZVwiLCBjcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvdXJzZVNlcnZpY2UnLCBjb3Vyc2VTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsKHNlbGVjdE1vZGFsU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxhIGNsYXNzPSdidG4gYnRuLWRlZmF1bHQgYnRuLXNtJyA+PGkgY2xhc3M9J2ZhIGZhLXBsdXMtc3F1YXJlJz48L2k+PC9hPlwiLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOic9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbChzY29wZS5tb2RhbG5hbWUsIHNjb3BlLml0ZW1zKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0aW9uID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5kaXJlY3RpdmUoJ3NlbGVjdE1vZGFsJywgc2VsZWN0TW9kYWwpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsU2VydmljZSgkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBtb2RhbFNldHRpbmdzID0gW1xyXG4gICAgICAgICAgIC8qc2VsZWN0VGVhY2hlck1vZGFsU2V0dGluZyovXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBtb2RhbE5hbWU6IFwic2VsZWN0VGVhY2hlck1vZGFsXCIsIHRlbXBsYXRlOiBcImFwcC9jdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlYXJjaFRlYWNoZXJzTW9kYWwvc2VsZWN0VGVhY2hlck1vZGFsLmh0bWxcIiwgY29udHJvbGxlcjogXCJzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiTGVlcmtyYWNodGVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgZWVuIGxlZXJrcmFjaHRcIiB9XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICAvKnNlbGVjdFRlYWNoZXJzTW9kYWxTZXR0aW5nICA9PiBtdWx0aXBsZSB0ZWFjaGVycyovXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBtb2RhbE5hbWU6IFwic2VsZWN0VGVhY2hlcnNNb2RhbFwiLCB0ZW1wbGF0ZTogXCJhcHAvY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9zZWFyY2hUZWFjaGVyc01vZGFsL3NlbGVjdFRlYWNoZXJzTW9kYWwuaHRtbFwiLCBjb250cm9sbGVyOiBcInNlbGVjdEl0ZW1zTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiTGVlcmtyYWNodGVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgbGVlcmtyYWNodGVuXCIgfVxyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgLypPdGhlciBzZXR0aW5ncyovXHJcbiAgICAgICAgICAgLy9zZWxlY3RDb3Vyc2VzTW9kYWxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vZGFsTmFtZTogXCJzZWxlY3RDb3Vyc2VzTW9kYWxcIiwgdGVtcGxhdGU6IFwiYXBwL2N1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvc2VhcmNoQ291cnNlc01vZGFsL3NlbGVjdENvdXJzZXNNb2RhbC5odG1sXCIsIGNvbnRyb2xsZXI6IFwic2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgY29udGVudDogeyB0aXRsZTogXCJDdXJzdXNzZW5cIiwgaXRlbURlc2NyaXB0aW9uOiBcIlNlbGVjdGVlciBjdXJzdXNzZW5cIiB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHZhciBnZXRNb2RhbFNldHRpbmcgPSBmdW5jdGlvbiAobW9kYWxOYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBfLmZpbmQobW9kYWxTZXR0aW5ncywgZnVuY3Rpb24gKG1vZGFsU2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsU2V0dGluZy5tb2RhbE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbW9kYWxOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdlZW4gbW9kYWwgc2V0dGluZyBnZXZvbmRlblwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXoub3Blbk1vZGFsID0gZnVuY3Rpb24gKG1vZGFsTmFtZSwgaXRlbXMpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2RhbFNldHRpbmcgPSBnZXRNb2RhbFNldHRpbmcobW9kYWxOYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogbW9kYWxTZXR0aW5nLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogbW9kYWxTZXR0aW5nLmNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsU2V0dGluZy5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3NlbGVjdE1vZGFsU2VydmljZScsIHNlbGVjdE1vZGFsU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTsgLy90ZXN0IiwiLyogR3VpZGUgOlxyXG5Vc2UgdGhlIGRpcmVjdGl2ZSBieSBhZGRpbmcgdGhlIGZvbG93aW5nIGh0bWwgY29kZSB0byB5b3VyIHBhZ2UgOlxyXG48c2VsZWN0LXNjaG9vbHllYXIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFNjaG9vbFllYXJcIj48L3NlbGVjdC1zY2hvb2x5ZWFyPlxyXG5BZGp1c3QgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBhdHRyaWJ1dGUgdG8gdGhlIG9uZSBsaW5rIHRvIHRoZSB2aWV3cyBjb250cm9sbGVyIHNjb3BlLlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzZWxlY3RTY2hvb2x5ZWFyKCRyb290U2NvcGUsIHNjaG9vbHllYXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNldHVwU2NvcGUgPSBmdW5jdGlvbiAoc2NvcGUsc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2Nob29seWVhcnMgPSBzY2hvb2x5ZWFycztcclxuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSBzY29wZS5zY2hvb2x5ZWFyc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGxhYmVsIGZvcj1cInNjaG9vbHllYXJTZWxlY3RvclwiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPlNjaG9vbGphYXI6PC9sYWJlbD48ZGl2IGlkPVwic2Nob29seWVhclNlbGVjdG9yXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB1aWItZHJvcGRvd24+PGEgdWliLWRyb3Bkb3duLXRvZ2dsZT57e3NlbGVjdGVkLm5vdGF0aW9ufX0gPGkgY2xhc3M9XCJmYSBmYS1jYXJldC1kb3duXCI+PC9pPjwvYT48dWwgdWliLWRyb3Bkb3duLW1lbnUgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsbGVkYnk9XCJzaW5nbGUtYnV0dG9uXCI+PGxpIG5nLXJlcGVhdD1cInNjaG9vbHllYXIgaW4gc2Nob29seWVhcnMgfCBvcmRlckJ5OlxcJ3N0YXJ0WWVhclxcJ1wicm9sZT1cIm1lbnVpdGVtXCIgbmctY2xpY2s9XCJzZXRTZWxlY3RlZFNjaG9vbFllYXIoc2Nob29seWVhcilcIj48YT57e3NjaG9vbHllYXIubm90YXRpb259fTwvYT48L2xpPjwvdWw+PC9kaXY+JyxcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiAnPScsXHJcbiAgICAgICAgICAgICAgICBzY2hvb2x5ZWFyczogJz0nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkcm9vdFNjb3BlLmZ1dHVyZVNjaG9vbFllYXJzKSB8fCAkcm9vdFNjb3BlLmZ1dHVyZVNjaG9vbFllYXJzID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY2hvb2x5ZWFyU2VydmljZS5nZXRGdXR1cmVTY2hvb2xZZWFycygpLnRoZW4oZnVuY3Rpb24oc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dXBTY29wZShzY29wZSwgc2Nob29seWVhcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXR1cFNjb3BlKHNjb3BlLCAkcm9vdFNjb3BlLmZ1dHVyZVNjaG9vbFllYXJzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzY29wZS5zZXRTZWxlY3RlZFNjaG9vbFllYXIgPSBmdW5jdGlvbiAoc2Nob29seWVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGVkID0gc2Nob29seWVhcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmRpcmVjdGl2ZSgnc2VsZWN0U2Nob29seWVhcicsIHNlbGVjdFNjaG9vbHllYXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBkYXNoYm9hcmRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuY2FsZW5kZXJQYXRoID0gJ2FwcC9kYXNoYm9hcmQvdmlld3MvcGFydGlhbHMvY2FsZW5kYXJQYXJ0aWFsLmh0bWwnO1xyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2Rhc2hib2FyZENvbnRyb2xsZXInLCBkYXNoYm9hcmRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhc2hib2FyZFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5wbGFubmVkRXZhbHVhdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJldmFsdWF0aW9uL3BsYW5uZWRFdmFsdWF0aW9uc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdkYXNoYm9hcmRTZXJ2aWNlJywgZGFzaGJvYXJkU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlLCBldmFsdWF0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgLy8gZXZhbHVhdGlvblNlcnZpY2Uuc2V0U3Vic2VjdGlvblNjb3JlcygpOyAvLyBmaW5kIG90aGVyIHNvbHV0aW9uIHRvIG1hcCBzY29yZXMgbm90IG9uIGV2cnkgc2VsZWN0LlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTY29yZSA9IGZ1bmN0aW9uIChldmFsdWF0aW9uSXRlbSwgc2NvcmUpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbkl0ZW0uc2NvcmUgPSBzY29yZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbigkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhFdmEgPSBfLmZpbmRJbmRleCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkID09PSBldmFsdWF0aW9uLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zW2luZGV4RXZhXSA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBoYXNoa2V5ID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXk7XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleSA9IGhhc2hrZXk7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVwZGF0ZUV2YWx1YXRpb25zKCRzY29wZS5ldmFsdWF0aW9ucykudGhlbihmdW5jdGlvbihldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Tm90U2NvcmVkUmVhc29uID0gZnVuY3Rpb24oZXZhbHVhdGlvbml0ZW0sIG51bWJlcikge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5ub3RTY29yZWRSZWFzb24gPSBudW1iZXI7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25pdGVtLnNjb3JlID0gbnVsbDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25TZXJ2aWNlLm1hcEl0ZW1zVG9TdWJTZWN0aW9uKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcbiAgICAgICAgIC8vIGV2YWx1YXRpb25TZXJ2aWNlLnNldFN1YnNlY3Rpb25TY29yZXMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5ncm91cEJ5KGV2YWx1YXRpb24uZXZhbHVhdGlvbkl0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmV2YWx1YXRpb25TdWJTZWN0aW9uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uc29ydEJ5KGRpZmZlcmVudFN1YnNlY3Rpb25zLCBmdW5jdGlvbihzdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucyA9IGRpZmZlcmVudFN1YnNlY3Rpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLy8vIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldID0+IHVzZSBkaWN0aW9uYXJ5IGZyb20gYyMgdGhpcyB3YXlcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJzZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQpICYmICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Vic2VjdGlvbi50b3RhbFNjb3JlID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQudG90YWxzUGVyY2F0ZWdvcnlbc3Vic2VjdGlvblswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5pZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBtYXAgZXZlcnkgZXZhbHVhdGlvbiBub3QganVzdCBzZWxlY3RlZCBzbyBpdCBjYW4gYmUgcHJvY2VzZWQgaW4gaW50KClcclxuICAgICAgICB9O1xyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZhbHVhdGlvbnNbMF0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NUaXRsZSA9IGV2YWx1YXRpb25zWzBdLmNyZWF0ZWRGb3JDbGFzcy5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEV2YWx1YXRpb24oZXZhbHVhdGlvbnNbMF0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uU2VydmljZS5tYXBJdGVtc1RvU3ViU2VjdGlvbihldmFsdWF0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uQ29udHJvbGxlcicsIGV2YWx1YXRpb25Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbnNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzLCBjbGFzc2VzLCBldmFsdWF0aW9uU2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0ID0ge307XHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0ge307XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNldENsYXNzID0gZnVuY3Rpb24oa2xhcykge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGtsYXM7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY2xhc3NJZCA9ICRzY29wZS5zZWxlY3RlZENsYXNzLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9ICRzY29wZS5zZWxlY3RlZENvdXJzZS5pZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QucGFnZSA9IDE7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3RhcnREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5lbmREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5maW5pc2hlZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY2xhc3NJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY291cnNlSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnN0dWRlbnRGaXJzdG5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnN0dWRlbnRMYXN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zaG93cGFnaW5hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2Uuc2VhcmNoRXZhbHVhdGlvbnMoJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5UmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5UmVzdWx0LmV2YWx1YXRpb25zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRvdGFsSXRlbXMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQudG90YWxJdGVtcztcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93cGFnaW5hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1RvUGRmID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uc1RvUGRmTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25zOyAvLyBtYXliZSBkbyBhIHNlYXJjaCBhZ2FpbiB3aXRoIG1vcmUgaXRlbXMgcGFnZWQ/XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZEV2YWx1YXRpb25JZHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgICAgICBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0LkV2YWx1YXRpb25JZHMgPSBzZWxlY3RlZEV2YWx1YXRpb25JZHM7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UuY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMocGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlblNjb3JlZEV2YWx1YXRpb25Nb2RhbCA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3Mvc2NvcmVkRXZhbHVhdGlvbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uOiBldmFsdWF0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY2xlYXJTZWFyY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvbnNDb250cm9sbGVyJywgZXZhbHVhdGlvbnNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvbnMsICR1aWJNb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIHZhciBnZXRTZWxlY3RlZElkcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5tYXAoJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbihldmEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmEuc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkQWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAkc2NvcGUuc2VsZWN0ZWRBbGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZShnZXRTZWxlY3RlZElkcygpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uLCBldmFsdWF0aW9uU2VydmljZSwgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25Ub1BkZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UuY3JlYXRlUGRmRm9yRXZhbHVhdGlvbigkc2NvcGUuZXZhbHVhdGlvbik7XHJcbiAgICAgICAgICAgICRzY29wZS5vaygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uKGV2YWx1YXRpb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZhbHVhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXInLCBzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5ldmFsdWF0aW9uc0ZvckJ1bmRsZSA9IGZ1bmN0aW9uKGJ1bmRsZUlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9ldmFsdWF0aW9uc0ZvckJ1bmRsZScsIHsgJ2lkJzogYnVuZGxlSWQgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3VwZGF0ZUV2YWx1YXRpb24nLCBldmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9ucycsIGV2YWx1YXRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnNlYXJjaEV2YWx1YXRpb25zID0gZnVuY3Rpb24ocGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vc2VhcmNoRXZhbHVhdGlvbnMnLCBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZVBkZkZvckV2YWx1YXRpb25zID0gZnVuY3Rpb24oZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucycsIGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCwgeyByZXNwb25zZVR5cGU6ICdhcnJheWJ1ZmZlcicgfSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uU2VydmljZS5oYW5kbGVQZGZEYXRhKHJlc3VsdC5kYXRhKS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZVBkZkZvckV2YWx1YXRpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0LkV2YWx1YXRpb25JZHMgPSBbZXZhbHVhdGlvbi5pZF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGlvbiBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6Lm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5ncm91cEJ5KGV2YWx1YXRpb24uZXZhbHVhdGlvbkl0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmV2YWx1YXRpb25TdWJTZWN0aW9uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uc29ydEJ5KGRpZmZlcmVudFN1YnNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi53ZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMgPSBkaWZmZXJlbnRTdWJzZWN0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMoZXZhbHVhdGlvbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypNYXBzIHN1YnNlY3Rpb25zIHRvIGV2YWx1YXRpb25pdGVtcyovXHJcbiAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9ucykge1xyXG4gICAgICAgICAgICBfLmVhY2goZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGl6Lm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24oZXZhbHVhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25zO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qVXNlIHRoaXMgdG8gbWFwIHRoZSBzY29yZXMgdG8gdGhlIG1hcHBlZCBzdWJzZWN0aW9ucyBvZiBhIGV2YWx1YXRpb24qL1xyXG4gICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vLy8gdmFyIHZhbHVlID0gb2JqZWN0W2tleV0gPT4gdXNlIGRpY3Rpb25hcnkgZnJvbSBjIyB0aGlzIHdheVxyXG4gICAgICAgICAgICBfLmVhY2goZXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1YnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChldmFsdWF0aW9uLnJlc3VsdCkgJiYgZXZhbHVhdGlvbi5yZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnRvdGFsU2NvcmUgPSBldmFsdWF0aW9uLnJlc3VsdC50b3RhbHNQZXJjYXRlZ29yeVtzdWJzZWN0aW9uWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLmlkXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1hcCBldmVyeSBldmFsdWF0aW9uIG5vdCBqdXN0IHNlbGVjdGVkIHNvIGl0IGNhbiBiZSBwcm9jZXNlZCBpbiBpbnQoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdldmFsdWF0aW9uU2VydmljZScsIGV2YWx1YXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSwgZXZhbHVhdGlvblRlbXBsYXRlLCBjbGFzc2VzRm9yQ291cnNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgLy8gZGF0ZXBpY2tlclxyXG4gICAgICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24gKCRldmVudCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzLm9wZW5lZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldERhdGUgPSBmdW5jdGlvbiAoeWVhciwgbW9udGgsIGRheSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZC5ldmFsdWF0aW9uRGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5kYXRlT3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgZm9ybWF0WWVhcjogJ3l5JyxcclxuICAgICAgICAgICAgc3RhcnRpbmdEYXk6IDFcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBlbmQgZGF0ZXBpY2tlclxyXG5cclxuICAgICAgICAvL3NjaG9vbHllYXIgZHJvcGRvd25cclxuICAgICAgICAkc2NvcGUuc3RhdHVzID0ge1xyXG4gICAgICAgICAgICBpc29wZW46IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgICRzY29wZS50b2dnbGVEcm9wZG93biA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cy5pc29wZW4gPSAhJHNjb3BlLnN0YXR1cy5pc29wZW47XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSB7fTtcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NGb3JDb3Vyc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQuY2xhc3NJZCA9IGNsYXNzRm9yQ291cnNlLmlkO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGNsYXNzRm9yQ291cnNlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9lbmQgc2Nob29seWVhciBkcm9wZG93blxyXG5cclxuICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgLy9tYWtlIGNhbGwgaGVyZVxyXG4gICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5jcmVhdGVFdmFsdWF0aW9uRnJvbVRlbXBsYXRlKCRzY29wZS5jcmVhdGVDb21tYW5kKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ29rJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3Nlc0ZvckNvdXJzZSA9IGNsYXNzZXNGb3JDb3Vyc2U7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSA9IGV2YWx1YXRpb25UZW1wbGF0ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQgPSB7XHJcbiAgICAgICAgICAgICAgICBFdmFsdWF0aW9uVGVtcGxhdGVJZDogZXZhbHVhdGlvblRlbXBsYXRlLmlkLFxyXG4gICAgICAgICAgICAgICAgRXZhbHVhdGlvbkRhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzSWQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcicsIGNyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSwgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlID0ge307XHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMgPSBbXTtcclxuICAgICAgICAkc2NvcGUudGFicyA9IDE7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2F2ZVRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gZGV2ZWxvcCB2YWxpZGF0aW9uIGFuZCBhZGp1c3QgMTAwIHBlcnNjZW50IGNvZGUuXHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuY3JlYXRlVGVtcGxhdGUoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvZXZhbHVhdGlvblRlbXBsYXRlcycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkdlbmVyYWxPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9nZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5jcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYWxPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7ICdkZXNjcmlwdGlvbic6IFwiXCIsICdjb3Vyc2UnOiBudWxsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZ2VuZXJhbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gPSBnZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlID0gZ2VuZXJhbE9wdGlvbnMuY291cnNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TdWJTZWN0aW9ucyA9IGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25TdWJTZWN0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJTZWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRvdGFsV2VpZ2h0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb25TdWJTZWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMgPSBldmFsdWF0aW9uU3ViU2VjdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlU3ViU2VjdGlvbiA9IGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9ICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLmluZGV4T2Yoc3ViU2VjdGlvbik7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5Hb2FscyA9IGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3ViU2VjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGF2YWlsYWJsZUdvYWxzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaG9zZW5Hb2FscyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goc3ViU2VjdGlvbi5nb2FscywgZnVuY3Rpb24oZ29hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNob3NlbkdvYWxzLnB1c2goZ29hbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXZpYWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaG9zZW5Hb2Fscy5sZW5ndGggPjApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2aWFsYWJsZUdvYWxzID0gXy5yZWplY3QoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UuZ29hbHNGb3JDb3Vyc2UsIGZ1bmN0aW9uIChnb2FsRnJvbUNvdXJzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbkdvYWxzID0gXy5hbnkoY2hvc2VuR29hbHMsIGZ1bmN0aW9uIChnb2FsZnJvbVN1Yikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ29hbEZyb21Db3Vyc2UuaWQgPT09IGdvYWxmcm9tU3ViLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpbkdvYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmlhbGFibGVHb2Fscz0gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UuZ29hbHNGb3JDb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF2aWFsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb25TdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRvZWwgdG9lZ2V2b2VnZFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5kZWxldGVHb2FsID0gZnVuY3Rpb24oc3Vic2VjdGlvbiwgZ29hbCkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzdWJzZWN0aW9uLmdvYWxzLmluZGV4T2YoZ29hbCk7XHJcbiAgICAgICAgICAgIHN1YnNlY3Rpb24uZ29hbHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB0b3RhbFBlcmNlbnRhZ2UgPSAwO1xyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdG90YWxQZXJjZW50YWdlICs9IHBhcnNlSW50KHN1YlNlY3Rpb24ud2VpZ2h0LDEwKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdG90YWxQZXJjZW50YWdlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY2FsY0Rlc2NyaXB0aW9uUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbikgJiYgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiAhPT0gbnVsbCAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNDb3Vyc2VQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSkgJiYgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAyNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY1N1YlRvdGFsUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG90YWxQZXJjZW50YWdlID0gdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsUGVyY2VudGFnZSA9PT0gMTAwID8gMjUgOiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjR29hbFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9uZUdvYWxTZXQgPSBfLmFueSgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc0RlZmluZWQoc3ViU2VjdGlvbi5nb2FscykgJiYgc3ViU2VjdGlvbi5nb2Fscy5sZW5ndGggPiAwO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9uZUdvYWxTZXQgPyAyNSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzID0gMDtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjRGVzY3JpcHRpb25Qb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjQ291cnNlUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY1N1YlRvdGFsUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0dvYWxQb2ludHMoKTtcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVFdmFsdWF0aW9uT3B0aW9ucyA9IGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyA9IDA7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUub3BlbkdlbmVyYWxPcHRpb25zKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLCBjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25UZW1wbGF0ZXMsICR1aWJNb2RhbCwgY2xhc3Nlc1NlcnZpY2UsIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzRm9yQ291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yQ291cnNlKCRzY29wZS5zZWxlY3RlZFRlbXBsYXRlLmNvdXJzZS5pZCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuaGlkZVNlbGVjdGVkVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlc1RvSGlkZSA9IFtdO1xyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZXMsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlLmNoZWNrSGlkZGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVzVG9IaWRlLnB1c2godGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZXNUb0hpZGUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuaGlkZVNlbGVjdGVkVGVtcGxhdGVzKHRlbXBsYXRlc1RvSGlkZSkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRlbXBsYXRlc1RvSGlkZSwgZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmhpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZXMgPSBldmFsdWF0aW9uVGVtcGxhdGVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHN1YlNlY3Rpb24sIGNvdXJzZSwgYXZhaWxhYmxlR29hbHMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmdvYWxzRmlsdGVyID0ge307XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDsgXHJcbiAgICAgIFxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEdvYWwgPSBmdW5jdGlvbiAoZ29hbCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkR29hbCA9IGdvYWw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgIHRoaXouQWRkR29hbFRvTmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoc3ViU2VjdGlvbi5nb2FscykgfHwgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uLmdvYWxzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2FscyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5wdXNoKCRzY29wZS5zZWxlY3RlZEdvYWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkR29hbCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uID0gc3ViU2VjdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmF2YWlsYWJsZUdvYWxzID0gYXZhaWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBjdXJyZW50VG90YWxXZWlnaHQsIGNvdXJzZSwgc3ViU2VjdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5wdXNoKGFuZ3VsYXIuY29weSgkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0KSB8fCAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGVycm9yIG1lc3NhZ2UgaGVyZSA6IG5vIHdlaWd0aCBlbnRlcmVkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5pc0VkaXRpbmcpIHx8ICRzY29wZS5pc0VkaXRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGl6LmFkZG5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMgPSBldmFsdWF0aW9uU3ViU2VjdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VG90YWxXZWlnaHQgPSBjdXJyZW50VG90YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uKSAmJiBzdWJTZWN0aW9uICE9PW51bGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5uZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgZ2VuZXJhbE9wdGlvbnMsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24pIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gcmVwbGFjZSB3aXRoIGVycm9yIG1ldGhvZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UpIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gcmVwbGFjZSB3aXRoIGVycm9yIG1ldGhvZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5nZW5lcmFsT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5nZW5lcmFsT3B0aW9ucyA9IGdlbmVyYWxPcHRpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyJywgZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldENyZWF0ZUV2YWx1YXRpb25PcHRpb25zJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKGV2YWx1YXRpb25UZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9jcmVhdGVUZW1wbGF0ZScsIGV2YWx1YXRpb25UZW1wbGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvZ2V0RXZhbHVhdGlvblRlbXBsYXRlcycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZScsIGNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouaGlkZVNlbGVjdGVkVGVtcGxhdGVzID0gZnVuY3Rpb24odGVtcGxhdGVzSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2hpZGVUZW1wbGF0ZXMnLCB0ZW1wbGF0ZXNJZHMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlJywgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhvbWVDb250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIldlbGtvbVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGhvbWVDb250cm9sbGVyKTtcclxuXHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScpKTtcclxuXHJcblxyXG4iLCIoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsICRyb290U2NvcGUpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9nT3V0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdXNlck5hbWUgPSBhdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck5hbWU7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCh1c2VyTmFtZSkgJiYgdXNlck5hbWUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLGZ1bmN0aW9uIChldmVudCxkYXRhKSB7XHJcbiAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IGRhdGEudXNlck5hbWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3VzZXJMb2dnZWRPdXQnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignaW5kZXhDb250cm9sbGVyJywgaW5kZXhDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2aWNlTmFtZScsIGluZGV4U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJHEsICRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsIHRvYXN0ciwgc2Nob29seWVhclNlcnZpY2UsICRyb290U2NvcGUpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUucGFzc3dvcmQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXN0VGl0bGUgPSBcIlRlc3RUaXRsZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgc2V0dXBSb290U2NvcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRxLmFsbChbXHJcbiAgICAgICAgICAgICAgICBzY2hvb2x5ZWFyU2VydmljZS5nZXRGdXR1cmVTY2hvb2xZZWFycygpIC8vLCBkZWZpbmUgbXV0aXBsZSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgXSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mdXR1cmVTY2hvb2xZZWFycyA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkcm9vdFNjb3BlLmZ1dHVyZVNjaG9vbFllYXJzKTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnVzZXJOYW1lKSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5wYXNzd29yZCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsb2dpbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogJHNjb3BlLnVzZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9naW4obG9naW5EYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgc2V0dXBSb290U2NvcGUoKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ob21lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgbG9naW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicpKTsiLCJcclxuJ3VzZSBzdHJpY3QnO1xyXG5hcHAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScsIFsnJHEnLCAnJGxvY2F0aW9uJyxcclxuJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHEsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSkge1xyXG5cclxuICAgIHZhciBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5ID0ge307XHJcblxyXG4gICAgdmFyIF9yZXF1ZXN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cclxuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3Jlc3BvbnNlRXJyb3IgPSBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlcXVlc3QgPSBfcmVxdWVzdDtcclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVzcG9uc2VFcnJvciA9IF9yZXNwb25zZUVycm9yO1xyXG5cclxuICAgIHJldHVybiBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5O1xyXG59XSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXoubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkT3V0Jywge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXCJncmFudF90eXBlPXBhc3N3b3JkJnVzZXJuYW1lPVwiICtcclxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YS51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgbG9naW5EYXRhLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS50b2tlblBhdGgsIGRhdGEsIHsgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sIHVzZXJOYW1lOiBsb2dpbkRhdGEudXNlck5hbWUsIGV4cGlyZXM6IHJlc3BvbnNlLmRhdGEuZXhwaXJlc19pbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gbG9naW5EYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZEluJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGl6LnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEF1dGhEYXRhID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGF1dGhEYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBhdXRoZW50aWNhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVzc2FnZVNlcnZpY2UodG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGl6LmhhbmRsZVJlamVjdCA9IGhhbmRsZVJlamVjdDtcclxuICAgICAgICB0aGl6LmhhbmRsZVN1Y2NlcyA9IGhhbmRsZVN1Y2NlcztcclxuICAgICAgICB0aGl6LmhhbmRsZVdhcm5pbmcgPSBoYW5kbGVXYXJuaW5nO1xyXG4gICAgICAgIHRoaXouaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UsICdGb3V0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3VjY2VzKHRleHQsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVdhcm5pbmcodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcodGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ21lc3NhZ2VTZXJ2aWNlJywgbWVzc2FnZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzY2hvb2x5ZWFyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcbiAgICAgICAgLy90ZXN0Z3VscFxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LmdldFNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdnZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5nZXRGdXR1cmVTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpei5nZXRTY2hvb2xZZWFycygpLnRoZW4oZnVuY3Rpb24oYWxsU2Nob29sWWVhcnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TW9udGggPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE1vbnRoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyID0gY3VycmVudFllYXIgLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihhbGxTY2hvb2xZZWFycywgZnVuY3Rpb24gKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2Nob29seWVhci5zdGFydFllYXIgPj0gY3VycmVudFllYXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2Nob29seWVhclNlcnZpY2UnLCBzY2hvb2x5ZWFyU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc2Nob29seWVhcicpKTsgIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnRlc3QgPSBcIkhlbGxvIHdvcmxkXCI7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJywgY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBzdHVkeVBsYW5TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc3R1ZHlQbGFuU2VydmljZScsIHN0dWR5UGxhblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyJywgbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSwgc3R1ZHlwbGFucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkU3R1ZHlwbGFuID0gZnVuY3Rpb24gKHN0dWR5cGxhbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkU3R1ZHlwbGFuID0gc3R1ZHlwbGFuO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIG5vZyBjaGVja2VuIG9wIGdlZW4gcmVzdWx0YWF0IGdlc2VsZWN0ZWVyZFxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuc2VsZWN0ZWRTdHVkeXBsYW4pO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKFwiY2FuY2VsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc3R1ZHlwbGFucyA9IHN0dWR5cGxhbnM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHN0dWR5cGxhbnMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyJywgc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlYWNoZXJTZXJ2aWNlLCB0ZWFjaGVyLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZENvdXJzZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kPXt9O1xyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9IHRlYWNoZXIuaWQ7IFxyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLmNvdXJzZUlkPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQgO1xyXG5cclxuICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ291cnNlKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLnRlYWNoZXIgPSB0ZWFjaGVyO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0ZWFjaGVyKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXInLCBhZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIHRlYWNoZXJTZXJ2aWNlLCAkdWliTW9kYWwsIHRlYWNoZXJzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkVGVhY2hlciA9IGZ1bmN0aW9uICh0ZWFjaGVyLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9wZW5Db3Vyc2VzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1RlYWNoZXIvdmlld3MvYWRkQ291cnNlTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVhY2hlcjtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkNsYXNzTW9kYWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9zZWxlY3RDbGFzc2VzTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmF2YWlsYWJsZUNsYXNzZXNGb3JUZWFjaGVyKCRzY29wZS5zZWxlY3RlZFRlYWNoZXIuaWQpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQgPSB7fTtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC50ZWFjaGVySWQgPSAkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkO1xyXG4gICAgICAgICAgICAgICAgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kLmNsYXNzSWQgPSBzZWxlY3RlZENsYXNzLmlkO1xyXG5cclxuICAgICAgICAgICAgICAgIHRlYWNoZXJTZXJ2aWNlLmFkZENsYXNzKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBzdWNjZXMgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSxmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9lcnJvciB0b2FzdGVyXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vdGVhY2hlclNlcnZpY2UuZ2V0QWNjb3VudHMoKS50aGVuKGZ1bmN0aW9uIChhY2NvdW50cykge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUuYWNjb3VudExpc3QgPSBhY2NvdW50cztcclxuICAgICAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVycyA9IHRlYWNoZXJzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudGVhY2hlcnMpO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJywgbWFuYWdlVGVhY2hlckNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHRlYWNoZXJTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVBhdGggPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50cycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDb3Vyc2UgPSBmdW5jdGlvbihhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJy90ZWFjaGVyL2FkZENvdXJzZScsIGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5nZXRUZWFjaGVycyA9IGZ1bmN0aW9uKCkgeyAvLyB1c2UgcXVlcnkgb2JqZWN0IGluIGZ1dHVyZSBjaGFuZ2UgbWV0aG9kIHRvIHBvc3QgdGhlbiBwcm9iYWJseVxyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VQYXRoICsgJy90ZWFjaGVyL3RlYWNoZXJzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmFkZENsYXNzID0gZnVuY3Rpb24oYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VQYXRoICsgJy90ZWFjaGVyL2FkZENsYXNzJywgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgndGVhY2hlclNlcnZpY2UnLCB0ZWFjaGVyU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAudGVhY2hlcicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgdG9hc3RyLCBpdGVtcywgY29udGVudCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkSXRlbSA9IGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRJdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmluZm8oJ1NlbGVjdGVlciBlZW4gaXRlbSB1aXQgZGUgbGlqc3Qgb20gdmVyZGVyIHRlIGt1bm5lbiBnYWFuLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkSXRlbSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY29udGVudCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyJywgc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCB0b2FzdHIsIGl0ZW1zLCBjb250ZW50KSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgICRzY29wZS5pdGVtRmlsdGVyID0ge307XHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW107XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICB2YXIgZ2V0U2VsZWN0ZWRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKCRzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhckZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cygkc2NvcGUuaXRlbUZpbHRlcik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLml0ZW1GaWx0ZXJba2V5c1tpXV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlbGVjdGVkRmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvKlNldCB0aGUgY2hlY2tib3ggdG8gbm8gdmFsdWUgaW5zdGVhZCBvZiBmYWxzZSB3aGVuIGNoZWNrZWQuKi9cclxuICAgICAgICAgICAgaWYgKCRzY29wZS5pdGVtRmlsdGVyLnNlbGVjdGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLml0ZW1GaWx0ZXIuc2VsZWN0ZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhckZpbHRlcigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbUZpbHRlci5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJdGVtcyA9IGdldFNlbGVjdGVkSXRlbXMoKTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoc2VsZWN0ZWRJdGVtcykgfHwgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuaW5mbygnU2VsZWN0ZWVyIG1pbnN0ZW5zIMOpw6luIGl0ZW0gdWl0IGRlIGxpanN0IG9tIHZlcmRlciB0ZSBrdW5uZW4gZ2Fhbi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgJHNjb3BlLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXInLCBzZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxlbmRhckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGRhc2hib2FyZFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRFdmFsdWF0aW9uID0gZnVuY3Rpb24oZXZhbHVhdGlvbiwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zdGFydEV2YWx1YXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvZXZhbHVhdGlvbi9cIiArICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uYnVuZGxlSWQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLnBsYW5uZWRFdmFsdWF0aW9ucygpLnRoZW4oZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5wbGFubmVkRXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NhbGVuZGFyQ29udHJvbGxlcicsIGNhbGVuZGFyQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
