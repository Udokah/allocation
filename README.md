# Allocations

## Introduction

Allocations is an application for matching Andela Projects with available Andela Fellows. Fellows will be able to bid for projects and the best fit will be assigned to them.

Voting method will be used to determine the individual that is best for a project.

The application is built using Firebase + Angular + NodeJS (i.e FAN Stack).

Firebase's realtime data store works well with Angular's two-way data binding and content rendering. Node.js is used in the backend to make our app API capable.


## How to use Allocations

### Clone Allocations

```
git clone git@github.com:andela/allocations.git
cd allocations
```

### Install Dependencies

```
npm install
bower install
```

### Configure the Application

 1. Open `config/config.js` and set the value of rootRefUrl constant to your Firebase URL
 1. Open `config/config.js` and set the value of serverUID constant to your generated UID (this used when authenticating the node server with Firebase)
 1. Open `config/config.js` and set the value of secretKey constant to your Firebase Secret Key
 1. Open `app\js\services\refs.js` and specify your Test Firebase URL (this is for the client tests to run properly)
 1. Go to your Firebase dashboard and enable Google authentication under the Login&Auth tab
 1. Copy/paste the contents of `config/security-rules.json` into your Security tab, which is also under your Firebase dashboard.

### Run the Application

We have preconfigured the project with gulp:

```
gulp
```

Now browse to the app at `http://localhost:5555`.

## Directory Layout

    app/                  --> all of the files to be used in production
      img/                --> image files
      js/                 --> javascript files
        controllers/      --> application controllers
        filters/          --> custom angular filters
        services/         --> custom angular services
      shared/             --> shared views (jade templates)
      styles/             --> application LESS files
      views/              --> angular view partials (jade templates)
    config/               --> config files
    lib/
      firebase/
        auth.js           --> node module to authenticate server with firebase
    routes/               --> server routes
    test/                 --> test files
      client/             --> frontend unit specs/tests
      e2e/                --> end-to-end specs
      server/             --> backend unit specs/tests
    index.js              --> node server



### Running Tests

- `gulp test` runs all tests

- `gulp test:client` runs frontend tests

- `gulp test:server` runs backend tests


## Continuous Integration

### Circle CI

[Circle CI](https://circleci.com/) is a continuous integration service, which can monitor GitHub for new commits
to your repository and execute scripts such as building the app or running tests. The FirebaseAngularNode-seed
project contains a Travis configuration file, `circle.yml`, which will cause CircleCI to run your
tests when you push to GitHub.

You will need to enable the integration between CircleCI and GitHub. See the CircleCI website for more
instruction on how to do this.