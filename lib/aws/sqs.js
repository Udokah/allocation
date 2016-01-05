'use strict';

var AWS = require('aws-sdk');

module.exports = {
  broadcast: function(message, cb) {
    AWS.config.region = 'us-west-2';

    var sqs = new AWS.SQS();
    var params = {
      MessageBody: JSON.stringify(message),
      QueueUrl: 'https://sqs.us-west-2.amazonaws.com/579158489591/allocations-queue',
      DelaySeconds: 0
    };
    sqs.sendMessage(params, function(err, data) {
      if (err) {
        cb(err);
      }
      else {
        cb(null, data);
      }
    });
  }
};