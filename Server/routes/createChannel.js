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
	var channelCollection = "channels";
	var channelUserCollection = "channeluser";

	router.post('/', function(req, res, next) {

	/*****************Parameters Passed *******************/

	var channelname = req.param('channelname');
	var channelcategory = req.param('channelcategory');
	var members = req.param('members');
	var userID = req.param('userID');
	var teamID= req.param('teamID');


	MongoClient.connect(url, function(err, db) {

	if(err) 
	{
		res.send('Error');
		throw err;
	}

	db.collection(channelCollection).find({name:channelname, teamID: teamID}).toArray(
		function(err, item){

			if (err) throw err;

			if(item.length)
			{
				console.log('Channle Name Already exist');
				res.send('Channle Name Already exist');
			}
			else
			{

				var date = new Date();
				
				var document1 = {"name": channelname, "category": channelcategory, "created_at": date, "teamID": teamID};


				db.collection(channelCollection).insert(document1, function(err, records) {

					if (err) throw err;
				else
				{
				
				var channelid= document1._id;

				var document = {"channel_id": channelid, "userid": userID};
				
				db.collection(channelUserCollection).insert(document, function(err, records) {
				if(err) throw err;

				});		


				for(var i=0; i<members.length;i++)
				{
					if(members[i]!='')
					{
					var document = {"channel_id": channelid, "userid": members[i]};
					db.collection(channelUserCollection).insert(document, function(err, records) {
						if(err) throw err;

					});		

					}
				}
			
				res.send('success');
				
				}
				});

			}
		}
		);

	});

	});

	module.exports = router;
