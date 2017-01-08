var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/major';
var validateCollection = "emailverification"; 



router.post('/', function(req, res, next) {

var email=req.param('email');
var code=req.param('code'); 

MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }
  
 db.collection(validateCollection).find({ email:email, code:code }).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(item.length)
	{
	db.collection(validateCollection).remove( {"_id":item[0]._id});	
	console.log('Code verification successfull');
	res.send('Correct');
	}
	else
	{
		console.log('Incorrect verification code');
		res.send('Incorrect');
	}

    });
	
});
});

module.exports = router;

