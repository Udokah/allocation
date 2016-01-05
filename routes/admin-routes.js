var FirebaseTokenGenerator = require("firebase-token-generator");

module.exports = function (app, rootRef, config) {
  app.get('/admin', function(req, res) {
    var fb_key = config.firebase.secretKey;
    var uid = req.query.uid;
    var token = req.query.token;

    rootRef.child('users').child(uid).once('value', function(userSnap) {
      var user = userSnap.val();
      if(user && user.access_token === token) {
        rootRef.child('admins').child(uid).once('value', function(snap){
          if(snap.val()){
            var tokenGenerator = new FirebaseTokenGenerator(fb_key);
            var token = tokenGenerator.createToken({uid: uid, isAdmin: true});
            console.log("PASSED AUTHORIZATION AS ADMIN", token);
            res.json(token);
          }
          else {
            console.log("FAILED AUTHORIZATION AS ADMIN");
            res.sendStatus(403);
          }
        });
      }
      else {
        console.log("HACKING ATTEMPT DETECTED");
        res.sendStatus(403);
      }
    });
  });
};
