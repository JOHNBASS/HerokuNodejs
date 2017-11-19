var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Third-party libe
var firebase = require("firebase");
const bodyParser = require('body-parser');
var FBMessenger = require('fb-messenger')
var http = require('http');

//http post
http.post = require('http-post');

//FBMessenger
var FBPageToken = "";
var messenger = new FBMessenger(FBPageToken);

//bodyParser
app.use(bodyParser.json());

//firebase
var config = {
    apiKey: "AIzaSyDRZbp33KneGrbLwFvkPRd_40GlkmUD0J0",
    authDomain: "wseteambuilding.firebaseapp.com",
    databaseURL: "https://wseteambuilding.firebaseio.com",
    projectId: "wseteambuilding",
    storageBucket: "wseteambuilding.appspot.com",
    messagingSenderId: "965057226764"
}

firebase.initializeApp(config);

app.get('/', function(request, response) {
  response.render('pages/index');
});

//check webhook isalive
app.get('/alive', function(request, response) {
  console.log("get content:"+ JSON.stringify(req.body));
  response.send('service alive');
});

app.get('/favicon.ico', (request, response) => {
  response.status(204);
});

app.post('/add', function(request, response) {
  console.log("request: "+ JSON.stringify(request.body));

  var db = firebase.database();
  var ref = db.ref("/users").push();

  var value = request.body;
  ref.set(value);

  var postId = ref.key;

  response.send({"messages":[{"text":"請記住自己的ID:"+postId}]});
});

app.get('/add', function(request, response) {
  var fbname = request.query.fbname;
  var fbid = request.query.fbid;

  var db = firebase.database();
  var ref = db.ref("/users").push();

  var value = {
    "fbname":fbname,
    "fbid":fbid,
    "status":0
  };

  ref.set(value);

  var postId = ref.key;

  response.send({"messages":[{"text":"請記住自己的ID:"+postId}]});
});


app.post('/set', function(request, response) {
  console.log("request: "+ JSON.stringify(request.body));

  var db = firebase.database();
  var ref = db.ref("/users/");

  var value = request.body;
  ref.set(value);

  response.send(JSON.stringify(value));
});


app.get('/set', function(request, response) {

  var db = firebase.database();
  var ref = db.ref("/");
  var value = {
  Test1: "t1",
  Test2: "t2"
  }
  ref.set(value);

  response.send(value);
});

app.get('/update', function(request, response) {
  var key = request.query.key;
  var status = request.query.status;

  var db = firebase.database();
  var ref = db.ref("/users/"+key);

  ref.update(
    {"status":status}
  );

  response.send(status);
});

app.get('/kill', function(request, response) {
  var key = request.query.key;
  var status = request.query.status;

  var db = firebase.database();
  var ref = db.ref("/users/"+key);

  ref.update(
    {"status":status}
  );

  ref.once("value", function(snapshot) {
    //messenger.sendTextMessage(snapshot.val().fbid, 'kill you');
    var fbid = snapshot.val().fbid;
    
    http.post('https://api.chatfuel.com/bots/5a1116f4e4b000de468e17cf/users/' + fbid + '/send?chatfuel_token=qwYLsCSz8hk4ytd6CPKP4C0oalstMnGdpDjF8YFHPHCieKNc0AfrnjVs91fGuH74&chatfuel_block_name=status1', {"status":1}, function(res){
      response.contentType('application/json');
      res.on('data', function(chunk) {
        console.log(chunk);
      });
    });


  });

  response.send({"messages":[{"text":"你已經殺死:"+key}]});

});


app.get('/get', function(request, response) {
  var key = request.query.key;
  var db = firebase.database();
  var ref = db.ref("/users/"+key);

  ref.once("value", function(snapshot) {
      console.log(snapshot.val()+ " " + snapshot.val().status);
      response.send(snapshot.val());
  });

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});