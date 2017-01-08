var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

var url = 'mongodb://localhost:27017/major';

var userCollection = "users"; 
var teamCollection = "teams"; 
var userteamCollection = "teamuser"; 
var chatCollection = "channelChatData";
var channelUserCollection = "channeluser";
var channelMsgStatusCollection = "channelMsgStatus";


router.post('/', function(req, res, next) {

	/*****************Parameters Passed *******************/

	var userID=req.param('userID');
	var message = req.param('message');
	var channelID = req.param('channelID');
	var status = 0;

	MongoClient.connect(url, function(err, db) {

		if(err) 
		{
			res.send('Error');
			throw err;
		}

		var date = new Date();
		
		var document = { "userID": userID, "channelID": channelID, "message": message, "date" : date ,"status" : "0" };


		db.collection(chatCollection).insert(document, function(err, records) {

			if (err) throw err;

			var msgID = document._id;

	var cid = new ObjectId(channelID);

	db.collection(channelUserCollection).find({channel_id:cid}).toArray(
			
			function(err, item){

			if (err) throw err;

		
		for(var j=0;j<item.length;j++)
		{
	
		var document1 = { "userID" : item[j].userid, "channelID" : channelID, "msg_id" : msgID ,"status" : "0" };


		db.collection(channelMsgStatusCollection).insert(document1, function(err, records) {

			if (err) throw err;
			
		});

		if(j==item.length-1)
				res.send('Success');

	}
			
		});



			
		});
	});


	});
module.exports = router;

