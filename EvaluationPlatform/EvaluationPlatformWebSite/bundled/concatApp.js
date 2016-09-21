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

    editGeneralGoalModalController.$inject = ["$scope", "$location", "$uibModalInstance", "generalGoal"];
    function editGeneralGoalModalController($scope, $location, $uibModalInstance,generalGoal) {
        var thiz = this;
       
        //Variables
        $scope.generealGoal = generalGoal;
        //private Functions
        
        // public functions

        $scope.ok = function () {
         
            $uibModalInstance.close($scope.generealGoal);
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        }

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('editGeneralGoalModalController', editGeneralGoalModalController);
})(angular.module('app.studyPlan'));
(function (module) {
    'use strict';

    manageStudyPlanController.$inject = ["$scope", "studyPlanService", "selectModalService"];
    function manageStudyPlanController($scope, studyPlanService, selectModalService) {
        var thiz = this;

        $scope.studyplans = [];
        $scope.selectedStudyPlan = null;
        //Variables

        //private Functions

        // public functions
        $scope.createNewStudyPlan = function () {
            $scope.selectedStudyPlan = null;

            studyPlanService.openNewStudyPlanModal().then(function (newStudyPlan) {
                newStudyPlan.creating = true;

                studyPlanService.createNewStudyPlan(newStudyPlan).then(function (result) {
                    $scope.selectedStudyPlan = result;
                });
            });
        }

        $scope.getStudyPlanInfo = function () {
            selectModalService.openModal("selectStudyplanModal", $scope.studyplans).then(function (studyPlanSummary) {
                studyPlanService.getStudyPlanInfo(studyPlanSummary.id).then(function (studyPlan) {
                    $scope.selectedStudyPlan = studyPlan;
                });
            });
        }

        $scope.addGeneralGoal = function (parameters) {
            var currentGoalsInStudyPlan = $scope.selectedStudyPlan.generalGoals.length;
            var newGeneralGoal = {
                'studyPlanId': $scope.selectedStudyPlan.id,
                'description': "",
                'goalNumber': currentGoalsInStudyPlan + 1
            }

            studyPlanService.openEditGeneralGoalModal(newGeneralGoal).then(function (editedGeneralGoal) {
                studyPlanService.addGeneralGoal(editedGeneralGoal).then(function (updatedGeneralGoal) {
                    $scope.selectedStudyPlan.generalGoals.push(editedGeneralGoal);
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

    newStudyPlanModalController.$inject = ["$scope", "$location", "$uibModalInstance"];
    function newStudyPlanModalController($scope, $location, $uibModalInstance) {
        var thiz = this;
       
        //Variables
        $scope.newStudyPlan = {};
        //private Functions
        
        // public functions

        $scope.ok = function () {
            $scope.newStudyPlan.generalGoals = [];
            $uibModalInstance.close($scope.newStudyPlan);
        }

        $scope.cancel = function() {
            $uibModalInstance.dismiss("cancel");
        }

        //initiations
        var init = function () {

        }

        init();
    }

    module.controller('newStudyPlanModalController', newStudyPlanModalController);
})(angular.module('app.studyPlan'));
(function(module) {

    studyPlanService.$inject = ["$http", "configurationService", "$uibModal"];
    function studyPlanService($http, configurationService, $uibModal) {
        var thiz = this;
        var baseWebApiUrl = configurationService.baseApiPath;
        
        thiz.getStudyPlans = function() {
            return $http.get(baseWebApiUrl + "/studyPlans/allStudyPlans").then(function(result) {
                return result.data;
            });
        }

        thiz.createNewStudyPlan = function (createStudyPlanInfo) {
            return $http.post(baseWebApiUrl + "/studyPlans/createStudyPlan", createStudyPlanInfo).then(function(result) {
                return result.data;
            });
        }

        thiz.addGeneralGoal = function (editedGeneralGoal) {
            return $http.post(baseWebApiUrl + "/studyPlans/addGeneralGoal", editedGeneralGoal).then(function (result) {
                return result.data;
            });
        }

        thiz.getStudyPlanInfo = function (studyPlanId) {
            var guidDto = { 'id': studyPlanId };
            return $http.post(baseWebApiUrl + "/studyPlans/getStudyPlanInfo", guidDto ).then(function (result) {
                return result.data;
            });
        }

        thiz.openNewStudyPlanModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/StudyPlan/views/newStudyPlanModal.html",
                controller: "newStudyPlanModalController",
                size: 'lg',
                resolve: {
                }
            });

            return modalInstance.result.then(function (newStudyPlan) {

                return newStudyPlan;
            });
        }

        thiz.openEditGeneralGoalModal = function (generalGoalToEdit) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: "app/StudyPlan/views/editGeneralGoalModal.html",
                controller: "editGeneralGoalModalController",
                size: 'lg',
                resolve: {
                    generalGoal : function() {
                        return generalGoalToEdit;
                    }
                }
            });

            return modalInstance.result.then(function (newStudyPlan) {
                return newStudyPlan;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIkFjY291bnQvYWNjb3VudC1tb2R1bGUuanMiLCJjbGFzc2VzL2NsYXNzZXMtbW9kdWxlLmpzIiwiQ291cnNlL2NvdXJzZS1tb2R1bGUuanMiLCJjdXN0b21EaXJlY3RpdmVzL2N1c3RvbURpcmVjdGl2ZXMtbW9kdWxlLmpzIiwiZGFzaGJvYXJkL2Rhc2hib2FyZC1tb2R1bGUuanMiLCJldmFsdWF0aW9uL2V2YWx1YXRpb24tbW9kdWxlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2V2YWx1YXRpb25UZW1wbGF0ZS1tb2R1bGUuanMiLCJob21lL2hvbWUtbW9kdWxlLmpzIiwiSW5kZXgvaW5kZXgtbW9kdWxlLmpzIiwibG9naW4vbG9naW4tbW9kdWxlLmpzIiwic2Nob29seWVhci9zY2hvb2x5ZWFyLW1vZHVsZS5qcyIsIlN0dWRlbnQvc3R1ZGVudC1tb2R1bGUuanMiLCJTdHVkeVBsYW4vc3R1ZHlQbGFuLW1vZHVsZS5qcyIsIlRlYWNoZXIvdGVhY2hlci1tb2R1bGUuanMiLCJtZXNzYWdlL21lc3NhZ2VDb25maWcuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXIuanMiLCJBY2NvdW50L2NvbnRyb2xsZXJzL21hbmFnZUFjY291bnRDb250cm9sbGVyLmpzIiwiQWNjb3VudC9zZXJ2aWNlcy9hY2NvdW50U2VydmljZS5qcyIsImNvbmZpZ3VyYXRpb24vc2VydmljZXMvY29uZmlndXJhdGlvblNlcnZpY2UuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL2NsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9jcmVhdGVDbGFzc0NvbnRyb2xsZXIuanMiLCJjbGFzc2VzL2NvbnRyb2xsZXJzL21hbmFnZUNsYXNzZXNDb250cm9sbGVyLmpzIiwiY2xhc3Nlcy9jb250cm9sbGVycy9zZWxlY3RDbGFzc01vZGFsQ29udHJvbGxlci5qcyIsImNsYXNzZXMvY29udHJvbGxlcnMvdGVzdENsYXNzQ3RybC5qcyIsImNsYXNzZXMvc2VydmljZXMvY2xhc3Nlc1NlcnZpY2UuanMiLCJDb3Vyc2UvY29udHJvbGxlcnMvY291cnNlQ29udHJvbGxlci5qcyIsIkNvdXJzZS9jb250cm9sbGVycy9jcmVhdGVDb3Vyc2VDb250cm9sbGVyLmpzIiwiQ291cnNlL2NvbnRyb2xsZXJzL21hbmFnZUNvdXJzZUNvbnRyb2xsZXIuanMiLCJDb3Vyc2Uvc2VydmljZXMvY291cnNlU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvc2VsZWN0TW9kYWxEaXJlY3RpdmUuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3NlbGVjdE1vZGFsU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0U2Nob29seWVhckRpcmVjdGl2ZS9zZWxlY3RTY2hvb2x5ZWFyRGlyZWN0aXZlLmpzIiwiZGFzaGJvYXJkL2NvbnRyb2xsZXJzL2Rhc2hib2FyZENvbnRyb2xsZXIuanMiLCJkYXNoYm9hcmQvc2VydmljZXMvZGFzaGJvYXJkU2VydmljZS5qcyIsImV2YWx1YXRpb24vY29udHJvbGxlcnMvZXZhbHVhdGlvbkNvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL2V2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL3NlYXJjaEV2YWx1YXRpb25Gb3JDbGFzc0NvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL2NvbnRyb2xsZXJzL3NlYXJjaEV2YWx1YXRpb25zRm9yU3R1ZGVudENvbnRyb2xsZXIuanMiLCJldmFsdWF0aW9uL3NlcnZpY2VzL2V2YWx1YXRpb25TZXJ2aWNlLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZUN0cmwuanMiLCJldmFsdWF0aW9uVGVtcGxhdGUvY29udHJvbGxlcnMvZXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlci5qcyIsImV2YWx1YXRpb25UZW1wbGF0ZS9jb250cm9sbGVycy9ldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL2NvbnRyb2xsZXJzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyLmpzIiwiZXZhbHVhdGlvblRlbXBsYXRlL3NlcnZpY2VzL2V2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UuanMiLCJob21lL2NvbnRyb2xsZXJzL2hvbWVDdHJsLmpzIiwiSW5kZXgvY29udHJvbGxlcnMvaW5kZXhDdHJsLmpzIiwiSW5kZXgvc2VydmljZXMvaW5kZXhTZXJ2aWNlLmpzIiwibG9naW4vY29udHJvbGxlcnMvbG9naW5DdHJsLmpzIiwibG9naW4vZmFjdG9yaWVzL2F1dGhJbnRlcmNlcHRvckZhY3RvcnkuanMiLCJsb2dpbi9zZXJ2aWNlcy9hdXRoZW50aWNhdGlvblNlcnZpY2UuanMiLCJtZXNzYWdlL3NlcnZpY2VzL21lc3NhZ2VTZXJ2aWNlLmpzIiwic2Nob29seWVhci9zZXJ2aWNlcy9zY2hvb2x5ZWFyU2VydmljZS5qcyIsIlN0dWRlbnQvY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanMiLCJTdHVkZW50L3NlcnZpY2VzL3N0dWRlbnRTZXJ2aWNlLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL2VkaXRHZW5lcmFsR29hbE1vZGFsQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9jb250cm9sbGVycy9tYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyLmpzIiwiU3R1ZHlQbGFuL2NvbnRyb2xsZXJzL25ld1N0dWR5UGxhbk1vZGFsQ29udHJvbGxlci5qcyIsIlN0dWR5UGxhbi9zZXJ2aWNlcy9zdHVkeVBsYW5TZXJ2aWNlLmpzIiwiVGVhY2hlci9jb250cm9sbGVycy9hZGRDb3Vyc2VNb2RhbENvbnRyb2xsZXIuanMiLCJUZWFjaGVyL2NvbnRyb2xsZXJzL21hbmFnZVRlYWNoZXJDb250cm9sbGVyLmpzIiwiVGVhY2hlci9zZXJ2aWNlcy90ZWFjaGVyU2VydmljZS5qcyIsImN1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvZ2VuZXJhbENvbnRyb2xsZXJzL3NlbGVjdEl0ZW1Nb2RhbENvbnRyb2xsZXIuanMiLCJjdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL2dlbmVyYWxDb250cm9sbGVycy9zZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlci5qcyIsImRhc2hib2FyZC9jb250cm9sbGVycy9wYXJ0aWFscy9jYWxlbmRhckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxNQUFNLFFBQVEsT0FBTztJQUNyQixDQUFDLFdBQVcsVUFBVSxhQUFhLGdCQUFnQixzQkFBc0IsdUJBQXVCLFdBQVc7TUFDekcsd0JBQXdCLFlBQVksZUFBZSxhQUFhLGVBQWUsYUFBYSxlQUFlLDBCQUEwQixrQkFBa0I7TUFDdkosZUFBZSxjQUFjLGlCQUFpQjs7O0FBR3BEO0FDTkEsUUFBUSxPQUFPLGVBQWUsQ0FBQztLQUMxQiwwQkFBTyxVQUFVLGdCQUFnQjtRQUM5Qjs7UUFFQTtXQUNHLEtBQUssa0JBQWtCO2NBQ3BCLGFBQWE7Y0FDYixZQUFZOzs7Ozs7OztBQVExQjtBQ2ZBO0FBQ0EsUUFBUSxPQUFPLGVBQWUsQ0FBQztLQUMxQiwwQkFBTyxTQUFTLGdCQUFnQjtRQUM3Qjs7UUFFQTthQUNLLEtBQUssWUFBWTtn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QUFPLGdCQUFnQixZQUFZO1lBQy9CLEVBQUUsS0FBSyxPQUFPLE9BQU8sVUFBVSxNQUFNO2dCQUNqQyxLQUFLLFdBQVc7Ozs7O1FBS3hCLE9BQU8sc0JBQXNCLFlBQVk7O1lBRXJDLElBQUksT0FBTyxXQUFXLGFBQWEsT0FBTztnQkFDdEMsT0FBTyxXQUFXLFdBQVc7Z0JBQzdCOzs7WUFHSixPQUFPO1lBQ1AsT0FBTyxXQUFXLFdBQVc7Ozs7UUFJakMsT0FBTyxLQUFLLFlBQVk7WUFDcEIsSUFBSSxnQkFBZ0I7WUFDcEIsSUFBSSxRQUFRLFlBQVksa0JBQWtCLGNBQWMsU0FBUyxHQUFHO2dCQUNoRSxPQUFPLEtBQUs7Z0JBQ1o7OztZQUdKLGtCQUFrQixNQUFNOzs7UUFHNUIsT0FBTyxTQUFTLFlBQVk7WUFDeEIsa0JBQWtCLFFBQVE7Ozs7OztRQU05QixJQUFJLE9BQU8sWUFBWTtZQUNuQixPQUFPLFFBQVE7WUFDZixPQUFPLFVBQVU7Ozs7UUFJckI7OztJQUdKLE9BQU8sV0FBVyw4QkFBOEI7R0FDakQsUUFBUSxPQUFPO0FBQ2xCO0FDcEZBLENBQUMsVUFBVSxRQUFRO0lBQ2Y7OztJQUVBLFNBQVMsbUJBQW1CLFFBQVEsV0FBVyxtQkFBbUI7UUFDOUQsSUFBSSxPQUFPOzs7Ozs7OztRQVFYLE9BQU8sY0FBYzs7UUFFckIsT0FBTyx3QkFBd0IsU0FBUyxZQUFZLE9BQU87WUFDdkQsT0FBTyxxQkFBcUI7WUFDNUIsT0FBTyxjQUFjOzs7UUFHekIsT0FBTyxrQkFBa0IsV0FBVztZQUNoQyxVQUFVLEtBQUssaUJBQWlCLE9BQU8sbUJBQW1COzs7O1FBSTlELElBQUksT0FBTyxXQUFXO1lBQ2xCLGtCQUFrQixxQkFBcUIsS0FBSyxVQUFVLGFBQWE7Z0JBQy9ELE9BQU8scUJBQXFCOzs7O1FBSXBDOzs7SUFHSixPQUFPLFdBQVcsc0JBQXNCO0dBQ3pDLFFBQVEsT0FBTyxrQkFBa0IiLCJmaWxlIjoiY29uY2F0QXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG4gICAgWyduZ1JvdXRlJywgJ3RvYXN0cicsICduZ0FuaW1hdGUnLCBcInVpLmJvb3RzdHJhcFwiLCAnTG9jYWxTdG9yYWdlTW9kdWxlJywgJ2FuZ3VsYXItbG9hZGluZy1iYXInLCAnbmdUb3VjaCcsICduZ0ZpbGVVcGxvYWQnXHJcbiAgICAsICdhcHAuY3VzdG9tRGlyZWN0aXZlcycsICdhcHAuaG9tZScsICdhcHAuY2xhc3NlcycsICdhcHAubG9naW4nLCAnYXBwLmFjY291bnQnLCAnYXBwLmluZGV4JywgJ2FwcC5zdHVkZW50JywgJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnLCAnYXBwLmV2YWx1YXRpb24nLCAnYXBwLmRhc2hib2FyZCdcclxuICAgICwgJ2FwcC50ZWFjaGVyJywgJ2FwcC5jb3Vyc2UnLCAnYXBwLnN0dWR5UGxhbicsICdhcHAuc2Nob29seWVhciddKVxyXG5cclxuXHJcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAuYWNjb3VudCcsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvbWFuYWdlQWNjb3VudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9BY2NvdW50L3ZpZXdzL21hbmFnZUFjY291bnQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ21hbmFnZUFjY291bnRDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgIFxyXG5cclxuXHJcbiAgICB9KTtcclxuIiwiXHJcbmFuZ3VsYXIubW9kdWxlKCdhcHAuY2xhc3NlcycsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9jbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvY2xhc3Nlcy92aWV3cy9jbGFzc2VzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NsYXNzZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzOiBmdW5jdGlvbihjbGFzc2VzU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uKGNsYXNzZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDbGFzc2VzJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3MvbWFuYWdlQ2xhc3Nlcy5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgYWxsQ2xhc3NlczogZnVuY3Rpb24oY2xhc3Nlc1NlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hbGxDbGFzc2VzKCkudGhlbihmdW5jdGlvbiAoYWxsQ2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGxDbGFzc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL2NyZWF0ZUNsYXNzJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9jbGFzc2VzL3ZpZXdzL2NyZWF0ZUNsYXNzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlQ2xhc3NDb250cm9sbGVyJ1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VDb3Vyc2UnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL21hbmFnZUNvdXJzZS5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlQ291cnNlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAud2hlbignL2NvdXJzZXMnLCB7XHJcbiAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9Db3Vyc2Uvdmlld3MvY291cnNlcy5odG1sJyxcclxuICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjb3Vyc2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5nZXRDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvY3JlYXRlQ291cnNlJywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvQ291cnNlL3ZpZXdzL2NyZWF0ZUNvdXJzZS5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVDb3Vyc2VDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICBcclxuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgIC53aGVuKCcvZGFzaGJvYXJkJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2Rhc2hib2FyZC92aWV3cy9kYXNoYm9hcmQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Rhc2hib2FyZENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAvLyBkZWZpbmUgcm91dGVzXHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC53aGVuKCcvZXZhbHVhdGlvbi86YnVuZGxlSWQ/Jywge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uczogZnVuY3Rpb24gKGV2YWx1YXRpb25TZXJ2aWNlLCAkcm91dGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJ1bmRsZUlkID0gJHJvdXRlLmN1cnJlbnQucGFyYW1zLmJ1bmRsZUlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblNlcnZpY2UuZXZhbHVhdGlvbnNGb3JCdW5kbGUoYnVuZGxlSWQpLnRoZW4oZnVuY3Rpb24gKGV2YWxzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgLndoZW4oJy9zZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3MnLCB7XHJcbiAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3Mvc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzLmh0bWwnLFxyXG4gICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgIC8qbmdJbmplY3QqL1xyXG4gICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JUZWFjaGVyKCkudGhlbihmdW5jdGlvbiAoY2xhc3Nlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAud2hlbignL3NlYXJjaEV2YWx1YXRpb25zRm9yU3R1ZGVudCcsIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uL3ZpZXdzL3NlYXJjaEV2YWx1YXRpb25zRm9yU3R1ZGVudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3Nlc1NlcnZpY2UuY2xhc3Nlc0ZvclRlYWNoZXIoKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgY291cnNlczogZnVuY3Rpb24gKGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb3Vyc2VTZXJ2aWNlLmdldENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9jcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGUnLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2NyZWF0ZUV2YWx1YXRpb25UZW1wbGF0ZS5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAvKm5nSW5qZWN0Ki9cclxuICAgICAgICAgICAgICAgICAgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnM6IGZ1bmN0aW9uIChldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy9ldmFsdWF0aW9uVGVtcGxhdGVzJywge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlcy5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgLypuZ0luamVjdCovXHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uVGVtcGxhdGVzOiBmdW5jdGlvbiAoZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLmdldEV2YWx1YXRpb25UZW1wbGF0ZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICBcclxuICAgIH0pO1xyXG4iLCJcclxuYW5ndWxhci5tb2R1bGUoJ2FwcC5ob21lJywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgICAud2hlbiggJy8nLCB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2hvbWUvdmlld3MvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAud2hlbignL2hvbWUnLCB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ob21lL3ZpZXdzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2Uoe1xyXG4gICAgICAgICAgICByZWRpcmVjdFRvOiAnLydcclxuICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JywgWyduZ1JvdXRlJ10pXHJcbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAgIFwidXNlIHN0cmljdFwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGRlZmluZSByb3V0ZXNcclxuXHJcbiAgICAgICAgLy8kcm91dGVQcm92aWRlclxyXG4gICAgICAgIC8vICAud2hlbignL3JlcGxhY2UnLCB7XHJcbiAgICAgICAgLy8gICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXcgSGVyZScsXHJcbiAgICAgICAgLy8gICAgICBjb250cm9sbGVyOiAnY29udHJvbGxlciBmb3IgdmlldyBoZXJlJ1xyXG4gICAgICAgIC8vICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5sb2dpbicsIFsnbmdSb3V0ZSddKVxyXG4gICAgLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLndoZW4oJy9sb2dpbicsIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2xvZ2luL3ZpZXdzL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG5hcHAucnVuKFsnYXV0aGVudGljYXRpb25TZXJ2aWNlJywgZnVuY3Rpb24gKGF1dGhlbnRpY2F0aW9uU2VydmljZSkge1xyXG4gICAgYXV0aGVudGljYXRpb25TZXJ2aWNlLmdldEF1dGhEYXRhKCk7XHJcbn1dKTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2F1dGhJbnRlcmNlcHRvckZhY3RvcnknKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnNjaG9vbHllYXInLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAvLyRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLy8gIC53aGVuKCcvcmVwbGFjZScsIHtcclxuICAgICAgICAvLyAgICAgIHRlbXBsYXRlVXJsOiAndmlldyBIZXJlJyxcclxuICAgICAgICAvLyAgICAgIGNvbnRyb2xsZXI6ICdjb250cm9sbGVyIGZvciB2aWV3IGhlcmUnXHJcbiAgICAgICAgLy8gIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiY29udHJvbGxlcnMvY3JlYXRlU3R1ZGVudENvbnRyb2xsZXIuanNcIiAvPlxyXG5hbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9jcmVhdGVTdHVkZW50Jywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1N0dWRlbnQvdmlld3MvY3JlYXRlU3R1ZGVudC5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY3JlYXRlU3R1ZGVudENvbnRyb2xsZXInXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VTdHVkeVBsYW4nLCB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvU3R1ZHlQbGFuL3ZpZXdzL21hbmFnZVN0dWR5UGxhbi5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcidcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInLCBbJ25nUm91dGUnXSlcclxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgXCJ1c2Ugc3RyaWN0XCI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZGVmaW5lIHJvdXRlc1xyXG5cclxuICAgICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgICAgLndoZW4oJy9tYW5hZ2VUZWFjaGVyJywge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL1RlYWNoZXIvdmlld3MvbWFuYWdlVGVhY2hlci5odG1sJyxcclxuICAgICAgICAgICAgICBjb250cm9sbGVyOiAnbWFuYWdlVGVhY2hlckNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgdGVhY2hlcnMgOiBmdW5jdGlvbih0ZWFjaGVyU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRlYWNoZXJTZXJ2aWNlLmdldFRlYWNoZXJzKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcbiIsImFwcC5jb25maWcoZnVuY3Rpb24gKHRvYXN0ckNvbmZpZykge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5leHRlbmQodG9hc3RyQ29uZmlnLCB7XHJcbiAgICAgICAgYXV0b0Rpc21pc3M6IHRydWUsXHJcbiAgICAgICAgY29udGFpbmVySWQ6ICd0b2FzdC1jb250YWluZXInLFxyXG4gICAgICAgIG1heE9wZW5lZDogMTAsXHJcbiAgICAgICAgbmV3ZXN0T25Ub3A6IHRydWUsXHJcbiAgICAgICAgcG9zaXRpb25DbGFzczogJ3RvYXN0LWJvdHRvbS1yaWdodCcsXHJcbiAgICAgICAgcHJldmVudER1cGxpY2F0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHByZXZlbnRPcGVuRHVwbGljYXRlczogZmFsc2UsXHJcbiAgICAgICAgdGFyZ2V0OiAnYm9keScsXHJcblxyXG4gICAgICAgIGFsbG93SHRtbDogZmFsc2UsXHJcbiAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlSHRtbDogJzxidXR0b24+JnRpbWVzOzwvYnV0dG9uPicsXHJcbiAgICAgICAgZXh0ZW5kZWRUaW1lT3V0OiAxMDAwLFxyXG4gICAgICAgIGljb25DbGFzc2VzOiB7XHJcbiAgICAgICAgICAgIGVycm9yOiAndG9hc3QtZXJyb3InLFxyXG4gICAgICAgICAgICBpbmZvOiAndG9hc3QtaW5mbycsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ICd0b2FzdC1zdWNjZXNzJyxcclxuICAgICAgICAgICAgd2FybmluZzogJ3RvYXN0LXdhcm5pbmcnXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlQ2xhc3M6ICd0b2FzdC1tZXNzYWdlJyxcclxuICAgICAgICBvbkhpZGRlbjogbnVsbCxcclxuICAgICAgICBvblNob3duOiBudWxsLFxyXG4gICAgICAgIG9uVGFwOiBudWxsLFxyXG4gICAgICAgIHByb2dyZXNzQmFyOiBmYWxzZSxcclxuICAgICAgICB0YXBUb0Rpc21pc3M6IHRydWUsXHJcbiAgICAgICAgdGVtcGxhdGVzOiB7XHJcbiAgICAgICAgICAgIHRvYXN0OiAnZGlyZWN0aXZlcy90b2FzdC90b2FzdC5odG1sJyxcclxuICAgICAgICAgICAgcHJvZ3Jlc3NiYXI6ICdkaXJlY3RpdmVzL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmh0bWwnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aW1lT3V0OiA0MDAwLFxyXG4gICAgICAgIHRpdGxlQ2xhc3M6ICd0b2FzdC10aXRsZScsXHJcbiAgICAgICAgdG9hc3RDbGFzczogJ3RvYXN0J1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcbmFwcC5jb25maWcoZnVuY3Rpb24gKCRwcm92aWRlLCAkaHR0cFByb3ZpZGVyKSB7XHJcbiAgICAkcHJvdmlkZS5mYWN0b3J5KCdlcnJvckludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRxLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZWplY3Rpb24uZGF0YS5leGNlcHRpb25NZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL3ZhciB0b2FzdHIgPSAkaW5qZWN0b3IuZ2V0KCd0b2FzdHInKTtcclxuICAgICAgICAgICAgICAgIC8vIHRvYXN0ci5lcnJvcignRm91dCcsIHJlamVjdGlvbi5kYXRhLmV4Y2VwdGlvbk1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBlcnJvck1lc3NhZ2VTZXJ2aWNlID0gJGluamVjdG9yLmdldCgnbWVzc2FnZVNlcnZpY2UnKTtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZVNlcnZpY2UuaGFuZGxlUmVqZWN0KHJlamVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ2Vycm9ySW50ZXJjZXB0b3InKTtcclxufSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyKCRzY29wZSwgYWNjb3VudFNlcnZpY2UsICRsb2NhdGlvbiwgJHVpYk1vZGFsSW5zdGFuY2UsIG1lc3NhZ2VTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNldEFjY291bnRSb2xlID0gZnVuY3Rpb24gKHJvbGUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvLnJvbGVUeXBlID0gcm9sZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIHJvZXAgaGllciBkZSBhY2NvdW50c2VydmljZSBvcCBvbSBlZW4gbmlldXdlIGFjY291bnQgdGUgbWFrZW4gbWV0IGRlIGRhdGEgZGllIHZpYSBkZSB2aWV3IGlzIGluZ2V2dWxkLlxyXG4gICAgICAgICAgICAvLyBnZWVmICRzY29wZS5jcmVhdGVBY2NvdW50SW5mbyBtZWUgaW4gaW4gZGUgYWNjb3VudFNlcnZpY2UgbWV0aG9kZS5cclxuICAgICAgICAgICAgLy8udGhlbiBvbSB0ZSB3YWNodGVuIHRvdGRhdCBkZSBzZXJ2ZXIgZ2VhbnR3b29yZCBoZWVmdFxyXG4gICAgICAgICAgICBhY2NvdW50U2VydmljZS5jcmVhdGVBY2NvdW50KCRzY29wZS5jcmVhdGVBY2NvdW50SW5mbykudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVTdWNjZXMoXCJBY2NvdW50IGFhbmdlbWFha3QhXCIpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCk7IC8vIGdlYnJ1aWsgZGl0IGluIHRoZSAudGhlbiBmdW5jdGllIHpvZGF0IGRlIG1vZGFsIHNsdWl0IG5hIGRlIHNlcnZlcmNhbGwuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQWNjb3VudEluZm8gPSB7fTsgLy8gZ2VicnVpayBkaXQgb20gYWxsZSBpbmZvIGFhbiB0ZSBoYW5nZW4gaW4gZGUgdmlldyAoZGl0IG1vZGVsIG1vZXQgamUgc2VydmVyc2lkZSBub2cgb3Bib3V3ZW4pXHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mby5yb2xlVHlwZSA9IFwiVXNlclJvbGVcIjtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUFjY291bnRJbmZvLmlzVGVhY2hlciA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUFjY291bnRNb2RhbENvbnRyb2xsZXInLCBjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5hY2NvdW50JykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQWNjb3VudENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGFjY291bnRTZXJ2aWNlLCAkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vIGN0cmwgKyBoIHJlcGxhY2UgYWxsZSBjb250cm9sbGVybmFtZW4gZG9vciBodWlkaWdlIGNvbnRyb2xsZXJcclxuICAgICAgICAvLyB2ZXJ2YW5nIGFwcC5yZXBsYWNlIGRvb3IgZGUganVpc3RlIG1vZHVsZSBpbiBkaXQgZ2V2YWwgYXBwLmFjY291bnQgc3RhYXQgaW4gYWNjb3VudC1tb2R1bGUuanNcclxuXHJcbiAgICAgICAgLy9jb250cm9sbGVyIGluIGluZGV4Lmh0bWwgc2xlcGVuL3RvZXZvZWdlbiBvbmRlcmFhbiBiaWogc2NyaXB0cyBjb250cm9sbGVyc1xyXG5cclxuICAgICAgICAvL3ZpZXcgYWFubWFrZW4ga29waWVlciB1aXQgY29weSBmb2xkZXJcclxuICAgICAgICBcclxuICAgICAgICAvLyBpbiBtb2R1bGUgYWNjb3VudC1tb2R1bGUgcm91dGUgYWFubWFrZW4gKCRyb3V0ZVByb3ZpZGVyKVxyXG5cclxuICAgICAgICAvLyBWYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gc2VsZWN0ZXJlbiB2YW4gcmlqIGluIGFjY291bnRzdGFiZWxcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEFjY291bnQgPSBmdW5jdGlvbiAoYWNjb3VudCwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQWNjb3VudCA9IGFjY291bnQ7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jcmVhdGVBY2NvdW50SW5mbyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9BY2NvdW50L3ZpZXdzL2NyZWF0ZUFjY291bnRNb2RhbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdjcmVhdGVBY2NvdW50TW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAvLyBuaWV0cyBkb29yIHRlIGdldmVuLlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgYWNjb3VudFNlcnZpY2UuZ2V0QWNjb3VudHMoKS50aGVuKGZ1bmN0aW9uIChhY2NvdW50cykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmFjY291bnRMaXN0ID0gYWNjb3VudHM7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ21hbmFnZUFjY291bnRDb250cm9sbGVyJywgbWFuYWdlQWNjb3VudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBhY2NvdW50U2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25pZXV3ZSBtZXRob2RlIG9tIGFjY291bnQgdGUgY3JlZWVyZW4gYWFuZ2VtYWFrdFxyXG4gICAgICAgIHRoaXouY3JlYXRlQWNjb3VudCA9IGZ1bmN0aW9uIChjcmVhdGVBY2NvdW50SW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICdhY2NvdW50cy9jcmVhdGVBY2NvdW50JywgY3JlYXRlQWNjb3VudEluZm8pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QWNjb3VudEluZm8gPSBmdW5jdGlvbih1c2VybmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VQYXRoICsgJ2FjY291bnRzL2dldEFjY291bnQvJysgdXNlcm5hbWUgKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2FjY291bnRTZXJ2aWNlJywgYWNjb3VudFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmFjY291bnQnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKCRodHRwLCB0b2FzdHJDb25maWcpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBhcGlVcmwgPSAnaHR0cDovL3Rlc3RwbGF0Zm9ybUFwaS8nO1xyXG5cclxuICAgICAgICB0aGl6LmJhc2VBcGlQYXRoID0gYXBpVXJsICsgJ2FwaS8nO1xyXG5cclxuICAgICAgICB0aGl6LnRva2VuUGF0aCA9IGFwaVVybCArICdvYXV0aC90b2tlbic7XHJcblxyXG4gICAgICAgIHRoaXouZ2V0U2Nob29sWWVhcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh0aGl6LmJhc2VBcGlQYXRoICsgXCIvZ2VuZXJhbEluZm8vZ2V0c2Nob29seWVhcnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVQZGZEYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdmFyIGZpbGUgPSBuZXcgQmxvYihbZGF0YV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL3BkZicgfSk7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IpIHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc1NhdmVCbG9iKGZpbGUsICdmaWxlTmFtZS5wZGYnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhdmVBcyhmaWxlLCAnZmlsZW5hbWUucGRmJyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY29udmVyVG9VdGMgPSBmdW5jdGlvbiAodGltZSkge1xyXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gbmV3IERhdGUoKS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG4gICAgICAgICAgICB0aW1lLnNldE1pbnV0ZXModGltZS5nZXRNaW51dGVzKCkgLSBvZmZzZXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvbmZpZ3VyYXRpb25TZXJ2aWNlJywgY29uZmlndXJhdGlvblNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGNsYXNzZXMpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjbGFzc2VzQ29udHJvbGxlcicsIGNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjbGFzc2VzU2VydmljZSwgbWVzc2FnZVNlcnZpY2UsIGNvdXJzZVNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFRlYWNoZXIgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZXMgPSBbXTtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoXCIvbWFuYWdlQ2xhc3Nlc1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZENvdXJzZXMpO1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS5jcmVhdGVDbGFzcygkc2NvcGUuY3JlYXRlQ2xhc3NJbmZvKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVN1Y2NlcyhcIktsYXMgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDbGFzc2VzXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8vIHRvZG8gcmVtb3ZlIHRoaXMgXHJcbiAgICAgICAgLy8kc2NvcGUuJHdhdGNoKCdzZWxlY3RlZFRlYWNoZXInLCBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAvLyAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coJ0dlc2VsZWN0ZWVyZGUgbGVlcmthY2h0IDonICsgdmFsdWUucGVyc29uLmZpcnN0TmFtZSArICcgJyArIHZhbHVlLnBlcnNvbi5sYXN0TmFtZSk7XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgLy8vLyB0b2RvIHJlbW92ZSB0aGlzIFxyXG4gICAgICAgIC8vJHNjb3BlLiR3YXRjaCgnc2VsZWN0ZWRUZWFjaGVycycsIGZ1bmN0aW9uICh0ZWFjaGVycykge1xyXG4gICAgICAgIC8vICAgIGlmICh0ZWFjaGVycy5sZW5ndGggPCAxICkge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgXy5lYWNoKHRlYWNoZXJzLCBmdW5jdGlvbih0ZWFjaGVyKSB7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnNvbGUubG9nKCdMZWVya3JhY2h0IDonICsgdGVhY2hlci5wZXJzb24uZmlyc3ROYW1lICsgJyAnICsgdGVhY2hlci5wZXJzb24ubGFzdE5hbWUpO1xyXG4gICAgICAgIC8vICAgIH0pO1xyXG4gICAgICAgIC8vfSk7XHJcblxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDbGFzc0luZm8gPSB7fTtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNsYXNzSW5mby5uZXh0WWVhciA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy90ZWFjaGVyU2VydmljZS5nZXRUZWFjaGVycygpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAvLyAgICAkc2NvcGUudGVhY2hlcnMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlQ2xhc3NDb250cm9sbGVyJywgY3JlYXRlQ2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbWFuYWdlQ2xhc3Nlc0NvbnRyb2xsZXIoJHNjb3BlLCBjbGFzc2VzU2VydmljZSxjb3Vyc2VTZXJ2aWNlLCBtZXNzYWdlU2VydmljZSwgc2Nob29seWVhclNlcnZpY2UsIHRvYXN0ciwgJGxvY2F0aW9uLCBhbGxDbGFzc2VzLCBzZWxlY3RNb2RhbFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgIHZhciBhbGxDb3Vyc2VzID0gbnVsbDtcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vJHNjb3BlLnNldFNlbGVjdGVkU2Nob29sWWVhciA9IGZ1bmN0aW9uKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAvLyAgICAkc2NvcGUuc2VsZWN0ZWRTY2hvb2xZZWFyID0gc2Nob29seWVhcjtcclxuICAgICAgICAvL31cclxuICAgICAgICAkc2NvcGUuZmlsZVVwZGF0ZWQgPSBmdW5jdGlvbigkZmlsZXMsICRldmVudCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmlsZSA9ICRldmVudC50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnVwbG9hZENzdiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGFzc2VzU2VydmljZS51cGxvYWRDbGFzc0Nzdigkc2NvcGUuZmlsZSwgJHNjb3BlLnNlbGVjdGVkU2Nob29sWWVhcikudGhlbihmdW5jdGlvbiAocGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3MoJ0hldCBDU1YgYmVzdGFuZCBpcyBtZXQgc3VjY2VzcyBvcGdlc2xhZ2VuLicpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9rbGFzc2VuIHZvbGxlZGlnIG9wcm9lcGVuIGZpbHRlcmVuIGNsaWVudHNpZGVcclxuICAgICAgICAvL3N0dWRlbnRlbiAxMC8xMCB2YW4gc2VydmVyIG9waGFsZW5cclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NYLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGNsYXNzWDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuYWRkQ291cnNlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbCgnc2VsZWN0Q291cnNlc01vZGFsJywgYWxsQ291cnNlcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3Nlc1NlcnZpY2UuYWRkQ291cnNlcygkc2NvcGUuc2VsZWN0ZWRDbGFzcy5pZCwgcmVzdWx0KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVTdWNjZXMoXCJEZSB2YWtrZW4gemlqbiB0b2VnZXZvZWdkLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pOyAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbiAoc2Nob29seWVhcnMpIHtcclxuICAgICAgICAgICAgICAkc2NvcGUuc2Nob29sWWVhcnMgPSBzY2hvb2x5ZWFycztcclxuICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTY2hvb2xZZWFyID0gc2Nob29seWVhcnNbMF07XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBjb3Vyc2VTZXJ2aWNlLmFsbENvdXJzZXMoKS50aGVuKGZ1bmN0aW9uIChjb3Vyc2VzKSB7ICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgIGFsbENvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5hbGxDbGFzc2VzID0gYWxsQ2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmFsbENsYXNzZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VDbGFzc2VzQ29udHJvbGxlcicsIG1hbmFnZUNsYXNzZXNDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jbGFzc2VzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLCBjbGFzc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZENsYXNzID0gZnVuY3Rpb24gKGtsYXMsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gaW5kZXg7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuc2VsZWN0ZWRDbGFzcykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZENsYXNzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jbGFzc2VzID0gY2xhc3NlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coY2xhc3Nlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJywgc2VsZWN0Q2xhc3NNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgZnVuY3Rpb24gdGVzdENsYXNzQ29udHJvbGxlcigkc2NvcGUsIGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgIGNsYXNzZXNTZXJ2aWNlLmdldFRlc3RDbGFzcygpLnRoZW4oZnVuY3Rpb24gKGNsYXNzUmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgJHNjb3BlLnRlc3RDbGFzcyA9IGNsYXNzUmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignVGVzdENsYXNzQ29udHJvbGxlcicsIHRlc3RDbGFzc0NvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsYXNzZXNTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSwgVXBsb2FkKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmNsYXNzZXNGb3JUZWFjaGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yVGVhY2hlcicpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5jbGFzc2VzRm9yQ291cnNlID0gZnVuY3Rpb24oY291cnNlSWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9jbGFzc2VzRm9yQ291cnNlJywgeyAnaWQnOiBjb3Vyc2VJZCB9KS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYXZhaWxhYmxlQ2xhc3Nlc0ZvclRlYWNoZXIgPSBmdW5jdGlvbih0ZWFjaGVySWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdjbGFzcy9hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcicsIHsgJ2lkJzogdGVhY2hlcklkIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei51cGxvYWRDbGFzc0NzdiA9IGZ1bmN0aW9uKGZpbGUsIHNjaG9vbFllYXIpIHtcclxuICAgICAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL3VwbG9hZENsYXNzQ3N2JywgeyBmaWxlOiBmaWxlIH1cclxuICAgICAgICAgICAgICByZXR1cm4gICBVcGxvYWQudXBsb2FkKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBiYXNlV2ViQXBpVXJsICsgJ2NsYXNzL3VwbG9hZENsYXNzQ3N2LycgKyBzY2hvb2xZZWFyLmlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB7IGZpbGU6IGZpbGUgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdTdWNjZXNzICcgKyByZXNwLmNvbmZpZy5kYXRhLmZpbGUubmFtZSArICd1cGxvYWRlZC4gUmVzcG9uc2U6ICcgKyByZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVzcCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHN0YXR1czogJyArIHJlc3Auc3RhdHVzKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGV2dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzUGVyY2VudGFnZSA9IHBhcnNlSW50KDEwMC4wICogZXZ0LmxvYWRlZCAvIGV2dC50b3RhbCk7XHJcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcm9ncmVzczogJyArIHByb2dyZXNzUGVyY2VudGFnZSArICclICcgKyBldnQuY29uZmlnLmRhdGEuZmlsZS5uYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5hbGxDbGFzc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY2xhc3MvYWxsQ2xhc3Nlc1wiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbihjcmVhdGVDbGFzc0luZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY2xhc3MvY3JlYXRlQ2xhc3NcIiwgY3JlYXRlQ2xhc3NJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlcyA9IGZ1bmN0aW9uKGNsYXNzSWQsIGNvdXJzZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiY2xhc3MvXCIgKyBjbGFzc0lkICsgXCIvYWRkQ291cnNlXCIsIGNvdXJzZXMpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NsYXNzZXNTZXJ2aWNlJywgY2xhc3Nlc1NlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNsYXNzZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jb3Vyc2VzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NvdXJzZUNvbnRyb2xsZXInLCBjb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VTZXJ2aWNlLCAkdWliTW9kYWwsIHN0dWR5UGxhblNlcnZpY2UsIG1lc3NhZ2VTZXJ2aWNlLCBzY2hvb2x5ZWFyU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8gPSB7fTtcclxuICAgICAgICAkc2NvcGUuc3R1ZHlwbGFucyA9IFtdO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDb3Vyc2VcIik7XHJcbiAgICAgICAgICAgIC8vd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIiMvbWFuYWdlQ291cnNlXCI7IC8vYmlqIGxvY2F0aW9uLnBhdGggZ2VlbiAjIGJpamRvZW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY291cnNlU2VydmljZS5jcmVhdGVDb3Vyc2UoJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8pLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVTdWNjZXMoXCJDdXJzdXMgYWFuZ2VtYWFrdCFcIik7XHJcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aChcIi9tYW5hZ2VDb3Vyc2VcIik7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNyZWF0ZUNvdXJzZUluZm8pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFNjaG9vbFllYXIgPSBmdW5jdGlvbiAoc2Nob29seWVhcikge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mby5zY2hvb2xZZWFyID0gc2Nob29seWVhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb3Vyc2VJbmZvID0ge307XHJcblxyXG4gICAgICAgICAgICBzY2hvb2x5ZWFyU2VydmljZS5nZXRGdXR1cmVTY2hvb2xZZWFycygpLnRoZW4oZnVuY3Rpb24gKHNjaG9vbHllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2Nob29sWWVhcnMgPSBzY2hvb2x5ZWFycztcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY3JlYXRlQ291cnNlSW5mby5zY2hvb2xZZWFyID0gJHNjb3BlLnNjaG9vbFllYXJzWzBdO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgc3R1ZHlQbGFuU2VydmljZS5nZXRTdHVkeVBsYW5zKCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zdHVkeXBsYW5zID0gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NyZWF0ZUNvdXJzZUNvbnRyb2xsZXInLCBjcmVhdGVDb3Vyc2VDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtYW5hZ2VDb3Vyc2VDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignbWFuYWdlQ291cnNlQ29udHJvbGxlcicsIG1hbmFnZUNvdXJzZUNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmNvdXJzZScpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY291cnNlU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VXZWJBcGlVcmwgPSBjb25maWd1cmF0aW9uU2VydmljZS5iYXNlQXBpUGF0aDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgdGhpei5nZXRDb3Vyc2VzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiY291cnNlcy9jb3Vyc2VzRm9yVGVhY2hlclwiKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmFsbENvdXJzZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2FsbENvdXJzZXNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVDb3Vyc2UgPSBmdW5jdGlvbiAoY3JlYXRlQ291cnNlSW5mbykge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgXCJjb3Vyc2VzL2NyZWF0ZUNvdXJzZVwiLCBjcmVhdGVDb3Vyc2VJbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2NvdXJzZVNlcnZpY2UnLCBjb3Vyc2VTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jb3Vyc2UnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsKHNlbGVjdE1vZGFsU2VydmljZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiBcIjxhIGNsYXNzPSdidG4gYnRuLWRlZmF1bHQnID48aSBjbGFzcz0nZmEgZmEtc2VhcmNoJz48L2k+PC9hPlwiLFxyXG4gICAgICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxuYW1lOiAnQCcsXHJcbiAgICAgICAgICAgICAgICBpdGVtczogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uOic9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbChzY29wZS5tb2RhbG5hbWUsIHNjb3BlLml0ZW1zKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2VsZWN0aW9uID0gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5kaXJlY3RpdmUoJ3NlbGVjdE1vZGFsJywgc2VsZWN0TW9kYWwpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmN1c3RvbURpcmVjdGl2ZXMnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdE1vZGFsU2VydmljZSgkdWliTW9kYWwpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBtb2RhbFNldHRpbmdzID0gW1xyXG4gICAgICAgICAgIC8qc2VsZWN0VGVhY2hlck1vZGFsU2V0dGluZyovXHJcbiAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICBtb2RhbE5hbWU6IFwic2VsZWN0VGVhY2hlck1vZGFsXCIsIHRlbXBsYXRlOiBcImFwcC9jdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3RlYWNoZXIvc2VsZWN0VGVhY2hlck1vZGFsLmh0bWxcIiwgY29udHJvbGxlcjogXCJzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiTGVlcmtyYWNodGVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgZWVuIGxlZXJrcmFjaHRcIiB9XHJcbiAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgLypzZWxlY3RUZWFjaGVyc01vZGFsU2V0dGluZyAgPT4gbXVsdGlwbGUgdGVhY2hlcnMqL1xyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBcInNlbGVjdFRlYWNoZXJzTW9kYWxcIiwgdGVtcGxhdGU6IFwiYXBwL2N1c3RvbURpcmVjdGl2ZXMvc2VsZWN0TW9kYWxEaXJlY3RpdmUvdGVhY2hlci9zZWxlY3RUZWFjaGVyc01vZGFsLmh0bWxcIiwgY29udHJvbGxlcjogXCJzZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICAgICBjb250ZW50OiB7IHRpdGxlOiBcIkxlZXJrcmFjaHRlblwiLCBpdGVtRGVzY3JpcHRpb246IFwiU2VsZWN0ZWVyIGxlZXJrcmFjaHRlblwiIH1cclxuICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgLypzZWxlY3RTdHVkeXBsYW5Nb2RhbFNldHRpbmcqL1xyXG4gICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBcInNlbGVjdFN0dWR5cGxhbk1vZGFsXCIsIHRlbXBsYXRlOiBcImFwcC9jdXN0b21EaXJlY3RpdmVzL3NlbGVjdE1vZGFsRGlyZWN0aXZlL3N0dWR5cGxhbi9zZWxlY3RTdHVkeXBsYW5Nb2RhbC5odG1sXCIsIGNvbnRyb2xsZXI6IFwic2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICAgICBjb250ZW50OiB7IHRpdGxlOiBcIkxlZXJwbGFubmVuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgZWVuIGxlZXJwbGFuXCIgfVxyXG4gICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgLy9zZWxlY3RDb3Vyc2VzTW9kYWxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBcInNlbGVjdENvdXJzZXNNb2RhbFwiLCB0ZW1wbGF0ZTogXCJhcHAvY3VzdG9tRGlyZWN0aXZlcy9zZWxlY3RNb2RhbERpcmVjdGl2ZS9jb3Vyc2VzL3NlbGVjdENvdXJzZXNNb2RhbC5odG1sXCIsIGNvbnRyb2xsZXI6IFwic2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHsgdGl0bGU6IFwiQ3Vyc3Vzc2VuXCIsIGl0ZW1EZXNjcmlwdGlvbjogXCJTZWxlY3RlZXIgY3Vyc3Vzc2VuXCIgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgLypPdGhlciBzZXR0aW5ncyovXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFyIGdldE1vZGFsU2V0dGluZyA9IGZ1bmN0aW9uIChtb2RhbE5hbWUpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF8uZmluZChtb2RhbFNldHRpbmdzLCBmdW5jdGlvbiAobW9kYWxTZXR0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWxTZXR0aW5nLm1vZGFsTmFtZS50b0xvd2VyQ2FzZSgpID09PSBtb2RhbE5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2VlbiBtb2RhbCBzZXR0aW5nIGdldm9uZGVuXCIpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5vcGVuTW9kYWwgPSBmdW5jdGlvbiAobW9kYWxOYW1lLCBpdGVtcykge1xyXG5cclxuICAgICAgICAgICAgdmFyIG1vZGFsU2V0dGluZyA9IGdldE1vZGFsU2V0dGluZyhtb2RhbE5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBtb2RhbFNldHRpbmcudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBtb2RhbFNldHRpbmcuY29udHJvbGxlcixcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9kYWxTZXR0aW5nLmNvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnc2VsZWN0TW9kYWxTZXJ2aWNlJywgc2VsZWN0TW9kYWxTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJykpOyAvL3Rlc3QiLCIvKiBHdWlkZSA6XHJcblVzZSB0aGUgZGlyZWN0aXZlIGJ5IGFkZGluZyB0aGUgZm9sb3dpbmcgaHRtbCBjb2RlIHRvIHlvdXIgcGFnZSA6XHJcbjxzZWxlY3Qtc2Nob29seWVhciBzZWxlY3RlZD1cInNlbGVjdGVkU2Nob29sWWVhclwiPjwvc2VsZWN0LXNjaG9vbHllYXI+XHJcbkFkanVzdCB0aGUgdmFsdWUgb2YgdGhlIHNlbGVjdGVkIGF0dHJpYnV0ZSB0byB0aGUgb25lIGxpbmsgdG8gdGhlIHZpZXdzIGNvbnRyb2xsZXIgc2NvcGUuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNlbGVjdFNjaG9vbHllYXIoJHJvb3RTY29wZSwgc2Nob29seWVhclNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgc2V0dXBTY29wZSA9IGZ1bmN0aW9uIChzY29wZSxzY2hvb2x5ZWFycykge1xyXG4gICAgICAgICAgICBzY29wZS5zY2hvb2x5ZWFycyA9IHNjaG9vbHllYXJzO1xyXG4gICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHNjb3BlLnNjaG9vbHllYXJzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8bGFiZWwgZm9yPVwic2Nob29seWVhclNlbGVjdG9yXCIgY2xhc3M9XCJjb250cm9sLWxhYmVsXCI+U2Nob29samFhcjo8L2xhYmVsPjxkaXYgaWQ9XCJzY2hvb2x5ZWFyU2VsZWN0b3JcIiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHVpYi1kcm9wZG93biB1aWItZHJvcGRvd24tdG9nZ2xlPjxhIGNsYXNzPVwiYnRuLWRlZmF1bHRcIiA+e3tzZWxlY3RlZC5ub3RhdGlvbn19IDxpIGNsYXNzPVwiZmEgZmEtY2FyZXQtZG93blwiPjwvaT48L2E+PHVsIHVpYi1kcm9wZG93bi1tZW51IHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbGxlZGJ5PVwic2luZ2xlLWJ1dHRvblwiPjxsaSBuZy1yZXBlYXQ9XCJzY2hvb2x5ZWFyIGluIHNjaG9vbHllYXJzIHwgb3JkZXJCeTpcXCdzdGFydFllYXJcXCdcInJvbGU9XCJtZW51aXRlbVwiIG5nLWNsaWNrPVwic2V0U2VsZWN0ZWRTY2hvb2xZZWFyKHNjaG9vbHllYXIpXCI+PGE+e3tzY2hvb2x5ZWFyLm5vdGF0aW9ufX08L2E+PC9saT48L3VsPjwvZGl2PicsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogJz0nLFxyXG4gICAgICAgICAgICAgICAgc2Nob29seWVhcnM6ICc9J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHJvb3RTY29wZS5mdXR1cmVTY2hvb2xZZWFycykgfHwgJHJvb3RTY29wZS5mdXR1cmVTY2hvb2xZZWFycyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nob29seWVhclNlcnZpY2UuZ2V0RnV0dXJlU2Nob29sWWVhcnMoKS50aGVuKGZ1bmN0aW9uKHNjaG9vbHllYXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHVwU2NvcGUoc2NvcGUsIHNjaG9vbHllYXJzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0dXBTY29wZShzY29wZSwgJHJvb3RTY29wZS5mdXR1cmVTY2hvb2xZZWFycyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcGUuc2V0U2VsZWN0ZWRTY2hvb2xZZWFyID0gZnVuY3Rpb24gKHNjaG9vbHllYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zZWxlY3RlZCA9IHNjaG9vbHllYXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5kaXJlY3RpdmUoJ3NlbGVjdFNjaG9vbHllYXInLCBzZWxlY3RTY2hvb2x5ZWFyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5jdXN0b21EaXJlY3RpdmVzJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZGFzaGJvYXJkQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbikge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmNhbGVuZGVyUGF0aCA9ICdhcHAvZGFzaGJvYXJkL3ZpZXdzL3BhcnRpYWxzL2NhbGVuZGFyUGFydGlhbC5odG1sJztcclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdkYXNoYm9hcmRDb250cm9sbGVyJywgZGFzaGJvYXJkQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBkYXNoYm9hcmRTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2Rhc2hib2FyZFNlcnZpY2UnLCBkYXNoYm9hcmRTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5kYXNoYm9hcmQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblNlcnZpY2UsIGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbiA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgLy8gZXZhbHVhdGlvblNlcnZpY2Uuc2V0U3Vic2VjdGlvblNjb3JlcygpOyAvLyBmaW5kIG90aGVyIHNvbHV0aW9uIHRvIG1hcCBzY29yZXMgbm90IG9uIGV2cnkgc2VsZWN0LlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTY29yZSA9IGZ1bmN0aW9uIChldmFsdWF0aW9uSXRlbSwgc2NvcmUpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbkl0ZW0uc2NvcmUgPSBzY29yZTtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbkl0ZW0ubm90U2NvcmVkUmVhc29uID0gMDtcclxuXHJcbiAgICAgICAgICAgIHRoaXouYWN0aW9uVGFrZW4oKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbigkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uKS50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXhFdmEgPSBfLmZpbmRJbmRleCgkc2NvcGUuZXZhbHVhdGlvbnMsIGZ1bmN0aW9uIChldmEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkID09PSBldmFsdWF0aW9uLmlkO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi51bnNhdmVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zW2luZGV4RXZhXSA9IGV2YWx1YXRpb247XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBoYXNoa2V5ID0gJHNjb3BlLnNlbGVjdGVkRXZhbHVhdGlvbi4kJGhhc2hLZXk7XHJcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLiQkaGFzaEtleSA9IGhhc2hrZXk7XHJcbiAgICAgICAgICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS51cGRhdGVFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UudXBkYXRlRXZhbHVhdGlvbnMoJHNjb3BlLmV2YWx1YXRpb25zKS50aGVuKGZ1bmN0aW9uKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuXHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbihldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbnMudW5zYXZlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVwZGF0ZUFmdGVyQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXROb3RTY29yZWRSZWFzb24gPSBmdW5jdGlvbihldmFsdWF0aW9uaXRlbSwgbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGV2YWx1YXRpb25pdGVtLm5vdFNjb3JlZFJlYXNvbiA9IG51bWJlcjtcclxuICAgICAgICAgICAgZXZhbHVhdGlvbml0ZW0uc2NvcmUgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdGhpei5hY3Rpb25UYWtlbigpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS51bkxvY2sgPSBmdW5jdGlvbiAoc2VsZWN0ZWRFdmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIGRvIHNlcnZlciBzaWRlIGxvZ2ljXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5sb2NraW5nIHNlbGVjdGVkIGV2YWx1YXRpb25cIik7XHJcblxyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS51bmxvY2tFZGl0YWJsZShzZWxlY3RlZEV2YWx1YXRpb24uaWQpLnRoZW4oZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRXZhbHVhdGlvbi5lZGl0QWJsZVN0YXRlLmNhbkVkaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlQWZ0ZXJDaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvblNlcnZpY2UubWFwSXRlbXNUb1N1YlNlY3Rpb24oJHNjb3BlLmV2YWx1YXRpb25zKTtcclxuICAgICAgICAgICAgLy8gZXZhbHVhdGlvblNlcnZpY2Uuc2V0U3Vic2VjdGlvblNjb3JlcygpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGl6Lm1hcEl0ZW1zVG9TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBkaWZmZXJlbnRTdWJzZWN0aW9ucyA9IF8uZ3JvdXBCeShldmFsdWF0aW9uLmV2YWx1YXRpb25JdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLnNvcnRCeShkaWZmZXJlbnRTdWJzZWN0aW9ucywgZnVuY3Rpb24oc3ViKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlswXS5ldmFsdWF0aW9uU3ViU2VjdGlvbi53ZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGV2YWx1YXRpb24ubWFwcGVkU3Vic2VjdGlvbnMgPSBkaWZmZXJlbnRTdWJzZWN0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAqL1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8vLyB2YXIgdmFsdWUgPSBvYmplY3Rba2V5XSA9PiB1c2UgZGljdGlvbmFyeSBmcm9tIGMjIHRoaXMgd2F5XHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zLCBmdW5jdGlvbiAoc3Vic2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0KSAmJiAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLnJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YnNlY3Rpb24udG90YWxTY29yZSA9ICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24ucmVzdWx0LnRvdGFsc1BlcmNhdGVnb3J5W3N1YnNlY3Rpb25bMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24uaWRdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gbWFwIGV2ZXJ5IGV2YWx1YXRpb24gbm90IGp1c3Qgc2VsZWN0ZWQgc28gaXQgY2FuIGJlIHByb2Nlc2VkIGluIGludCgpXHJcbiAgICAgICAgfTtcclxuICAgICAgICAqL1xyXG4gICAgICAgIHRoaXouYWN0aW9uVGFrZW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24udW5zYXZlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmFueVVuc2F2ZWRFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9ucy5zb21lKGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZhbHVhdGlvbi51bnNhdmVkID09PSB0cnVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZhbHVhdGlvbnNbMF0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NUaXRsZSA9IGV2YWx1YXRpb25zWzBdLmNyZWF0ZWRGb3JDbGFzcy5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdEV2YWx1YXRpb24oZXZhbHVhdGlvbnNbMF0pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnMgPSBldmFsdWF0aW9uU2VydmljZS5tYXBJdGVtc1RvU3ViU2VjdGlvbihldmFsdWF0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5ldmFsdWF0aW9ucyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdldmFsdWF0aW9uQ29udHJvbGxlcicsIGV2YWx1YXRpb25Db250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvbnMsICR1aWJNb2RhbEluc3RhbmNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIHZhciBnZXRTZWxlY3RlZElkcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXy5tYXAoJHNjb3BlLmV2YWx1YXRpb25zLCBmdW5jdGlvbihldmEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmEuc2VsZWN0ZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZhLmlkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLmNoZWNrQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkQWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQWxsID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9ucywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSAkc2NvcGUuc2VsZWN0ZWRBbGw7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZShnZXRTZWxlY3RlZElkcygpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IGV2YWx1YXRpb25zO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25zVG9QZGZNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uLCBldmFsdWF0aW9uU2VydmljZSwgJHVpYk1vZGFsSW5zdGFuY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25Ub1BkZiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UuY3JlYXRlUGRmRm9yRXZhbHVhdGlvbigkc2NvcGUuZXZhbHVhdGlvbik7XHJcbiAgICAgICAgICAgICRzY29wZS5vaygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU2VydmljZS5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uKGV2YWx1YXRpb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZhbHVhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXInLCBzY29yZWRFdmFsdWF0aW9uTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcywgY2xhc3NlcywgZXZhbHVhdGlvblNlcnZpY2UsICR1aWJNb2RhbCwgJGNvbXBpbGUsICR0aW1lb3V0LCAkdGVtcGxhdGVDYWNoZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0ID0ge307XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuc2V0Q2xhc3MgPSBmdW5jdGlvbihrbGFzKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ga2xhcztcclxuICAgICAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0LmNsYXNzSWQgPSAkc2NvcGUuc2VsZWN0ZWRDbGFzcy5pZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc2V0Q291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5xdWVyeU9iamVjdC5jb3Vyc2VJZCA9ICRzY29wZS5zZWxlY3RlZENvdXJzZS5pZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5xdWVyeU9iamVjdC5zdGFydERhdGUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUucXVlcnlPYmplY3QuZW5kRGF0ZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5xdWVyeU9iamVjdC5jbGFzc0lkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0LmNvdXJzZUlkID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnF1ZXJ5T2JqZWN0LmRlc2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLnNob3dwYWdpbmF0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlYXJjaCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXJ5T2JqZWN0SXNWYWxpZCA9IGV2YWx1YXRpb25TZXJ2aWNlLnZhbGlkYXRlRXZhbHVhdGlvblRvdGFsc0ZvckNsYXNzT3ZlclZpZXdRdWVyeUR0bygkc2NvcGUucXVlcnlPYmplY3QpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5T2JqZWN0SXNWYWxpZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2Uuc2VhcmNoRXZhbHVhdGlvbkZvckNsYXNzVG90YWxPdmVydmlld3MoJHNjb3BlLnF1ZXJ5T2JqZWN0KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS50YWJsZVBhcmFtcyA9IGV2YWx1YXRpb25TZXJ2aWNlLnRyYW5zZm9ybUV2YWx1YXRpb25Gb3JDbGFzc092ZXJ2aWV3c1RvVGFibGVQYXJhbXMocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAgICRzY29wZS5vcGVuU2NvcmVkRXZhbHVhdGlvbk1vZGFsID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9zY29yZWRFdmFsdWF0aW9uTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnc2NvcmVkRXZhbHVhdGlvbk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2YWx1YXRpb246IGV2YWx1YXRpb25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8kc2NvcGUudG9QZGYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gICAgLy8kdGVtcGxhdGVDYWNoZS5wdXQoJ3RhYmxlSHRtbCcsICQoXCIjb3ZlcnZpZXdUYWJsZVwiKS5odG1sKCkpO1xyXG4gICAgICAgIC8vICAgIC8vdmFyIGNvbnRlbnRzID0gJGNvbXBpbGUoJHRlbXBsYXRlQ2FjaGUuZ2V0KCd0YWJsZUh0bWwnKSkoJHNjb3BlKTtcclxuICAgICAgICAvLyAgICAvLyR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAvLyAgICBjb25zb2xlLmxvZyhjb250ZW50cy5odG1sKCkpO1xyXG4gICAgICAgIC8vICAgIC8vfSwgMzAwKTsgICAvLyB3YWl0IGZvciBhIHNob3J0IHdoaWxlXHJcblxyXG4gICAgICAgIC8vICAgIHZhciBjb250ZW50cyA9ICQoXCIjb3ZlcnZpZXdUYWJsZVwiKS5odG1sKCk7XHJcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2coY29udGVudHMpO1xyXG4gICAgICAgIC8vfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2VzID0gY291cnNlcztcclxuICAgICAgICAgICAgJHNjb3BlLmNsYXNzZXMgPSBjbGFzc2VzO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmNsZWFyU2VhcmNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ3NlYXJjaEV2YWx1YXRpb25Gb3JDbGFzc0NvbnRyb2xsZXInLCBzZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3NDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Q29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgY291cnNlcywgY2xhc3NlcywgZXZhbHVhdGlvblNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCA9IHt9O1xyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNldENsYXNzID0gZnVuY3Rpb24oa2xhcykge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRDbGFzcyA9IGtsYXM7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY2xhc3NJZCA9ICRzY29wZS5zZWxlY3RlZENsYXNzLmlkO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRDb3Vyc2UgPSBmdW5jdGlvbiAoY291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENvdXJzZSA9IGNvdXJzZTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5jb3Vyc2VJZCA9ICRzY29wZS5zZWxlY3RlZENvdXJzZS5pZDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QucGFnZSA9IDE7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3Quc3RhcnREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5lbmREYXRlID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdC5maW5pc2hlZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY2xhc3NJZCA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QuY291cnNlSWQgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnN0dWRlbnRGaXJzdG5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LnN0dWRlbnRMYXN0bmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0gbnVsbDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5zaG93cGFnaW5hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWFyY2ggPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2Uuc2VhcmNoRXZhbHVhdGlvbnMoJHNjb3BlLmV2YWx1YXRpb25zUGFnZWRRdWVyeU9iamVjdCkudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5UmVzdWx0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25zID0gZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5UmVzdWx0LmV2YWx1YXRpb25zO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnRvdGFsSXRlbXMgPSBldmFsdWF0aW9uc1BhZ2VkUXVlcnlSZXN1bHQudG90YWxJdGVtcztcclxuICAgICAgICAgICAgICAgICRzY29wZS5zaG93cGFnaW5hdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZXZhbHVhdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5ldmFsdWF0aW9uc1RvUGRmID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvbi92aWV3cy9ldmFsdWF0aW9uc1RvUGRmTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZXZhbHVhdGlvbnNUb1BkZk1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2YWx1YXRpb25zOyAvLyBtYXliZSBkbyBhIHNlYXJjaCBhZ2FpbiB3aXRoIG1vcmUgaXRlbXMgcGFnZWQ/XHJcbiAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZEV2YWx1YXRpb25JZHMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgICAgICBwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5T2JqZWN0LkV2YWx1YXRpb25JZHMgPSBzZWxlY3RlZEV2YWx1YXRpb25JZHM7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UuY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMocGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCk7XHJcblxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlblNjb3JlZEV2YWx1YXRpb25Nb2RhbCA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb24vdmlld3Mvc2NvcmVkRXZhbHVhdGlvbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3Njb3JlZEV2YWx1YXRpb25Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBldmFsdWF0aW9uOiBldmFsdWF0aW9uXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNvdXJzZXMgPSBjb3Vyc2VzO1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3NlcyA9IGNsYXNzZXM7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUuY2xlYXJTZWFyY2goKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VhcmNoRXZhbHVhdGlvbnNGb3JTdHVkZW50Q29udHJvbGxlcicsIHNlYXJjaEV2YWx1YXRpb25zRm9yU3R1ZGVudENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb24nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UsIG1lc3NhZ2VTZXJ2aWNlLCAkZmlsdGVyLCAkcSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICB0aGl6LmV2YWx1YXRpb25zRm9yQnVuZGxlID0gZnVuY3Rpb24gKGJ1bmRsZUlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9ldmFsdWF0aW9uc0ZvckJ1bmRsZScsIHsgJ2lkJzogYnVuZGxlSWQgfSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXoudXBkYXRlRXZhbHVhdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9uJywgZXZhbHVhdGlvbikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB0aGl6LnVwZGF0ZUV2YWx1YXRpb25zID0gZnVuY3Rpb24gKGV2YWx1YXRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91cGRhdGVFdmFsdWF0aW9ucycsIGV2YWx1YXRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5zZWFyY2hFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uIChwZGZGb3JFdmFsdWF0aW9uc1F1ZXJ5RHRvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9zZWFyY2hFdmFsdWF0aW9ucycsIHBkZkZvckV2YWx1YXRpb25zUXVlcnlEdG8pLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnNlYXJjaEV2YWx1YXRpb25Gb3JDbGFzc1RvdGFsT3ZlcnZpZXdzID0gZnVuY3Rpb24gKHF1ZXJ5RHRvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi9zZWFyY2hFdmFsdWF0aW9uRm9yQ2xhc3NUb3RhbE92ZXJ2aWV3cycsIHF1ZXJ5RHRvKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9ucyA9IGZ1bmN0aW9uIChldmFsdWF0aW9uc1BhZ2VkUXVlcnlPYmplY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uL2NyZWF0ZVBkZkZvckV2YWx1YXRpb25zJywgZXZhbHVhdGlvbnNQYWdlZFF1ZXJ5T2JqZWN0LCB7IHJlc3BvbnNlVHlwZTogJ2FycmF5YnVmZmVyJyB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25maWd1cmF0aW9uU2VydmljZS5oYW5kbGVQZGZEYXRhKHJlc3VsdC5kYXRhKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVQZGZGb3JFdmFsdWF0aW9uID0gZnVuY3Rpb24gKGV2YWx1YXRpb24pIHtcclxuICAgICAgICAgICAgdmFyIHBkZkZvckV2YWx1YXRpb25zUXVlcnlPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgcGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdC5FdmFsdWF0aW9uSWRzID0gW2V2YWx1YXRpb24uaWRdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXouY3JlYXRlUGRmRm9yRXZhbHVhdGlvbnMocGRmRm9yRXZhbHVhdGlvbnNRdWVyeU9iamVjdCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5wbGFubmVkRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArIFwiZXZhbHVhdGlvbi9wbGFubmVkRXZhbHVhdGlvbnNcIikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYW5uZWQgRXZhbHVhdGlvbnNcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXoudHJhbnNmb3JtRXZhbHVhdGlvbkZvckNsYXNzT3ZlcnZpZXdzVG9UYWJsZVBhcmFtcyA9IGZ1bmN0aW9uIChvdmVydmlld3MpIHtcclxuICAgICAgICAgICAgaWYgKG92ZXJ2aWV3cyA9PSBudWxsIHx8IG92ZXJ2aWV3cy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVXYXJuaW5nKCdHZWVuIGV2YWx1YXRpZXMgZ2V2b25kZW4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhYmxlUGFyYW1zID0ge307XHJcbiAgICAgICAgICAgIHRhYmxlUGFyYW1zLmFsbEV2YWx1YXRpb25zID0gb3ZlcnZpZXdzO1xyXG4gICAgICAgICAgICB0YWJsZVBhcmFtcy5yZXN1bHRzRm9yU3R1ZGVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIC8vIGxvb3Agb3ZlciBhbGwgdGhlIHN0dWRlbnMgZm9ybSB0aGUgY2xhc3NcclxuICAgICAgICAgICAgXy5lYWNoKG92ZXJ2aWV3c1swXS5jcmVhdGVkRm9yQ2xhc3Muc3R1ZGVudHMsIGZ1bmN0aW9uIChzdHVkZW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Rm9yU3R1ZGVudCA9IHsgJ3N0dWRlbnQnOiBzdHVkZW50LCAndG90YWxzJzogW10gfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vZmluZCBhIHJlc3VsdCBmb3IgdGhlIHN0dWRlbnQgZm9ybSB0aGUgb3ZlcnZpZXcuIEZpbGwgdXAgbm9uIG1hdGNoaW5nIHdpdGggYWx0ZXJuYXRpdmUgZGF0YS5cclxuICAgICAgICAgICAgICAgIF8uZWFjaChvdmVydmlld3MsIGZ1bmN0aW9uIChvdmVydmlldykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3RhbCA9IHsgJ3RvdGFsJzogJycsICdnZW5lcmFsQ29tbWVudCc6ICcnIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2YVN1bSA9IF8uZmluZChvdmVydmlldy5ldmFsdXRpb25TdW1tYXJpZXMsIGZ1bmN0aW9uIChzdW1tYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdW1tYXJ5LnN0dWRlbnQuaWQgPT09IHN0dWRlbnQuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldmFTdW0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbC50b3RhbCA9IGV2YVN1bS5yZXN1bHQgIT0gbnVsbCA/ICRmaWx0ZXIoJ251bWJlcicpKGV2YVN1bS5yZXN1bHQudG90YWwsIDIpIDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvdGFsLmdlbmVyYWxDb21tZW50ID0gZXZhU3VtLmdlbmVyYWxDb21tZW50ICAhPSBudWxsID8gZXZhU3VtLmdlbmVyYWxDb21tZW50IDogJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwudG90YWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWwuZ2VuZXJhbENvbW1lbnQgPSBcIk5pZXQgaW5nZXZ1bGRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEZvclN0dWRlbnQudG90YWxzLnB1c2godG90YWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGFibGVQYXJhbXMucmVzdWx0c0ZvclN0dWRlbnRzLnB1c2gocmVzdWx0Rm9yU3R1ZGVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRhYmxlUGFyYW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei52YWxpZGF0ZUV2YWx1YXRpb25Ub3RhbHNGb3JDbGFzc092ZXJWaWV3UXVlcnlEdG8gPSBmdW5jdGlvbiAocXVlckR0bykge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChxdWVyRHRvLmNsYXNzSWQpIHx8IHF1ZXJEdG8uY2xhc3NJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVXYXJuaW5nKCdKZSBtb2V0IGVlbiBrbGFzIHNlbGVjdGVyZW4gb20gdGUga3VubmVuIHpvZWtlbi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZChxdWVyRHRvLmNvdXJzZUlkKSB8fCBxdWVyRHRvLmNvdXJzZUlkID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VTZXJ2aWNlLmhhbmRsZVdhcm5pbmcoJ0plIG1vZXQgZWVuIHZhayBzZWxlY3RlcmVuIG9tIHRlIGt1bm5lbiB6b2VrZW4uJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LnVubG9ja0VkaXRhYmxlID0gZnVuY3Rpb24oZXZhbHVhdGlvbklkKSB7XHJcbiAgICAgICAgICAgIHZhciBndWlkRHRvID0geyAnaWQnOiBldmFsdWF0aW9uSWQgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvbi91bmxvY2tFdmFsdWF0aW9uJywgZ3VpZER0bykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG5cclxuICAgICAgICAvLyBjYWxjdWxhdGlvbiBmdW5jdGlvbnNcclxuICAgICAgICB0aGl6Lm1hcFN1YnNlY3Rpb25Ub0V2YWx1YXRpb24gPSBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgZGlmZmVyZW50U3Vic2VjdGlvbnMgPSBfLmdyb3VwQnkoZXZhbHVhdGlvbi5ldmFsdWF0aW9uSXRlbXMsIGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRpZmZlcmVudFN1YnNlY3Rpb25zID0gXy5zb3J0QnkoZGlmZmVyZW50U3Vic2VjdGlvbnMsIGZ1bmN0aW9uIChzdWIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJbMF0uZXZhbHVhdGlvblN1YlNlY3Rpb24uc2VxdWVuY2VOdW1iZXI7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uLm1hcHBlZFN1YnNlY3Rpb25zID0gZGlmZmVyZW50U3Vic2VjdGlvbnM7XHJcblxyXG4gICAgICAgICAgICB0aGl6LnNldFN1YnNlY3Rpb25TY29yZXMoZXZhbHVhdGlvbik7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLypNYXBzIHN1YnNlY3Rpb25zIHRvIGV2YWx1YXRpb25pdGVtcyovXHJcbiAgICAgICAgdGhpei5tYXBJdGVtc1RvU3ViU2VjdGlvbiA9IGZ1bmN0aW9uIChldmFsdWF0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhpei5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uKGV2YWx1YXRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8vXy5lYWNoKGV2YWx1YXRpb25zLCBmdW5jdGlvbiAoZXZhbHVhdGlvbikge1xyXG4gICAgICAgICAgICAvLyAgICAgICAgdGhpei5tYXBTdWJzZWN0aW9uVG9FdmFsdWF0aW9uKGV2YWx1YXRpb24pO1xyXG4gICAgICAgICAgICAvL30pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGV2YWx1YXRpb25zO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qVXNlIHRoaXMgdG8gbWFwIHRoZSBzY29yZXMgdG8gdGhlIG1hcHBlZCBzdWJzZWN0aW9ucyBvZiBhIGV2YWx1YXRpb24qL1xyXG4gICAgICAgIHRoaXouc2V0U3Vic2VjdGlvblNjb3JlcyA9IGZ1bmN0aW9uIChldmFsdWF0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vLy8gdmFyIHZhbHVlID0gb2JqZWN0W2tleV0gPT4gdXNlIGRpY3Rpb25hcnkgZnJvbSBjIyB0aGlzIHdheVxyXG4gICAgICAgICAgICBfLmVhY2goZXZhbHVhdGlvbi5tYXBwZWRTdWJzZWN0aW9ucywgZnVuY3Rpb24gKHN1YnNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChldmFsdWF0aW9uLnJlc3VsdCkgJiYgZXZhbHVhdGlvbi5yZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnRvdGFsU2NvcmUgPSBldmFsdWF0aW9uLnJlc3VsdC50b3RhbHNQZXJjYXRlZ29yeVtzdWJzZWN0aW9uWzBdLmV2YWx1YXRpb25TdWJTZWN0aW9uLmlkXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInN1YnNlY3Rpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3Vic2VjdGlvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb21wbGV0bHlVbnNjb3JlZCA9IF8uZXZlcnkoc3Vic2VjdGlvbiwgZnVuY3Rpb24gKGV2YWx1YXRpb25JdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzVW5kZWZpbmVkKGV2YWx1YXRpb25JdGVtLnNjb3JlKSB8fCBldmFsdWF0aW9uSXRlbS5zY29yZSA9PSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wbGV0bHlVbnNjb3JlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzZWN0aW9uLnVuU2NvcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBtYXAgZXZlcnkgZXZhbHVhdGlvbiBub3QganVzdCBzZWxlY3RlZCBzbyBpdCBjYW4gYmUgcHJvY2VzZWQgaW4gaW50KClcclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnZXZhbHVhdGlvblNlcnZpY2UnLCBldmFsdWF0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvbicpKTsiLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcigkc2NvcGUsY29uZmlndXJhdGlvblNlcnZpY2UsICR1aWJNb2RhbEluc3RhbmNlLGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UsIGV2YWx1YXRpb25UZW1wbGF0ZSwgY2xhc3Nlc0ZvckNvdXJzZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIC8vIGRhdGVwaWNrZXJcclxuICAgICAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnN0YXR1cy5vcGVuZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoLCBkYXkpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQuZXZhbHVhdGlvbkRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFllYXI6ICd5eScsXHJcbiAgICAgICAgICAgIHN0YXJ0aW5nRGF5OiAxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gZW5kIGRhdGVwaWNrZXJcclxuXHJcbiAgICAgICAgLy9zY2hvb2x5ZWFyIGRyb3Bkb3duXHJcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IHtcclxuICAgICAgICAgICAgaXNvcGVuOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICAkc2NvcGUudG9nZ2xlRHJvcGRvd24gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XHJcbiAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICRzY29wZS5zdGF0dXMuaXNvcGVuID0gISRzY29wZS5zdGF0dXMuaXNvcGVuO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZENsYXNzID0ge307XHJcbiAgICAgICAgJHNjb3BlLnNldENsYXNzID0gZnVuY3Rpb24gKGNsYXNzRm9yQ291cnNlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmNsYXNzSWQgPSBjbGFzc0ZvckNvdXJzZS5pZDtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ2xhc3MgPSBjbGFzc0ZvckNvdXJzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vZW5kIHNjaG9vbHllYXIgZHJvcGRvd25cclxuXHJcbiAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vbWFrZSBjYWxsIGhlcmVcclxuICAgICAgICAgICRzY29wZS5jcmVhdGVDb21tYW5kLmV2YWx1YXRpb25EYXRlID0gY29uZmlndXJhdGlvblNlcnZpY2UuY29udmVyVG9VdGMoJHNjb3BlLmNyZWF0ZUNvbW1hbmQuZXZhbHVhdGlvbkRhdGUpO1xyXG4gICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5jcmVhdGVFdmFsdWF0aW9uRnJvbVRlbXBsYXRlKCRzY29wZS5jcmVhdGVDb21tYW5kKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ29rJyk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY2xhc3Nlc0ZvckNvdXJzZSA9IGNsYXNzZXNGb3JDb3Vyc2U7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZSA9IGV2YWx1YXRpb25UZW1wbGF0ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmNyZWF0ZUNvbW1hbmQgPSB7XHJcbiAgICAgICAgICAgICAgICBFdmFsdWF0aW9uVGVtcGxhdGVJZDogZXZhbHVhdGlvblRlbXBsYXRlLmlkLFxyXG4gICAgICAgICAgICAgICAgRXZhbHVhdGlvbkRhdGU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgIGNsYXNzSWQ6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsQ29udHJvbGxlcicsIGNyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5ldmFsdWF0aW9uVGVtcGxhdGUnKSk7XHJcbiIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcigkc2NvcGUsICRsb2NhdGlvbiwgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSwgY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlID0ge307XHJcbiAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMgPSBbXTtcclxuICAgICAgICAkc2NvcGUudGFicyA9IDE7XHJcbiAgICAgICAgJHNjb3BlLnNlcXVlbmNlTnVtYmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0SW5kZXggPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICBpZiAobGFzdEluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9uc1tsYXN0SW5kZXhdLnNlcXVlbmNlTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zYXZlVGVtcGxhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gVE9ETyBkZXZlbG9wIHZhbGlkYXRpb24gYW5kIGFkanVzdCAxMDAgcGVyc2NlbnQgY29kZS5cclxuICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5jcmVhdGVUZW1wbGF0ZSgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9ldmFsdWF0aW9uVGVtcGxhdGVzJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR2VuZXJhbE9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvZXZhbHVhdGlvblRlbXBsYXRlL3ZpZXdzL2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVFdmFsdWF0aW9uT3B0aW9uczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLmNyZWF0ZUV2YWx1YXRpb25PcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhbE9wdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgJ2Rlc2NyaXB0aW9uJzogXCJcIiwgJ2NvdXJzZSc6IG51bGwgfTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChnZW5lcmFsT3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiA9IGdlbmVyYWxPcHRpb25zLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UgPSBnZW5lcmFsT3B0aW9ucy5jb3Vyc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUub3BlblN1YlNlY3Rpb25zID0gZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9ldmFsdWF0aW9uVGVtcGxhdGUvdmlld3MvZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblN1YlNlY3Rpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucztcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VG90YWxXZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBzZXF1ZW5jZU51bWJlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2VxdWVuY2VOdW1iZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zID0gZXZhbHVhdGlvblN1YlNlY3Rpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXouY2FsY3VsYXRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ29uc29sZS5sb2coJ01vZGFsIGdlbmVyYWwgb3B0aW9ucyBkaXNtaXNzZWQgYXQ6ICcgKyBuZXcgRGF0ZSgpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmRlbGV0ZVN1YlNlY3Rpb24gPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5pbmRleE9mKHN1YlNlY3Rpb24pO1xyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5vcGVuR29hbHMgPSBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9ldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2V2YWx1YXRpb25UZW1wbGF0ZUdvYWxzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmNvdXJzZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHN1YlNlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBhdmFpbGFibGVHb2FsczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hvc2VuR29hbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zLCBmdW5jdGlvbiAoc3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHN1YlNlY3Rpb24uZ29hbHMsIGZ1bmN0aW9uKGdvYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5Hb2Fscy5wdXNoKGdvYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGF2aWFsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hvc2VuR29hbHMubGVuZ3RoID4wKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmlhbGFibGVHb2FscyA9IF8ucmVqZWN0KCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlLCBmdW5jdGlvbiAoZ29hbEZyb21Db3Vyc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5Hb2FscyA9IF8uYW55KGNob3NlbkdvYWxzLCBmdW5jdGlvbiAoZ29hbGZyb21TdWIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdvYWxGcm9tQ291cnNlLmlkID09PSBnb2FsZnJvbVN1Yi5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaW5Hb2FscztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXZpYWxhYmxlR29hbHM9ICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlLmdvYWxzRm9yQ291cnNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmlhbGFibGVHb2FscztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChldmFsdWF0aW9uU3ViU2VjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJEb2VsIHRvZWdldm9lZ2RcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpei5jYWxjdWxhdGVQcm9ncmVzcygpO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuZGVsZXRlR29hbCA9IGZ1bmN0aW9uKHN1YnNlY3Rpb24sIGdvYWwpIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3Vic2VjdGlvbi5nb2Fscy5pbmRleE9mKGdvYWwpO1xyXG4gICAgICAgICAgICBzdWJzZWN0aW9uLmdvYWxzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRUb3RhbFN1YlNlY3Rpb25QZXJjZW50YWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgdG90YWxQZXJjZW50YWdlID0gMDtcclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucywgZnVuY3Rpb24gKHN1YlNlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsUGVyY2VudGFnZSArPSBwYXJzZUludChzdWJTZWN0aW9uLndlaWdodCwxMCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsUGVyY2VudGFnZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGNEZXNjcmlwdGlvblBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24pICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZGVzY3JpcHRpb24gIT09IG51bGwgJiYgJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5kZXNjcmlwdGlvbiAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDI1O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpei5jYWxjQ291cnNlUG9pbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5jb3Vyc2UpICYmICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuY291cnNlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMjU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKCRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGUuZXZhbHVhdGlvblN1YlNlY3Rpb25zKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsUGVyY2VudGFnZSA9IHRoaXouZ2V0VG90YWxTdWJTZWN0aW9uUGVyY2VudGFnZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbFBlcmNlbnRhZ2UgPT09IDEwMCA/IDI1IDogMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXouY2FsY0dvYWxQb2ludHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlLmV2YWx1YXRpb25TdWJTZWN0aW9ucykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbmVHb2FsU2V0ID0gXy5hbnkoJHNjb3BlLmV2YWx1YXRpb25UZW1wbGF0ZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMsIGZ1bmN0aW9uIChzdWJTZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpICYmIHN1YlNlY3Rpb24uZ29hbHMubGVuZ3RoID4gMDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvbmVHb2FsU2V0ID8gMjUgOiAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmNhbGN1bGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0Rlc2NyaXB0aW9uUG9pbnRzKCk7XHJcbiAgICAgICAgICAgICRzY29wZS50b3RhbFByb2dyZXNzICs9IHRoaXouY2FsY0NvdXJzZVBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNTdWJUb3RhbFBvaW50cygpO1xyXG4gICAgICAgICAgICAkc2NvcGUudG90YWxQcm9ncmVzcyArPSB0aGl6LmNhbGNHb2FsUG9pbnRzKCk7XHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuICAgICAgICAgICAgJHNjb3BlLnRvdGFsUHJvZ3Jlc3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLm9wZW5HZW5lcmFsT3B0aW9ucygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdjcmVhdGVFdmFsdWF0aW9uVGVtcGxhdGVDb250cm9sbGVyJywgY3JlYXRlRXZhbHVhdGlvblRlbXBsYXRlQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZXNDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBldmFsdWF0aW9uVGVtcGxhdGVzLCAkdWliTW9kYWwsIGNsYXNzZXNTZXJ2aWNlLCBldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlLCBtZXNzYWdlU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlLCBpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZSA9IHRlbXBsYXRlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2V2YWx1YXRpb25UZW1wbGF0ZS92aWV3cy9jcmVhdGVFdmFsdWF0aW9uc0Zyb21UZW1wbGF0ZU1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2NyZWF0ZUV2YWx1YXRpb25zRnJvbVRlbXBsYXRlTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuc2VsZWN0ZWRUZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzZXNGb3JDb3Vyc2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXNTZXJ2aWNlLmNsYXNzZXNGb3JDb3Vyc2UoJHNjb3BlLnNlbGVjdGVkVGVtcGxhdGUuY291cnNlLmlkKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzY29wZS5oaWRlU2VsZWN0ZWRUZW1wbGF0ZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGVtcGxhdGVzVG9IaWRlID0gW107XHJcbiAgICAgICAgICAgIF8uZWFjaCgkc2NvcGUuZXZhbHVhdGlvblRlbXBsYXRlcywgZnVuY3Rpb24gKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcGxhdGUuY2hlY2tIaWRkZW4gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZXNUb0hpZGUucHVzaCh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlc1RvSGlkZS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZS5oaWRlU2VsZWN0ZWRUZW1wbGF0ZXModGVtcGxhdGVzVG9IaWRlKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0ZW1wbGF0ZXNUb0hpZGUsIGZ1bmN0aW9uKHRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlLmhpZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlU2VydmljZS5oYW5kbGVXYXJuaW5nKFwiRXIgd2VyZGVuIGdlZW4gc2phYmxvbmVuIHZlcmJvcmdlbi5cIiwgXCJHZWVuIHNlbGVjdGllXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uVGVtcGxhdGVzID0gZXZhbHVhdGlvblRlbXBsYXRlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlc0NvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVzQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCBzdWJTZWN0aW9uLCBjb3Vyc2UsIGF2YWlsYWJsZUdvYWxzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICAgICRzY29wZS5nb2Fsc0ZpbHRlciA9IHt9O1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7IFxyXG4gICAgICBcclxuICAgICAgICAkc2NvcGUuc2V0U2VsZWN0ZWRHb2FsID0gZnVuY3Rpb24gKGdvYWwsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEdvYWwgPSBnb2FsO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG4gICAgICBcclxuICAgICAgICB0aGl6LkFkZEdvYWxUb05ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKHN1YlNlY3Rpb24uZ29hbHMpIHx8ICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbi5nb2Fscy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkc2NvcGUuZXZhbHVhdGlvblN1YlNlY3Rpb24uZ29hbHMucHVzaCgkc2NvcGUuc2VsZWN0ZWRHb2FsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCBhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZEdvYWwpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gOyAgLy9oYW5kbGUgd2l0aCBlcnJvciBpbiBmdXR1cmVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpei5BZGRHb2FsVG9OZXdFdmFsdWF0aW9uU3ViU2VjdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9uKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJGaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoJHNjb3BlLmdvYWxGaWx0ZXIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5nb2FsRmlsdGVyW2tleXNbaV1dID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5hdmFpbGFibGVHb2FscyA9IGF2YWlsYWJsZUdvYWxzO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlR29hbHNNb2RhbENvbnRyb2xsZXInLCBldmFsdWF0aW9uVGVtcGxhdGVHb2Fsc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpO1xyXG4iLCJcclxuKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBldmFsdWF0aW9uVGVtcGxhdGVTdWJTZWN0aW9uTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIGV2YWx1YXRpb25TdWJTZWN0aW9ucywgY3VycmVudFRvdGFsV2VpZ2h0LCBjb3Vyc2UsIHN1YlNlY3Rpb24sIHNlcXVlbmNlTnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG4gICAgICBcclxuICAgICAgXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICBcclxuICAgICAgICB0aGl6LmFkZG5ld0V2YWx1YXRpb25TdWJTZWN0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24uc2VxdWVuY2VOdW1iZXIgPSBzZXF1ZW5jZU51bWJlciArMTtcclxuICAgICAgICAgICAgJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucy5wdXNoKGFuZ3VsYXIuY29weSgkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0KSB8fCAkc2NvcGUubmV3RXZhbHVhdGlvblN1YlNlY3Rpb24ud2VpZ2h0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIGVycm9yIG1lc3NhZ2UgaGVyZSA6IG5vIHdlaWd0aCBlbnRlcmVkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5pc0VkaXRpbmcpIHx8ICRzY29wZS5pc0VkaXRpbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGl6LmFkZG5ld0V2YWx1YXRpb25TdWJTZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmV2YWx1YXRpb25TdWJTZWN0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICBcclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5ldmFsdWF0aW9uU3ViU2VjdGlvbnMgPSBldmFsdWF0aW9uU3ViU2VjdGlvbnM7XHJcbiAgICAgICAgICAgICRzY29wZS5jdXJyZW50VG90YWxXZWlnaHQgPSBjdXJyZW50VG90YWxXZWlnaHQ7XHJcbiAgICAgICAgICAgICRzY29wZS5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChzdWJTZWN0aW9uKSAmJiBzdWJTZWN0aW9uICE9PW51bGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5uZXdFdmFsdWF0aW9uU3ViU2VjdGlvbiA9IHN1YlNlY3Rpb247XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuaXNFZGl0aW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignZXZhbHVhdGlvblRlbXBsYXRlU3ViU2VjdGlvbk1vZGFsQ29udHJvbGxlcicsIGV2YWx1YXRpb25UZW1wbGF0ZVN1YlNlY3Rpb25Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSwgZ2VuZXJhbE9wdGlvbnMsIGNyZWF0ZUV2YWx1YXRpb25PcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24pIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5kZXNjcmlwdGlvbiA9PT0gbnVsbCB8fCAkc2NvcGUuZ2VuZXJhbE9wdGlvbnMuZGVzY3JpcHRpb24gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gcmVwbGFjZSB3aXRoIGVycm9yIG1ldGhvZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UpIHx8ICRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gcmVwbGFjZSB3aXRoIGVycm9yIG1ldGhvZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5nZW5lcmFsT3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdENvdXJzZSA9IGZ1bmN0aW9uIChjb3Vyc2UsIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5nZW5lcmFsT3B0aW9ucy5jb3Vyc2UgPSBjb3Vyc2U7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5nZW5lcmFsT3B0aW9ucyA9IGdlbmVyYWxPcHRpb25zO1xyXG4gICAgICAgICAgICAkc2NvcGUuY3JlYXRlRXZhbHVhdGlvbk9wdGlvbnMgPSBjcmVhdGVFdmFsdWF0aW9uT3B0aW9ucztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2dlbmVyYWxFdmFsdWF0aW9uVGVtcGxhdGVPcHRpb25zTW9kYWxDb250cm9sbGVyJywgZ2VuZXJhbEV2YWx1YXRpb25UZW1wbGF0ZU9wdGlvbnNNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmV2YWx1YXRpb25UZW1wbGF0ZScpKTtcclxuIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2YWx1YXRpb25UZW1wbGF0ZVNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgdGhpei5nZXRDcmVhdGVFdmFsdWF0aW9uT3B0aW9ucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2dldENyZWF0ZUV2YWx1YXRpb25PcHRpb25zJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5jcmVhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKGV2YWx1YXRpb25UZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlV2ViQXBpVXJsICsgJ2V2YWx1YXRpb25UZW1wbGF0ZS9jcmVhdGVUZW1wbGF0ZScsIGV2YWx1YXRpb25UZW1wbGF0ZSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpei5nZXRFdmFsdWF0aW9uVGVtcGxhdGVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvZ2V0RXZhbHVhdGlvblRlbXBsYXRlcycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZSA9IGZ1bmN0aW9uKGNvbW1hbmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArICdldmFsdWF0aW9uVGVtcGxhdGUvY3JlYXRlRXZhbHVhdGlvbkZyb21UZW1wbGF0ZScsIGNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouaGlkZVNlbGVjdGVkVGVtcGxhdGVzID0gZnVuY3Rpb24odGVtcGxhdGVzSWRzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyAnZXZhbHVhdGlvblRlbXBsYXRlL2hpZGVUZW1wbGF0ZXMnLCB0ZW1wbGF0ZXNJZHMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdldmFsdWF0aW9uVGVtcGxhdGVTZXJ2aWNlJywgZXZhbHVhdGlvblRlbXBsYXRlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZXZhbHVhdGlvblRlbXBsYXRlJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIGhvbWVDb250cm9sbGVyKCRodHRwLCAkc2NvcGUpIHtcclxuXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm1lc3NhZ2UgPSBcIldlbGtvbVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGhvbWVDb250cm9sbGVyKTtcclxuXHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScpKTtcclxuXHJcblxyXG4iLCIoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5kZXhDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCBhdXRoZW50aWNhdGlvblNlcnZpY2UsIGFjY291bnRTZXJ2aWNlLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgICRzY29wZS5sb2dnZWRJbiA9IGF1dGhlbnRpY2F0aW9uU2VydmljZS5pc0F1dGg7XHJcblxyXG4gICAgICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICBcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAkc2NvcGUuY29sbGFwc2VNZSA9IGZ1bmN0aW9uKHJlZGlyZWN0VG8pIHtcclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgocmVkaXJlY3RUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICAgICAgJHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBhdXRoZW50aWNhdGlvblNlcnZpY2UubG9nT3V0KCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdmFyIGhhbmRsZU1lbnVzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGFjY291bnRTZXJ2aWNlLmdldEFjY291bnRJbmZvKCRzY29wZS51c2VyTmFtZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmlzQWRtaW5pc3RyYXRvciA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5hZG1pbk1lbnVJbnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB1c2VyTmFtZSA9IGF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyTmFtZTtcclxuICAgICAgICAgICAgdmFyIGFkbWluTWVudUludmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB2YXIgdXNlcm5hbWVJc0tub3duID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc0RlZmluZWQoYXV0aGVudGljYXRpb25TZXJ2aWNlLnVzZXJOYW1lKSAmJiBhdXRoZW50aWNhdGlvblNlcnZpY2UudXNlck5hbWUgIT09IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChhdXRoZW50aWNhdGlvblNlcnZpY2UuaXNBdXRoICYmIGF1dGhlbnRpY2F0aW9uU2VydmljZS51c2VyTmFtZSAhPT0gdXNlcm5hbWVJc0tub3duKCkpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS51c2VyTmFtZSA9IHVzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlTWVudXMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJHNjb3BlLmlzQ29sbGFwc2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgJHNjb3BlLmFkbWluTWVudUludmlzaWJsZSA9IGFkbWluTWVudUludmlzaWJsZTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kb24oJ3VzZXJMb2dnZWRJbicsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSBkYXRhLnVzZXJOYW1lO1xyXG4gICAgICAgICAgICAkc2NvcGUubG9nZ2VkSW4gPSBhdXRoZW50aWNhdGlvblNlcnZpY2UuaXNBdXRoO1xyXG4gICAgICAgICAgICBoYW5kbGVNZW51cygpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAkcm9vdFNjb3BlLiRvbigndXNlckxvZ2dlZE91dCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5sb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYWRtaW5NZW51SW52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2RlbC5jb250cm9sbGVyKCdpbmRleENvbnRyb2xsZXInLCBpbmRleENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmluZGV4JykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBpbmRleFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3NlcnZpY2VOYW1lJywgaW5kZXhTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5pbmRleCcpKTsiLCIoZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGxvZ2luQ29udHJvbGxlcigkcSwgJHNjb3BlLCAkbG9jYXRpb24sIGF1dGhlbnRpY2F0aW9uU2VydmljZSwgdG9hc3RyLCBzY2hvb2x5ZWFyU2VydmljZSwgJHJvb3RTY29wZSkge1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAkc2NvcGUudXNlck5hbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICRzY29wZS5wYXNzd29yZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgJHNjb3BlLnRlc3RUaXRsZSA9IFwiVGVzdFRpdGxlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgICAgIHZhciBzZXR1cFJvb3RTY29wZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHEuYWxsKFtcclxuICAgICAgICAgICAgICAgIHNjaG9vbHllYXJTZXJ2aWNlLmdldEZ1dHVyZVNjaG9vbFllYXJzKCkgLy8sIGRlZmluZSBtdXRpcGxlIGlmIG5lZWRlZFxyXG4gICAgICAgICAgICBdKS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmZ1dHVyZVNjaG9vbFllYXJzID0gZGF0YVswXTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRyb290U2NvcGUuZnV0dXJlU2Nob29sWWVhcnMpO1xyXG4gICAgICAgICAgICB9KTsgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmxvZ2luID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JNZXNzYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1VuZGVmaW5lZCgkc2NvcGUudXNlck5hbWUpIHx8IGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnBhc3N3b3JkKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGxvZ2luRGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIHVzZXJOYW1lOiAkc2NvcGUudXNlck5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnBhc3N3b3JkXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uU2VydmljZS5sb2dpbihsb2dpbkRhdGEpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXR1cFJvb3RTY29wZSgpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2hvbWVcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2RlbC5jb250cm9sbGVyKCdsb2dpbkNvbnRyb2xsZXInLCBsb2dpbkNvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLmxvZ2luJykpOyIsIlxyXG4ndXNlIHN0cmljdCc7XHJcbmFwcC5mYWN0b3J5KCdhdXRoSW50ZXJjZXB0b3JGYWN0b3J5JywgWyckcScsICckbG9jYXRpb24nLFxyXG4nbG9jYWxTdG9yYWdlU2VydmljZScsIGZ1bmN0aW9uICgkcSwgJGxvY2F0aW9uLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlKSB7XHJcblxyXG4gICAgdmFyIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkgPSB7fTtcclxuXHJcbiAgICB2YXIgX3JlcXVlc3QgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblxyXG4gICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XHJcblxyXG4gICAgICAgIHZhciBhdXRoRGF0YSA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdhdXRob3JpemF0aW9uRGF0YScpO1xyXG4gICAgICAgIGlmIChhdXRoRGF0YSkge1xyXG4gICAgICAgICAgICBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgYXV0aERhdGEudG9rZW47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBfcmVzcG9uc2VFcnJvciA9IGZ1bmN0aW9uIChyZWplY3Rpb24pIHtcclxuICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNDAxKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKCcvbG9naW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGF1dGhJbnRlcmNlcHRvckZhY3RvcnkucmVxdWVzdCA9IF9yZXF1ZXN0O1xyXG4gICAgYXV0aEludGVyY2VwdG9yRmFjdG9yeS5yZXNwb25zZUVycm9yID0gX3Jlc3BvbnNlRXJyb3I7XHJcblxyXG4gICAgcmV0dXJuIGF1dGhJbnRlcmNlcHRvckZhY3Rvcnk7XHJcbn1dKTtcclxuIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGF1dGhlbnRpY2F0aW9uU2VydmljZSgkaHR0cCwgbG9jYWxTdG9yYWdlU2VydmljZSwgY29uZmlndXJhdGlvblNlcnZpY2UsICRxLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuXHJcbiAgICAgICAgdGhpei5sb2dPdXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2UucmVtb3ZlKCdhdXRob3JpemF0aW9uRGF0YScpO1xyXG5cclxuICAgICAgICAgICAgdGhpei5pc0F1dGggPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpei51c2VyTmFtZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3VzZXJMb2dnZWRPdXQnLCB7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGl6LmxvZ2luID0gZnVuY3Rpb24obG9naW5EYXRhKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVmZXJyZWQgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBcImdyYW50X3R5cGU9cGFzc3dvcmQmdXNlcm5hbWU9XCIgK1xyXG4gICAgICAgICAgICAgICAgbG9naW5EYXRhLnVzZXJOYW1lICsgXCImcGFzc3dvcmQ9XCIgKyBsb2dpbkRhdGEucGFzc3dvcmQ7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5wb3N0KGNvbmZpZ3VyYXRpb25TZXJ2aWNlLnRva2VuUGF0aCwgZGF0YSwgeyBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyB9IH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VTZXJ2aWNlLnNldCgnYXV0aG9yaXphdGlvbkRhdGEnLCB7IHRva2VuOiByZXNwb25zZS5kYXRhLmFjY2Vzc190b2tlbiwgdXNlck5hbWU6IGxvZ2luRGF0YS51c2VyTmFtZSwgZXhwaXJlczogcmVzcG9uc2UuZGF0YS5leHBpcmVzX2luIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXoudXNlck5hbWUgPSBsb2dpbkRhdGEudXNlck5hbWU7XHJcbiAgICAgICAgICAgICAgICB0aGl6LmlzQXV0aCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd1c2VyTG9nZ2VkSW4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXNlck5hbWU6IHRoaXoudXNlck5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmVycmVkLnJlc29sdmUocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICAgICAgfSksIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ091dCgpO1xyXG4gICAgICAgICAgICAgICAgZGVmZXJyZWQucmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXouZ2V0QXV0aERhdGEgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBhdXRoRGF0YSA9IGxvY2FsU3RvcmFnZVNlcnZpY2UuZ2V0KCdhdXRob3JpemF0aW9uRGF0YScpO1xyXG4gICAgICAgICAgICBpZiAoYXV0aERhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGl6LmlzQXV0aCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGl6LnVzZXJOYW1lID0gYXV0aERhdGEudXNlck5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ2F1dGhlbnRpY2F0aW9uU2VydmljZScsIGF1dGhlbnRpY2F0aW9uU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAubG9naW4nKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBtZXNzYWdlU2VydmljZSh0b2FzdHIpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXouaGFuZGxlUmVqZWN0ID0gaGFuZGxlUmVqZWN0O1xyXG4gICAgICAgIHRoaXouaGFuZGxlU3VjY2VzID0gaGFuZGxlU3VjY2VzO1xyXG4gICAgICAgIHRoaXouaGFuZGxlV2FybmluZyA9IGhhbmRsZVdhcm5pbmc7XHJcbiAgICAgICAgdGhpei5oYW5kbGVFcnJvciA9IGhhbmRsZUVycm9yO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVSZWplY3QocmVqZWN0aW9uKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVqZWN0aW9uLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuZXJyb3IocmVqZWN0aW9uLmRhdGEuZXhjZXB0aW9uTWVzc2FnZSwgJ0ZvdXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVTdWNjZXModGV4dCwgdGl0bGUpIHtcclxuICAgICAgICAgICAgdG9hc3RyLnN1Y2Nlc3ModGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlV2FybmluZyh0ZXh0LCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIud2FybmluZyh0ZXh0LCB0aXRsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFcnJvcih0ZXh0LCB0aXRsZSkge1xyXG4gICAgICAgICAgICB0b2FzdHIuZXJyb3IodGV4dCwgdGl0bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuc2VydmljZSgnbWVzc2FnZVNlcnZpY2UnLCBtZXNzYWdlU2VydmljZSk7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAnKSk7IC8vdGVzdCIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGZ1bmN0aW9uIHNjaG9vbHllYXJTZXJ2aWNlKCRodHRwLCBjb25maWd1cmF0aW9uU2VydmljZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG5cclxuICAgICAgICAvL3Rlc3RndWxwXHJcbiAgICAgICAgLy8gVmFyaWFibGVzXHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgIHRoaXouZ2V0U2Nob29sWWVhcnMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlV2ViQXBpVXJsICsgJ2dlbmVyYWxJbmZvL2dldHNjaG9vbHllYXJzJykudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmdldEZ1dHVyZVNjaG9vbFllYXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGl6LmdldFNjaG9vbFllYXJzKCkudGhlbihmdW5jdGlvbihhbGxTY2hvb2xZZWFycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRNb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50TW9udGggPCA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFllYXIgPSBjdXJyZW50WWVhciAtIDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGFsbFNjaG9vbFllYXJzLCBmdW5jdGlvbiAoc2Nob29seWVhcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzY2hvb2x5ZWFyLnN0YXJ0WWVhciA+PSBjdXJyZW50WWVhcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5zZXJ2aWNlKCdzY2hvb2x5ZWFyU2VydmljZScsIHNjaG9vbHllYXJTZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zY2hvb2x5ZWFyJykpOyAiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0dWRlbnRDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUudGVzdCA9IFwiSGVsbG8gd29ybGRcIjtcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignY3JlYXRlU3R1ZGVudENvbnRyb2xsZXInLCBjcmVhdGVTdHVkZW50Q29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZGVudCcpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gc3R1ZGVudFNlcnZpY2UoJGh0dHAsIGNvbmZpZ3VyYXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgIHZhciBiYXNlV2ViQXBpVXJsID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3N0dWRlbnRTZXJ2aWNlJywgc3R1ZGVudFNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWRlbnQnKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0R2VuZXJhbEdvYWxNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sICR1aWJNb2RhbEluc3RhbmNlLGdlbmVyYWxHb2FsKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuZ2VuZXJlYWxHb2FsID0gZ2VuZXJhbEdvYWw7XHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLmdlbmVyZWFsR29hbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdlZGl0R2VuZXJhbEdvYWxNb2RhbENvbnRyb2xsZXInLCBlZGl0R2VuZXJhbEdvYWxNb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZVN0dWR5UGxhbkNvbnRyb2xsZXIoJHNjb3BlLCBzdHVkeVBsYW5TZXJ2aWNlLCBzZWxlY3RNb2RhbFNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgICRzY29wZS5zdHVkeXBsYW5zID0gW107XHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkU3R1ZHlQbGFuID0gbnVsbDtcclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY3JlYXRlTmV3U3R1ZHlQbGFuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdHVkeVBsYW4gPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgc3R1ZHlQbGFuU2VydmljZS5vcGVuTmV3U3R1ZHlQbGFuTW9kYWwoKS50aGVuKGZ1bmN0aW9uIChuZXdTdHVkeVBsYW4pIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0dWR5UGxhbi5jcmVhdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgc3R1ZHlQbGFuU2VydmljZS5jcmVhdGVOZXdTdHVkeVBsYW4obmV3U3R1ZHlQbGFuKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdHVkeVBsYW4gPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZ2V0U3R1ZHlQbGFuSW5mbyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZWN0TW9kYWxTZXJ2aWNlLm9wZW5Nb2RhbChcInNlbGVjdFN0dWR5cGxhbk1vZGFsXCIsICRzY29wZS5zdHVkeXBsYW5zKS50aGVuKGZ1bmN0aW9uIChzdHVkeVBsYW5TdW1tYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICBzdHVkeVBsYW5TZXJ2aWNlLmdldFN0dWR5UGxhbkluZm8oc3R1ZHlQbGFuU3VtbWFyeS5pZCkudGhlbihmdW5jdGlvbiAoc3R1ZHlQbGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkU3R1ZHlQbGFuID0gc3R1ZHlQbGFuO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJHNjb3BlLmFkZEdlbmVyYWxHb2FsID0gZnVuY3Rpb24gKHBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRHb2Fsc0luU3R1ZHlQbGFuID0gJHNjb3BlLnNlbGVjdGVkU3R1ZHlQbGFuLmdlbmVyYWxHb2Fscy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBuZXdHZW5lcmFsR29hbCA9IHtcclxuICAgICAgICAgICAgICAgICdzdHVkeVBsYW5JZCc6ICRzY29wZS5zZWxlY3RlZFN0dWR5UGxhbi5pZCxcclxuICAgICAgICAgICAgICAgICdkZXNjcmlwdGlvbic6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAnZ29hbE51bWJlcic6IGN1cnJlbnRHb2Fsc0luU3R1ZHlQbGFuICsgMVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdHVkeVBsYW5TZXJ2aWNlLm9wZW5FZGl0R2VuZXJhbEdvYWxNb2RhbChuZXdHZW5lcmFsR29hbCkudGhlbihmdW5jdGlvbiAoZWRpdGVkR2VuZXJhbEdvYWwpIHtcclxuICAgICAgICAgICAgICAgIHN0dWR5UGxhblNlcnZpY2UuYWRkR2VuZXJhbEdvYWwoZWRpdGVkR2VuZXJhbEdvYWwpLnRoZW4oZnVuY3Rpb24gKHVwZGF0ZWRHZW5lcmFsR29hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFN0dWR5UGxhbi5nZW5lcmFsR29hbHMucHVzaChlZGl0ZWRHZW5lcmFsR29hbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHN0dWR5UGxhblNlcnZpY2UuZ2V0U3R1ZHlQbGFucygpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnN0dWR5cGxhbnMgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VTdHVkeVBsYW5Db250cm9sbGVyJywgbWFuYWdlU3R1ZHlQbGFuQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuc3R1ZHlQbGFuJykpOyIsIihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gbmV3U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCAkdWliTW9kYWxJbnN0YW5jZSkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgIFxyXG4gICAgICAgIC8vVmFyaWFibGVzXHJcbiAgICAgICAgJHNjb3BlLm5ld1N0dWR5UGxhbiA9IHt9O1xyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICBcclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcblxyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLm5ld1N0dWR5UGxhbi5nZW5lcmFsR29hbHMgPSBbXTtcclxuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoJHNjb3BlLm5ld1N0dWR5UGxhbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoXCJjYW5jZWxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCduZXdTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXInLCBuZXdTdHVkeVBsYW5Nb2RhbENvbnRyb2xsZXIpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnN0dWR5UGxhbicpKTsiLCIoZnVuY3Rpb24obW9kdWxlKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gc3R1ZHlQbGFuU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UsICR1aWJNb2RhbCkge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuICAgICAgICB2YXIgYmFzZVdlYkFwaVVybCA9IGNvbmZpZ3VyYXRpb25TZXJ2aWNlLmJhc2VBcGlQYXRoO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFucyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2FsbFN0dWR5UGxhbnNcIikudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGl6LmNyZWF0ZU5ld1N0dWR5UGxhbiA9IGZ1bmN0aW9uIChjcmVhdGVTdHVkeVBsYW5JbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGJhc2VXZWJBcGlVcmwgKyBcIi9zdHVkeVBsYW5zL2NyZWF0ZVN0dWR5UGxhblwiLCBjcmVhdGVTdHVkeVBsYW5JbmZvKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkR2VuZXJhbEdvYWwgPSBmdW5jdGlvbiAoZWRpdGVkR2VuZXJhbEdvYWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiL3N0dWR5UGxhbnMvYWRkR2VuZXJhbEdvYWxcIiwgZWRpdGVkR2VuZXJhbEdvYWwpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouZ2V0U3R1ZHlQbGFuSW5mbyA9IGZ1bmN0aW9uIChzdHVkeVBsYW5JZCkge1xyXG4gICAgICAgICAgICB2YXIgZ3VpZER0byA9IHsgJ2lkJzogc3R1ZHlQbGFuSWQgfTtcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYmFzZVdlYkFwaVVybCArIFwiL3N0dWR5UGxhbnMvZ2V0U3R1ZHlQbGFuSW5mb1wiLCBndWlkRHRvICkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5vcGVuTmV3U3R1ZHlQbGFuTW9kYWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGFsSW5zdGFuY2UgPSAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvU3R1ZHlQbGFuL3ZpZXdzL25ld1N0dWR5UGxhbk1vZGFsLmh0bWxcIixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwibmV3U3R1ZHlQbGFuTW9kYWxDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChuZXdTdHVkeVBsYW4pIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3U3R1ZHlQbGFuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXoub3BlbkVkaXRHZW5lcmFsR29hbE1vZGFsID0gZnVuY3Rpb24gKGdlbmVyYWxHb2FsVG9FZGl0KSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL1N0dWR5UGxhbi92aWV3cy9lZGl0R2VuZXJhbEdvYWxNb2RhbC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiBcImVkaXRHZW5lcmFsR29hbE1vZGFsQ29udHJvbGxlclwiLFxyXG4gICAgICAgICAgICAgICAgc2l6ZTogJ2xnJyxcclxuICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICAgICAgICAgICAgICBnZW5lcmFsR29hbCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2VuZXJhbEdvYWxUb0VkaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChuZXdTdHVkeVBsYW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdTdHVkeVBsYW47XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3N0dWR5UGxhblNlcnZpY2UnLCBzdHVkeVBsYW5TZXJ2aWNlKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC5zdHVkeVBsYW4nKSk7IiwiXHJcbihmdW5jdGlvbiAobW9kdWxlKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRlYWNoZXJTZXJ2aWNlLCB0ZWFjaGVyLCBjb3Vyc2VzKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuXHJcbiAgICAgICAgLy9wcml2YXRlIEZ1bmN0aW9uc1xyXG5cclxuICAgICAgICAvLyBwdWJsaWMgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkQ291cnNlID0gZnVuY3Rpb24gKGNvdXJzZSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkQ291cnNlID0gY291cnNlO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBtb2RhbCBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUub2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzVW5kZWZpbmVkKCRzY29wZS5zZWxlY3RlZENvdXJzZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kPXt9O1xyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLnRlYWNoZXJJZCA9IHRlYWNoZXIuaWQ7IFxyXG4gICAgICAgICAgICBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kLmNvdXJzZUlkPSAkc2NvcGUuc2VsZWN0ZWRDb3Vyc2UuaWQgO1xyXG5cclxuICAgICAgICAgICAgdGVhY2hlclNlcnZpY2UuYWRkQ291cnNlKGFkZENvdXJzZVRvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGVhY2hlci5jb3Vyc2VzLnB1c2goJHNjb3BlLnNlbGVjdGVkQ291cnNlKTsgLy8gZGlydHlcclxuICAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuY291cnNlcyA9IGNvdXJzZXM7XHJcbiAgICAgICAgICAgICRzY29wZS50ZWFjaGVyID0gdGVhY2hlcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGVhY2hlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvdXJzZXMpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignYWRkQ291cnNlTW9kYWxDb250cm9sbGVyJywgYWRkQ291cnNlTW9kYWxDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpO1xyXG4iLCIoZnVuY3Rpb24gKG1vZHVsZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGZ1bmN0aW9uIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKCRzY29wZSwgJGxvY2F0aW9uLCB0ZWFjaGVyU2VydmljZSwgJHVpYk1vZGFsLCB0ZWFjaGVycykge1xyXG4gICAgICAgIHZhciB0aGl6ID0gdGhpcztcclxuXHJcbiAgICAgICAgLy9WYXJpYWJsZXNcclxuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBudWxsO1xyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZFRlYWNoZXIgPSBmdW5jdGlvbiAodGVhY2hlciwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkVGVhY2hlciA9IHRlYWNoZXI7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vcGVuQ291cnNlc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkdWliTW9kYWwub3Blbih7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2FwcC9UZWFjaGVyL3ZpZXdzL2FkZENvdXJzZU1vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2FkZENvdXJzZU1vZGFsQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAnbGcnLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5zZWxlY3RlZFRlYWNoZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VzOiBmdW5jdGlvbiAoY291cnNlU2VydmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY291cnNlU2VydmljZS5hbGxDb3Vyc2VzKCkudGhlbihmdW5jdGlvbiAoY291cnNlcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvdXJzZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9wZW5DbGFzc01vZGFsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYXBwL2NsYXNzZXMvdmlld3Mvc2VsZWN0Q2xhc3Nlc01vZGFsLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3NlbGVjdENsYXNzTW9kYWxDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIHNpemU6ICdsZycsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogZnVuY3Rpb24gKGNsYXNzZXNTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjbGFzc2VzU2VydmljZS5hdmFpbGFibGVDbGFzc2VzRm9yVGVhY2hlcigkc2NvcGUuc2VsZWN0ZWRUZWFjaGVyLmlkKS50aGVuKGZ1bmN0aW9uIChjbGFzc2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2xhc3NlcztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChzZWxlY3RlZENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWRkQ2xhc3NUb1RlYWNoZXJDb21tYW5kID0ge307XHJcbiAgICAgICAgICAgICAgICBhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQudGVhY2hlcklkID0gJHNjb3BlLnNlbGVjdGVkVGVhY2hlci5pZDtcclxuICAgICAgICAgICAgICAgIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZC5jbGFzc0lkID0gc2VsZWN0ZWRDbGFzcy5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZWFjaGVyU2VydmljZS5hZGRDbGFzcyhhZGRDbGFzc1RvVGVhY2hlckNvbW1hbmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3VjY2VzIHRvYXN0ZXJcclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vZXJyb3IgdG9hc3RlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAvLyBDb25zb2xlLmxvZygnTW9kYWwgZ2VuZXJhbCBvcHRpb25zIGRpc21pc3NlZCBhdDogJyArIG5ldyBEYXRlKCkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL3RlYWNoZXJTZXJ2aWNlLmdldEFjY291bnRzKCkudGhlbihmdW5jdGlvbiAoYWNjb3VudHMpIHtcclxuICAgICAgICAgICAgLy8gICAgJHNjb3BlLmFjY291bnRMaXN0ID0gYWNjb3VudHM7XHJcbiAgICAgICAgICAgIC8vfSk7XHJcblxyXG4gICAgICAgICAgICAkc2NvcGUudGVhY2hlcnMgPSB0ZWFjaGVycztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnRlYWNoZXJzKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdtYW5hZ2VUZWFjaGVyQ29udHJvbGxlcicsIG1hbmFnZVRlYWNoZXJDb250cm9sbGVyKTtcclxufSkoYW5ndWxhci5tb2R1bGUoJ2FwcC50ZWFjaGVyJykpOyIsIihmdW5jdGlvbihtb2R1bGUpIHtcclxuXHJcbiAgICBmdW5jdGlvbiB0ZWFjaGVyU2VydmljZSgkaHR0cCwgY29uZmlndXJhdGlvblNlcnZpY2UpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGJhc2VQYXRoID0gY29uZmlndXJhdGlvblNlcnZpY2UuYmFzZUFwaVBhdGg7XHJcblxyXG5cclxuICAgICAgICB0aGl6LmdldEFjY291bnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZVBhdGggKyAnYWNjb3VudHMvZ2V0QWNjb3VudHMnKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouYWRkQ291cnNlID0gZnVuY3Rpb24oYWRkQ291cnNlVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDb3Vyc2UnLCBhZGRDb3Vyc2VUb1RlYWNoZXJDb21tYW5kKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXouZ2V0VGVhY2hlcnMgPSBmdW5jdGlvbigpIHsgLy8gdXNlIHF1ZXJ5IG9iamVjdCBpbiBmdXR1cmUgY2hhbmdlIG1ldGhvZCB0byBwb3N0IHRoZW4gcHJvYmFibHlcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlUGF0aCArICcvdGVhY2hlci90ZWFjaGVycycpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpei5hZGRDbGFzcyA9IGZ1bmN0aW9uKGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChiYXNlUGF0aCArICcvdGVhY2hlci9hZGRDbGFzcycsIGFkZENsYXNzVG9UZWFjaGVyQ29tbWFuZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgbW9kdWxlLnNlcnZpY2UoJ3RlYWNoZXJTZXJ2aWNlJywgdGVhY2hlclNlcnZpY2UpO1xyXG59KShhbmd1bGFyLm1vZHVsZSgnYXBwLnRlYWNoZXInKSk7IiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UsIHRvYXN0ciwgaXRlbXMsIGNvbnRlbnQpIHtcclxuICAgICAgICB2YXIgdGhpeiA9IHRoaXM7XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuXHJcbiAgICAgICAgLy8gcHVibGljIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5zZXRTZWxlY3RlZEl0ZW0gPSBmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLnNlbGVjdGVkSXRlbSA9IGl0ZW07XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZFJvdyA9IGluZGV4O1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIG1vZGFsIGZ1bmN0aW9uc1xyXG4gICAgICAgICRzY29wZS5vayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoJHNjb3BlLnNlbGVjdGVkSXRlbSkpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0ci5pbmZvKCdTZWxlY3RlZXIgZWVuIGl0ZW0gdWl0IGRlIGxpanN0IG9tIHZlcmRlciB0ZSBrdW5uZW4gZ2Fhbi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCRzY29wZS5zZWxlY3RlZEl0ZW0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vaW5pdGlhdGlvbnNcclxuICAgICAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLml0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgICAgICRzY29wZS5jb250ZW50ID0gY29udGVudDtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2VsZWN0SXRlbU1vZGFsJ3MgaXRlbXM6XCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuaXRlbXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG1vZHVsZS5jb250cm9sbGVyKCdzZWxlY3RJdGVtTW9kYWxDb250cm9sbGVyJywgc2VsZWN0SXRlbU1vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlLCB0b2FzdHIsIGl0ZW1zLCBjb250ZW50KSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG4gICAgICAgICRzY29wZS5pdGVtRmlsdGVyID0ge307XHJcbiAgICAgICAgJHNjb3BlLml0ZW1zID0gW107XHJcblxyXG4gICAgICAgIC8vcHJpdmF0ZSBGdW5jdGlvbnNcclxuICAgICAgICB2YXIgZ2V0U2VsZWN0ZWRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKCRzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLnNlbGVjdGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuICAgICAgICAkc2NvcGUuY2hlY2tBbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICgkc2NvcGUuc2VsZWN0ZWRBbGwpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEFsbCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRBbGwgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZWxlY3RlZCA9ICRzY29wZS5zZWxlY3RlZEFsbDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhckZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cygkc2NvcGUuaXRlbUZpbHRlcik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLml0ZW1GaWx0ZXJba2V5c1tpXV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuY2xlYXJTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgXy5lYWNoKCRzY29wZS5pdGVtcywgZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uc2VsZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jbGVhclNlbGVjdGVkRmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvKlNldCB0aGUgY2hlY2tib3ggdG8gbm8gdmFsdWUgaW5zdGVhZCBvZiBmYWxzZSB3aGVuIGNoZWNrZWQuKi9cclxuICAgICAgICAgICAgaWYgKCRzY29wZS5pdGVtRmlsdGVyLnNlbGVjdGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLml0ZW1GaWx0ZXIuc2VsZWN0ZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICRzY29wZS5jbGVhckZpbHRlcigpO1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbUZpbHRlci5zZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gbW9kYWwgZnVuY3Rpb25zXHJcbiAgICAgICAgJHNjb3BlLm9rID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJdGVtcyA9IGdldFNlbGVjdGVkSXRlbXMoKTtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNVbmRlZmluZWQoc2VsZWN0ZWRJdGVtcykgfHwgc2VsZWN0ZWRJdGVtcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdHIuaW5mbygnU2VsZWN0ZWVyIG1pbnN0ZW5zIMOpw6luIGl0ZW0gdWl0IGRlIGxpanN0IG9tIHZlcmRlciB0ZSBrdW5uZW4gZ2Fhbi4nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgIC8vaGFuZGxlIHdpdGggZXJyb3IgaW4gZnV0dXJlXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKHNlbGVjdGVkSXRlbXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xyXG4gICAgICAgIH07XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy9pbml0aWF0aW9uc1xyXG4gICAgICAgIHZhciBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgJHNjb3BlLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBtb2R1bGUuY29udHJvbGxlcignc2VsZWN0SXRlbXNNb2RhbENvbnRyb2xsZXInLCBzZWxlY3RJdGVtc01vZGFsQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuY3VzdG9tRGlyZWN0aXZlcycpKTtcclxuIiwiKGZ1bmN0aW9uIChtb2R1bGUpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxlbmRhckNvbnRyb2xsZXIoJHNjb3BlLCAkbG9jYXRpb24sIGV2YWx1YXRpb25TZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHRoaXogPSB0aGlzO1xyXG5cclxuICAgICAgICAvL1ZhcmlhYmxlc1xyXG5cclxuICAgICAgICAvL3ByaXZhdGUgRnVuY3Rpb25zXHJcblxyXG4gICAgICAgIC8vIHB1YmxpYyBmdW5jdGlvbnNcclxuXHJcbiAgICAgICAgJHNjb3BlLnNlbGVjdGVkUm93ID0gbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLnNldFNlbGVjdGVkRXZhbHVhdGlvbiA9IGZ1bmN0aW9uKGV2YWx1YXRpb24sIGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zZWxlY3RlZEV2YWx1YXRpb24gPSBldmFsdWF0aW9uO1xyXG4gICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRSb3cgPSBpbmRleDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuc3RhcnRFdmFsdWF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICRsb2NhdGlvbi5wYXRoKFwiL2V2YWx1YXRpb24vXCIgKyAkc2NvcGUuc2VsZWN0ZWRFdmFsdWF0aW9uLmJ1bmRsZUlkKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvL2luaXRpYXRpb25zXHJcbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZXZhbHVhdGlvblNlcnZpY2UucGxhbm5lZEV2YWx1YXRpb25zKCkudGhlbihmdW5jdGlvbiAoZXZhbHVhdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5wbGFubmVkRXZhbHVhdGlvbnMgPSBldmFsdWF0aW9ucztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbml0KCk7XHJcblxyXG4gICAgfVxyXG4gICAgbW9kdWxlLmNvbnRyb2xsZXIoJ2NhbGVuZGFyQ29udHJvbGxlcicsIGNhbGVuZGFyQ29udHJvbGxlcik7XHJcbn0pKGFuZ3VsYXIubW9kdWxlKCdhcHAuZGFzaGJvYXJkJykpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
