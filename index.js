var express = require('express');
var app = express();
var webdriver = require('selenium-webdriver');

var By = webdriver.By;

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

//Applications

app.get('/test', function (req, res) {

    var driver = new webdriver.Builder()
        .forBrowser('phantomjs')
        .build();
    driver.get('http://www.google.com/');
    driver.findElement(By.name('q')).sendKeys('webdriver');
    driver.findElement(By.name('btnG')).click();
    driver.wait(function() {
        return driver.getTitle().then(function(title) {
            console.log(title);
            return title === 'webdriver - Google Search';
        });
    }, 5000).then(function() {
        res.status(200).send('Done');
    }, function(error) {
        res.status(200).send(error);
    });
    driver.quit();
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});