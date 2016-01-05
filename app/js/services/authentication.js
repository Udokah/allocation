angular.module('allocations.services')
  .factory('Authentication', ['$cookies', '$rootScope','$state', 'Refs', 'Toast',
    function($cookies, $rootScope, $state, Refs, Toast) {
      return {
        login: function(cb) {
          var options = { remember: 'sessionOnly', scope: "email" };
          Refs.root.authWithOAuthPopup("google", function(error, authData) {
            if(cb) cb(error, authData);
          }, options);
        },

        loginAsAdmin: function(cb) {
          var user = $rootScope.currentUser;
          $.getJSON('/admin?uid=' + user.uid + '&token=' + user.access_token)
            .success(function(data) {
              Refs.root.authWithCustomToken(data, cb);
            })
            .fail(function(err) {
              cb(err);
            });
        },

        logout: function() {
          Refs.root.unauth();
          $rootScope.currentUser = null;
        },

        auth: function(authData, cb) {
          if(!authData) {
            // we're logged out. nothing else to do
            return cb(null);
          }

          var self = this;

          // are we dealing with a new user? find out by checking for a user record
          var userRef = Refs.users.child(authData.uid);
          userRef.once('value', function(snap) {
            var user = snap.val();

            if(user) {
              // google user logging in, update their access token
              if(authData.provider === "google") {
                userRef.update({access_token: authData.token});
                user.access_token = authData.token;
              }
              // save the current user in the global scope
              $rootScope.currentUser = user;
              // navigate to home page
              if($state.current.name === "login") {
                $state.go('default');
              }
            }
            else {
              // construct the user record the way we want it
              user = self.buildUserObjectFromGoogle(authData);
              // only andela emails can signup
              if(user.email.match(/andela.co/g) === null) {
                Toast('Unauthorized! Only Andela email accounts can access');
                return cb(null);
              }
              // save it to firebase collection of users
              userRef.set(user);
              // save the current user in the global scope
              $rootScope.currentUser = user;
              // navigate to home page
              $state.go('default');
            }

            // ...and we're done
            return cb(user);
          });
        },

        buildUserObjectFromGoogle: function(authData) {
          return {
            uid: authData.uid,
            name: authData.google.displayName,
            email: authData.google.email,
            access_token: authData.google.accessToken,
            first_name: authData.google.cachedUserProfile.given_name,
            known_as: authData.google.cachedUserProfile.given_name,
            last_name: authData.google.cachedUserProfile.family_name,
            picture: authData.google.cachedUserProfile.picture,
            created_at: Firebase.ServerValue.TIMESTAMP
          };
        }
      };
    }
  ]);
