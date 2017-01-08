var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/major';
var validateCollection = "sendInvite"; 

var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'dixitgoyal1995@gmail.com', // Your email id
            pass: 'dixitgoyal1234' // Your password
        }
    });


router.post('/', function(req, res, next) {

var userID=req.param('userID');
var teamID=req.param('teamID');
var status=req.param('status');
var _id=req.param('_id');
var email=req.param('email');


console.log(email);

  
MongoClient.connect(url, function(err, db) {

	  if (err) 
	  {
	 	res.send('Error');
	    throw err;
	  }
  	
  		var randomCode = String(Math.floor(Math.random()*900000) + 100000000000);		
		
		var date=new Date();

		var document2 = {
			"userID":userID,
			"teamID":teamID,
			"email":email,
			"code":randomCode,
			"date" : date
		};
		
		db.collection(validateCollection).insert(document2, function(err, records) {
		
		if(err)
		{
				res.send('Error');
    			throw err;
 		}
 		else
 		{
 			console.log("done");

 		var link = "http://localhost/wire/#/verifyInvite/"+email+"/"+randomCode;

		var text = 'Click on this link to accept invite  : '+link;
		
		var mailOptions = {
		    from: 'dixitgoyal1995@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Invitation to Join Wire', // Subject line
		    text: text //, // plaintext body
		};

		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        console.log(error);
		        res.send('Your email id is not valid');
		    }
		    else
		    {
		        console.log('Message sent:');
		    	res.send('Check Your Inbox');
		    }
		});
		
	}
	});		
	
  console.log('Successfully Connected');
});
});



module.exports = router; 

