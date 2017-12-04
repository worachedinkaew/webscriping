var express	= require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');

var port = process.env.PORT || 7777;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var topvalue = require('./routes/topvalue');
var advice = require('./routes/advice');

app.use('/topvalue', topvalue);
app.use('/advice', advice);


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});