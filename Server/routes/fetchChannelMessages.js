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
var channelMsgStatusCollection = "channelMsgStatus";

router.post('/', function(req, res, next) {

	/*****************Parameters Passed *******************/

	var channelID=req.param('channelID');
	var teamID = req.param('teamID');
	var userID = req.param('userID');

	//console.log(recipientID);
	console.log(userID);

	var chatData = [];

	MongoClient.connect(url, function(err, db) {

		if(err) 
		{
			res.send('Error');
			throw err;
		}

		db.collection(chatCollection).find({channelID:channelID}).toArray(
			function(err, item){

				if (err) throw err;

				if(item.length)
				{
					for(var i=0;i<item.length;i++)
					{
					var send=0;
					if(item[i].userID==userID)
					{
					send=1;
					}
					
						chatData.push({"senderID": item[i].userID,
							"message" :item[i].message,
							"date": item[i].date,
							"send": send}); 
						
						var id= new ObjectId(item[i]._id); 
						
						db.collection(channelMsgStatusCollection).update({msg_id:id, userID: userID }, {$set:{status:1}}, function(err, result) {
							if (err)
								throw err;
						});
					
					}
					res.send(chatData);
				}
				else
				{
								res.send('NIL');
				}
			}
			);

	});
});

module.exports = router;
