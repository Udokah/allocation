angular.module("allocations.directives")
  .directive('project', function(){
    return {
      restrict: 'E',
      templateUrl: "views/project.html",
      controller: ['$mdDialog', '$rootScope', '$scope', function($mdDialog, $rootScope, $scope) {

        $scope.onDrop = function(event, projects, project) {
          if(project.allocations && project.allocations[$rootScope.draggedPerson.uid]) {
            // person already belongs to project, do nothing
            return;
          }
          else {
            $mdDialog.show({
              controller: ['$rootScope', '$scope', 'Allocations', 'Events', 'project', 'projects', 'Projects', 'Toast', 'Skilltree',
              function($rootScope, $scope, Allocations, Events, project, projects, Projects, Toast, Skilltree) {
                $scope.allocation = { ghost: false };
                $scope.person = $rootScope.draggedPerson;
                $scope.project = project;

                $scope.cancel = function() {
                  $mdDialog.hide();
                };

                $scope.save = function() {
                  // End previous allocation if any
                  if($scope.person.allocation_ref) {
                    Allocations.find($scope.person.allocation_ref).$loaded().then(function(_alloc) {
                      Projects.find(_alloc.project_id).$loaded().then(function(_project) {
                        _project.allocations[$scope.person.$id] = null;
                        _project.$save();

                        _alloc.end_date = (new Date()).getTime();
                        _alloc.$save();

                        var event = {
                          event_type: 'removal',
                          data: {
                            project_id: _project.$id,
                            user_id: $scope.person.$id
                          }
                        };
                        Events.broadcast(event);
                      });
                    });
                  }

                  // Create new allocation
                  if($scope.allocation.sd) {
                    $scope.allocation.start_date = $scope.allocation.sd.getTime();
                  }
                  if($scope.allocation.ed) {
                    $scope.allocation.end_date = $scope.allocation.ed.getTime();
                  }
                  $scope.allocation.person_id = $scope.person.$id;
                  $scope.allocation.project_id = project.$id;
                  Allocations.create($scope.allocation, function(allocRef) {
                    if(allocRef) {
                      project.allocations = project.allocations ? project.allocations: {};
                      project.allocations[$scope.person.$id] = {
                        name: $scope.person.name,
                        email: $scope.person.email,
                        known_as: $scope.person.known_as
                      };
                      projects.$save(project);

                      $scope.person.allocation_ref = allocRef.toString();

                      if($scope.project.billable) {
                        Skilltree.postBling($scope.person.$id);
                      }
                      $scope.person.$save();
                      $mdDialog.hide();
                      Toast($scope.person.known_as + ' allocated to ' + project.name);

                      var event = {
                        event_type: 'placement',
                        data: {
                          project_id: project.$id,
                          user_id: $scope.person.$id,
                          billable: $scope.project.billable,
                          user_details: {
                            name: $scope.person.name,
                            email: $scope.person.email,
                            known_as: $scope.person.known_as
                          }
                        }
                      };
                      Events.broadcast(event);
                    }
                    else {
                      $mdDialog.hide();
                      Toast('Allocation failed');
                    }
                  });
                };

                $scope.openStartDt = function($event) {
                  $event.preventDefault();
                  $event.stopPropagation();

                  $scope.sdOpened = true;
                };

                $scope.openEndDt = function($event) {
                  $event.preventDefault();
                  $event.stopPropagation();

                  $scope.edOpened = true;
                };
              }],
              locals: {
                project: project,
                projects: projects
              },
              templateUrl: 'views/admin/create-allocation.html',
            }).then(function() {
              $mdDialog.hide();
            });
          }
        };

        $scope.showAllocationPopup = function(project, uid) {
          $mdDialog.show({
            controller: ['$scope', 'Allocations', 'Fellows', 'project', 'Projects', 'Refs', 'uid', 'Toast',
            function($scope, Allocations, Fellows, project, Projects, Refs, uid, Toast) {
              $scope.person = Fellows.find(uid);

              Projects.all(function(projects) {
                $scope.projects = projects;
              });

              $scope.person.$loaded().then(function(data) {
                Allocations.find(data.allocation_ref).$loaded().then(function(data) {
                  $scope.allocation = data;
                  if(data.start_date) {
                    $scope.allocation.sd = new Date(data.start_date);
                  }
                  if(data.end_date) {
                    $scope.allocation.ed = new Date(data.end_date);
                  }
                });
              });

              $scope.cancel = function() {
                $mdDialog.hide();
              };

              $scope.save = function() {
                if(project.$id !== $scope.allocation.project_id) {
                  Refs.projects.child(project.$id).child('allocations').child(uid).remove();
                  Refs.projects.child($scope.allocation.project_id).child('allocations').child(uid).set(true);
                }

                if($scope.allocation.sd) {
                  $scope.allocation.start_date = $scope.allocation.sd.getTime();
                }
                else {
                 $scope.allocation.start_date = null;
                }
                if($scope.allocation.ed) {
                  $scope.allocation.end_date = $scope.allocation.ed.getTime();
                }
                else {
                  $scope.allocation.end_date = null;
                }

                $scope.allocation.$save().then(function() {
                  $scope.allocation.sd = new Date($scope.allocation.start_date);
                  $scope.allocation.ed = new Date($scope.allocation.end_date);
                  $mdDialog.hide();
                  Toast('Allocation successfully updated');
                });
              };

              $scope.openStartDt = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.sdOpened = true;
              };

              $scope.openEndDt = function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.edOpened = true;
              };
            }],
            locals: {
              project: project,
              uid: uid
            },
            templateUrl: 'views/admin/edit-allocation.html',
          }).then(function() {
            $mdDialog.hide();
          });
        };
      }]
    };
  });
