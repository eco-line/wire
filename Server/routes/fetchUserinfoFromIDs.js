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

		var userids=req.param('uids'); 
		userids = JSON.parse(userids);
		var userData = [];
		
		MongoClient.connect(url, function(err, db) {

			if(err) 
			{
				res.send('Error');
				throw err;
			}
			var j=0;
	
			for(i=0;i<userids.length;i++)
			{
				var mainID = new ObjectId(userids[i]);
	
					db.collection("users").find({_id: mainID }).toArray(function(err, item) {
	
						if(err)
						{
							res.send('Error');
							throw err;
						}
						else
						{
						
							userData.push({ 
							        "id" : item[0]._id,
							        "fname"  : item[0].fname,
							        "lname"  : item[0].lname,
							        "email" : item[0].email
							    });

							if(j==userids.length-1)
								res.send(userData);
							j++;
						}
					});
			}
		}); 
			
	});

module.exports = router;

