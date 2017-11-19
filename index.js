var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Third-party libe
var firebase = require("firebase");

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


app.get('/get', function(request, response) {

  var db = firebase.database();
  var ref = db.ref("/");
  ref.once("value", function(snapshot) {
      console.log(snapshot.val());
      response.send(snapshot.val());
  });

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});