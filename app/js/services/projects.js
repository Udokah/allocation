angular.module('allocations.services')
  .factory('Projects', ['$firebaseArray','$http', '$firebaseObject', 'Events', 'Refs',
    function($firebaseArray, $http,$firebaseObject, Events, Refs) {
      return {
        all: function(cb) {
          if(!cb) {
            return $firebaseArray(Refs.projects);
          }
          else {
            Refs.projects.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(id, cb) {
          if(!cb) {
            return $firebaseObject(Refs.projects.child(id));
          }
          else {
            Refs.projects.child(id).once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        create: function(project, cb) {
          var projectRef = Refs.projects.push(project, function(err) {
              if(err) {
               cb(err);
            }
              else {
               project.id = projectRef.toString().split('/').pop();
               Events.broadcast({event_type: 'project-new', data: project});
               cb();
            }
          });
        },
      };
    }
  ]);
