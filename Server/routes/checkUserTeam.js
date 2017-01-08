var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = 'mongodb://localhost:27017/major';
var validateCollection = "teams"; 

router.post('/', function(req, res, next) {

var idarr=JSON.parse(req.param('id'));
var teamname=String(req.param('teamname'));

console.log(idarr);
console.log(teamname);

var flag = 0;

MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }
  
 db.collection(validateCollection).find({name:teamname}).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(item.length)
	{
		var teamid= new ObjectId(item[0]._id);
		console.log(item[0]._id);
		console.log(idarr.length);
		 db.collection('teamuser').find({teamID:teamid}).toArray(function(err2, item2) {
		      
		    if (err2) throw err2;
			
			if(item2.length)
			{
				for(k=0;k<item2.length;k++)
				{
					for(j=0;j<idarr.length;j++)
					{
						if(item2[k]._id == idarr[j])
						{
							console.log('Loggedin with '+item2[k].teamID);
							flag = 1;
							var info = {'ID':item2[k]._id,'userID':item2[k].userID,'teamID':item2[k].teamID,'status':item2[k].status,'_id':item2[k]._id};
							res.send(info);
							break;
						}	
					}
				}
				if(flag == 0)
				{
					res.send("User and Team does not match");
				}
			}
			else
			{
				console.log('team exist but does not match current user');
				res.send('team exist but does not match current user');
			}
		    });
	}
	else
	{
		console.log('Team Does not exist');
		res.send('Team Does not exist');
	}
    });
});
});



module.exports = router; 

