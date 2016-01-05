var async = require("async"),
    needle = require("needle");
    _ = require("lodash");

module.exports = function (app, rootRef, config) {
  var peopleRef = rootRef.child('people'),
      page = 1,
      users = [];

  app.get('/skilltree/users', function(req, res) {
    getSkilltreeUsers();
    res.sendStatus(200);
  });

  var getSkilltreeUsers = function(cb) {
    async.doWhilst(
      getOnePage,
      function() {
        return users.length > 0;
      },
      function(err) {
        if(err) console.log('getSkilltreeUsers', err);
      }
    );
  };

  app.post('/skilltree/blings', function(req, res) {
    var data = {
      page: page,
      format: 'json'
    };
    var userId = req.body.user_id;
    needle.request('get', config.skilltree.blings, data, function(err, resp){
      if(err){
        res.status('404').send('bling not found');
      } else {
        var blings = resp.body;
        _.each(blings, function(bling) {
          var blingName = bling.name;
          var blingId = bling.id;
          if(blingName === "Billing") {
            needle.request('post', config.skilltree.users + '/' + userId + '/blings/' + blingId, data, function(err, response){
              if(err) {
                res.status('500').send('Internal server error');
              }
              else {
                res.status(201).send('Succesfully updated bling');
              }
            });
          }
        });
      }
    });
  });

  var getOnePage = function(cb) {
    var data = {
      page: page,
      format: 'json'
    };

    needle.request('get', config.skilltree.users, data, function(err, resp) {
      if(err) {
        cb(err);
      }
      else {
        users = resp.body;
        saveUsersToFirebase(users);
        page++;
        cb();
      }
    });
  };

  var saveUsersToFirebase = function(users) {
    _.each(users, function(user) {
      var hasValidCohort = user.cohort && user.cohort.name !== 'Management';
      var hasValidEmail = user.email.match(/andela.co/g) !== null;

      if(hasValidEmail && hasValidCohort) {
        peopleRef.child(user.uid).once('value', function(snap) {
          if(snap.val()) {
            peopleRef.child(user.uid).update(user, callback);
          }
          else {
            peopleRef.child(user.uid).set(user, callback);
          }
        });
      }
    });
  };

  var callback = function(err) {
    if(err) console.log(err);
  };
};
