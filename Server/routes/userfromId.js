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

		var userid=req.param('uids'); 
		var userData = [];
		
		MongoClient.connect(url, function(err, db) {

			if(err) 
			{
				res.send('Error');
				throw err;
			}
		
				var mainID = new ObjectId(userid);
	
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
							res.send(userData);
						}
					});
			
		}); 
			
	});

module.exports = router;

