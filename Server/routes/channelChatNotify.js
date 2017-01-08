var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

var url = 'mongodb://localhost:27017/major';

var userCollection = "users"; 
var teamCollection = "teams"; 
var userteamCollection = "teamuser"; 
var chatCollection = "channelChatData";
var channelCollection = "channels";
var channelMsgStatusCollection = "channelMsgStatus";


router.post('/', function(req, res, next) {

/*****************Parameters Passed *******************/

var teamID = req.param('teamID');
var userID = req.param('userID');


MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }


db.collection(channelCollection).find({teamID: teamID}).toArray(function(err, item) {

if(err)
	throw err;

if(item.length)
{
var chatData = [];

for(var i=0;i<item.length;i++)
{

var id = String(item[i]._id);

var channelsCount=item.length;


db.collection(chatCollection).find({ status:'0', channelID: id }).toArray(function(err, item) {

if(err) throw err;


	for(var j=0;j<item.length;j++)
	{

			var id= new ObjectId(item[j]._id); 
									
			var k= item[j];

			console.log(userID);
			//console.log(item[j]._id);

		db.collection(channelMsgStatusCollection).find( { status:0, userID: userID, msg_id: id } ).toArray(function(err, item1) {
			
					if(err) throw err;


					if(item1.length)
					{
					
						chatData.push(k);
					console.log(k);

					if(i==channelsCount)
						res.send(chatData);

					}
		});
	}

});



}

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
