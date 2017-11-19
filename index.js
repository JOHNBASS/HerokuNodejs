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

//bodyParser
app.use(bodyParser.json());

//firebase
var config = {

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
  var ref = db.ref("/users/").push();

  var value = request.body;
  ref.set(value);

  var postId = ref.key;

  response.send(JSON.stringify(postId));
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