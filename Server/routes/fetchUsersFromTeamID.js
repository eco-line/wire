var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = 'mongodb://localhost:27017/major';
var userteamCollection = "teamuser"; 
var teamCollection = "teams"; 


router.post('/', function(req, res, next) {

		/*****************Parameters Passed *******************/

		var teamid=req.param('ID'); 
		var mainid=req.param('mainID'); 
		
		console.log(teamid);
		
		MongoClient.connect(url, function(err, db) {

			var user_ids=[];
			if(err) 
			{
				res.send('Error');
				throw err;
			}
			var mainID = new ObjectId(teamid);
				db.collection(userteamCollection).find({teamID: mainID }).toArray(function(err, item) {
					if(err)
					{
						res.send('Error');
						throw err;
					}
					else
					{
						for(k=0;k<item.length;k++)
						{
							
							var userID= item[k].userID;
							
							if(item[k]._id!=mainid)
							{
								user_ids.push(userID);
							}
						
						}			
						res.send(JSON.stringify(user_ids));
					}
				});	
		});
	});

module.exports = router;

