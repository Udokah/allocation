var development = {
  aws: {
    queue: 'https://sqs.us-west-2.amazonaws.com/579158489591/allocations-dev-queue'
  },
  firebase: {
    rootRefUrl: 'https://allocations-dev.firebaseio.com/',
    serverUID: '779d7bc4-7aa4-458b-82ef-d3a7cadc6194',
    secretKey: 'J59pz8ajRXkQYjU3SVYxf6kf512tEYNttwtc7rR4'
  },
  skilltree: {
    users: 'http://andela-skilltree-staging.herokuapp.com/api/v1/users',
    blings: 'http://andela-skilltree-staging.herokuapp.com/api/v1/blings'
  }
};

var test = {
  firebase: {
    rootRefUrl: 'https://allocations-dev.firebaseio.com/',
    serverUID: '779d7bc4-7aa4-458b-82ef-d3a7cadc6194',
    secretKey: 'J59pz8ajRXkQYjU3SVYxf6kf512tEYNttwtc7rR4'
  },
  skilltree: {
    users: 'http://andela-skilltree-staging.herokuapp.com/api/v1/users',
    blings: 'http://andela-skilltree-staging.herokuapp.com/api/v1/blings'
  }
};

var production = {
  aws: {
    queue: 'https://sqs.us-west-2.amazonaws.com/579158489591/allocations-queue'
  },
  firebase: {
    rootRefUrl: 'https://allocations-prod.firebaseio.com/',
    serverUID: process.env.FB_SERVER_UID,
    secretKey: process.env.FB_SECRET_KEY
  },
  skilltree: {
    users: 'http://skilltree.andela.co/api/v1/users',
    blings: 'http://skilltree.andela.co/api/v1/blings'
  }
};

var config = {
  development: development,
  test: test,
  production: production,
};
module.exports = config;
