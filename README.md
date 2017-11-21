# heroku node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/JOHNBASS/HerokuNodejs.git 
$ cd HerokuNodejs
$ npm install
$ npm run dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Check Alive

http://localhost:5000/alive is server heartbeat

If work - service alive

```
http://localhost:5000/alive

```

## Firebase init

Add config form firebase console.

```
  // Initialize Firebase
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
```

Check Database rule base

```
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```
## Express-validation

https://www.npmjs.com/package/express-validation

```
module.exports.put = {
  headers: {
    accesstoken: Joi.string().required(),
    userid : Joi.string().required()
  },
  params: {
    id : Joi.number().integer().required()
  },
  body: {
    accesstoken: Joi.string().regex(/^XCOOg3LY0odbv8lV9qd78sJhyhHqNY9sNY$/).required(),
    applicationtoken: Joi.string().regex(/^[a-zA-Z0-9]{16}$/).required()
  }
};

```

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
