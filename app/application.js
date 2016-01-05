/* define our modules */
angular.module('allocations.services', ['firebase','ngCookies']);
angular.module('allocations.filters', []);
angular.module("allocations.directives", ['monospaced.elastic']);

/* load services */
require('./js/services/allocations.js');
require('./js/services/authentication.js');
require('./js/services/authorization.js');
require('./js/services/events.js');
require('./js/services/fellows.js');
require('./js/services/projects.js');
require('./js/services/refs.js');
require('./js/services/skilltree.js');
require('./js/services/toast.js');
require('./js/services/users.js');


/* load filters */
require('./js/filters/project-search.js');
require('./js/filters/fellows-search.js');
require('./js/filters/reverse.js');

/* load directives */
require('./js/directives/avatar.js');
require('./js/directives/drag-and-drop.js');
require('./js/directives/sidenav.js');
require('./js/directives/project.js');

/* load  controllers */

window.Allocations = angular.module("Allocations", [
  'ui.router',
  'allocations.directives',
  'allocations.filters',
  'allocations.services',
  'ngAnimate',
  'ngMaterial',
  'ui.bootstrap',
  'ang-drag-drop'
]);

Allocations.run(['$rootScope', '$state', 'Authentication', 'Refs', 'Toast',
  function($rootScope, $state, Authentication, Refs, Toast) {
  $rootScope._ = window._;
  $rootScope.moment = window.moment;
  $rootScope.authCallback = function(authData) {
    Authentication.auth(authData, function(user) {
      if(user) {
        // check if user is admin
        if(authData.provider !== 'custom') {
          Authentication.loginAsAdmin(function(failed) {
            if(failed) {
              //Not an admin account
            }
            else {
              Toast("You are logged in as Admin");
            }
          });
        }
      }
      else {
        // logged out
        Authentication.logout();
        $state.go('login');
      }
    });
  };

  Refs.root.onAuth($rootScope.authCallback);
}]);

/* application routes */
Allocations.config(['$stateProvider','$locationProvider',
 function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: 'views/login.html'
    })
    .state('logout', {
      url: '/logout'
    })
    .state('default', {
      url: '/home',
      templateUrl: 'views/home.html'
    })
    .state('admin/projects', {
      url: '/admin/projects',
      templateUrl: 'views/admin/projects.html'
    })
    .state('admin/projects/id', {
      url: '/admin/projects/:projectId',
      templateUrl: 'views/admin/projects.html'
    })
    .state('admin/fellows', {
      url: '/admin/fellows',
      templateUrl: 'views/admin/fellows.html'
    })
    .state('admin/fellows/id', {
      url: '/admin/fellows/:personId',
      templateUrl: 'views/admin/fellows.html'
    })
    .state('admin/reports', {
      url: '/admin/reports',
      templateUrl: 'views/admin/reports.html'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'views/users.html'
    })
    .state('users/id', {
      url: '/users/:userId',
      templateUrl: 'views/users.html'
    })
    .state('skilltree', {
      url: '/skilltree',
      templateUrl: 'views/admin/skilltree.html'
    });
}]);
