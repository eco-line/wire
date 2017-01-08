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

	var teamids=req.param('ID'); 
	
	console.log(teamids);
	
	MongoClient.connect(url, function(err, db) {

var teamnames=[];

		if(err) 
		{
			res.send('Error');
			throw err;
		}
	
	var length= teamids.length;
	//console.log(teamids[0]);
var j=0;
for(var i=0;i<length;i++)
{
	console.log(teamids[i]);
	var mainID = new ObjectId(teamids[i]);

		db.collection(userteamCollection).find({  _id: mainID }).toArray(function(err, item) {
			if(err)
			{
			res.send('Error');
			throw err;
			}
			else
			{
			var teamid= new ObjectId(item[0].teamID);
			
			db.collection(teamCollection).find({  _id: teamid }).toArray(function(err, item) {
			
			if(err)
			{
			
			res.send('Error');
			throw err;
			
			}
			else
			{
			
			teamnames.push(item[0].name);
			j++;
			
			if(j==length)
			{	
			    res.send(teamnames);  // Yeah, Successfull get names of teams 
			}
			
			}
		});	

			}
		
	});

}


	});


});
module.exports = router;

