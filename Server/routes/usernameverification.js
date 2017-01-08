var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/major';
var validateCollection = "users"; 

router.post('/', function(req, res, next) {

var username=req.param('username');

MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }
  
 db.collection(validateCollection).find({ username:username}).toArray(function(err, item) {
      
    if (err) throw err;
	
	if(!item.length)
	{
	console.log('Username verification successfull');
	res.send('Correct');
	}
	else
	{
		console.log('Incorrect username');
		res.send('Incorrect');
	}
    });
});
});

module.exports = router;

