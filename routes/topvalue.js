//var Hapi = require('hapi');
var request = require('request');
var cheerio = require('cheerio');
var json2csv = require('json2csv');
var fs = require('fs');
var bodyParser = require('body-parser');
var prettyjson = require('prettyjson');

var express = require('express');
var router = express.Router();

var topvalue = 'http://www.topvalue.me';

router.get('/', function(req, res, next) {
    res.render('table');
    //res.send('test');
});

//GET Product By Brand
router.get('/:category/:sub_category/:brand', function (req, res, next) {

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

        res.render('topvalue', {result: item});
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