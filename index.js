var app	= require('express')();

const Hapi = require('hapi');
const request = require('request');
const cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var bodyParser = require('body-parser');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//website
const playstore = 'http://play.google.com/store/apps/details?id=';
const topvalue = 'http://www.topvalue.me';
const advice = 'http://www.advice.co.th';


app.get('/', function (req, res) {
    res.send('<h1>Test Test</h1>');
});

app.get('/playstore/:appid', function (req, res) {
    let appid = req.params.appid;
    let lang = req.query.lang || 'en';
    let url = `${playstore}${appid}&hl=${lang}`;
    
	request(url, (err, response, body) => {

      if (!err && response.statusCode === 200) {

        let $ = cheerio.load(body);

        let title = $('.document-title').text().trim();
        let publisher = $('.document-subtitle.primary').text().trim();
        let category = $('.document-subtitle.category').text().trim();
        let score = $('.score-container > .score').text().trim();
        let install = $('.meta-info > .content').eq(2).text().trim();
        let version = $('.meta-info > .content').eq(3).text().trim();

        res.send({
          data: {
            title: title,
            publisher: publisher,
            category: category,
            score: score,
            install: install,
            version: version
          }
        });

      }  else {
        res.send({
          message: `We're sorry, the requested ${url} was not found on this server.`
        });
      }
    });
});

app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});