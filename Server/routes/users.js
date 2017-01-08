var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/major';
var collection1 = 'users';
var collection2 = 'verifyEmail';

var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'dixitgoyal1995@gmail.com', // Your email id
            pass: 'dixitgoyal1234' // Your password
        }
    });


/* ADD users to table. */
router.post('/', function(req, res, next) {

 var email=req.param('email');
 var teamName=req.param('team');
  
MongoClient.connect(url, function(err, db) {

  if (err) 
  {
    throw err;
  }
  
    db.collection(collection1).find({ email:email, team:teamName }).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(item.length)
	{
		console.log('exists'+item[0]._id);
		res.send('You are already registered');
	}
	else
	{
		console.log('Not exists');
	
		    db.collection(collection2).find({ email:email }).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(item.length)
	{
	var randomCode = String(Math.floor(Math.random()*90000) + 10000);		

    db.collection(collection2).update({_id:item[0]._id},{$set:{code: randomCode}}, function(err, records) {
		
		var text = 'Hello '+teamName+', \n\n Verification Code : '+randomCode;
		var mailOptions = {
		    from: 'dixitgoyal1995@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Welcome to WeDo Chat Platform', // Subject line
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
	
	});	

	}
	else
	{
		var randomCode = String(Math.floor(Math.random()*90000) + 10000);		
		var document = {"email":email,"code":randomCode};
		
		db.collection(collection2).insert(document, function(err, records) {
		
		console.log("Verification code added as "+document._id);
		
		var text = 'Hello '+teamName+', \n\n Verification Code : '+randomCode;
		var mailOptions = {
		    from: 'dixitgoyal1995@gmail.com', // sender address
		    to: email, // list of receivers
		    subject: 'Welcome to WeDo Chat Platform', // Subject line
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
	
	});		
	}
});

		
		
	}

    });

	
  console.log('Successfully Connected');
});
});

module.exports = router;
