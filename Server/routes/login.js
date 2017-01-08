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

	var teamname=req.param('teamname'); 
	var password = req.param('password');
	var username = req.param('username');


	MongoClient.connect(url, function(err, db) {

		if(err) 
		{
			res.send('Error');
			throw err;
		}

		db.collection(userCollection).find({ username:username, password: password}).toArray(function(err, item) {

			if (err) throw err;

			if(!item.length)
			{
				var data= {
					Error: '1' 
				};	
				console.log(data);
				res.send(data);
			}
			else
			{
				var userid=item[0]._id;

				db.collection(teamCollection).find({ name: teamname}).toArray(function(err, item) {
					
					if(err)
						throw err;
					
					if(!item.length)
					{
						var data= {
							Error: '2' 
						};	
						console.log(data);
						res.send(data);
					}
					else
					{
						var teamid=item[0]._id;
						db.collection(userteamCollection).find({ userID: userid, teamID: teamid}).toArray(function(err, item) {

							if(err)
								throw err;

							if(!item.length)
							{
								var data= {
									Error: '3',
									userid : userid,
									teamID : teamid 
								};	
								console.log(data);
								res.send(data);
							}
							else
							{
								var data= {
									userID: userid,
									ID: item[0]._id,
									status: item[0].status,
									Error: '0' 
								};	
								console.log(data);
								res.send(data);    // Successfully Login
							}
						});	

					}
				});		
			}
		
	});
	});
});
module.exports = router;

