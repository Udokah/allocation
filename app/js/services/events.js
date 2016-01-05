angular.module('allocations.services')
  .factory('Events', ['$http', function($http) {
      return {
        broadcast: function(message, cb) {
          $http.post('/broadcast', message).
            success(function(data) {
              if(cb) cb(null, data);
            }).
            error(function(data) {
              if(cb) cb(data, null);
            });
        }
      };
    }
  ]);
