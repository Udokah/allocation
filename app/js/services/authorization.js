angular.module('allocations.services')
.factory('Authorization', ['Refs', 'toast', '$rootScope', function(Refs, toast, $rootScope) {
  // Implement Access control when the state change is about to begin
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      
      var adminOnly = /^admin/.test(toState.name);

      if(adminOnly && !Refs.isAdmin()) {
        //Prevent State Navigation
        toast('Only Administrators can access that page');
        event.preventDefault();
      }
  });
  return {};
}]);
