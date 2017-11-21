# heroku node-js-getting-started

A barebones Node.js app using [Express 4](http://expressjs.com/).

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/JOHNBASS/HerokuNodejs.git 
$ cd HerokuNodejs
$ npm install
$ npm dev
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Check Alive

http://localhost:5000/alive is server heartbeat

If work - service alive

```
http://localhost:5000/alive

```

## Deploying to Docker Heroku

Install the heroku-docker toolbelt plugin:
```
$ heroku plugins:install heroku-docker
```

nitialize your app:

```sh
$ heroku docker:init
Wrote Dockerfile
Wrote docker-compose.yml

```

And run it with Docker Compose:
```
$ docker-compose up web
```


## Docker Hacking

To test changes locally, you can edit this image and rebuild it, replacing the heroku/node image on your machine:

```
docker build -t heroku/node:1.0 .
```

To return to the official image:

```
docker pull heroku/node
```

#Run Docker 
```
 $ docker build -t heroku/node:1.0 .
 $ docker images 
 $ docker run -p 5000:5000 -d heroku/node:1.0
 $ docker logs <id>
```

#Check Runing Docker
```
 $ docker ps
 $ docker kill <id>
```

#Testing Docker

open http://localhost:5000/alive

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
