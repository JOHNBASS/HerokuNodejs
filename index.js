var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

//check webhook isalive
app.get('/alive', function(req, res) {
  console.log("get content:"+ JSON.stringify(req.body));
  res.send('service alive');
});

app.get('/favicon.ico', (req, res) => {
  res.status(204);
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});