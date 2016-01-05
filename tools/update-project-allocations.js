'use strict';

var firebaseAuth = require("../lib/firebase/auth");
var _ = require('lodash');

firebaseAuth.authWithCustomToken(function(err, rootRef) {
  rootRef.child('projects').on('child_added', function(projectSnap) {
    var project = projectSnap.val();
    if(project) {
      _.each(project.allocations, function(val, uid) {
        console.log(uid, val);
        rootRef.child('people').child(uid).once('value', function(snap) {
          var obj = {
            name: snap.val().name,
            email: snap.val().email,
            known_as: snap.val().known_as
          };
          projectSnap.ref().child('allocations').child(uid).set(obj);
        });
      });
    }
  });
});
