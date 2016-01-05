'use strict';

var adminRoutes = require('./admin-routes'),
    messagingRoutes = require('./messaging-routes'),
    projectRoutes = require('./project-routes'),
    skilltreeRoutes = require('./skilltree-routes'),
    userRoutes = require('./users-routes');

module.exports = function (app, config, rootRef) {
  adminRoutes(app, rootRef, config);
  messagingRoutes(app);
  projectRoutes(app, rootRef);
  skilltreeRoutes(app, rootRef, config);
  userRoutes(app, rootRef);
  
  app.get('/*',function(req, res){
    res.sendFile('index.html', {root:'./public'});
  });
};