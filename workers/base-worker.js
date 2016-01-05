var request = require('request');
<<<<<<< HEAD
var Firebase = require('firebase');
<<<<<<< HEAD
=======
>>>>>>> fix cronJob bug
var ref = new Firebase('allocation-db.firebaseio.com/projects');

module.exports= function(req, res){ 
       
  var projectsRef = ref.child('projects');

  request
    .get({
        url:'https://api.getbase.com/v2/deals?hot=true',
        headers: req.headers
=======
var ref = new Firebase('https://allocations-db.firebaseio.com/projects');

<<<<<<< HEAD
var job = new CronJob({
  /*CronJob runs every day of the week*/
  cronTime: '01 00 00 * * 0-6',
  onTick: function(req,res) {
    console.log("cron job started");
    var projectsRef = ref.child('projects');
      request
        .get({
          url:'https://api.getbase.com/v2/deals?hot=true',
          headers: {
            Authorization: 'Bearer 2aa980860029876009a405fa93a12f723a0bbaeeba2875221c7e29bd82bebf0c'
          }
>>>>>>> add authorization token to request header
      }, function (error, httpResponse, projects) {
        if (error) {
          res
            .json(error);
        }
        else {
          var data = JSON.stringify(projects);

          for(var i= 0; i<data.length; i++){
            // get owner name and email for projects using owner_id
<<<<<<< HEAD
            request
              .get({
                  url: 'https://api.getbase.com/v2/users/' + projects.data.owner_id,
                  headers: {
                    Authorization: 'Bearer 2aa980860029876009a405fa93a12f723a0bbaeeba2875221c7e29bd82bebf0c'
                  } 
=======
            request.get({
                  url: 'https://api.getbase.com/v2/users/' + data.data.owner_id,
                  headers: req.headers 
>>>>>>> fix cronJob bug
                }, function (error, httpResponse, user) {
                  if (error) {
                    res
                      .json(error);
                  }
                  else {
                    //save hot deals from base crm to firebase
                    projectsRef.push({
                      project_id: data.data.id,
                      name: data.items[i].data.name,
                      start_date: data.items[i].data.created_at,
                      internally_billable:true,
                      client_billable:true,
                      description: "",
<<<<<<< HEAD
<<<<<<< HEAD
                      tags: data.items[i].data.tags
                      owner: user.data.name
=======
                      tags: projects.items[i].data.tags,
=======
                      tags: data.items[i].data.tags,
>>>>>>> fix cronJob bug
                      owner: user.data.name,
>>>>>>> remove string conversion and access projects data directly
                      owner_email: user.data.email
                    });
                  }
              });
          }
        }
    });

  },
  start: false,
  timeZone: 'Nigeria/Lagos'
});
<<<<<<< HEAD
job.start();
=======

module.exports = function() {

  var CronJob = require('cron').CronJob;
  new CronJob('* * * * * *', function (req,res) {
      console.log("cron job started");
      var projectsRef = ref.child('projects');
        request
          .get({
            url:'https://api.getbase.com/v2/deals?hot=true',
            headers: {
              'User-Agent': 'request',
              'Accept': 'request',
              'Authorization': 'Bearer 2aa980860029876009a405fa93a12f723a0bbaeeba2875221c7e29bd82bebf0c'
            }
          }, function (error, httpResponse, projects) {
            if (error) {
              console.log(error.error);
            }
            else {
              console.log(projects);

              for(var i= 0; i<projects.length; i++){
                // get owner name and email for projects using owner_id
                request
                  .get({
                      url: 'https://api.getbase.com/v2/users/' + projects.data.owner_id,
                      headers: {
                        'User-Agent': 'request',
                        'Accept': 'request',
                        'Authorization': 'Bearer 2aa980860029876009a405fa93a12f723a0bbaeeba2875221c7e29bd82bebf0c'
                      } 
                    }, function (error, httpResponse, user) {
                      if (error) {
                        res
                          .json(error);
                      }
                      else {
                        console.log(projects);
                        //save hot deals from base crm to firebase
                        projectsRef.push({
                          project_id: projects.data.id,
                          name: projects.items[i].data.name,
                          start_date: projects.items[i].data.created_at,
                          internally_billable:true,
                          client_billable:true,
                          description: "",
                          tags: projects.items[i].data.tags,
                          owner: user.data.name,
                          owner_email: user.data.email
                        });
                      }
                });
              }
            }
        });
      },null,true,'America/Los_Angeles');

}
>>>>>>> fix cron set up and add needed headers params for basecrm api

=======
job.start();
>>>>>>> fix cronJob bug
