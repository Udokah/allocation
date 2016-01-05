'use strict';

var sqs = require('../lib/aws/sqs');

module.exports = function (app) {
  app.post('/broadcast', function(req, res) {
    var message = req.body;
    sqs.broadcast(message, function(err) {
      if (err) {
        res.status(500).json(err);
      }
      else {
        res.status(200);
      }
    });
  });
};