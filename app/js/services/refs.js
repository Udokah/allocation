angular.module('allocations.services')
  .factory('Refs', ['$cookies',
    function($cookies) {
      var rootRef = new Firebase($cookies.rootRef || 'https://allocations-dev.firebaseio.com/');     
      
      // define every standard ref used application wide
      return {
        root: rootRef,
        users: rootRef.child('users'),
        fellows: rootRef.child('fellows'),
        projects: rootRef.child('projects'),
        allocations: rootRef.child('allocations'),
        isAdmin: function() {
          var auth = rootRef.getAuth() ? rootRef.getAuth().auth : false;
          return auth && auth.isAdmin;
        }
      };
    }
  ]);
