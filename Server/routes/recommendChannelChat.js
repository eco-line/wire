var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var querystring = require('querystring');
var url = 'mongodb://localhost:27017/major';

var http = require('http'); //the variable doesn't necessarily have to be named http



router.get('/', function(req, res, next) {

/*****************Parameters Passed *******************/

//var recipientID = req.param('recipientID');
//var msg = req.param('msg');
channelID = req.param('channelID');;
recipientID = req.param('recipientID');;
msg = req.param('msg');;
returnChannelSuggestions = {};
j=0;

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

function print_suggestions(returnChannelSuggestions) {
	if(isEmptyObject(returnChannelSuggestions))
	{
		console.log("no reply found in channel chat");
		console.log(returnChannelSuggestions);
		res.send("null"); //call the next api for further process
	}
	else
	{
	  console.log(returnChannelSuggestions);
	  res.send(returnChannelSuggestions); //call the next api for further process
	}
/*
	var data = querystring.stringify({
		recipientID : recipientID,
		msg : msg
	});

	var options = {
	  host: 'localhost',
	  port: 3000,
	  path:'/recommendChat',
	  method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
      }	  	  
	};

	var req = http.request(options, function(result) {
	    result.setEncoding('utf8');
	    result.on('data', function (chunk) {
	        console.log("body: " + chunk);

			if(chunk == "{}")
			{
				console.log("sab kahli hai bhai");
				res.send("null"); 
			}
			else
			{
			    chunk = JSON.parse(chunk);
				for(var l in chunk)
				{
					var flag=0;
					for(var k in returnChannelSuggestions)
					{
						if(l==k)
						{
							returnChannelSuggestions[k] = parseFloat(returnChannelSuggestions[k])+parseFloat(chunk[l]);
							flag=1;
						}	
					}
					if(flag==0)
					{
						returnChannelSuggestions[l]=chunk[l];
					}
					console.log(returnChannelSuggestions);
					res.send(returnChannelSuggestions);
				}
			}  

	    });
	});

	req.write(data);
	req.end();
*/
}

function find_the_reply(item) {
	if(isEmptyObject(item))
	{
		console.log("no msg found in channel chat");
		console.log(item);
		print_suggestions({}); 
	}
	else
	{
		MongoClient.connect(url, function(err, db) {

		  if(err) 
		  {
		 	res.send('Error');
		    throw err;
		  }

			db.collection("channelChatData").find({channelID : channelID , date : {$gte : item[0].date } , userID : recipientID  }).toArray(function(err2, item2) {

			if(err2)
				throw err2;

			if(item2.length)
			{
				returnChannelSuggestions[item2[0].message] = 1;
				print_suggestions(returnChannelSuggestions);	
			}
			else
			{
				console.log("no reply found");
				print_suggestions({});				
			}

			});
		});	
	}	
}

function find_the_msg() {
	MongoClient.connect(url, function(err, db) {

	  if(err) 
	  {
	 	res.send('Error');
	    throw err;
	  }

		db.collection("channelChatData").find({channelID : channelID , message : {$regex : msg } , userID : { $ne : recipientID } }).toArray(function(err, item) {

		if(err)
			throw err;

			if(item.length)
			{
				console.log(item);
				find_the_reply(item);	
			}
			else
			{
				console.log("no msg found");
				find_the_reply({});
			}

		});

	});
}

find_the_msg();

});
module.exports = router;
