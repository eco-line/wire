var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/major';

var userCollection = "users"; 
var teamCollection = "teams"; 
var userteamCollection = "teamuser"; 


router.post('/', function(req, res, next) {

	/*****************Parameters Passed *******************/

	var email=req.param('email');
	var teamname=req.param('teamname'); 
	var fname = req.param('fname');
	var lname = req.param('lname');
	var password = req.param('password');
	var username = req.param('username');


	MongoClient.connect(url, function(err, db) {

		if(err) 
		{
			res.send('Error');
			throw err;
		}

		db.collection(teamCollection).find({ name:teamname}).toArray(function(err, item) {

			if (err) throw err;

			if(item.length)
			{
			var data= {
					Error: '1' 
					};	
			res.send(data);
			}
			else
			{
				var document = {"fname":fname, "lname":lname, "email": email, "password": password, "username": username};

				db.collection(userCollection).insert(document, function(err, records) {
					if(err)
						throw err;
					else
					{
						var userid=document._id;	
						var document1 = {"name": teamname};
						
						db.collection(teamCollection).insert(document1, function(err, records) {
							if(err)
								throw err;
							else
							{
								var teamid=document1._id;	
								var document2 = { "userID":userid, "teamID":teamid, "status": "1" };

								db.collection(userteamCollection).insert(document2, function(err, records) {
									if(err)
										throw err;
									else
									{	
									var data= {
										userID: userid,
										ID: document2._id,
										Error: '0' 
									};	
										res.send(data);
									}	
								});
							}
						});
					}
				});		
			}
		});
	});
});
module.exports = router;

