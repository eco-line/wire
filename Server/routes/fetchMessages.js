var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

var url = 'mongodb://localhost:27017/major';

var userCollection = "users"; 
var teamCollection = "teams"; 
var userteamCollection = "teamuser"; 
var chatCollection = "chatData";

router.post('/', function(req, res, next) {

	/*****************Parameters Passed *******************/

	var recipientID=req.param('recipientID');
	var teamID = req.param('teamID');
	var userID = req.param('userID');

	//console.log(recipientID);
	//console.log(teamID);

	var chatData = [];

	MongoClient.connect(url, function(err, db) {

		if(err) 
		{
			res.send('Error');
			throw err;
		}

		db.collection(chatCollection).find({teamID:teamID,userID:recipientID}).toArray(
			function(err, item){

				if (err) throw err;

				if(item.length)
				{
					for(var i=0;i<item.length;i++)
					{
						chatData.push({"senderID": item[i].userID,
							"message" :item[i].message,
							"date": item[i].date,
							"send": 0}); 
						var id= new ObjectId(item[i]._id); 
						db.collection(chatCollection).update({_id:id}, {$set:{status:1}}, function(err, result) {
							if (err)
								throw err;
						});
					}

					db.collection(chatCollection).find({teamID:teamID,recipientID:recipientID, userID: userID}).toArray(
						function(err, item){

							if (err) throw err;

							if(item.length)
							{
								for(var i=0;i<item.length;i++)
								{
									chatData.push({"senderID": item[i].userID,
										"message" :item[i].message,
										"date": item[i].date,
										"send": 1}); 
								}
								console.log ( chatData );
								res.send ( chatData );
							}
							else
							{
								res.send(chatData);
							}
						}
						);
				}
				else
				{
					db.collection(chatCollection).find({teamID:teamID,recipientID:recipientID, userID: userID}).toArray(
						function(err, item){

							if (err) throw err;

							if(item.length)
							{
								for(var i=0;i<item.length;i++)
								{
									chatData.push({"senderID": item[i].userID,
										"message" :item[i].message,
										"date": item[i].date,
										"send": 1}); 
								}
								console.log ( chatData );
								res.send ( chatData );
							}
							else
							{
								res.send('NIL');
							}
						}
						);
				}
			}
			);

	});
});

module.exports = router;
