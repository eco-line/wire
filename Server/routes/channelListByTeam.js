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
var channelCollection = "channels";
var channelUserCollection = "channeluser";

router.post('/', function(req, res, next) {

/*****************Parameters Passed *******************/

var teamID = req.param('teamID');

MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }

db.collection(channelCollection).find({teamID:teamID}).toArray(function(err, item) {

if(err)
	throw err;

if(item.length)
{
	console.log(item);
	res.send(item);
}
else
{
	console.log('No channles available');
	res.send('NULL');
}

});

});
});
module.exports = router;
