var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

var url = 'mongodb://localhost:27017/major';

var userCollection = "users"; 
var teamCollection = "teams"; 
var userteamCollection = "teamuser"; 
var chatCollection = "chatData";

router.post('/', function(req, res, next) {

/*****************Parameters Passed *******************/

var recipientID = req.param('userID');

MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }


db.collection(chatCollection).find({status:0, recipientID: recipientID}).toArray(function(err, item) {

if(err)
	throw err;

if(item.length)
{
	console.log(item);
	res.send(item);
}
else
{
	console.log('No recent Chat');
	res.send('NULL');
}

});

});
});
module.exports = router;
