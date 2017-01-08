var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
var url = 'mongodb://localhost:27017/major';
var validateCollection = "sendInvite"; 

router.post('/', function(req, res, next) {

var email = req.param('email');
var code = req.param('code');

var fname = req.param('fname');
var lname = req.param('lname');
var username = req.param('username');
var password = req.param('password');

console.log(email);
//console.log(teamname);

MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }
  
 db.collection(validateCollection).find({email:email,code:code}).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(item.length)
	{
		console.log(item);

		var teamID= new ObjectId(item[0].teamID);
		var em = item[0].email;

		 db.collection("users").find({username:username}).toArray(function(err2, item2) {
		      
		    if (err2) throw err2;
			
			if(item2.length)
			{
				console.log(item2);
				console.log('Username not available');
				res.send('Username not available');				
			}
			else
			{
				var doc = {"fname":fname,"lname":lname,"email":em,"password":password,"username":username}
				//insert user in users table
				db.collection("users").insert(doc, function(err, records) {
					if(err)
						throw err;
					else
					{	
						console.log(records["ops"][0]["_id"]);
						//res.send("user added");

						var dat = {"userID":records["ops"][0]["_id"],"teamID":teamID,"status":"2"}
						//insert user in users table
						db.collection("teamuser").insert(dat, function(err, records) {
							if(err)
								throw err;
							else
							{	
								db.collection("sendInvite").remove({"email":email,"code":code})
								console.log("everything added ");
								//res.send("everything added");
								 db.collection('teams').find({_id:teamID}).toArray(function(err3, item3) {
								      
								    if (err3) throw err3;
									
									if(item3.length)
									{
										var d = {"name":item3[0].name,"teamid":item3[0]._id,"id":dat._id}
										res.send(d);
									}
									else
									{
										console.log('team does not exist');
										res.send('team does not exist');
									}
								    });

							}	
						});


					}	
				});

			}
		    });
	}
	else
	{
		console.log('Code and email id do not match');
		res.send('Code and email id do not match');
	}
    });

});
});



module.exports = router; 

