angular.module("allocations.directives")
  .directive('sideNav', function() {
    return {
      replace: true,
      restrict: 'E',
      templateUrl: "views/sidenav.html",
      controller: ['$mdDialog', '$scope', '$rootScope', 'Allocations', 'Events', 'Fellows', 'Projects', 'Toast',
      function($mdDialog, $scope, $rootScope, Allocations, Events, Fellows, Projects, Toast) {
        $scope.fellows = Fellows.all();

        $scope.onDrop = function(event) {
          var person = $rootScope.draggedPerson;
          if(person.allocation_ref) {
            var confirm = $mdDialog.confirm()
              .title('Confirmation')
              .content('Are you sure you want to free ' + person.name + '?')
              .ok('Yes')
              .cancel('No');
            $mdDialog
              .show( confirm )
              .then(function() {
                Allocations.find(person.allocation_ref).$loaded().then(function(_alloc) {
                  Projects.find(_alloc.project_id).$loaded().then(function(_project) {
                    _project.allocations[person.$id] = null;
                    _project.$save();

                    _alloc.end_date = (new Date()).getTime();
                    _alloc.$save();

                    person.allocation_ref = null;
                    person.$save();
                    Toast(person.known_as + " is available");

                    var event = {
                      event_type: 'removal',
                      data: {
                        project_id: _project.$id,
                        user_id: person.$id
                      }
                    };
                    Events.broadcast(event);
                  });
                });
                confirm = undefined;
              });
          }
          else {
            // Dropping already available person, do nothing
            return;
          }
        };
      }]
    };
  });
