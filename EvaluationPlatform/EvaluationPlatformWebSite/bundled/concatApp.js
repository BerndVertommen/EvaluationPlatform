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
           .when('/searchEvaluationForClass', {
               templateUrl: 'app/evaluation/views/searchEvaluationForClass.html',
               controller: 'searchEvaluationForClassController',
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

        $routeProvider
          .when('/searchEvaluationsForStudent', {
              templateUrl: 'app/evaluation/views/searchEvaluationsForStudent.html',
              controller: 'searchEvaluationsForStudentController',
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
(function (module) {

    accountService.$inject = ["$http", "configurationService"];
    function accountService($http, configurationService) {
        var thiz = this;
        var basePath = configurationService.baseApiPath;

        thiz.getAccounts = function () {
            return $http.get(basePath + 'accounts/getAccounts').then(function (result) {
                return result.data;
            });
        }

        //nieuwe methode om account te creeeren aangemaakt
        thiz.createAccount = function (createAccountInfo) {
            return $http.post(basePath + 'accounts/createAccount', createAccountInfo).then(function (result) {
                return result.data;
            });
        }

        thiz.getAccountInfo = function(username) {
            return $http.get(basePath + 'accounts/getAccount/'+ username ).then(function(result) {
                return result.data;
            });
        }
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

    manageClassesController.$inject = ["$scope", "classesService", "courseService", "messageService", "schoolyearService", "toastr", "$location", "allClasses", "selectModalService"];
    function manageClassesController($scope, classesService,courseService, messageService, schoolyearService, toastr, $location, allClasses, selectModalService) {
        var thiz = this;
       
        //Variables
        var allCourses = null;
        //private Functions
        
        // public functions
        //$scope.setSelectedSchoolYear = function(schoolyear) {
        //    $scope.selectedSchoolYear = schoolyear;
        //}
        $scope.fileUpdated = function($files, $event) {
            $scope.file = $event.target.files[0];
        };

        $scope.uploadCsv = function() {
            classesService.uploadClassCsv($scope.file, $scope.selectedSchoolYear).then(function (parameters) {
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

        $scope.addCourse = function () {
                selectModalService.openModal('selectCoursesModal', allCourses).then(function (result) {
                    classesService.addCourses($scope.selectedClass.id, result).then(function() {
                        messageService.handleSucces("De vakken zijn toegevoegd.");
                    });
                });       
        }

        //initiations
        var init = function () {
          schoolyearService.getFutureSchoolYears().then(function (schoolyears) {
              $scope.schoolYears = schoolyears;
              $scope.selectedSchoolYear = schoolyears[0];
          });

          courseService.allCourses().then(function (courses) {             
              allCourses = courses;
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
              // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
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

        thiz.addCourses = function(classId, courses) {
            return $http.post(baseWebApiUrl + "class/" + classId + "/addCourse", courses).then(function(result) {
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

        thiz.converToUtc = function (time) {
            var offset = new Date().getTimezoneOffset();
            time.setMinutes(time.getMinutes() - offset);
            return time;
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

    createCourseController.$inject = ["$scope", "$location", "courseService", "$uibModal", "studyPlanService", "messageService", "schoolyearService"];
    function createCourseController($scope, $location, courseService, $uibModal, studyPlanService, messageService, schoolyearService) {
        var thiz = this;

        $scope.createCourseInfo = {};
        $scope.studyplans = [];

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

            studyPlanService.getStudyPlans().then(function(result) {
                $scope.studyplans = result;
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
            template: "<a class='btn btn-default' ><i class='fa fa-search'></i></a>",
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
               modalName: "selectTeacherModal", template: "app/customDirectives/selectModalDirective/teacher/selectTeacherModal.html", controller: "selectItemModalController",
               content: { title: "Leerkrachten", itemDescription: "Selecteer een leerkracht" }
           },

           /*selectTeachersModalSetting  => multiple teachers*/
           {
               modalName: "selectTeachersModal", template: "app/customDirectives/selectModalDirective/teacher/selectTeachersModal.html", controller: "selectItemsModalController",
               content: { title: "Leerkrachten", itemDescription: "Selecteer leerkrachten" }
           },
             /*selectStudyplanModalSetting*/
           {
               modalName: "selectStudyplanModal", template: "app/customDirectives/selectModalDirective/studyplan/selectStudyplanModal.html", controller: "selectItemModalController",
               content: { title: "Leerplannen", itemDescription: "Selecteer een leerplan" }
           },
           //selectCoursesModal
            {
                modalName: "selectCoursesModal", template: "app/customDirectives/selectModalDirective/courses/selectCoursesModal.html", controller: "selectItemsModalController",
                content: { title: "Cursussen", itemDescription: "Selecteer cursussen" }
            }
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
            template: '<label for="schoolyearSelector" class="control-label">Schooljaar:</label><div id="schoolyearSelector" class="btn btn-default" uib-dropdown uib-dropdown-toggle><a class="btn-default" >{{selected.notation}} <i class="fa fa-caret-down"></i></a><ul uib-dropdown-menu role="menu" aria-labelledby="single-button"><li ng-repeat="schoolyear in schoolyears | orderBy:\'startYear\'"role="menuitem" ng-click="setSelectedSchoolYear(schoolyear)"><a>{{schoolyear.notation}}</a></li></ul></div>',
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
            evaluationItem.notScoredReason = 0;

            thiz.actionTaken();
        };

        $scope.updateEvaluation = function () {
            evaluationService.updateEvaluation($scope.selectedEvaluation).then(function (evaluation) {
                var indexEva = _.findIndex($scope.evaluations, function (eva) {
                    return eva.id === evaluation.id;
                });

                $scope.selectedEvaluation.unsaved = false;

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

                angular.forEach($scope.evaluations, function(evaluation) {
                    evaluations.unsaved = false;
                });
                thiz.updateAfterChange();
            });
        };

        $scope.setNotScoredReason = function(evaluationitem, number) {
            evaluationitem.notScoredReason = number;
            evaluationitem.score = null;

            thiz.actionTaken();
        };

        $scope.unLock = function (selectedEvaluation) {
            // do server side logic
            console.log("Unlocking selected evaluation");

            evaluationService.unlockEditable(selectedEvaluation.id).then(function (parameters) {
                selectedEvaluation.editAbleState.canEdit = true;
            });
        }

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
        thiz.actionTaken = function () {
            $scope.selectedEvaluation.unsaved = true;
        };

        $scope.anyUnsavedEvaluations = function () {
            return $scope.evaluations.some(function (evaluation) {
                return evaluation.unsaved === true;
            });
        };
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
(function (module) {
    'use strict';

    searchEvaluationForClassController.$inject = ["$scope", "$location", "courses", "classes", "evaluationService", "$uibModal", "$compile", "$timeout", "$templateCache"];
    function searchEvaluationForClassController($scope, $location, courses, classes, evaluationService, $uibModal, $compile, $timeout, $templateCache) {
        var thiz = this;
       
        //Variables
        $scope.queryObject = {};

        
        // public functions
        $scope.setClass = function(klas) {
            $scope.selectedClass = klas;
            $scope.queryObject.classId = $scope.selectedClass.id;
        };

        $scope.setCourse = function (course) {
            $scope.selectedCourse = course;
            $scope.queryObject.courseId = $scope.selectedCourse.id;
        };

        $scope.clearSearch = function () {
            $scope.queryObject.startDate = null;
            $scope.queryObject.endDate = null;
            $scope.queryObject.classId = null;
            $scope.queryObject.courseId = null;
            $scope.queryObject.description = null;
            $scope.selectedClass = null;
            $scope.selectedCourse = null;

            $scope.showpagination = false;
        };

        $scope.search = function () {
            var queryObjectIsValid = evaluationService.validateEvaluationTotalsForClassOverViewQueryDto($scope.queryObject);

            if (queryObjectIsValid === false) {
                return;
            }

            evaluationService.searchEvaluationForClassTotalOverviews($scope.queryObject).then(function (result) {
                $scope.tableParams = evaluationService.transformEvaluationForClassOverviewsToTableParams(result);
                console.log(result);
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

        //$scope.toPdf = function () {
        //    //$templateCache.put('tableHtml', $("#overviewTable").html());
        //    //var contents = $compile($templateCache.get('tableHtml'))($scope);
        //    //$timeout(function () {
        //    //    console.log(contents.html());
        //    //}, 300);   // wait for a short while

        //    var contents = $("#overviewTable").html();
        //    console.log(contents);
        //}

        //initiations
        var init = function () {
            $scope.courses = courses;
            $scope.classes = classes;

            $scope.clearSearch();
        }

        init();
    }

    module.controller('searchEvaluationForClassController', searchEvaluationForClassController);
})(angular.module('app.evaluation'));
(function (module) {
    'use strict';

    searchEvaluationsForStudentController.$inject = ["$scope", "$location", "courses", "classes", "evaluationService", "$uibModal"];
    function searchEvaluationsForStudentController($scope, $location, courses, classes, evaluationService, $uibModal) {
        var thiz = this;
       
        //Variables
        $scope.evaluationsPagedQueryObject = {};
        $scope.evaluations = [];

        
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

    module.controller('searchEvaluationsForStudentController', searchEvaluationsForStudentController);
})(angular.module('app.evaluation'));
(function (module) {

    evaluationService.$inject = ["$http", "configurationService", "messageService", "$filter", "$q"];
    function evaluationService($http, configurationService, messageService, $filter, $q) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        //Variables

        //private Functions

        // public functions

        thiz.evaluationsForBundle = function (bundleId) {
            return $http.post(baseWebApiUrl + 'evaluation/evaluationsForBundle', { 'id': bundleId }).then(function (result) {
                return result.data;
            });
        };

        thiz.updateEvaluation = function (evaluation) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluation', evaluation).then(function (result) {
                return result.data;
            });
        };


        thiz.updateEvaluations = function (evaluations) {
            return $http.post(baseWebApiUrl + 'evaluation/updateEvaluations', evaluations).then(function (result) {
                return result.data;
            });
        };

        thiz.searchEvaluations = function (pdfForEvaluationsQueryDto) {
            return $http.post(baseWebApiUrl + 'evaluation/searchEvaluations', pdfForEvaluationsQueryDto).then(function (result) {
                return result.data;
            });
        };

        thiz.searchEvaluationForClassTotalOverviews = function (queryDto) {
            return $http.post(baseWebApiUrl + 'evaluation/searchEvaluationForClassTotalOverviews', queryDto).then(function (result) {
                return result.data;
            });
        };

        thiz.createPdfForEvaluations = function (evaluationsPagedQueryObject) {
            return $http.post(baseWebApiUrl + 'evaluation/createPdfForEvaluations', evaluationsPagedQueryObject, { responseType: 'arraybuffer' }).then(function (result) {
                return configurationService.handlePdfData(result.data).then(function (data) {
                    return data;
                });
            });
        };

        thiz.createPdfForEvaluation = function (evaluation) {
            var pdfForEvaluationsQueryObject = {};
            pdfForEvaluationsQueryObject.EvaluationIds = [evaluation.id];

            return thiz.createPdfForEvaluations(pdfForEvaluationsQueryObject);
        };

        thiz.plannedEvaluations = function () {
            return $http.get(baseWebApiUrl + "evaluation/plannedEvaluations").then(function (result) {
                console.log("Planned Evaluations");
                console.log(result.data);
                return result.data;
            });
        };

        thiz.transformEvaluationForClassOverviewsToTableParams = function (overviews) {
            if (overviews == null || overviews.length < 1) {
                messageService.handleWarning('Geen evaluaties gevonden');
                return;
            }

            var tableParams = {};
            tableParams.allEvaluations = overviews;
            tableParams.resultsForStudents = [];

            // loop over all the studens form the class
            _.each(overviews[0].createdForClass.students, function (student) {
                var resultForStudent = { 'student': student, 'totals': [] }

                //find a result for the student form the overview. Fill up non matching with alternative data.
                _.each(overviews, function (overview) {
                    var total = { 'total': '', 'generalComment': '' };
                    var evaSum = _.find(overview.evalutionSummaries, function (summary) {
                        return summary.student.id === student.id;
                    });

                    if (evaSum != null) {
                        total.total = evaSum.result != null ? $filter('number')(evaSum.result.total, 2) : '';
                        total.generalComment = evaSum.generalComment  != null ? evaSum.generalComment : '';
                    } else {
                        total.total = '';
                        total.generalComment = "Niet ingevuld";
                    }

                    resultForStudent.totals.push(total);
                });

                tableParams.resultsForStudents.push(resultForStudent);
            });

            return tableParams;
        }

        thiz.validateEvaluationTotalsForClassOverViewQueryDto = function (querDto) {
            if (angular.isUndefined(querDto.classId) || querDto.classId == null) {
                messageService.handleWarning('Je moet een klas selecteren om te kunnen zoeken.');
                return false;
            }
            if (angular.isUndefined(querDto.courseId) || querDto.courseId == null) {
                messageService.handleWarning('Je moet een vak selecteren om te kunnen zoeken.');

                return false;
            }

            return true;
        };

        thiz.unlockEditable = function(evaluationId) {
            var guidDto = { 'id': evaluationId };

            return $http.post(baseWebApiUrl + 'evaluation/unlockEvaluation', guidDto).then(function (result) {
                    return result.data;
            });
        };

        //initiations
        var init = function () {

        }

        init();

        // calculation functions
        thiz.mapSubsectionToEvaluation = function (evaluation) {
            var differentSubsections = _.groupBy(evaluation.evaluationItems, function (item) {
                return item.evaluationSubSection.description;
            });
            differentSubsections = _.sortBy(differentSubsections, function (sub) {
                return sub[0].evaluationSubSection.sequenceNumber;
            });
            evaluation.mappedSubsections = differentSubsections;

            thiz.setSubsectionScores(evaluation);
        };

        /*Maps subsections to evaluationitems*/
        thiz.mapItemsToSubSection = function (evaluations) {

            angular.forEach(evaluations, function (evaluation) {
                thiz.mapSubsectionToEvaluation(evaluation);
            });

            //_.each(evaluations, function (evaluation) {
            //        thiz.mapSubsectionToEvaluation(evaluation);
            //});

            return evaluations;
        };

        /*Use this to map the scores to the mapped subsections of a evaluation*/
        thiz.setSubsectionScores = function (evaluation) {
            //// var value = object[key] => use dictionary from c# this way
            _.each(evaluation.mappedSubsections, function (subsection) {
                if (angular.isDefined(evaluation.result) && evaluation.result !== null) {
                    subsection.totalScore = evaluation.result.totalsPercategory[subsection[0].evaluationSubSection.id];
                    console.log("subsection");
                    console.log(subsection);

                    var completlyUnscored = _.every(subsection, function (evaluationItem) {
                        return angular.isUndefined(evaluationItem.score) || evaluationItem.score == null;
                    });
                    if (completlyUnscored === true) {
                        subsection.unScored = true;
                    }
                }
            });
            // map every evaluation not just selected so it can be procesed in int()
        };

    }

    module.service('evaluationService', evaluationService);
})(angular.module('app.evaluation'));
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
       

        //initiations
        var init = function() {

        }

        init();

    }

    module.service('dashboardService', dashboardService);
})(angular.module('app.dashboard'));

(function (module) {
    'use strict';

    createEvaluationsFromTemplateModalController.$inject = ["$scope", "configurationService", "$uibModalInstance", "evaluationTemplateService", "evaluationTemplate", "classesForCourse"];
    function createEvaluationsFromTemplateModalController($scope,configurationService, $uibModalInstance,evaluationTemplateService, evaluationTemplate, classesForCourse) {
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
          $scope.createCommand.evaluationDate = configurationService.converToUtc($scope.createCommand.evaluationDate);
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
        $scope.sequenceNumber = function() {
            var lastIndex = $scope.evaluationTemplate.evaluationSubSections.length - 1;
            if (lastIndex > -1) {
                return $scope.evaluationTemplate.evaluationSubSections[lastIndex].sequenceNumber;
            }
            return 0;
        }

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
                    },
                    sequenceNumber: function() {
                        return $scope.sequenceNumber();
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

    evaluationTemplatesController.$inject = ["$scope", "$location", "evaluationTemplates", "$uibModal", "classesService", "evaluationTemplateService", "messageService"];
    function evaluationTemplatesController($scope, $location, evaluationTemplates, $uibModal, classesService, evaluationTemplateService, messageService) {
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

                evaluationTemplateService.hideSelectedTemplates(templatesToHide).then(function() {
                    _.each(templatesToHide, function(template) {
                        template.hide = true;
                    });
                });
            } else {
                messageService.handleWarning("Er werden geen sjablonen verborgen.", "Geen selectie");
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

        $scope.clearFilter = function () {
            var keys = Object.keys($scope.goalFilter);
            for (var i = 0; i < keys.length; i++) {
                $scope.goalFilter[keys[i]] = undefined;
            }
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

    evaluationTemplateSubSectionModalController.$inject = ["$scope", "$uibModalInstance", "evaluationSubSections", "currentTotalWeight", "course", "subSection", "sequenceNumber"];
    function evaluationTemplateSubSectionModalController($scope, $uibModalInstance, evaluationSubSections, currentTotalWeight, course, subSection, sequenceNumber) {
        var thiz = this;

        //Variables
      
      
        //private Functions

        // public functions
       
        thiz.addnewEvaluationSubSection = function () {
            $scope.newEvaluationSubSection.sequenceNumber = sequenceNumber +1;
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

    indexController.$inject = ["$scope", "$location", "authenticationService", "accountService", "$rootScope"];
    function indexController($scope, $location, authenticationService, accountService, $rootScope) {
        var thiz = this;
        $scope.loggedIn = authenticationService.isAuth;

        $scope.isCollapsed = true;
       
        //Variables

        //private Functions
        
        // public functions

        $scope.collapseMe = function(redirectTo) {
            $scope.isCollapsed = true;
            $location.path(redirectTo);
        }
       
        $scope.logOut = function() {
            authenticationService.logOut();
        };

        var handleMenus = function() {
            accountService.getAccountInfo($scope.userName).then(function (result) {
                if (result.isAdministrator === true) {
                    $scope.adminMenuInvisible = false;
                }
            });
        }

        //initiations
        var init = function () {
           
            var userName = authenticationService.userName;
            var adminMenuInvisible = true;

            var usernameIsKnown = function() {
                return angular.isDefined(authenticationService.userName) && authenticationService.userName !== "";
            }

            if (authenticationService.isAuth && authenticationService.userName !== usernameIsKnown()) {
                $scope.userName = userName;
                handleMenus();
            }

            $scope.isCollapsed = true;
            $scope.adminMenuInvisible = adminMenuInvisible;

        };

        $rootScope.$on('userLoggedIn', function (event, data) {
            $scope.userName = data.userName;
            $scope.loggedIn = authenticationService.isAuth;
            handleMenus();

        });
        
        $rootScope.$on('userLoggedOut', function (event, data) {
            $scope.userName = undefined;
            $scope.loggedIn = false;
            $scope.adminMenuInvisible = true;

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
(function (module) {
    'use strict';

    manageStudyPlanController.$inject = ["$scope", "studyPlanService", "selectModalService"];
    function manageStudyPlanController($scope, studyPlanService, selectModalService) {
        var thiz = this;

        $scope.studyplans = [];
        $scope.selectedStudyPlan = {};
        //Variables

        //private Functions
        
        // public functions
        $scope.createNewStudyPlan = function() {
            $scope.selectedStudyPlan = {};
        }

        $scope.getStudyPlanInfo = function() {
            selectModalService.openModal("selectStudyplanModal", $scope.studyplans).then(function(studyPlanSummary) {
                studyPlanService.getStudyPlanInfo(studyPlanSummary.id).then(function(studyPlan) {
                    $scope.selectedStudyPlan = studyPlan;
                });
            });
        }

        //initiations
        var init = function () {
            studyPlanService.getStudyPlans().then(function (result) {
                $scope.studyplans = result;
            });
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

        thiz.getStudyPlanInfo = function (studyPlanId) {
            var guidDto = { 'id': studyPlanId };
            return $http.post(baseWebApiUrl + "/studyPlans/getStudyPlanInfo", guidDto ).then(function (result) {
                return result.data;
            });
        }

    }

    module.service('studyPlanService', studyPlanService);
})(angular.module('app.studyPlan'));
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
                teacher.courses.push($scope.selectedCourse); // dirty
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

            console.log("selectItemModal's items:");
            console.log($scope.items);
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

    calendarController.$inject = ["$scope", "$location", "evaluationService"];
    function calendarController($scope, $location, evaluationService) {
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
            evaluationService.plannedEvaluations().then(function (evaluations) {
                $scope.plannedEvaluations = evaluations;
            });
        }

        init();

    }
    module.controller('calendarController', calendarController);
})(angular.module('app.dashboard'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJjdXN0b21EaXJlY3RpdmVzL2N1c3RvbURpcmVjdGl2ZXMtbW9kdWxlLmpzIiwiZXZhbHVhdGlvbi9ldmFsdWF0aW9uLW1vZHVsZS5qcyIsImRhc2hib2FyZC9kYXNoYm9hcmQtbW9kdWxlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2V2YWx1YXRpb25UZW1wbGF0ZS1tb2R1bGUuanMiLCJob21lL2hvbWUtbW9kdWxlLmpzIiwiSW5kZXgvaW5kZXgtbW9kdWxlLmpzIiwibG9naW4vbG9naW4tbW9kdWxlLmpzIiwic2Nob29seWVhci9zY2hvb2x5ZWFyLW1vZHVsZS5qcyIsIlN0dWRlbnQvc3R1ZGVudC1tb2R1bGUuanMiLCJTdHVkeVBsYW4vc3R1ZHlQbGFuLW1vZHVsZS5qcyIsIlRlYWNoZXIvdGVhY2hlci1tb2R1bGUuanMiLCJtZXNzYWdlL21lc3NhZ2VDb25maWcuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL21hbmFnZUFjY291bnRDb250cm9sbGVyLmpzIiwiQWNjb3VudC9zZXJ2aWNlcy9hY2NvdW50U2VydmljZS5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvY2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NyZWF0ZUNsYXNzQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy90ZXN0Q2xhc3NDdHJsLmpzIiwiY2xhc3Nlcy9zZXJ2aWNlcy9jbGFzc2VzU2VydmljZS5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jcmVhdGVDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL21hbmFnZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvc2VsZWN0TW9kYWxEaXJlY3RpdmUuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlbGVjdE1vZGFsU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0U2Nob29seWVhckRpcmVjdGl2ZS9zZWxlY3RTY2hvb2x5ZWFyRGlyZWN0aXZlLmpzIiwiZXZhbHVhdGlvbi9jb250cm9sbGVycy9ldmFsdWF0aW9uQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Q29udHJvbGxlci5qcyIsImV2YWx1YXRpb24vc2VydmljZXMvZXZhbHVhdGlvblNlcnZpY2UuanMiLCJkYXNoYm9hcmQvY29udHJvbGxlcnMvZGFzaGJvYXJkQ29udHJvbGxlci5qcyIsImRhc2hib2FyZC9zZXJ2aWNlcy9kYXNoYm9hcmRTZXJ2aWNlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUN0cmwuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL3NlcnZpY2VzL2V2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuanMiLCJob21lL2NvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiSW5kZXgvY29udHJvbGxlcnMvaW5kZXhDdHJsLmpzIiwiSW5kZXgvc2VydmljZXMvaW5kZXhTZXJ2aWNlLmpzIiwibG9naW4vY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwibG9naW4vZmFjdG9yaWVzL2F1dGhJbnRlcmNlcHRvckZhY3RvcnkuanMiLCJsb2dpbi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvblNlcnZpY2UuanMiLCJtZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwic2Nob29seWVhci9zZXJ2aWNlcy9zY2hvb2x5ZWFyU2VydmljZS5qcyIsIlN0dWRlbnQvc2VydmljZXMvc3R1ZGVudFNlcnZpY2UuanMiLCJTdHVkZW50L2NvbnRyb2xsZXJzL2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIuanMiLCJTdHVkeVBsYW4vY29udHJvbGxlcnMvc2VsZWN0U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL3NlcnZpY2VzL3N0dWR5UGxhblNlcnZpY2UuanMiLCJUZWFjaGVyL3NlcnZpY2VzL3RlYWNoZXJTZXJ2aWNlLmpzIiwiVGVhY2hlci9jb250cm9sbGVycy9hZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL21hbmFnZVRlYWNoZXJDb250cm9sbGVyLmpzIiwiY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9nZW5lcmFsQ29udHJvbGxlcnMvc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlci5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvZ2VuZXJhbENvbnRyb2xsZXJzL3NlbGVjdEl0ZW1zTW9kYWxDb250cm9sbGVyLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL3BhcnRpYWxzL2NhbGVuZGFyQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLE1BQU0sUUFBUSxPQUFPO0lBQ3JCLENBQUMsV0FBVyxVQUFVLGFBQWEsZ0JBQWdCLHNCQUFzQix1QkFBdUIsV0FBVztNQUN6Ryx3QkFBd0IsWUFBWSxlQUFlLGFBQWEsZUFBZSxhQUFhLGVBQWUsMEJBQTBCLGtCQUFrQjtNQUN2SixlQUFlLGNBQWMsaUJBQWlCOzs7QUFHcEQ7QUNOQSxRQUFRLE9BQU8sZUFBZSxDQUFDO0tBQzFCLDBCQUFPLFVBQVUsZ0JBQWdCO1FBQzlCOztRQUVBO1dBQ0csS0FBSyxrQkFBa0I7Y0FDcEIsYUFBYTtjQUNiLFlBQVk7Ozs7Ozs7O0FBUTFCO0FDZkE7QUFDQSxRQUFRLE9BQU8sZUFBZSxDQUFDO0tBQzFCLDBCQUFPLFNBQVMsZ0JBQWdCO1FBQzdCOztRQUVBO2FBQ0ssS0FBSyxZQUFZO2dCQUNkLGFBQWE7Z0JBQ2IsWUFBWTtnQkFDWixTQUFTOztvQkFFTCw0QkFBUyxTQUFTLGdCQUFn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QUFLO2dCQUNaOzs7WUFHSixrQkFBa0IsTUFBTTs7O1FBRzVCLE9BQU8sU0FBUyxZQUFZO1lBQ3hCLGtCQUFrQixRQUFROzs7Ozs7UUFNOUIsSUFBSSxPQUFPLFlBQVk7WUFDbkIsT0FBTyxRQUFRO1lBQ2YsT0FBTyxVQUFVOzs7O1FBSXJCOzs7SUFHSixPQUFPLFdBQVcsOEJBQThCO0dBQ2pELFFBQVEsT0FBTztBQUNsQjtBQ3BGQSxDQUFDLFVBQVUsUUFBUTtJQUNmOzs7SUFFQSxTQUFTLG1CQUFtQixRQUFRLFdBQVcsbUJBQW1CO1FBQzlELElBQUksT0FBTzs7Ozs7Ozs7UUFRWCxPQUFPLGNBQWM7O1FBRXJCLE9BQU8sd0JBQXdCLFNBQVMsWUFBWSxPQUFPO1lBQ3ZELE9BQU8scUJBQXFCO1lBQzVCLE9BQU8sY0FBYzs7O1FBR3pCLE9BQU8sa0JBQWtCLFdBQVc7WUFDaEMsVUFBVSxLQUFLLGlCQUFpQixPQUFPLG1CQUFtQjs7OztRQUk5RCxJQUFJLE9BQU8sV0FBVztZQUNsQixrQkFBa0IscUJBQXFCLEtBQUssVUFBVSxhQUFhO2dCQUMvRCxPQUFPLHFCQUFxQjs7OztRQUlwQzs7O0lBR0osT0FBTyxXQUFXLHNCQUFzQjtHQUN6QyxRQUFRLE9BQU8sa0JBQWtCIiwiZmlsZSI6ImNvbmNhdEFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcclxuICAgIFsnbmdSb3V0ZScsICd0b2FzdHInLCAnbmdBbmltYXRlJywgXCJ1aS5ib290c3RyYXBcIiwgJ0xvY2FsU3RvcmFnZU1vZHVsZScsICdhbmd1bGFyLWxvYWRpbmctYmFyJywgJ25nVG91Y2gnLCAnbmdGaWxlVXBsb2FkJ1xyXG4gICAgLCAnYXBwLmN1c3RvbURpcmVjdGl2ZXMnLCAnYXBwLmhvbWUnLCAnYXBwLmNsYXNzZXMnLCAnYXBwLmxvZ2luJywgJ2FwcC5hY2NvdW50JywgJ2FwcC5pbmRleCcsICdhcHAuc3R1ZGVudCcsICdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJywgJ2FwcC5ldmFsdWF0aW9uJywgJ2FwcC5kYXNoYm9hcmQnXHJcbiAgICAsICdhcHAudGVhY2hlcicsICdhcHAuY291cnNlJywgJ2FwcC5zdHVkeVBsYW4nLCAnYXBwLnNjaG9vbHllYXInXSlcclxuXHJcblxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL21hbmFnZUFjY291bnQnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9tYW5hZ2VBY2NvdW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcidcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICBcclxuXHJcblxyXG4gICAgfSk7XHJcbiIsIlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvY2xhc3NlcycsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3MvY2xhc3Nlcy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjbGFzc2VzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24oY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbihjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQ2xhc3NlcycsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL21hbmFnZUNsYXNzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUNsYXNzZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIGFsbENsYXNzZXM6IGZ1bmN0aW9uKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuYWxsQ2xhc3NlcygpLnRoZW4oZnVuY3Rpb24gKGFsbENsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxsQ2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy9jcmVhdGVDbGFzcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9jcmVhdGVDbGFzcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUNsYXNzQ29udHJvbGxlcidcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7IiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9tYW5hZ2VDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUNvdXJzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgLndoZW4oJy9jb3Vyc2VzJywge1xyXG4gICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NvdXJzZXMuaHRtbCcsXHJcbiAgICAgICAgICAgICBjb250cm9sbGVyOiAnY291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbignL2NyZWF0ZUNvdXJzZScsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL0NvdXJzZS92aWV3cy9jcmVhdGVDb3Vyc2UuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ291cnNlQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9uLzpidW5kbGVJZD8nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb24uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblNlcnZpY2UsICRyb3V0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVuZGxlSWQgPSAkcm91dGUuY3VycmVudC5wYXJhbXMuYnVuZGxlSWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9uU2VydmljZS5ldmFsdWF0aW9uc0ZvckJ1bmRsZShidW5kbGVJZCkudGhlbihmdW5jdGlvbiAoZXZhbHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAud2hlbignL3NlYXJjaEV2YWx1YXRpb25Gb3JDbGFzcycsIHtcclxuICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9zZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3MuaHRtbCcsXHJcbiAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3NDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgIGNvdXJzZXM6IGZ1bmN0aW9uIChjb3Vyc2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3Mvc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Lmh0bWwnLFxyXG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzZWFyY2hFdmFsdWF0aW9uc0ZvclN0dWRlbnRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbiAoY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yVGVhY2hlcigpLnRoZW4oZnVuY3Rpb24gKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZVNlcnZpY2UuZ2V0Q291cnNlcygpLnRoZW4oZnVuY3Rpb24gKGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlcztcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMoKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvZXZhbHVhdGlvblRlbXBsYXRlcycsIHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlczogZnVuY3Rpb24gKGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oICcvJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLndoZW4oJy9ob21lJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvaG9tZS92aWV3cy9ob21lLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub3RoZXJ3aXNlKHtcclxuICAgICAgICAgICAgcmVkaXJlY3RUbzogJy8nXHJcbiAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuICAgICAgICBcclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgIC8vJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAvLyAgLndoZW4oJy9yZXBsYWNlJywge1xyXG4gICAgICAgIC8vICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3IEhlcmUnLFxyXG4gICAgICAgIC8vICAgICAgY29udHJvbGxlcjogJ2NvbnRyb2xsZXIgZm9yIHZpZXcgaGVyZSdcclxuICAgICAgICAvLyAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9sb2dpbi92aWV3cy9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdsb2dpbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuYXBwLnJ1bihbJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGZ1bmN0aW9uIChhdXRoZW50aWNhdGlvblNlcnZpY2UpIHtcclxuICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5nZXRBdXRoRGF0YSgpO1xyXG59XSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5Jyk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5zY2hvb2x5ZWFyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgLy8kcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vICAud2hlbignL3JlcGxhY2UnLCB7XHJcbiAgICAgICAgLy8gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXcgSGVyZScsXHJcbiAgICAgICAgLy8gICAgICBjb250cm9sbGVyOiAnY29udHJvbGxlciBmb3IgdmlldyBoZXJlJ1xyXG4gICAgICAgIC8vICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cImNvbnRyb2xsZXJzL2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyLmpzXCIgLz5cclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvY3JlYXRlU3R1ZGVudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9TdHVkZW50L3ZpZXdzL2NyZWF0ZVN0dWRlbnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZVN0dWRlbnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlU3R1ZHlQbGFuJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWR5UGxhbi92aWV3cy9tYW5hZ2VTdHVkeVBsYW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlVGVhY2hlcicsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL21hbmFnZVRlYWNoZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZVRlYWNoZXJDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRlYWNoZXJzIDogZnVuY3Rpb24odGVhY2hlclNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0ZWFjaGVyU2VydmljZS5nZXRUZWFjaGVycygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uICh0b2FzdHJDb25maWcpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRvYXN0ckNvbmZpZywge1xyXG4gICAgICAgIGF1dG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIGNvbnRhaW5lcklkOiAndG9hc3QtY29udGFpbmVyJyxcclxuICAgICAgICBtYXhPcGVuZWQ6IDEwLFxyXG4gICAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxyXG4gICAgICAgIHBvc2l0aW9uQ2xhc3M6ICd0b2FzdC1ib3R0b20tcmlnaHQnLFxyXG4gICAgICAgIHByZXZlbnREdXBsaWNhdGVzOiBmYWxzZSxcclxuICAgICAgICBwcmV2ZW50T3BlbkR1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHRhcmdldDogJ2JvZHknLFxyXG5cclxuICAgICAgICBhbGxvd0h0bWw6IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlQnV0dG9uOiBmYWxzZSxcclxuICAgICAgICBjbG9zZUh0bWw6ICc8YnV0dG9uPiZ0aW1lczs8L2J1dHRvbj4nLFxyXG4gICAgICAgIGV4dGVuZGVkVGltZU91dDogMTAwMCxcclxuICAgICAgICBpY29uQ2xhc3Nlczoge1xyXG4gICAgICAgICAgICBlcnJvcjogJ3RvYXN0LWVycm9yJyxcclxuICAgICAgICAgICAgaW5mbzogJ3RvYXN0LWluZm8nLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiAndG9hc3Qtc3VjY2VzcycsXHJcbiAgICAgICAgICAgIHdhcm5pbmc6ICd0b2FzdC13YXJuaW5nJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZUNsYXNzOiAndG9hc3QtbWVzc2FnZScsXHJcbiAgICAgICAgb25IaWRkZW46IG51bGwsXHJcbiAgICAgICAgb25TaG93bjogbnVsbCxcclxuICAgICAgICBvblRhcDogbnVsbCxcclxuICAgICAgICBwcm9ncmVzc0JhcjogZmFsc2UsXHJcbiAgICAgICAgdGFwVG9EaXNtaXNzOiB0cnVlLFxyXG4gICAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICAgICAgICB0b2FzdDogJ2RpcmVjdGl2ZXMvdG9hc3QvdG9hc3QuaHRtbCcsXHJcbiAgICAgICAgICAgIHByb2dyZXNzYmFyOiAnZGlyZWN0aXZlcy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5odG1sJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGltZU91dDogNDAwMCxcclxuICAgICAgICB0aXRsZUNsYXNzOiAndG9hc3QtdGl0bGUnLFxyXG4gICAgICAgIHRvYXN0Q2xhc3M6ICd0b2FzdCdcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5hcHAuY29uZmlnKGZ1bmN0aW9uICgkcHJvdmlkZSwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgJHByb3ZpZGUuZmFjdG9yeSgnZXJyb3JJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy92YXIgdG9hc3RyID0gJGluamVjdG9yLmdldCgndG9hc3RyJyk7XHJcbiAgICAgICAgICAgICAgICAvLyB0b2FzdHIuZXJyb3IoJ0ZvdXQnLCByZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlU2VydmljZSA9ICRpbmplY3Rvci5nZXQoJ21lc3NhZ2VTZXJ2aWNlJyk7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVJlamVjdChyZWplY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdlcnJvckludGVyY2VwdG9yJyk7XHJcbn0pOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcigkc2NvcGUsIGFjY291bnRTZXJ2aWNlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBtZXNzYWdlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRBY2NvdW50Um9sZSA9IGZ1bmN0aW9uIChyb2xlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5yb2xlVHlwZSA9IHJvbGU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyByb2VwIGhpZXIgZGUgYWNjb3VudHNlcnZpY2Ugb3Agb20gZWVuIG5pZXV3ZSBhY2NvdW50IHRlIG1ha2VuIG1ldCBkZSBkYXRhIGRpZSB2aWEgZGUgdmlldyBpcyBpbmdldnVsZC5cclxuICAgICAgICAgICAgLy8gZ2VlZiAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gbWVlIGluIGluIGRlIGFjY291bnRTZXJ2aWNlIG1ldGhvZGUuXHJcbiAgICAgICAgICAgIC8vLnRoZW4gb20gdGUgd2FjaHRlbiB0b3RkYXQgZGUgc2VydmVyIGdlYW50d29vcmQgaGVlZnRcclxuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuY3JlYXRlQWNjb3VudCgkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQWNjb3VudCBhYW5nZW1hYWt0IVwiKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpOyAvLyBnZWJydWlrIGRpdCBpbiB0aGUgLnRoZW4gZnVuY3RpZSB6b2RhdCBkZSBtb2RhbCBzbHVpdCBuYSBkZSBzZXJ2ZXJjYWxsLlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvID0ge307IC8vIGdlYnJ1aWsgZGl0IG9tIGFsbGUgaW5mbyBhYW4gdGUgaGFuZ2VuIGluIGRlIHZpZXcgKGRpdCBtb2RlbCBtb2V0IGplIHNlcnZlcnNpZGUgbm9nIG9wYm91d2VuKVxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8ucm9sZVR5cGUgPSBcIlVzZXJSb2xlXCI7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5pc1RlYWNoZXIgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyJywgY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZUFjY291bnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhY2NvdW50U2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvLyBjdHJsICsgaCByZXBsYWNlIGFsbGUgY29udHJvbGxlcm5hbWVuIGRvb3IgaHVpZGlnZSBjb250cm9sbGVyXHJcbiAgICAgICAgLy8gdmVydmFuZyBhcHAucmVwbGFjZSBkb29yIGRlIGp1aXN0ZSBtb2R1bGUgaW4gZGl0IGdldmFsIGFwcC5hY2NvdW50IHN0YWF0IGluIGFjY291bnQtbW9kdWxlLmpzXHJcblxyXG4gICAgICAgIC8vY29udHJvbGxlciBpbiBpbmRleC5odG1sIHNsZXBlbi90b2V2b2VnZW4gb25kZXJhYW4gYmlqIHNjcmlwdHMgY29udHJvbGxlcnNcclxuXHJcbiAgICAgICAgLy92aWV3IGFhbm1ha2VuIGtvcGllZXIgdWl0IGNvcHkgZm9sZGVyXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW4gbW9kdWxlIGFjY291bnQtbW9kdWxlIHJvdXRlIGFhbm1ha2VuICgkcm91dGVQcm92aWRlcilcclxuXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHNlbGVjdGVyZW4gdmFuIHJpaiBpbiBhY2NvdW50c3RhYmVsXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRBY2NvdW50ID0gZnVuY3Rpb24gKGFjY291bnQsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEFjY291bnQgPSBhY2NvdW50O1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQWNjb3VudC92aWV3cy9jcmVhdGVBY2NvdW50TW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQWNjb3VudE1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgLy8gbmlldHMgZG9vciB0ZSBnZXZlbi5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hY2NvdW50TGlzdCA9IGFjY291bnRzO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VBY2NvdW50Q29udHJvbGxlcicsIG1hbmFnZUFjY291bnRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gYWNjb3VudFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlUGF0aCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VQYXRoICsgJ2FjY291bnRzL2dldEFjY291bnRzJykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uaWV1d2UgbWV0aG9kZSBvbSBhY2NvdW50IHRlIGNyZWVlcmVuIGFhbmdlbWFha3RcclxuICAgICAgICB0aGl6LmNyZWF0ZUFjY291bnQgPSBmdW5jdGlvbiAoY3JlYXRlQWNjb3VudEluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVBhdGggKyAnYWNjb3VudHMvY3JlYXRlQWNjb3VudCcsIGNyZWF0ZUFjY291bnRJbmZvKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRJbmZvID0gZnVuY3Rpb24odXNlcm5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICdhY2NvdW50cy9nZXRBY2NvdW50LycrIHVzZXJuYW1lICkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhY2NvdW50U2VydmljZScsIGFjY291bnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjbGFzc2VzU2VydmljZSwgbWVzc2FnZVNlcnZpY2UsIGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFRlYWNoZXIgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZXMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ2xhc3Nlc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZENvdXJzZXMpO1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS5jcmVhdGVDbGFzcygkc2NvcGUuY3JlYXRlQ2xhc3NJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIktsYXMgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDbGFzc2VzXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vIHRvZG8gcmVtb3ZlIHRoaXMgXHJcbiAgICAgICAgLy8kc2NvcGUuJHdhdGNoKCdzZWxlY3RlZFRlYWNoZXInLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ0dlc2VsZWN0ZWVyZGUgbGVlcmthY2h0IDonICsgdmFsdWUucGVyc29uLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLnBlcnNvbi5sYXN0TmFtZSk7XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgLy8vLyB0b2RvIHJlbW92ZSB0aGlzIFxyXG4gICAgICAgIC8vJHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWRUZWFjaGVycycsIGZ1bmN0aW9uICh0ZWFjaGVycykge1xyXG4gICAgICAgIC8vICAgIGlmICh0ZWFjaGVycy5sZW5ndGggPCAxICkge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgXy5lYWNoKHRlYWNoZXJzLCBmdW5jdGlvbih0ZWFjaGVyKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCdMZWVya3JhY2h0IDonICsgdGVhY2hlci5wZXJzb24uZmlyc3ROYW1lICsgJyAnICsgdGVhY2hlci5wZXJzb24ubGFzdE5hbWUpO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDbGFzc0luZm8gPSB7fTtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNsYXNzSW5mby5uZXh0WWVhciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90ZWFjaGVyU2VydmljZS5nZXRUZWFjaGVycygpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUudGVhY2hlcnMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQ2xhc3NDb250cm9sbGVyJywgY3JlYXRlQ2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSxjb3Vyc2VTZXJ2aWNlLCBtZXNzYWdlU2VydmljZSwgc2Nob29seWVhclNlcnZpY2UsIHRvYXN0ciwgJGxvY2F0aW9uLCBhbGxDbGFzc2VzLCBzZWxlY3RNb2RhbFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgIHZhciBhbGxDb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vJHNjb3BlLnNldFNlbGVjdGVkU2Nob29sWWVhciA9IGZ1bmN0aW9uKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAvLyAgICAkc2NvcGUuc2VsZWN0ZWRTY2hvb2xZZWFyID0gc2Nob29seWVhcjtcclxuICAgICAgICAvL31cclxuICAgICAgICAkc2NvcGUuZmlsZVVwZGF0ZWQgPSBmdW5jdGlvbigkZmlsZXMsICRldmVudCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmlsZSA9ICRldmVudC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwbG9hZENzdiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS51cGxvYWRDbGFzc0Nzdigkc2NvcGUuZmlsZSwgJHNjb3BlLnNlbGVjdGVkU2Nob29sWWVhcikudGhlbihmdW5jdGlvbiAocGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ0hldCBDU1YgYmVzdGFuZCBpcyBtZXQgc3VjY2VzcyBvcGdlc2xhZ2VuLicpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9rbGFzc2VuIHZvbGxlZGlnIG9wcm9lcGVuIGZpbHRlcmVuIGNsaWVudHNpZGVcclxuICAgICAgICAvL3N0dWRlbnRlbiAxMC8xMCB2YW4gc2VydmVyIG9waGFsZW5cclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NYLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGNsYXNzWDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuYWRkQ291cnNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbCgnc2VsZWN0Q291cnNlc01vZGFsJywgYWxsQ291cnNlcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1NlcnZpY2UuYWRkQ291cnNlcygkc2NvcGUuc2VsZWN0ZWRDbGFzcy5pZCwgcmVzdWx0KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVTdWNjZXMoXCJEZSB2YWtrZW4gemlqbiB0b2VnZXZvZWdkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbiAoc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgICAkc2NvcGUuc2Nob29sWWVhcnMgPSBzY2hvb2x5ZWFycztcclxuICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTY2hvb2xZZWFyID0gc2Nob29seWVhcnNbMF07XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGFsbENvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5hbGxDbGFzc2VzID0gYWxsQ2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmFsbENsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcicsIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGtsYXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZENsYXNzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJywgc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgZnVuY3Rpb24gdGVzdENsYXNzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmdldFRlc3RDbGFzcygpLnRoZW4oZnVuY3Rpb24gKGNsYXNzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RDbGFzcyA9IGNsYXNzUmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignVGVzdENsYXNzQ29udHJvbGxlcicsIHRlc3RDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsYXNzZXNTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSwgVXBsb2FkKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yVGVhY2hlcicpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yQ291cnNlID0gZnVuY3Rpb24oY291cnNlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yQ291cnNlJywgeyAnaWQnOiBjb3Vyc2VJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXIgPSBmdW5jdGlvbih0ZWFjaGVySWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcicsIHsgJ2lkJzogdGVhY2hlcklkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei51cGxvYWRDbGFzc0NzdiA9IGZ1bmN0aW9uKGZpbGUsIHNjaG9vbFllYXIpIHtcclxuICAgICAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL3VwbG9hZENsYXNzQ3N2JywgeyBmaWxlOiBmaWxlIH1cclxuICAgICAgICAgICAgICByZXR1cm4gICBVcGxvYWQudXBsb2FkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL3VwbG9hZENsYXNzQ3N2LycgKyBzY2hvb2xZZWFyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGZpbGU6IGZpbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdWNjZXNzICcgKyByZXNwLmNvbmZpZy5kYXRhLmZpbGUubmFtZSArICd1cGxvYWRlZC4gUmVzcG9uc2U6ICcgKyByZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHN0YXR1czogJyArIHJlc3Auc3RhdHVzKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzUGVyY2VudGFnZSA9IHBhcnNlSW50KDEwMC4wICogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCk7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcm9ncmVzczogJyArIHByb2dyZXNzUGVyY2VudGFnZSArICclICcgKyBldnQuY29uZmlnLmRhdGEuZmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5hbGxDbGFzc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY2xhc3MvYWxsQ2xhc3Nlc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbihjcmVhdGVDbGFzc0luZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY2xhc3MvY3JlYXRlQ2xhc3NcIiwgY3JlYXRlQ2xhc3NJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlcyA9IGZ1bmN0aW9uKGNsYXNzSWQsIGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY2xhc3MvXCIgKyBjbGFzc0lkICsgXCIvYWRkQ291cnNlXCIsIGNvdXJzZXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NsYXNzZXNTZXJ2aWNlJywgY2xhc3Nlc1NlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKCRodHRwLCB0b2FzdHJDb25maWcpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBhcGlVcmwgPSAnaHR0cDovL3Rlc3RwbGF0Zm9ybUFwaS8nO1xyXG5cclxuICAgICAgICB0aGl6LmJhc2VBcGlQYXRoID0gYXBpVXJsICsgJ2FwaS8nO1xyXG5cclxuICAgICAgICB0aGl6LnRva2VuUGF0aCA9IGFwaVVybCArICdvYXV0aC90b2tlbic7XHJcblxyXG4gICAgICAgIHRoaXouZ2V0U2Nob29sWWVhcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh0aGl6LmJhc2VBcGlQYXRoICsgXCIvZ2VuZXJhbEluZm8vZ2V0c2Nob29seWVhcnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVQZGZEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL3BkZicgfSk7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc1NhdmVCbG9iKGZpbGUsICdmaWxlTmFtZS5wZGYnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhmaWxlLCAnZmlsZW5hbWUucGRmJyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY29udmVyVG9VdGMgPSBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG4gICAgICAgICAgICB0aW1lLnNldE1pbnV0ZXModGltZS5nZXRNaW51dGVzKCkgLSBvZmZzZXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvbmZpZ3VyYXRpb25TZXJ2aWNlJywgY29uZmlndXJhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY291cnNlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjb3Vyc2VDb250cm9sbGVyJywgY291cnNlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ291cnNlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlU2VydmljZSwgJHVpYk1vZGFsLCBzdHVkeVBsYW5TZXJ2aWNlLCBtZXNzYWdlU2VydmljZSwgc2Nob29seWVhclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvID0ge307XHJcbiAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL3B1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ291cnNlXCIpO1xyXG4gICAgICAgICAgICAvL3dpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIjL21hbmFnZUNvdXJzZVwiOyAvL2JpaiBsb2NhdGlvbi5wYXRoIGdlZW4gIyBiaWpkb2VuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvdXJzZVNlcnZpY2UuY3JlYXRlQ291cnNlKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlU3VjY2VzKFwiQ3Vyc3VzIGFhbmdlbWFha3QhXCIpO1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ291cnNlXCIpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRTY2hvb2xZZWFyID0gZnVuY3Rpb24gKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8uc2Nob29sWWVhciA9IHNjaG9vbHllYXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mbyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgc2Nob29seWVhclNlcnZpY2UuZ2V0RnV0dXJlU2Nob29sWWVhcnMoKS50aGVuKGZ1bmN0aW9uIChzY2hvb2x5ZWFycykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNjaG9vbFllYXJzID0gc2Nob29seWVhcnM7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8uc2Nob29sWWVhciA9ICRzY29wZS5zY2hvb2xZZWFyc1swXTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHN0dWR5UGxhblNlcnZpY2UuZ2V0U3R1ZHlQbGFucygpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3R1ZHlwbGFucyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVDb3Vyc2VDb250cm9sbGVyJywgY3JlYXRlQ291cnNlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ291cnNlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZUNvdXJzZUNvbnRyb2xsZXInLCBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvdXJzZVNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZ2V0Q291cnNlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcImNvdXJzZXMvY291cnNlc0ZvclRlYWNoZXJcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5hbGxDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9hbGxDb3Vyc2VzXCIpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlQ291cnNlID0gZnVuY3Rpb24gKGNyZWF0ZUNvdXJzZUluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jcmVhdGVDb3Vyc2VcIiwgY3JlYXRlQ291cnNlSW5mbykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdjb3Vyc2VTZXJ2aWNlJywgY291cnNlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY291cnNlJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzZWxlY3RNb2RhbChzZWxlY3RNb2RhbFNlcnZpY2UpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogXCI8YSBjbGFzcz0nYnRuIGJ0bi1kZWZhdWx0JyA+PGkgY2xhc3M9J2ZhIGZhLXNlYXJjaCc+PC9pPjwvYT5cIixcclxuICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgIG1vZGFsbmFtZTogJ0AnLFxyXG4gICAgICAgICAgICAgICAgaXRlbXM6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbjonPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE1vZGFsU2VydmljZS5vcGVuTW9kYWwoc2NvcGUubW9kYWxuYW1lLCBzY29wZS5pdGVtcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3BlLnNlbGVjdGlvbiA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuZGlyZWN0aXZlKCdzZWxlY3RNb2RhbCcsIHNlbGVjdE1vZGFsKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzZWxlY3RNb2RhbFNlcnZpY2UoJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB2YXIgbW9kYWxTZXR0aW5ncyA9IFtcclxuICAgICAgICAgICAvKnNlbGVjdFRlYWNoZXJNb2RhbFNldHRpbmcqL1xyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBcInNlbGVjdFRlYWNoZXJNb2RhbFwiLCB0ZW1wbGF0ZTogXCJhcHAvY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS90ZWFjaGVyL3NlbGVjdFRlYWNoZXJNb2RhbC5odG1sXCIsIGNvbnRyb2xsZXI6IFwic2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICAgICBjb250ZW50OiB7IHRpdGxlOiBcIkxlZXJrcmFjaHRlblwiLCBpdGVtRGVzY3JpcHRpb246IFwiU2VsZWN0ZWVyIGVlbiBsZWVya3JhY2h0XCIgfVxyXG4gICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgIC8qc2VsZWN0VGVhY2hlcnNNb2RhbFNldHRpbmcgID0+IG11bHRpcGxlIHRlYWNoZXJzKi9cclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIG1vZGFsTmFtZTogXCJzZWxlY3RUZWFjaGVyc01vZGFsXCIsIHRlbXBsYXRlOiBcImFwcC9jdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3RlYWNoZXIvc2VsZWN0VGVhY2hlcnNNb2RhbC5odG1sXCIsIGNvbnRyb2xsZXI6IFwic2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgY29udGVudDogeyB0aXRsZTogXCJMZWVya3JhY2h0ZW5cIiwgaXRlbURlc2NyaXB0aW9uOiBcIlNlbGVjdGVlciBsZWVya3JhY2h0ZW5cIiB9XHJcbiAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgIC8qc2VsZWN0U3R1ZHlwbGFuTW9kYWxTZXR0aW5nKi9cclxuICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgIG1vZGFsTmFtZTogXCJzZWxlY3RTdHVkeXBsYW5Nb2RhbFwiLCB0ZW1wbGF0ZTogXCJhcHAvY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9zdHVkeXBsYW4vc2VsZWN0U3R1ZHlwbGFuTW9kYWwuaHRtbFwiLCBjb250cm9sbGVyOiBcInNlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgY29udGVudDogeyB0aXRsZTogXCJMZWVycGxhbm5lblwiLCBpdGVtRGVzY3JpcHRpb246IFwiU2VsZWN0ZWVyIGVlbiBsZWVycGxhblwiIH1cclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgIC8vc2VsZWN0Q291cnNlc01vZGFsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsTmFtZTogXCJzZWxlY3RDb3Vyc2VzTW9kYWxcIiwgdGVtcGxhdGU6IFwiYXBwL2N1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvY291cnNlcy9zZWxlY3RDb3Vyc2VzTW9kYWwuaHRtbFwiLCBjb250cm9sbGVyOiBcInNlbGVjdEl0ZW1zTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiB7IHRpdGxlOiBcIkN1cnN1c3NlblwiLCBpdGVtRGVzY3JpcHRpb246IFwiU2VsZWN0ZWVyIGN1cnN1c3NlblwiIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8qT3RoZXIgc2V0dGluZ3MqL1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHZhciBnZXRNb2RhbFNldHRpbmcgPSBmdW5jdGlvbiAobW9kYWxOYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBfLmZpbmQobW9kYWxTZXR0aW5ncywgZnVuY3Rpb24gKG1vZGFsU2V0dGluZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsU2V0dGluZy5tb2RhbE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gbW9kYWxOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdlZW4gbW9kYWwgc2V0dGluZyBnZXZvbmRlblwiKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXoub3Blbk1vZGFsID0gZnVuY3Rpb24gKG1vZGFsTmFtZSwgaXRlbXMpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2RhbFNldHRpbmcgPSBnZXRNb2RhbFNldHRpbmcobW9kYWxOYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogbW9kYWxTZXR0aW5nLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogbW9kYWxTZXR0aW5nLmNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vZGFsU2V0dGluZy5jb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3NlbGVjdE1vZGFsU2VydmljZScsIHNlbGVjdE1vZGFsU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTsgLy90ZXN0IiwiLyogR3VpZGUgOlxyXG5Vc2UgdGhlIGRpcmVjdGl2ZSBieSBhZGRpbmcgdGhlIGZvbG93aW5nIGh0bWwgY29kZSB0byB5b3VyIHBhZ2UgOlxyXG48c2VsZWN0LXNjaG9vbHllYXIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFNjaG9vbFllYXJcIj48L3NlbGVjdC1zY2hvb2x5ZWFyPlxyXG5BZGp1c3QgdGhlIHZhbHVlIG9mIHRoZSBzZWxlY3RlZCBhdHRyaWJ1dGUgdG8gdGhlIG9uZSBsaW5rIHRvIHRoZSB2aWV3cyBjb250cm9sbGVyIHNjb3BlLlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzZWxlY3RTY2hvb2x5ZWFyKCRyb290U2NvcGUsIHNjaG9vbHllYXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNldHVwU2NvcGUgPSBmdW5jdGlvbiAoc2NvcGUsc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2Nob29seWVhcnMgPSBzY2hvb2x5ZWFycztcclxuICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSBzY29wZS5zY2hvb2x5ZWFyc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGxhYmVsIGZvcj1cInNjaG9vbHllYXJTZWxlY3RvclwiIGNsYXNzPVwiY29udHJvbC1sYWJlbFwiPlNjaG9vbGphYXI6PC9sYWJlbD48ZGl2IGlkPVwic2Nob29seWVhclNlbGVjdG9yXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB1aWItZHJvcGRvd24gdWliLWRyb3Bkb3duLXRvZ2dsZT48YSBjbGFzcz1cImJ0bi1kZWZhdWx0XCIgPnt7c2VsZWN0ZWQubm90YXRpb259fSA8aSBjbGFzcz1cImZhIGZhLWNhcmV0LWRvd25cIj48L2k+PC9hPjx1bCB1aWItZHJvcGRvd24tbWVudSByb2xlPVwibWVudVwiIGFyaWEtbGFiZWxsZWRieT1cInNpbmdsZS1idXR0b25cIj48bGkgbmctcmVwZWF0PVwic2Nob29seWVhciBpbiBzY2hvb2x5ZWFycyB8IG9yZGVyQnk6XFwnc3RhcnRZZWFyXFwnXCJyb2xlPVwibWVudWl0ZW1cIiBuZy1jbGljaz1cInNldFNlbGVjdGVkU2Nob29sWWVhcihzY2hvb2x5ZWFyKVwiPjxhPnt7c2Nob29seWVhci5ub3RhdGlvbn19PC9hPjwvbGk+PC91bD48L2Rpdj4nLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9JyxcclxuICAgICAgICAgICAgICAgIHNjaG9vbHllYXJzOiAnPSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRyb290U2NvcGUuZnV0dXJlU2Nob29sWWVhcnMpIHx8ICRyb290U2NvcGUuZnV0dXJlU2Nob29sWWVhcnMgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbihzY2hvb2x5ZWFycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR1cFNjb3BlKHNjb3BlLCBzY2hvb2x5ZWFycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldHVwU2NvcGUoc2NvcGUsICRyb290U2NvcGUuZnV0dXJlU2Nob29sWWVhcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNjb3BlLnNldFNlbGVjdGVkU2Nob29sWWVhciA9IGZ1bmN0aW9uIChzY2hvb2x5ZWFyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0ZWQgPSBzY2hvb2x5ZWFyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuZGlyZWN0aXZlKCdzZWxlY3RTY2hvb2x5ZWFyJywgc2VsZWN0U2Nob29seWVhcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25Db250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uU2VydmljZSwgZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdEV2YWx1YXRpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAvLyBldmFsdWF0aW9uU2VydmljZS5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7IC8vIGZpbmQgb3RoZXIgc29sdXRpb24gdG8gbWFwIHNjb3JlcyBub3Qgb24gZXZyeSBzZWxlY3QuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNjb3JlID0gZnVuY3Rpb24gKGV2YWx1YXRpb25JdGVtLCBzY29yZSkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uSXRlbS5zY29yZSA9IHNjb3JlO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uSXRlbS5ub3RTY29yZWRSZWFzb24gPSAwO1xyXG5cclxuICAgICAgICAgICAgdGhpei5hY3Rpb25UYWtlbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS51cGRhdGVFdmFsdWF0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS51cGRhdGVFdmFsdWF0aW9uKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24pLnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleEV2YSA9IF8uZmluZEluZGV4KCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQgPT09IGV2YWx1YXRpb24uaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnVuc2F2ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNbaW5kZXhFdmFdID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgICAgIC8vdmFyIGhhc2hrZXkgPSAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleTtcclxuICAgICAgICAgICAgICAgIC8vJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24uJCRoYXNoS2V5ID0gaGFzaGtleTtcclxuICAgICAgICAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwZGF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS51cGRhdGVFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnMpLnRoZW4oZnVuY3Rpb24oZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9ucy51bnNhdmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldE5vdFNjb3JlZFJlYXNvbiA9IGZ1bmN0aW9uKGV2YWx1YXRpb25pdGVtLCBudW1iZXIpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbml0ZW0ubm90U2NvcmVkUmVhc29uID0gbnVtYmVyO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uaXRlbS5zY29yZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICB0aGl6LmFjdGlvblRha2VuKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVuTG9jayA9IGZ1bmN0aW9uIChzZWxlY3RlZEV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgLy8gZG8gc2VydmVyIHNpZGUgbG9naWNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmxvY2tpbmcgc2VsZWN0ZWQgZXZhbHVhdGlvblwiKTtcclxuXHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnVubG9ja0VkaXRhYmxlKHNlbGVjdGVkRXZhbHVhdGlvbi5pZCkudGhlbihmdW5jdGlvbiAocGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRFdmFsdWF0aW9uLmVkaXRBYmxlU3RhdGUuY2FuRWRpdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVBZnRlckNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uU2VydmljZS5tYXBJdGVtc1RvU3ViU2VjdGlvbigkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG4gICAgICAgICAgICAvLyBldmFsdWF0aW9uU2VydmljZS5zZXRTdWJzZWN0aW9uU2NvcmVzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXoubWFwSXRlbXNUb1N1YlNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5ncm91cEJ5KGV2YWx1YXRpb24uZXZhbHVhdGlvbkl0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmV2YWx1YXRpb25TdWJTZWN0aW9uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uc29ydEJ5KGRpZmZlcmVudFN1YnNlY3Rpb25zLCBmdW5jdGlvbihzdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3ViWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucyA9IGRpZmZlcmVudFN1YnNlY3Rpb25zO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLy8vIHZhciB2YWx1ZSA9IG9iamVjdFtrZXldID0+IHVzZSBkaWN0aW9uYXJ5IGZyb20gYyMgdGhpcyB3YXlcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJzZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQpICYmICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3Vic2VjdGlvbi50b3RhbFNjb3JlID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5yZXN1bHQudG90YWxzUGVyY2F0ZWdvcnlbc3Vic2VjdGlvblswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5pZF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBtYXAgZXZlcnkgZXZhbHVhdGlvbiBub3QganVzdCBzZWxlY3RlZCBzbyBpdCBjYW4gYmUgcHJvY2VzZWQgaW4gaW50KClcclxuICAgICAgICB9O1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdGhpei5hY3Rpb25UYWtlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi51bnNhdmVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuYW55VW5zYXZlZEV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25zLnNvbWUoZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9uLnVuc2F2ZWQgPT09IHRydWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmFsdWF0aW9uc1swXSk7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc1RpdGxlID0gZXZhbHVhdGlvbnNbMF0uY3JlYXRlZEZvckNsYXNzLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0RXZhbHVhdGlvbihldmFsdWF0aW9uc1swXSk7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25TZXJ2aWNlLm1hcEl0ZW1zVG9TdWJTZWN0aW9uKGV2YWx1YXRpb25zKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgXHJcblxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25Db250cm9sbGVyJywgZXZhbHVhdGlvbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9ucywgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgdmFyIGdldFNlbGVjdGVkSWRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLm1hcCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uKGV2YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2YS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmEuaWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKGdldFNlbGVjdGVkSWRzKCkpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNjb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRvUGRmID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9uKCRzY29wZS5ldmFsdWF0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLm9rKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24oZXZhbHVhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcicsIHNjb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3NDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzLCBjbGFzc2VzLCBldmFsdWF0aW9uU2VydmljZSwgJHVpYk1vZGFsLCAkY29tcGlsZSwgJHRpbWVvdXQsICR0ZW1wbGF0ZUNhY2hlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUucXVlcnlPYmplY3QgPSB7fTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uKGtsYXMpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBrbGFzO1xyXG4gICAgICAgICAgICAkc2NvcGUucXVlcnlPYmplY3QuY2xhc3NJZCA9ICRzY29wZS5zZWxlY3RlZENsYXNzLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0LnN0YXJ0RGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5xdWVyeU9iamVjdC5lbmREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0LmNsYXNzSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUucXVlcnlPYmplY3QuY291cnNlSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUucXVlcnlPYmplY3QuZGVzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuc2hvd3BhZ2luYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VhcmNoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcXVlcnlPYmplY3RJc1ZhbGlkID0gZXZhbHVhdGlvblNlcnZpY2UudmFsaWRhdGVFdmFsdWF0aW9uVG90YWxzRm9yQ2xhc3NPdmVyVmlld1F1ZXJ5RHRvKCRzY29wZS5xdWVyeU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlcnlPYmplY3RJc1ZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5zZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3NUb3RhbE92ZXJ2aWV3cygkc2NvcGUucXVlcnlPYmplY3QpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRhYmxlUGFyYW1zID0gZXZhbHVhdGlvblNlcnZpY2UudHJhbnNmb3JtRXZhbHVhdGlvbkZvckNsYXNzT3ZlcnZpZXdzVG9UYWJsZVBhcmFtcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TY29yZWRFdmFsdWF0aW9uTW9kYWwgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL3Njb3JlZEV2YWx1YXRpb25Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbjogZXZhbHVhdGlvblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyRzY29wZS50b1BkZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAvLyR0ZW1wbGF0ZUNhY2hlLnB1dCgndGFibGVIdG1sJywgJChcIiNvdmVydmlld1RhYmxlXCIpLmh0bWwoKSk7XHJcbiAgICAgICAgLy8gICAgLy92YXIgY29udGVudHMgPSAkY29tcGlsZSgkdGVtcGxhdGVDYWNoZS5nZXQoJ3RhYmxlSHRtbCcpKSgkc2NvcGUpO1xyXG4gICAgICAgIC8vICAgIC8vJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vICAgIC8vICAgIGNvbnNvbGUubG9nKGNvbnRlbnRzLmh0bWwoKSk7XHJcbiAgICAgICAgLy8gICAgLy99LCAzMDApOyAgIC8vIHdhaXQgZm9yIGEgc2hvcnQgd2hpbGVcclxuXHJcbiAgICAgICAgLy8gICAgdmFyIGNvbnRlbnRzID0gJChcIiNvdmVydmlld1RhYmxlXCIpLmh0bWwoKTtcclxuICAgICAgICAvLyAgICBjb25zb2xlLmxvZyhjb250ZW50cyk7XHJcbiAgICAgICAgLy99XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY2xlYXJTZWFyY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzQ29udHJvbGxlcicsIHNlYXJjaEV2YWx1YXRpb25Gb3JDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWFyY2hFdmFsdWF0aW9uc0ZvclN0dWRlbnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzLCBjbGFzc2VzLCBldmFsdWF0aW9uU2VydmljZSwgJHVpYk1vZGFsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0ID0ge307XHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gW107XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbihrbGFzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gJHNjb3BlLnNlbGVjdGVkQ2xhc3MuaWQ7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gJHNjb3BlLnNlbGVjdGVkQ291cnNlLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5wYWdlID0gMTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5zdGFydERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmVuZERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LmZpbmlzaGVkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jbGFzc0lkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudEZpcnN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3R1ZGVudExhc3RuYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5zZWFyY2hFdmFsdWF0aW9ucygkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQuZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudG90YWxJdGVtcyA9IGV2YWx1YXRpb25zUGFnZWRRdWVyeVJlc3VsdC50b3RhbEl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zVG9QZGYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL2V2YWx1YXRpb25zVG9QZGZNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uc1RvUGRmTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvbnM7IC8vIG1heWJlIGRvIGEgc2VhcmNoIGFnYWluIHdpdGggbW9yZSBpdGVtcyBwYWdlZD9cclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1vZGFsSW5zdGFuY2UucmVzdWx0LnRoZW4oZnVuY3Rpb24gKHNlbGVjdGVkRXZhbHVhdGlvbklkcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QuRXZhbHVhdGlvbklkcyA9IHNlbGVjdGVkRXZhbHVhdGlvbklkcztcclxuXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuU2NvcmVkRXZhbHVhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9zY29yZWRFdmFsdWF0aW9uTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb246IGV2YWx1YXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhclNlYXJjaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWFyY2hFdmFsdWF0aW9uc0ZvclN0dWRlbnRDb250cm9sbGVyJywgc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSwgbWVzc2FnZVNlcnZpY2UsICRmaWx0ZXIsICRxKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIHRoaXouZXZhbHVhdGlvbnNGb3JCdW5kbGUgPSBmdW5jdGlvbiAoYnVuZGxlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2V2YWx1YXRpb25zRm9yQnVuZGxlJywgeyAnaWQnOiBidW5kbGVJZCB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei51cGRhdGVFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3VwZGF0ZUV2YWx1YXRpb24nLCBldmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3VwZGF0ZUV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnNlYXJjaEV2YWx1YXRpb25zID0gZnVuY3Rpb24gKHBkZkZvckV2YWx1YXRpb25zUXVlcnlEdG8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3NlYXJjaEV2YWx1YXRpb25zJywgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeUR0bykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzVG90YWxPdmVydmlld3MgPSBmdW5jdGlvbiAocXVlcnlEdG8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3NlYXJjaEV2YWx1YXRpb25Gb3JDbGFzc1RvdGFsT3ZlcnZpZXdzJywgcXVlcnlEdG8pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZVBkZkZvckV2YWx1YXRpb25zID0gZnVuY3Rpb24gKGV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb24vY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMnLCBldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QsIHsgcmVzcG9uc2VUeXBlOiAnYXJyYXlidWZmZXInIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmhhbmRsZVBkZkRhdGEocmVzdWx0LmRhdGEpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZVBkZkZvckV2YWx1YXRpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0LkV2YWx1YXRpb25JZHMgPSBbZXZhbHVhdGlvbi5pZF07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyhwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnBsYW5uZWRFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJldmFsdWF0aW9uL3BsYW5uZWRFdmFsdWF0aW9uc1wiKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxhbm5lZCBFdmFsdWF0aW9uc1wiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei50cmFuc2Zvcm1FdmFsdWF0aW9uRm9yQ2xhc3NPdmVydmlld3NUb1RhYmxlUGFyYW1zID0gZnVuY3Rpb24gKG92ZXJ2aWV3cykge1xyXG4gICAgICAgICAgICBpZiAob3ZlcnZpZXdzID09IG51bGwgfHwgb3ZlcnZpZXdzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVdhcm5pbmcoJ0dlZW4gZXZhbHVhdGllcyBnZXZvbmRlbicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdGFibGVQYXJhbXMgPSB7fTtcclxuICAgICAgICAgICAgdGFibGVQYXJhbXMuYWxsRXZhbHVhdGlvbnMgPSBvdmVydmlld3M7XHJcbiAgICAgICAgICAgIHRhYmxlUGFyYW1zLnJlc3VsdHNGb3JTdHVkZW50cyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gbG9vcCBvdmVyIGFsbCB0aGUgc3R1ZGVucyBmb3JtIHRoZSBjbGFzc1xyXG4gICAgICAgICAgICBfLmVhY2gob3ZlcnZpZXdzWzBdLmNyZWF0ZWRGb3JDbGFzcy5zdHVkZW50cywgZnVuY3Rpb24gKHN0dWRlbnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRGb3JTdHVkZW50ID0geyAnc3R1ZGVudCc6IHN0dWRlbnQsICd0b3RhbHMnOiBbXSB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9maW5kIGEgcmVzdWx0IGZvciB0aGUgc3R1ZGVudCBmb3JtIHRoZSBvdmVydmlldy4gRmlsbCB1cCBub24gbWF0Y2hpbmcgd2l0aCBhbHRlcm5hdGl2ZSBkYXRhLlxyXG4gICAgICAgICAgICAgICAgXy5lYWNoKG92ZXJ2aWV3cywgZnVuY3Rpb24gKG92ZXJ2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdGFsID0geyAndG90YWwnOiAnJywgJ2dlbmVyYWxDb21tZW50JzogJycgfTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZXZhU3VtID0gXy5maW5kKG92ZXJ2aWV3LmV2YWx1dGlvblN1bW1hcmllcywgZnVuY3Rpb24gKHN1bW1hcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1bW1hcnkuc3R1ZGVudC5pZCA9PT0gc3R1ZGVudC5pZDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2YVN1bSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsLnRvdGFsID0gZXZhU3VtLnJlc3VsdCAhPSBudWxsID8gJGZpbHRlcignbnVtYmVyJykoZXZhU3VtLnJlc3VsdC50b3RhbCwgMikgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwuZ2VuZXJhbENvbW1lbnQgPSBldmFTdW0uZ2VuZXJhbENvbW1lbnQgICE9IG51bGwgPyBldmFTdW0uZ2VuZXJhbENvbW1lbnQgOiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b3RhbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC5nZW5lcmFsQ29tbWVudCA9IFwiTmlldCBpbmdldnVsZFwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Rm9yU3R1ZGVudC50b3RhbHMucHVzaCh0b3RhbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0YWJsZVBhcmFtcy5yZXN1bHRzRm9yU3R1ZGVudHMucHVzaChyZXN1bHRGb3JTdHVkZW50KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGFibGVQYXJhbXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LnZhbGlkYXRlRXZhbHVhdGlvblRvdGFsc0ZvckNsYXNzT3ZlclZpZXdRdWVyeUR0byA9IGZ1bmN0aW9uIChxdWVyRHRvKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHF1ZXJEdG8uY2xhc3NJZCkgfHwgcXVlckR0by5jbGFzc0lkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVdhcm5pbmcoJ0plIG1vZXQgZWVuIGtsYXMgc2VsZWN0ZXJlbiBvbSB0ZSBrdW5uZW4gem9la2VuLicpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHF1ZXJEdG8uY291cnNlSWQpIHx8IHF1ZXJEdG8uY291cnNlSWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlV2FybmluZygnSmUgbW9ldCBlZW4gdmFrIHNlbGVjdGVyZW4gb20gdGUga3VubmVuIHpvZWtlbi4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXoudW5sb2NrRWRpdGFibGUgPSBmdW5jdGlvbihldmFsdWF0aW9uSWQpIHtcclxuICAgICAgICAgICAgdmFyIGd1aWREdG8gPSB7ICdpZCc6IGV2YWx1YXRpb25JZCB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL3VubG9ja0V2YWx1YXRpb24nLCBndWlkRHRvKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIC8vIGNhbGN1bGF0aW9uIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXoubWFwU3Vic2VjdGlvblRvRXZhbHVhdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uZ3JvdXBCeShldmFsdWF0aW9uLmV2YWx1YXRpb25JdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmV2YWx1YXRpb25TdWJTZWN0aW9uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLnNvcnRCeShkaWZmZXJlbnRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1Yikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1YlswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5zZXF1ZW5jZU51bWJlcjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMgPSBkaWZmZXJlbnRTdWJzZWN0aW9ucztcclxuXHJcbiAgICAgICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyhldmFsdWF0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKk1hcHMgc3Vic2VjdGlvbnMgdG8gZXZhbHVhdGlvbml0ZW1zKi9cclxuICAgICAgICB0aGl6Lm1hcEl0ZW1zVG9TdWJTZWN0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb25zKSB7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0aGl6Lm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24oZXZhbHVhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy9fLmVhY2goZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICB0aGl6Lm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24oZXZhbHVhdGlvbik7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypVc2UgdGhpcyB0byBtYXAgdGhlIHNjb3JlcyB0byB0aGUgbWFwcGVkIHN1YnNlY3Rpb25zIG9mIGEgZXZhbHVhdGlvbiovXHJcbiAgICAgICAgdGhpei5zZXRTdWJzZWN0aW9uU2NvcmVzID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgLy8vLyB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSA9PiB1c2UgZGljdGlvbmFyeSBmcm9tIGMjIHRoaXMgd2F5XHJcbiAgICAgICAgICAgIF8uZWFjaChldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zLCBmdW5jdGlvbiAoc3Vic2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGV2YWx1YXRpb24ucmVzdWx0KSAmJiBldmFsdWF0aW9uLnJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNlY3Rpb24udG90YWxTY29yZSA9IGV2YWx1YXRpb24ucmVzdWx0LnRvdGFsc1BlcmNhdGVnb3J5W3N1YnNlY3Rpb25bMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24uaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic3Vic2VjdGlvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdWJzZWN0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbXBsZXRseVVuc2NvcmVkID0gXy5ldmVyeShzdWJzZWN0aW9uLCBmdW5jdGlvbiAoZXZhbHVhdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNVbmRlZmluZWQoZXZhbHVhdGlvbkl0ZW0uc2NvcmUpIHx8IGV2YWx1YXRpb25JdGVtLnNjb3JlID09IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBsZXRseVVuc2NvcmVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNlY3Rpb24udW5TY29yZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vIG1hcCBldmVyeSBldmFsdWF0aW9uIG5vdCBqdXN0IHNlbGVjdGVkIHNvIGl0IGNhbiBiZSBwcm9jZXNlZCBpbiBpbnQoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdldmFsdWF0aW9uU2VydmljZScsIGV2YWx1YXRpb25TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmNhbGVuZGVyUGF0aCA9ICdhcHAvZGFzaGJvYXJkL3ZpZXdzL3BhcnRpYWxzL2NhbGVuZGFyUGFydGlhbC5odG1sJztcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdkYXNoYm9hcmRDb250cm9sbGVyJywgZGFzaGJvYXJkQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBkYXNoYm9hcmRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2Rhc2hib2FyZFNlcnZpY2UnLCBkYXNoYm9hcmRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXIoJHNjb3BlLGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkdWliTW9kYWxJbnN0YW5jZSxldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGUsIGNsYXNzZXNGb3JDb3Vyc2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAvLyBkYXRlcGlja2VyXHJcbiAgICAgICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMub3BlbmVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmV2YWx1YXRpb25EYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBmb3JtYXRZZWFyOiAneXknLFxyXG4gICAgICAgICAgICBzdGFydGluZ0RheTogMVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIGVuZCBkYXRlcGlja2VyXHJcblxyXG4gICAgICAgIC8vc2Nob29seWVhciBkcm9wZG93blxyXG4gICAgICAgICRzY29wZS5zdGF0dXMgPSB7XHJcbiAgICAgICAgICAgIGlzb3BlbjogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgJHNjb3BlLnRvZ2dsZURyb3Bkb3duID0gZnVuY3Rpb24gKCRldmVudCkge1xyXG4gICAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuc3RhdHVzLmlzb3BlbiA9ICEkc2NvcGUuc3RhdHVzLmlzb3BlbjtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IHt9O1xyXG4gICAgICAgICRzY29wZS5zZXRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc0ZvckNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZC5jbGFzc0lkID0gY2xhc3NGb3JDb3Vyc2UuaWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gY2xhc3NGb3JDb3Vyc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL2VuZCBzY2hvb2x5ZWFyIGRyb3Bkb3duXHJcblxyXG4gICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAvL21ha2UgY2FsbCBoZXJlXHJcbiAgICAgICAgICAkc2NvcGUuY3JlYXRlQ29tbWFuZC5ldmFsdWF0aW9uRGF0ZSA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmNvbnZlclRvVXRjKCRzY29wZS5jcmVhdGVDb21tYW5kLmV2YWx1YXRpb25EYXRlKTtcclxuICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSgkc2NvcGUuY3JlYXRlQ29tbWFuZCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdvaycpO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXNGb3JDb3Vyc2UgPSBjbGFzc2VzRm9yQ291cnNlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUgPSBldmFsdWF0aW9uVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kID0ge1xyXG4gICAgICAgICAgICAgICAgRXZhbHVhdGlvblRlbXBsYXRlSWQ6IGV2YWx1YXRpb25UZW1wbGF0ZS5pZCxcclxuICAgICAgICAgICAgICAgIEV2YWx1YXRpb25EYXRlOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgICAgICBjbGFzc0lkOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbENvbnRyb2xsZXInLCBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gW107XHJcbiAgICAgICAgJHNjb3BlLnRhYnMgPSAxO1xyXG4gICAgICAgICRzY29wZS5zZXF1ZW5jZU51bWJlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbGFzdEluZGV4ID0gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgaWYgKGxhc3RJbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnNbbGFzdEluZGV4XS5zZXF1ZW5jZU51bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2F2ZVRlbXBsYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE8gZGV2ZWxvcCB2YWxpZGF0aW9uIGFuZCBhZGp1c3QgMTAwIHBlcnNjZW50IGNvZGUuXHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuY3JlYXRlVGVtcGxhdGUoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvZXZhbHVhdGlvblRlbXBsYXRlcycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkdlbmVyYWxPcHRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9nZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5jcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYWxPcHRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7ICdkZXNjcmlwdGlvbic6IFwiXCIsICdjb3Vyc2UnOiBudWxsIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZ2VuZXJhbE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gPSBnZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlID0gZ2VuZXJhbE9wdGlvbnMuY291cnNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5TdWJTZWN0aW9ucyA9IGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25TdWJTZWN0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJTZWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRvdGFsV2VpZ2h0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgc2VxdWVuY2VOdW1iZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlcXVlbmNlTnVtYmVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyA9IGV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzKCk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIENvbnNvbGUubG9nKCdNb2RhbCBnZW5lcmFsIG9wdGlvbnMgZGlzbWlzc2VkIGF0OiAnICsgbmV3IERhdGUoKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5kZWxldGVTdWJTZWN0aW9uID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuaW5kZXhPZihzdWJTZWN0aW9uKTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlbkdvYWxzID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzdWJTZWN0aW9uOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlR29hbHM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNob3NlbkdvYWxzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChzdWJTZWN0aW9uLmdvYWxzLCBmdW5jdGlvbihnb2FsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuR29hbHMucHVzaChnb2FsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNob3NlbkdvYWxzLmxlbmd0aCA+MCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHMgPSBfLnJlamVjdCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZSwgZnVuY3Rpb24gKGdvYWxGcm9tQ291cnNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluR29hbHMgPSBfLmFueShjaG9zZW5Hb2FscywgZnVuY3Rpb24gKGdvYWxmcm9tU3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnb2FsRnJvbUNvdXJzZS5pZCA9PT0gZ29hbGZyb21TdWIuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2aWFsYWJsZUdvYWxzPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZS5nb2Fsc0ZvckNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXZpYWxhYmxlR29hbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvblN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRG9lbCB0b2VnZXZvZWdkXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZUdvYWwgPSBmdW5jdGlvbihzdWJzZWN0aW9uLCBnb2FsKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHN1YnNlY3Rpb24uZ29hbHMuaW5kZXhPZihnb2FsKTtcclxuICAgICAgICAgICAgc3Vic2VjdGlvbi5nb2Fscy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFBlcmNlbnRhZ2UgKz0gcGFyc2VJbnQoc3ViU2VjdGlvbi53ZWlnaHQsMTApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjRGVzY3JpcHRpb25Qb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmRlc2NyaXB0aW9uICE9PSBudWxsICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAyNTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0NvdXJzZVBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlKSAmJiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjU3ViVG90YWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3RhbFBlcmNlbnRhZ2UgPSB0aGl6LmdldFRvdGFsU3ViU2VjdGlvblBlcmNlbnRhZ2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG90YWxQZXJjZW50YWdlID09PSAxMDAgPyAyNSA6IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNHb2FsUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb25lR29hbFNldCA9IF8uYW55KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uLmdvYWxzKSAmJiBzdWJTZWN0aW9uLmdvYWxzLmxlbmd0aCA+IDA7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb25lR29hbFNldCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNDb3Vyc2VQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjU3ViVG90YWxQb2ludHMoKTtcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgKz0gdGhpei5jYWxjR29hbFBvaW50cygpO1xyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcicsIGNyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblRlbXBsYXRlcywgJHVpYk1vZGFsLCBjbGFzc2VzU2VydmljZSwgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSwgbWVzc2FnZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRUZW1wbGF0ZSA9IGZ1bmN0aW9uICh0ZW1wbGF0ZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGUgPSB0ZW1wbGF0ZTtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvY3JlYXRlRXZhbHVhdGlvbnNGcm9tVGVtcGxhdGVNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzRm9yQ291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5jbGFzc2VzRm9yQ291cnNlKCRzY29wZS5zZWxlY3RlZFRlbXBsYXRlLmNvdXJzZS5pZCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuaGlkZVNlbGVjdGVkVGVtcGxhdGVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRlbXBsYXRlc1RvSGlkZSA9IFtdO1xyXG4gICAgICAgICAgICBfLmVhY2goJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZXMsIGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlLmNoZWNrSGlkZGVuID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVzVG9IaWRlLnB1c2godGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZXNUb0hpZGUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuaGlkZVNlbGVjdGVkVGVtcGxhdGVzKHRlbXBsYXRlc1RvSGlkZSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGVtcGxhdGVzVG9IaWRlLCBmdW5jdGlvbih0ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZS5oaWRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZVNlcnZpY2UuaGFuZGxlV2FybmluZyhcIkVyIHdlcmRlbiBnZWVuIHNqYWJsb25lbiB2ZXJib3JnZW4uXCIsIFwiR2VlbiBzZWxlY3RpZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlcyA9IGV2YWx1YXRpb25UZW1wbGF0ZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyJywgZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgc3ViU2VjdGlvbiwgY291cnNlLCBhdmFpbGFibGVHb2Fscykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZ29hbHNGaWx0ZXIgPSB7fTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsOyBcclxuICAgICAgXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkR29hbCA9IGZ1bmN0aW9uIChnb2FsLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRHb2FsID0gZ29hbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuICAgICAgXHJcbiAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChzdWJTZWN0aW9uLmdvYWxzKSB8fCAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uLmdvYWxzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uLmdvYWxzLnB1c2goJHNjb3BlLnNlbGVjdGVkR29hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICggYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRHb2FsKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXouQWRkR29hbFRvTmV3RXZhbHVhdGlvblN1YlNlY3Rpb24oKTtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsZWFyRmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKCRzY29wZS5nb2FsRmlsdGVyKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZ29hbEZpbHRlcltrZXlzW2ldXSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYXZhaWxhYmxlR29hbHMgPSBhdmFpbGFibGVHb2FscztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyJywgZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGN1cnJlbnRUb3RhbFdlaWdodCwgY291cnNlLCBzdWJTZWN0aW9uLCBzZXF1ZW5jZU51bWJlcikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgXHJcbiAgICAgIFxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLnNlcXVlbmNlTnVtYmVyID0gc2VxdWVuY2VOdW1iZXIgKzE7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMucHVzaChhbmd1bGFyLmNvcHkoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCkgfHwgJHNjb3BlLm5ld0V2YWx1YXRpb25TdWJTZWN0aW9uLndlaWdodCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyBlcnJvciBtZXNzYWdlIGhlcmUgOiBubyB3ZWlndGggZW50ZXJlZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuaXNFZGl0aW5nKSB8fCAkc2NvcGUuaXNFZGl0aW5nID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpei5hZGRuZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3VycmVudFRvdGFsV2VpZ2h0ID0gY3VycmVudFRvdGFsV2VpZ2h0O1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoc3ViU2VjdGlvbikgJiYgc3ViU2VjdGlvbiAhPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24gPSBzdWJTZWN0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIlxyXG4oZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGdlbmVyYWxPcHRpb25zLCBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IG51bGwgfHwgJHNjb3BlLmdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlKSB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHJlcGxhY2Ugd2l0aCBlcnJvciBtZXRob2RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuY291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMgPSBnZW5lcmFsT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zID0gY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdnZW5lcmFsRXZhbHVhdGlvblRlbXBsYXRlT3B0aW9uc01vZGFsQ29udHJvbGxlcicsIGdlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0Q3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlVGVtcGxhdGUgPSBmdW5jdGlvbihldmFsdWF0aW9uVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlVGVtcGxhdGUnLCBldmFsdWF0aW9uVGVtcGxhdGUpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0RXZhbHVhdGlvblRlbXBsYXRlcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldEV2YWx1YXRpb25UZW1wbGF0ZXMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUgPSBmdW5jdGlvbihjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2NyZWF0ZUV2YWx1YXRpb25Gcm9tVGVtcGxhdGUnLCBjb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmhpZGVTZWxlY3RlZFRlbXBsYXRlcyA9IGZ1bmN0aW9uKHRlbXBsYXRlc0lkcykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9oaWRlVGVtcGxhdGVzJywgdGVtcGxhdGVzSWRzKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZScsIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBob21lQ29udHJvbGxlcigkaHR0cCwgJHNjb3BlKSB7XHJcblxyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5tZXNzYWdlID0gXCJXZWxrb21cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBob21lQ29udHJvbGxlcik7XHJcblxyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnKSk7XHJcblxyXG5cclxuIiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluZGV4Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgYXV0aGVudGljYXRpb25TZXJ2aWNlLCBhY2NvdW50U2VydmljZSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICAkc2NvcGUubG9nZ2VkSW4gPSBhdXRoZW50aWNhdGlvblNlcnZpY2UuaXNBdXRoO1xyXG5cclxuICAgICAgICAkc2NvcGUuaXNDb2xsYXBzZWQgPSB0cnVlO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLmNvbGxhcHNlTWUgPSBmdW5jdGlvbihyZWRpcmVjdFRvKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKHJlZGlyZWN0VG8pO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgICRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmxvZ091dCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBoYW5kbGVNZW51cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhY2NvdW50U2VydmljZS5nZXRBY2NvdW50SW5mbygkc2NvcGUudXNlck5hbWUpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0FkbWluaXN0cmF0b3IgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWRtaW5NZW51SW52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgdXNlck5hbWUgPSBhdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck5hbWU7XHJcbiAgICAgICAgICAgIHZhciBhZG1pbk1lbnVJbnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgdmFyIHVzZXJuYW1lSXNLbm93biA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEZWZpbmVkKGF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyTmFtZSkgJiYgYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJOYW1lICE9PSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoYXV0aGVudGljYXRpb25TZXJ2aWNlLmlzQXV0aCAmJiBhdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck5hbWUgIT09IHVzZXJuYW1lSXNLbm93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1c2VyTmFtZTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZU1lbnVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICRzY29wZS5hZG1pbk1lbnVJbnZpc2libGUgPSBhZG1pbk1lbnVJbnZpc2libGU7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJG9uKCd1c2VyTG9nZ2VkSW4nLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gZGF0YS51c2VyTmFtZTtcclxuICAgICAgICAgICAgJHNjb3BlLmxvZ2dlZEluID0gYXV0aGVudGljYXRpb25TZXJ2aWNlLmlzQXV0aDtcclxuICAgICAgICAgICAgaGFuZGxlTWVudXMoKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3VzZXJMb2dnZWRPdXQnLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUubG9nZ2VkSW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmFkbWluTWVudUludmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignaW5kZXhDb250cm9sbGVyJywgaW5kZXhDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzZXJ2aWNlTmFtZScsIGluZGV4U2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaW5kZXgnKSk7IiwiKGZ1bmN0aW9uIChtb2RlbCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBsb2dpbkNvbnRyb2xsZXIoJHEsICRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsIHRvYXN0ciwgc2Nob29seWVhclNlcnZpY2UsICRyb290U2NvcGUpIHtcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnVzZXJOYW1lID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUucGFzc3dvcmQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXN0VGl0bGUgPSBcIlRlc3RUaXRsZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgc2V0dXBSb290U2NvcGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRxLmFsbChbXHJcbiAgICAgICAgICAgICAgICBzY2hvb2x5ZWFyU2VydmljZS5nZXRGdXR1cmVTY2hvb2xZZWFycygpIC8vLCBkZWZpbmUgbXV0aXBsZSBpZiBuZWVkZWRcclxuICAgICAgICAgICAgXSkudGhlbihmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5mdXR1cmVTY2hvb2xZZWFycyA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkcm9vdFNjb3BlLmZ1dHVyZVNjaG9vbFllYXJzKTtcclxuICAgICAgICAgICAgfSk7ICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5sb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yTWVzc2FnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnVzZXJOYW1lKSB8fCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5wYXNzd29yZCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBsb2dpbkRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICB1c2VyTmFtZTogJHNjb3BlLnVzZXJOYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS5wYXNzd29yZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9naW4obG9naW5EYXRhKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgc2V0dXBSb290U2NvcGUoKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ob21lXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kZWwuY29udHJvbGxlcignbG9naW5Db250cm9sbGVyJywgbG9naW5Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicpKTsiLCJcclxuJ3VzZSBzdHJpY3QnO1xyXG5hcHAuZmFjdG9yeSgnYXV0aEludGVyY2VwdG9yRmFjdG9yeScsIFsnJHEnLCAnJGxvY2F0aW9uJyxcclxuJ2xvY2FsU3RvcmFnZVNlcnZpY2UnLCBmdW5jdGlvbiAoJHEsICRsb2NhdGlvbiwgbG9jYWxTdG9yYWdlU2VydmljZSkge1xyXG5cclxuICAgIHZhciBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5ID0ge307XHJcblxyXG4gICAgdmFyIF9yZXF1ZXN0ID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG5cclxuICAgICAgICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xyXG5cclxuICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgX3Jlc3BvbnNlRXJyb3IgPSBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDQwMSkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkcS5yZWplY3QocmVqZWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5LnJlcXVlc3QgPSBfcmVxdWVzdDtcclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVzcG9uc2VFcnJvciA9IF9yZXNwb25zZUVycm9yO1xyXG5cclxuICAgIHJldHVybiBhdXRoSW50ZXJjZXB0b3JGYWN0b3J5O1xyXG59XSk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoJGh0dHAsIGxvY2FsU3RvcmFnZVNlcnZpY2UsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlLCAkcSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcblxyXG4gICAgICAgIHRoaXoubG9nT3V0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnJlbW92ZSgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXouaXNBdXRoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkT3V0Jywge1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5sb2dpbiA9IGZ1bmN0aW9uKGxvZ2luRGF0YSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gXCJncmFudF90eXBlPXBhc3N3b3JkJnVzZXJuYW1lPVwiICtcclxuICAgICAgICAgICAgICAgIGxvZ2luRGF0YS51c2VyTmFtZSArIFwiJnBhc3N3b3JkPVwiICsgbG9naW5EYXRhLnBhc3N3b3JkO1xyXG5cclxuICAgICAgICAgICAgJGh0dHAucG9zdChjb25maWd1cmF0aW9uU2VydmljZS50b2tlblBhdGgsIGRhdGEsIHsgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgfSB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlU2VydmljZS5zZXQoJ2F1dGhvcml6YXRpb25EYXRhJywgeyB0b2tlbjogcmVzcG9uc2UuZGF0YS5hY2Nlc3NfdG9rZW4sIHVzZXJOYW1lOiBsb2dpbkRhdGEudXNlck5hbWUsIGV4cGlyZXM6IHJlc3BvbnNlLmRhdGEuZXhwaXJlc19pbiB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gbG9naW5EYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndXNlckxvZ2dlZEluJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJOYW1lOiB0aGl6LnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgICAgIH0pLCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQoKTtcclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmdldEF1dGhEYXRhID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgYXV0aERhdGEgPSBsb2NhbFN0b3JhZ2VTZXJ2aWNlLmdldCgnYXV0aG9yaXphdGlvbkRhdGEnKTtcclxuICAgICAgICAgICAgaWYgKGF1dGhEYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5pc0F1dGggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IGF1dGhEYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdhdXRoZW50aWNhdGlvblNlcnZpY2UnLCBhdXRoZW50aWNhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVzc2FnZVNlcnZpY2UodG9hc3RyKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICB0aGl6LmhhbmRsZVJlamVjdCA9IGhhbmRsZVJlamVjdDtcclxuICAgICAgICB0aGl6LmhhbmRsZVN1Y2NlcyA9IGhhbmRsZVN1Y2NlcztcclxuICAgICAgICB0aGl6LmhhbmRsZVdhcm5pbmcgPSBoYW5kbGVXYXJuaW5nO1xyXG4gICAgICAgIHRoaXouaGFuZGxlRXJyb3IgPSBoYW5kbGVFcnJvcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUmVqZWN0KHJlamVjdGlvbikge1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlamVjdGlvbi5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmVycm9yKHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UsICdGb3V0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3VjY2VzKHRleHQsIHRpdGxlKSB7XHJcbiAgICAgICAgICAgIHRvYXN0ci5zdWNjZXNzKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVdhcm5pbmcodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLndhcm5pbmcodGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXJyb3IodGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLmVycm9yKHRleHQsIHRpdGxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ21lc3NhZ2VTZXJ2aWNlJywgbWVzc2FnZVNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyAvL3Rlc3QiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBmdW5jdGlvbiBzY2hvb2x5ZWFyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuXHJcbiAgICAgICAgLy90ZXN0Z3VscFxyXG4gICAgICAgIC8vIFZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6LmdldFNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdnZW5lcmFsSW5mby9nZXRzY2hvb2x5ZWFycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5nZXRGdXR1cmVTY2hvb2xZZWFycyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpei5nZXRTY2hvb2xZZWFycygpLnRoZW4oZnVuY3Rpb24oYWxsU2Nob29sWWVhcnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50TW9udGggPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE1vbnRoIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRZZWFyID0gY3VycmVudFllYXIgLSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihhbGxTY2hvb2xZZWFycywgZnVuY3Rpb24gKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2Nob29seWVhci5zdGFydFllYXIgPj0gY3VycmVudFllYXI7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2Nob29seWVhclNlcnZpY2UnLCBzY2hvb2x5ZWFyU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc2Nob29seWVhcicpKTsgIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0dWRlbnRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkZW50U2VydmljZScsIHN0dWRlbnRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS50ZXN0ID0gXCJIZWxsbyB3b3JsZFwiO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVTdHVkZW50Q29udHJvbGxlcicsIGNyZWF0ZVN0dWRlbnRDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkZW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcigkc2NvcGUsIHN0dWR5UGxhblNlcnZpY2UsIHNlbGVjdE1vZGFsU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBbXTtcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdHVkeVBsYW4gPSB7fTtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5jcmVhdGVOZXdTdHVkeVBsYW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkU3R1ZHlQbGFuID0ge307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0U3R1ZHlQbGFuSW5mbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBzZWxlY3RNb2RhbFNlcnZpY2Uub3Blbk1vZGFsKFwic2VsZWN0U3R1ZHlwbGFuTW9kYWxcIiwgJHNjb3BlLnN0dWR5cGxhbnMpLnRoZW4oZnVuY3Rpb24oc3R1ZHlQbGFuU3VtbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgc3R1ZHlQbGFuU2VydmljZS5nZXRTdHVkeVBsYW5JbmZvKHN0dWR5UGxhblN1bW1hcnkuaWQpLnRoZW4oZnVuY3Rpb24oc3R1ZHlQbGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkU3R1ZHlQbGFuID0gc3R1ZHlQbGFuO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzdHVkeVBsYW5TZXJ2aWNlLmdldFN0dWR5UGxhbnMoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdHVkeXBsYW5zID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcicsIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgJHVpYk1vZGFsSW5zdGFuY2UsIHN0dWR5cGxhbnMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFN0dWR5cGxhbiA9IGZ1bmN0aW9uIChzdHVkeXBsYW4sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFN0dWR5cGxhbiA9IHN0dWR5cGxhbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBub2cgY2hlY2tlbiBvcCBnZWVuIHJlc3VsdGFhdCBnZXNlbGVjdGVlcmRcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLnNlbGVjdGVkU3R1ZHlwbGFuKTtcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcyhcImNhbmNlbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSBzdHVkeXBsYW5zO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzdHVkeXBsYW5zKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcicsIHNlbGVjdFN0dWR5UGxhbk1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBzdHVkeVBsYW5TZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmdldFN0dWR5UGxhbkluZm8gPSBmdW5jdGlvbiAoc3R1ZHlQbGFuSWQpIHtcclxuICAgICAgICAgICAgdmFyIGd1aWREdG8gPSB7ICdpZCc6IHN0dWR5UGxhbklkIH07XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2dldFN0dWR5UGxhbkluZm9cIiwgZ3VpZER0byApLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzdHVkeVBsYW5TZXJ2aWNlJywgc3R1ZHlQbGFuU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZWFjaGVyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlID0gZnVuY3Rpb24oYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDb3Vyc2UnLCBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VGVhY2hlcnMgPSBmdW5jdGlvbigpIHsgLy8gdXNlIHF1ZXJ5IG9iamVjdCBpbiBmdXR1cmUgY2hhbmdlIG1ldGhvZCB0byBwb3N0IHRoZW4gcHJvYmFibHlcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICcvdGVhY2hlci90ZWFjaGVycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDbGFzcyA9IGZ1bmN0aW9uKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDbGFzcycsIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3RlYWNoZXJTZXJ2aWNlJywgdGVhY2hlclNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlYWNoZXJTZXJ2aWNlLCB0ZWFjaGVyLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZENvdXJzZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kPXt9O1xyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9IHRlYWNoZXIuaWQ7IFxyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLmNvdXJzZUlkPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQgO1xyXG5cclxuICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ291cnNlKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGVhY2hlci5jb3Vyc2VzLnB1c2goJHNjb3BlLnNlbGVjdGVkQ291cnNlKTsgLy8gZGlydHlcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGVhY2hlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJywgYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCB0ZWFjaGVyU2VydmljZSwgJHVpYk1vZGFsLCB0ZWFjaGVycykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFRlYWNoZXIgPSBmdW5jdGlvbiAodGVhY2hlciwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVhY2hlciA9IHRlYWNoZXI7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vcGVuQ291cnNlc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL2FkZENvdXJzZU1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkZENvdXJzZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlYWNoZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5DbGFzc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3Mvc2VsZWN0Q2xhc3Nlc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcigkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kID0ge307XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQudGVhY2hlcklkID0gJHNjb3BlLnNlbGVjdGVkVGVhY2hlci5pZDtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC5jbGFzc0lkID0gc2VsZWN0ZWRDbGFzcy5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZWFjaGVyU2VydmljZS5hZGRDbGFzcyhhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3VjY2VzIHRvYXN0ZXJcclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3IgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3RlYWNoZXJTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgLy8gICAgJHNjb3BlLmFjY291bnRMaXN0ID0gYWNjb3VudHM7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGVhY2hlcnMgPSB0ZWFjaGVycztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnRlYWNoZXJzKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcicsIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCB0b2FzdHIsIGl0ZW1zLCBjb250ZW50KSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRJdGVtID0gZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZEl0ZW0pKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuaW5mbygnU2VsZWN0ZWVyIGVlbiBpdGVtIHVpdCBkZSBsaWpzdCBvbSB2ZXJkZXIgdGUga3VubmVuIGdhYW4uJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgkc2NvcGUuc2VsZWN0ZWRJdGVtKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY29udGVudCA9IGNvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInNlbGVjdEl0ZW1Nb2RhbCdzIGl0ZW1zOlwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLml0ZW1zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlcicsIHNlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgdG9hc3RyLCBpdGVtcywgY29udGVudCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICAkc2NvcGUuaXRlbUZpbHRlciA9IHt9O1xyXG4gICAgICAgICRzY29wZS5pdGVtcyA9IFtdO1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgdmFyIGdldFNlbGVjdGVkSXRlbXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcigkc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zZWxlY3RlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkQWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAkc2NvcGUuc2VsZWN0ZWRBbGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJGaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoJHNjb3BlLml0ZW1GaWx0ZXIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5pdGVtRmlsdGVyW2tleXNbaV1dID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNsZWFyU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuaXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJTZWxlY3RlZEZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLypTZXQgdGhlIGNoZWNrYm94IHRvIG5vIHZhbHVlIGluc3RlYWQgb2YgZmFsc2Ugd2hlbiBjaGVja2VkLiovXHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuaXRlbUZpbHRlci5zZWxlY3RlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5pdGVtRmlsdGVyLnNlbGVjdGVkID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY2xlYXJGaWx0ZXIoKTtcclxuICAgICAgICAgICAgJHNjb3BlLml0ZW1GaWx0ZXIuc2VsZWN0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSXRlbXMgPSBnZXRTZWxlY3RlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHNlbGVjdGVkSXRlbXMpIHx8IHNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLmluZm8oJ1NlbGVjdGVlciBtaW5zdGVucyDDqcOpbiBpdGVtIHVpdCBkZSBsaWpzdCBvbSB2ZXJkZXIgdGUga3VubmVuIGdhYW4uJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47ICAvL2hhbmRsZSB3aXRoIGVycm9yIGluIGZ1dHVyZVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZShzZWxlY3RlZEl0ZW1zKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jb250ZW50ID0gY29udGVudDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdEl0ZW1zTW9kYWxDb250cm9sbGVyJywgc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsZW5kYXJDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEV2YWx1YXRpb24gPSBmdW5jdGlvbihldmFsdWF0aW9uLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uID0gZXZhbHVhdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnN0YXJ0RXZhbHVhdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9ldmFsdWF0aW9uL1wiICsgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi5idW5kbGVJZCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25TZXJ2aWNlLnBsYW5uZWRFdmFsdWF0aW9ucygpLnRoZW4oZnVuY3Rpb24gKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUucGxhbm5lZEV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgIH1cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjYWxlbmRhckNvbnRyb2xsZXInLCBjYWxlbmRhckNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmRhc2hib2FyZCcpKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
