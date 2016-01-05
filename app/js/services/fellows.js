angular.module('allocations.services')
  .factory('Fellows', ['$firebaseArray', '$firebaseObject', 'Refs',
    function($firebaseArray, $firebaseObject, Refs) {
      return {
        all: function(cb) {
          if(!cb) {
            return $firebaseArray(Refs.fellows);
          }
          else {
            Refs.fellows.once('value', function(snap) {
              cb(snap.val());
            });
          }
        },

        find: function(uid, cb) {
          if(!cb) {
            return $firebaseObject(Refs.fellows.child(uid));
          }
          else {
            Refs.fellows.child(uid).once('value', function(snap) {
              cb(snap.val());
            });
          }
        }
      };
    }
  ]);
