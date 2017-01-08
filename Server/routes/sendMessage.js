var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/major';

var userCollection = "users"; 
var teamCollection = "teams"; 
var userteamCollection = "teamuser"; 
var chatCollection = "chatData";

router.post('/', function(req, res, next) {

	/*****************Parameters Passed *******************/

	var recipientID=req.param('recipientID');
	var message = req.param('message');
	var teamID = req.param('teamID');
	var userID = req.param('userID');
	var status = 0;

	console.log(recipientID+message+teamID+userID+"status--"+status);

	MongoClient.connect(url, function(err, db) {

		if(err) 
		{
			res.send('Error');
			throw err;
		}

		var date = new Date();
		
		var document = {"userID": userID, "recipientID": recipientID, "teamID": teamID, "message": message, "date" : date ,"status" : status};

		db.collection(chatCollection).insert(document, function(err, records) {

			if (err) throw err;

			res.send('Success');
			
		});
	});
});
module.exports = router;

