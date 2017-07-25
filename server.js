
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
extended: true})); 


var onboard = require('./routes/onboard')(app);
var search = require('./routes/search')(app);
var invoke = require('./routes/invoke')(app);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
