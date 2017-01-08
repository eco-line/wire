var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/major';
var validateCollection = "emailverification"; 

var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'dixitgoyal1995@gmail.com', // Your email id
            pass: 'dixitgoyal1234' // Your password
        }
    });

router.post('/', function(req, res, next) {

var email=req.param('email');
  
MongoClient.connect(url, function(err, db) {

  if (err) 
  {
 	res.send('Error');
    throw err;
  }
  	
  		var randomCode = String(Math.floor(Math.random()*900000) + 100000);		
		
		var date=new Date();

		var document = {
			"email":email,
			"code":randomCode,
			"date" : date
		};
		
		db.collection(validateCollection).insert(document, function(err, records) {
		
		//console.log("Verification code added as "+document._id);
		
		if(err)
		{
				res.send('Error');
    throw err;
 		}
 		else
 		{

		var text = 'Your Verification Code is : '+randomCode;
		
		var mailOptions = {
		    from: 'dixitgoyal1995@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Welcome to Wire Platform', // Subject line
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

