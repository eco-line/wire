var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 

var url = 'mongodb://localhost:27017/major';


router.post('/', function(req, res, next) {

/*****************Parameters Passed *******************/

 recipientID = req.param('recipientID');
 var msg = req.param('msg');

//recipientID = "5851949c80235d68ffdad41a";
//var msg = "dixi";
var msgArr = msg.split(" ");
var returnSuggestions = {};
var check = 0;
var j=0;
MongoClient.connect(url, function(err, db) {

  if(err) 
  {
 	res.send('Error');
    throw err;
  }


for(i=0;i<msgArr.length;i++)
{
//	console.log(msgArr[i]);
	db.collection("chatData").find({recipientID: recipientID, message : {$regex : msgArr[i] }}).toArray(function(err, item) {

	if(err)
		throw err;

		if(item.length)
		{
			var j=0;
			check++;
			ret_res(mycallback,0,item,returnSuggestions,item.length);
		}
		else
		{
			ret_res(mycallback,0,0,0,0);
			//console.log('No chat with this msg and recipient');
			//res.send('No chat with this msg and recipient');
		}

	});
}

});

function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

var mycallback = function(data){

if (isEmptyObject(data)) {
  final_data = {};
} else {
  final_data = JSON.parse(data);
  //console.log(final_data);
}
	
	MongoClient.connect(url, function(err, db) {
		    if(err) 
		    {
		   	  res.send('Error');
		      throw err;
		    }
					db.collection("rawChatData").find({sendmsg:msg}).toArray(function(err2, item2) {
					//console.log(final_data);
					//console.log(item2);
					if(err2)
						throw err2;
					if(item2.length)
					{
						//console.log("yeh item2 hai"+item2);
						//console.log("yeh final data hai"+final_data);
						/*
						for(var l in item2)
						{
							var flag=0;
							for(var k in final_data)
							{
								var m = item2[l].replymsg;
								if(m==k)
								{
									final_data[k] = parseFloat(final_data[k])+parseFloat("0.5");
									flag=1;
								}	
							}
							if(flag==0)
							{
								final_data[m]=0.5;
							}
							console.log(final_data);
							res.send(final_data);
						}*/
						for(var l in final_data)
						{
							var flag=0;
							for(var k in item2)
							{
								var m = final_data[l].replymsg;
								if(m==k)
								{
									item2[k] = parseFloat(item2[k])+parseFloat("0.5");
									flag=1;
								}	
							}
							if(flag==0)
							{
								item2[m]=0.5;
							}
							console.log(item2);
							res.send(item2);
						}						
					}
					else
					{
						//console.log("yeh wala loop response");
						console.log(final_data);
						res.send(final_data);
						//console.log('No reply to above message o');
					}
					});				  

	});	
};


var ret_res = function(callback,j,da,returnSuggestions,len)
{
		if(len == 0)
		{
			console.log("0 wale loop mei hai yeh !!");
			var x = {};
			callback(x);
		}
		else
		{	//console.log("else wala loop");
			var dat = da[0].date;
			//console.log(da);
			MongoClient.connect(url, function(err, db) {

				  if(err) 
				  {
				 	res.send('Error');
				    throw err;
				  }
				  
					db.collection("chatData").find({userID: recipientID , date : { $gte : dat } }).toArray(function(err2, item2) {
						//console.log(item2);
						if(err2)
							throw err2;

							if(item2.length)
							{
								if(j<len)
								{
									returnSuggestions[item2[0].message] = 0.8;
									//returnSuggestions.push(item2[0].message);
									if(j<len-1)
									{
										j++;
										ret_res(callback,j,da,returnSuggestions,len);	
									}
									else
									{
										json_ret = JSON.stringify(returnSuggestions);
										//console.log(json_ret);
										callback(json_ret);						
									}												
								}
							}
							else
							{
								console.log('No reply to above message ooooo');
								var x = {};
								callback(x);
							}

						});

			});			
		}


};





});
module.exports = router;
