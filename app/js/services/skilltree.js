angular.module('allocations.services')
  .factory('Skilltree', ['$http',
    function($http) {
      return {
        getUsers: function(cb) {
          $http.get('/skilltree/users').
          success(function(data, status, headers, config) {
            cb(null, data);
          }).
          error(function(data, status, headers, config) {
            cb(data, null);
          });
        },
        postBling: function(userId) {
          var data = {
            user_id: userId,
          };
          $http.post('/skilltree/blings', data);
        }
      };
    }
  ]);
