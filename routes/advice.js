//var Hapi = require('hapi');
var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var bodyParser = require('body-parser');
var prettyjson = require('prettyjson');

var express = require('express');
var router = express.Router();

var advice = 'http://www.advice.co.th/product';

router.get('/', function(req, res, next) {
    res.render('advice', {title: 'ADVICE'})
});

//GET Product By Category
router.get('/:category', function (req, res) {
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
router.get('/:category/:brand', function (req, res) {
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

module.exports = router;