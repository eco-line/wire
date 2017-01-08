var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/major';
var collection1 = 'users';
var collection2 = 'verifyEmail';

/* ADD users to table. */
router.post('/', function(req, res, next) {

var email = req.param('email');
var teamName = req.param('team');
var code = req.param('code');
  
MongoClient.connect(url, function(err, db) {

  if (err) 
  {
    throw err;
  }
  
    db.collection(collection2).find({ email:email, code:code }).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(item.length)
	{
		console.log('Code verification successfull');
		
		db.collection(collection1).insert({ email:email, team:teamName },function(err, item) {

		    if (err) throw err;

						res.send('Welcome, registration successfull');

		});		
	}
	else
	{
		console.log('Incorrect verification code');
		res.send(code);
	}

    });
  console.log('Successfully Connected');
});
});

module.exports = router;
