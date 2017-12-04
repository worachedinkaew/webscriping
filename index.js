var app	= require('express')();

const Hapi = require('hapi');
const request = require('request');
const cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var bodyParser = require('body-parser');
var prettyjson = require('prettyjson');

var port = process.env.PORT || 7777;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//website
const playstore = 'http://play.google.com/store/apps/details?id=';
const topvalue = 'http://www.topvalue.me';
const advice = 'http://www.advice.co.th/product';


app.get('/', function (req, res) {
    res.send('<h1>Test Test</h1>');
});

//GET Product By Brand
app.get('/topvalue/:category/:sub_category/:brand', function (req, res) {

    let category = req.params.category;
	let sub_category = req.params.sub_category;
	let brand = req.params.brand;
	let url = `${topvalue}/${category}/${sub_category}/${brand}`;
    
	console.log(url);

	var item = [];

    request(url, (err, response, body) => {

    	if (!err && response.statusCode === 200) {

        	var $ = cheerio.load(body);	
        	var count_product = 0;	

     		$('div.product-info').each(function(){
     			var name = $(this).find('h2.product-name a').text();
     			var special_price = $(this).find('.special-price .price').text().trim();
     			var regular_price = $(this).find('.regular-price .price').text().trim();

     			var temp = {	
     				Name: name,
     				Special_Price: special_price,
     				Regular_Price: regular_price
     			};
     			
     			item.push(temp);
     			count_product++;
     		});

			// var csv = json2csv({ data: item});
			// var path = './CSV/'+'topvalue'+Date.now()+'.csv';
			// fs.writeFile(path, csv, function(err) {
			// 	if (err) throw err;
			// 	console.log('file saved');
			// });

     		res.send({
 				Product: item,
 				Quantity: count_product
 			});

     		console.log(prettyjson.render(item));
     		console.log("Quantity Product : " , count_product);
		} 
		else {
	        res.send({
	          message: `We're sorry, the requested ${url} was not found on this server.`
	        });
    	}
	});
});

//GET Product By Category
app.get('/advice/:category', function (req, res) {
    let category = req.params.category;
	let product = req.params.product;
    let url = `${advice}/${category}`;

    console.log(url);
    
	var item = [];

    request(url, (err, response, body) => {

    	if (!err && response.statusCode === 200) {

        	var $ = cheerio.load(body);		
        	var count_product = 0;

     		$('div.row:nth-of-type(2) div.col-m-2clear').each(function(){
     			var name = $(this).find('.pd-name').text();
     			var price = $(this).find('.inline-price span').text().trim();

     			var temp = {
     				Name: name,
     				Price: price
     			};
     			
     			item.push(temp);
     			count_product++;
     		});

     // 		var csv = json2csv({ data: item});
     // 		var path = './CSV/'+'advice'+Date.now()+'.csv';
     // 		fs.writeFile(path, csv, function(err) {
     // 			if (err) throw err;
					// console.log('File Saved Complete');
     // 		});

     		res.send({
     				Product: item,
     				Quantity: count_product
     			});

     		console.log(prettyjson.render(item));
     		console.log("Quantity Product : " , count_product);
		} 
		else {
	        res.send({
	          message: `We're sorry, the requested ${url} was not found on this server.`
	        });
    	}
	});
});

//GET Product In Category By Brand
app.get('/advice/:category/:brand', function (req, res) {
    let category = req.params.category;
	let brand = req.params.brand;
    let url = `${advice}/${category}/${brand}`;

    console.log(url);
    
	var item = [];

    request(url, (err, response, body) => {

    	if (!err && response.statusCode === 200) {

        	var $ = cheerio.load(body);		
        	var count_product = 0;

     		$('div.row:nth-of-type(2) div.col-m-2clear').each(function(){
     			var name = $(this).find('.pd-name').text();
     			var price = $(this).find('.inline-price span').text().trim();

     			var temp = {
     				Name: name,
     				Price: price
     			};
     			
     			item.push(temp);
     			count_product++;
     		});

     // 		var csv = json2csv({ data: item});
     // 		var path = './CSV/'+'advice'+Date.now()+'.csv';
     // 		fs.writeFile(path, csv, function(err) {
     // 			if (err) throw err;
					// console.log('File Saved Complete');
     // 		});

     		res.send({
     				Product: item,
     				Quantity: count_product
     			});

     		console.log(prettyjson.render(item));
     		console.log("Quantity Product : " , count_product);
		} 
		else {
	        res.send({
	          message: `We're sorry, the requested ${url} was not found on this server.`
	        });
    	}
	});
});


app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});