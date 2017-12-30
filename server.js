var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var uri = require('./config/database.js');

var port = process.env.PORT || 8000;

mongoose.Promise = global.Promise;
mongoose.connect(uri.url);

app.use(bodyparser.urlencoded({ extended : true }));
app.use(bodyparser.json());

app.set('view-engine', 'ejs');

require('./app/routes.js')(app);

app.listen(port, function(){
    console.log("port " + port + "is listening");
});