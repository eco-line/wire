
app.controller("mainController", function($scope,$http,$location,$rootScope) {

$scope.validateEmail = function() {

$rootScope.loader= true;

  if ($scope.email) {
   $http({
    method : "POST",
    data: {"email": $scope.email },
    url : "http://localhost:3000/emailvalidation"
  }).then(function mySucces(response) {

$rootScope.loader= false;
    console.log(response.data);

    if(response.data=='Check Your Inbox')
    {  
      $rootScope.email=$scope.email;
      $location.path("/verify");
    }
    else
      $scope.status = response.data;
  }, function myError(response) {
    $rootScope.loader= false;
    $scope.status = response.data;
  });
}
else
{
  $rootScope.loader= false;
  console.log('Error');
}
};
});

app.controller("verifyController", function($scope,$http,$location,$rootScope) {


$scope.verifyEmail = function() {

$rootScope.loader= true;

  if ($rootScope.email && $scope.code ) {
   $http({
    method : "POST",
    data: {"email": $rootScope.email, "code" : $scope.code },
    url : "http://localhost:3000/emailverification"
  }).then(function mySucces(response) {
$rootScope.loader= false;
    console.log(response.data);
    $scope.status = response.data;
    if(response.data=='Correct')
      $location.path("/userInfo");

  }, function myError(response) {
    $rootScope.loader= false;
    $scope.status = response.data;
  });
}
else
{
  $rootScope.loader= false;
  console.log('Error');
}
};
});


app.controller("userController", function($scope,$http,$location,$rootScope) {


$scope.verifyusername = function() {

$rootScope.loader= true;

  if ($scope.username) {
   $http({
    method : "POST",
    data: {"username": $scope.username },
    url : "http://localhost:3000/usernameverification"
  }).then(function mySucces(response) {

$rootScope.loader= false;
    console.log(response.data);
    $scope.status = response.data;
    if(response.data == 'Correct')
    {
      $rootScope.fname=$scope.fname;
      $rootScope.lname=$scope.lname;
      $rootScope.username=$scope.username;
      $location.path("/password");
    }

  }, function myError(response) {
    $rootScope.loader= false;
    $scope.status = response.data;
  });
}
else
{
  $rootScope.loader= false;
  $scope.status = 'Error';
  console.log('Error');
}
};
});



app.controller("passwordController", function($scope,$http,$location,$rootScope) {

  

$scope.verifyPassword = function() {

$rootScope.loader= true;

  if ($scope.password) {
  $rootScope.loader= false;

    $rootScope.password=$scope.password;
    $location.path("/team");
  }
  else
  {
    $rootScope.loader= false;
    $scope.status='Error';
  }

};
});

app.controller("teamController", function($scope,$http,$location,$rootScope) {

<<<<<<< HEAD
=======


>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc
$scope.createTeam = function() {

$rootScope.loader= true;

  if ($scope.name && $rootScope.fname && $rootScope.lname && $rootScope.email && $rootScope.username && $rootScope.password) 
  {
   $http({
    method : "POST",
    data: { "teamname": $scope.name, "fname": $rootScope.fname, "lname": $rootScope.lname, "email": $rootScope.email,"username": $rootScope.username, "password": $rootScope.password },
    url : "http://localhost:3000/createTeam"
  }).then(function mySucces(response) {
    console.log(response.data);

    $rootScope.loader= false;

    $scope.status = response.data;

    var data= response.data;
    if(data.Error==0)
    {
      $rootScope.$emit("setSession", data);
      $location.path("/teams/"+$scope.name);
    }
    else
    {
      $scope.status='Error Try Again ';    
    }
  }, function myError(response) {
    $rootScope.loader= false;

    $scope.status = response.data;
  }); 
}
else
{
  $rootScope.loader= false;
  $scope.status='Go To home page and try again';
  console.log('Error');
}
};

});


app.controller("teamMainController", function($routeParams,$scope,$window,$route,$http,$location,$rootScope) {

$scope.teamName = $routeParams.name;

$scope.channels = [];

 $scope.listChannels = function(id) {

 
    if (id) {
     $http({
      method : "POST",
      data: {"teamID": $scope.teamID},
      url : "http://localhost:3000/channelListByTeam"
    }).then(function mySucces(response) {
    
     // console.log(response.data);
    if(response.data!='NULL')
    {
      var channelData=response.data;

      for(var i=0;i<channelData.length;i++)
      {
      
      $scope.channels.push({
                    "id"            : channelData[i]._id,
                    "name"           : channelData[i].name,
                    "category"       : channelData[i].category,
                    "created_at"     : channelData[i].created_at,
                    "teamID"         : channelData[i].teamID,
                    "readPending"    : '0'});

      var channelID = channelData[i]._id;
     
     $http({
      method : "POST",
      data: {"channelID": channelID },
      url : "http://localhost:3000/memberListByChannel"
    }).then(function mySucces(response) {
    
          //console.log(response.data);

    }, function myError(response) {
      console.log(response.data);
    }); 
      }
console.log($scope.channels);

    }
    }, function myError(response) {
      console.log(response.data);
    }); 
  }
  else
{
    console.log('Error');
}
};


if($window.sessionStorage.getItem("ID")===null || JSON.parse($window.sessionStorage.getItem("ID")).length==0)
     {
      $location.path("/");
     }
     else
     {
console.log(JSON.parse($window.sessionStorage.getItem("ID")).length);
  $http({
    method : "POST",
    data: { "id": $window.sessionStorage.getItem('ID'), "teamname": $routeParams.name },
    url : "http://localhost:3000/checkUserTeam"
  })
  .then(function mySucces(response) 
  {
    
   $rootScope.loginButton= false;
   
   $scope.data = response.data;

    if(response.data.status == 1)
      $scope.admin = true;
    else
      $scope.admin = false;

    console.log('Main Team ID' + response.data.teamID);
    
    $scope.teamID=response.data.teamID;
    $scope.userID=response.data.userID;
    $scope.mainID=response.data.ID;

    $scope.listChannels($scope.teamID); 

      $http({
        method : "POST",
        data : {"ID":response.data.teamID, "mainID": response.data.ID},
        url : "http://localhost:3000/fetchUsersFromTeamID"
      })
      .then(function mySucces(response) 
      {

        // Fetch All uswerids of members of this team

        var userids = JSON.stringify(response.data);
       
          $http({
            method : "POST",
            data : {"uids":userids},
            url : "http://localhost:3000/fetchUserinfoFromIDs"
          })
          .then(function mySucces(response) 
          {
          
          // Data of all members of team
            console.log(response.data.length);  
            var noUsers = response.data.length;
            var userData= response.data;
            $scope.mainUsers=[];
            for(var i=0;i<noUsers;i++)
            {
              $scope.mainUsers.push(
                {
                    "id"     : userData[i].id,
                    "fname"  : userData[i].fname,
                    "lname"  : userData[i].lname,
                    "email"  : userData[i].email,
                    "readPending" : '0'
              });

              $scope.recipientID = userData[0].id;
                            
            }
            console.log($scope.mainUsers);
     
          }, 
          function myError(response) 
          {
            console.log(response);
          });
      }, 
      function myError(response) 
      {
        console.log(response);
      });

  }, 
  function myError(response) 
  {
    console.log(response);
  }); 
}

$scope.rowClass = function(index){
       if(index == 0){
           return 'active';
       }
      return '';
};

$scope.logout = function()
{

console.log($scope.mainID);

$rootScope.loginButton= true;

var a=JSON.parse($window.sessionStorage.getItem("ID"));
var index = a.indexOf($scope.mainID);

if(index>-1)
  a.splice(index, 1);

$window.sessionStorage.setItem("ID", JSON.stringify(a));

      $location.path("/");
}

});



app.controller('MyController', function ($scope, $window, $rootScope,$http, $location) {

$rootScope.loginButton= true;
$rootScope.loader= false;

$scope.Get = function () 
{
var a=JSON.parse($window.sessionStorage.getItem("ID"));
console.log(a);
}

$scope.remove =function()
{
  $window.sessionStorage.removeItem("ID");
}

$rootScope.$on("setSession", function(event, id){
 $scope.setTeamSession(id);
});

$scope.setTeamSession = function(data) {   
  console.log('sessionStorage');
 

     if($window.sessionStorage.getItem("ID") === null)
     { 
        var d=[data.ID];
       $window.sessionStorage.setItem("ID", JSON.stringify(d));        
     }
     else
     {
      var a=JSON.parse($window.sessionStorage.getItem("ID"));
      var l=a.length;

       a[l] = data.ID;
       $window.sessionStorage.setItem("ID", JSON.stringify(a));

     }

}

var fetchTeams = function () {

if($window.sessionStorage.getItem("ID") !==null)
     {
      var a=JSON.parse($window.sessionStorage.getItem("ID"));
      $http({
    method : "POST",
    data: { "ID": a},
    url : "http://localhost:3000/fetchTeamsLoggedIn"
  }).then(function mySucces(response) {

    console.log(response.data);
    $scope.teamnames=response.data;

  }, function myError(response) {
  //  $scope.status = response.data;
  });        

      }
    
};

fetchTeams(); // Fetch All Teams in which user is already logged in 

});


app.controller("verifyInviteController", function($routeParams,$scope,$window,$route,$http,$location,$rootScope) {

$scope.addUser = function() {

$rootScope.loader= true;

$scope.email=$routeParams.email;
$scope.code=$routeParams.code;

var fname = $scope.fname;
var lname = $scope.lname;
var username = $scope.username;
var password = $scope.password;

console.log($scope.email);
console.log($scope.code);
console.log($scope.username);

var data = {"email":$scope.email,"code":$scope.code,"fname":fname,"lname":lname,"username":username,"password":password};

  $http({
    method : "POST",
    data: data,
    url : "http://localhost:3000/checkVerifyInvite"
  })
  .then(function mySucces(response) 
  {
    console.log(response);

$rootScope.loader= false;

   if($window.sessionStorage.getItem("ID") === null)
     { 
        var d=[response.data.id];
       $window.sessionStorage.setItem("ID", JSON.stringify(d));        
     }
     else
     {
      var a=JSON.parse($window.sessionStorage.getItem("ID"));
      var l=a.length;

       a[l] = response.data.id;
       $window.sessionStorage.setItem("ID", JSON.stringify(a));
     }

    $location.path("/teams/"+response.data.name);
  }, 
  function myError(response) 
  {
    $rootScope.loader= false;
    $scope.status='Error';
    console.log(response);
  }); 

}

});


app.controller("chatController", function($routeParams,$interval,$scope,$window,$route,$http,$location,$rootScope) {

$scope.chatmessages=[];

<<<<<<< HEAD
$scope.botDataDisplay=[];

$scope.channel = 0;

$scope.runBot = function(msg, userid)
{

console.log('Bot Called');
console.log(msg);
console.log(userid);

$scope.botDataDisplay=[];

if(msg && userid)
{

var m=msg.split(' ');

console.log('Message Length - '+m.length);
j=0;
var botData=[];
for(var i=0;i<m.length;i++)
{

$http({
    method : "POST",
    data: { "msg": m[i], "recipientID": userid },
    url : "http://localhost:3000/recommendChat"
  })
  .then(function mySucces(response) 
  {

    botData.push(response.data);

    if(j==i-1)
      {
      for(k=0;k<botData.length;k++)
      {
      n = botData[k];
      jQuery.each(n, function(i, val) {
        console.log(i);
        console.log(val);
        $scope.botDataDisplay.push({"msg": i,"rank": val});
        });
      }
      console.log($scope.botDataDisplay);
      }

    console.log(j);
    j++;
    
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 
}
}
}



$scope.runChannelBot = function(msg, userid, channelid)
{

console.log('Channe Bot Called');
console.log(msg);
console.log(userid);
console.log(channelid);

$scope.botDataDisplay=[];

if(msg && userid && channelid)
{

var m=msg.split(' ');

console.log('Message Length - '+m.length);
j=0;
var botData=[];

for(var i=0;i<m.length;i++)
{

$http({
    method : "POST",
    data: { "msg": m[i], "recipientID": userid },
    url : "http://localhost:3000/recommendChat"
  })
  .then(function mySucces(response) 
  {

    botData.push(response.data);

    if(j==i-1)
      {
      for(k=0;k<botData.length;k++)
      {
      n = botData[k];
      jQuery.each(n, function(i, val) {
        console.log(i);
        console.log(val);
        $scope.botDataDisplay.push({"msg": i,"rank": val});
        });
      }
      console.log($scope.botDataDisplay);
      }

    console.log(j);
    j++;
    
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 
}

var botData=[];
j=0;
for(var i=0;i<m.length;i++)
{

$http({
    method : "POST",
    data: { "msg": m[i], "recipientID": userid, "channelID": channelid },
    url : "http://localhost:3000/recommendChannelChat"
  })
  .then(function mySucces(response) 
  {

    botData.push(response.data);

    if(j==i-1)
      {
      for(k=0;k<botData.length;k++)
      {
      n = botData[k];
      jQuery.each(n, function(i, val) {
        console.log(i);
        console.log(val);
        $scope.botDataDisplay.push({"msg": i,"rank": val});
        });
      }
      console.log($scope.botDataDisplay);
      }

    console.log(j);
    j++;
    
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 
}

}
}


=======
$scope.channel = 0;

>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc
$scope.fetchMessages = function(rid,teamid)
{
$scope.chatmessages=[];

if( rid && teamid && $scope.channel == 0)
{

$http({
    method : "POST",
    data: { "teamID": teamid, "recipientID": rid, "userID": $scope.userID },
    url : "http://localhost:3000/fetchMessages"
  })
  .then(function mySucces(response) 
  {
    console.log(response.data);
    var chat=response.data;
    if(response.data!='NIL')
    {
<<<<<<< HEAD

=======
>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc
    for(var i=0;i<response.data.length;i++)
    {
      $scope.chatmessages.push(chat[i]);
    //  console.log(chat[i]);
    }

    var d = chat[0].date;
    var b;
    for(var i=1;i<response.data.length;i++)
    {
    if(chat[i].date>d)
    {
      d=chat[i].date;
      b=chat[i];
    }
    }


    console.log ('Send Status - '+b.send);

    if(b.send==0)
    {
      $scope.runBot(b.message, $scope.userID);
    }
    else
    {
      $scope.botDataDisplay=[];
    }
    }
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 

}

else if( rid && teamid && $scope.channel == 1 )
{
$http({
    method : "POST",
    data: { "teamID": teamid, "channelID": rid, "userID": $scope.userID },
    url : "http://localhost:3000/fetchChannelMessages"
  })
  .then(function mySucces(response) 
  {
    console.log(response.data);
    var chat=response.data;
    if(response.data!='NIL')
    {

      for(var i=0;i<response.data.length;i++)
    {
      $scope.chatmessages.push(chat[i]);
    }

        var d = chat[0].date;
    var b;
    for(var i=1;i<response.data.length;i++)
    {
    if(chat[i].date>d)
    {
      d=chat[i].date;
      b=chat[i];
    }
    }


    console.log ('Send Status - '+b.send);

    if(b.send==0)
    {
      $scope.runChannelBot(b.message, $scope.userID, rid);
    }


    }
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 
}
else
{
console.log('Error Try again');
console.log($scope.channel);
}
}

$scope.getName = function(id)
{

for(var i=0;i<$scope.mainUsers.length;i++)
{
  if($scope.mainUsers[i].id==id)
  {
    return $scope.mainUsers[i].fname;
  }
}

};


$scope.parseD = function(date){

var d= new Date(date);

var hours=d.getHours();

var minutes=d.getMinutes();

var seconds=d.getSeconds();

if(d.getHours()<10)
  hours='0'+d.getHours();

if(d.getMinutes()<10)
  minutes='0'+d.getMinutes();

if(d.getSeconds()<10)
  seconds='0'+d.getSeconds();

return d.getDate()+'/'+d.getMonth()+'/'+d.getFullYear()+' ('+hours+':'+minutes+':'+seconds+')';

};

$scope.showChatBox = function(id){

<<<<<<< HEAD
=======

>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc
$('.chatlist li').removeClass('chatTabs');
$('#'+id).addClass('chatTabs');

$scope.recipientID=id;
$scope.channel = 0;
$scope.fetchMessages(id,$scope.teamID);

}

$scope.showChannelChatBox = function(id)
{
<<<<<<< HEAD

=======
>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc
$('.chatlist li').removeClass('chatTabs');

$('#'+id).addClass('chatTabs');

$scope.channelID=id;
$scope.channel=1;
console.log(id);
$scope.fetchMessages(id,$scope.teamID);
}

$scope.sendMessage = function() {

console.log($scope.recipientID);
console.log($scope.message);
console.log($scope.teamID);
console.log($scope.userID);

if($scope.recipientID && $scope.message && $scope.teamID && $scope.userID && $scope.channel==0)
{

$http({
    method : "POST",
    data: { "userID": $scope.userID, "teamID": $scope.teamID, "recipientID": $scope.recipientID, "message": $scope.message },
    url : "http://localhost:3000/sendMessage"
  })
  .then(function mySucces(response) 
  {
    console.log(response.data);
    
    if(response.data=='Success')
    {
      $scope.message='';
      $scope.fetchMessages($scope.recipientID,$scope.teamID);
    }
    else
    {
      alert('Error');
    }
  
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 

}

else if($scope.channelID && $scope.userID && $scope.channel==1)
{
console.log('Channel Chat');
$http({
    method : "POST",
    data: { "userID": $scope.userID, "channelID": $scope.channelID, "message": $scope.message },
    url : "http://localhost:3000/sendChannelMessage"
  })
  .then(function mySucces(response) 
  {
    console.log(response.data);
    
    if(response.data=='Success')
    {
      $scope.message='';
      $scope.fetchMessages($scope.channelID,$scope.teamID);
    }
    else
    {
      alert('Error');
    }
  
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 

}
else
{
alert('Error Try again');
}
}




$scope.sendRMessage = function(msg) {

$scope.message=msg;

console.log($scope.recipientID);
console.log($scope.message);
console.log($scope.teamID);
console.log($scope.userID);

if($scope.recipientID && $scope.teamID && $scope.userID && $scope.channel==0)
{

$http({
    method : "POST",
    data: { "userID": $scope.userID, "teamID": $scope.teamID, "recipientID": $scope.recipientID, "message": $scope.message },
    url : "http://localhost:3000/sendMessage"
  })
  .then(function mySucces(response) 
  {
    console.log(response.data);
    
    if(response.data=='Success')
    {
      $scope.message='';
      $scope.fetchMessages($scope.recipientID,$scope.teamID);
    }
    else
    {
      alert('Error');
    }
  
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 

}

else if($scope.channelID && $scope.userID && $scope.channel==1)
{
console.log('Channel Chat');
$http({
    method : "POST",
    data: { "userID": $scope.userID, "channelID": $scope.channelID, "message": $scope.message },
    url : "http://localhost:3000/sendChannelMessage"
  })
  .then(function mySucces(response) 
  {
    console.log(response.data);
    
    if(response.data=='Success')
    {
      $scope.message='';
      $scope.fetchMessages($scope.channelID,$scope.teamID);
    }
    else
    {
      alert('Error');
    }
  
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 

}
else
{
alert('Error Try again');
}
}






$interval(function() {

if($scope.userID)
{
$http({
    method : "POST",
    data: { "userID": $scope.userID},
    url : "http://localhost:3000/chatNotify"
  })
  .then(function mySucces(response) 
  {
    if(response.data != 'NULL')
    {
      var chatNotifyData = response.data;
      console.log(response.data);
    for(var j=0;j<$scope.mainUsers.length;j++)
          {
            $scope.mainUsers[j].readPending=0;
            for(var i=0;i<response.data.length;i++)
            {
              if($scope.mainUsers[j].id==chatNotifyData[i].userID && $scope.recipientID!=$scope.mainUsers[j].id)
              {
                console.log('Increasing');
                  $scope.mainUsers[j].readPending++;
              }
              else if($scope.mainUsers[j].id==chatNotifyData[i].userID && $scope.recipientID==$scope.mainUsers[j].id && $scope.channel==0)
                {
                  $scope.fetchMessages($scope.recipientID,$scope.teamID);
                }
              }            
      }
    }
    else
    {
           for(var j=0;j<$scope.mainUsers.length;j++)
            {
                  $scope.mainUsers[j].readPending=0;
            }            
    }
  }, 
  function myError(response) 
  {
    console.log(response.data);
  });} 
        }, 4000);

/*
$interval(function() {

$http({
    method : "POST",
    data: {"teamID": $scope.teamID, "userID": $scope.userID },
    url : "http://localhost:3000/channelChatNotify"
  })
  .then(function mySucces(response) 
  {

  console.log(response.data);
    if(response.data != 'NULL')
    {
      console.log(response.data);
      var chatNotifyData = response.data;
    for(var j=0;j<$scope.channels.length;j++)
          {
            $scope.channels[j].readPending=0;
            for(var i=0;i<response.data.length;i++)
            {
              if($scope.channels[j].id==chatNotifyData[i].channelID && $scope.channelID!=$scope.channels[j].id)
              {
                console.log('count ++');
                  $scope.channels[j].readPending++;
              }
              else if($scope.channels[j].id==chatNotifyData[i].channnelID && $scope.channelID==$scope.channels[j].id && $scope.channel==1)
                {
                  $scope.fetchMessages($scope.channelID,$scope.teamID);
                }
              }            
      }

    }
    else
    {
           for(var j=0;j<$scope.channels.length;j++)
            {
                  $scope.channels[j].readPending=0;
            }            
    }
  }, 
  function myError(response) 
  {
    console.log(response.data);
  }); 
        }, 4000);
*/

});


app.controller("createChannelController", function($routeParams,$interval,$scope,$window,$route,$http,$location,$rootScope) {

$scope.channelmembers=[];

$scope.createChannel= function(){
console.log('Create Channel');
console.log($scope.channelname);
console.log($scope.channelcategory);
console.log($scope.channelmembers.length);
console.log($scope.userID);

$rootScope.loader= true;

if($scope.channelname && $scope.channelcategory && $scope.channelmembers.length  && $scope.userID)
{
$http({
    method : "POST",
    data: { "teamID":$scope.teamID,"userID": $scope.userID, "channelname": $scope.channelname, "channelcategory": $scope.channelcategory, "members": $scope.channelmembers},
    url : "http://localhost:3000/createChannel"
  })
  .then(function mySucces(response) 
  {
  $rootScope.loader= false;
    $scope.status=response.data;
    console.log(response.data);
    if(response.data=='success')
    {
      $('#channelModal').modal('toggle');
   //   $route.reload();
    }
  }, 
  function myError(response) 
  {
    $rootScope.loader= false;
    $scope.status=response.data;
    console.log(response.data);
  }); 
}
else
{
    $rootScope.loader= false;
    $scope.status='Error';
}
}

});


app.controller("inviteFriendController", function($routeParams,$interval,$scope,$window,$route,$http,$location,$rootScope) {

  $scope.sendInvite = function() {

    console.log($scope.data);
  console.log($scope.email2);

  $scope.data["email"] = $scope.email2;

  var senddata = $scope.data;

    if ($scope.email2) {
    
    $rootScope.loader= true;

     $http({
      method : "POST",
      data: senddata,
      url : "http://localhost:3000/sendInvite"
    }).then(function mySucces(response) {

      $rootScope.loader= false;
      $scope.status=response.data;
      console.log(response.data);
      
      if(response.data=='Check Your Inbox')
      {
      $('#inviteModal').modal('toggle');
     // $route.reload();
      }

    }, function myError(response) {
      $rootScope.loader= false;
      $scope.status=response.data;
      console.log(response.data);
    }); 
  }
  else
  {
    $scope.status='Error';
    $rootScope.loader= false;
    console.log('Error');
  }
};

});



app.controller('loginController', function ($scope, $window, $http, $location,$rootScope) {

  $rootScope.loginButton= false;

  $scope.login = function() {

   $rootScope.loader= true;
   
    if($scope.teamname && $scope.username && $scope.password) 
    {
     $http({
      method : "POST",
      data: { "teamname": $scope.teamname, "username": $scope.username, "password": $scope.password },
      url : "http://localhost:3000/login"
    }).then(function mySucces(response) {
      
         $rootScope.loader= false;
   
      console.log(response.data);

      $scope.status = response.data;
    
    var data= response.data;
      if(data.Error==0)
      {
        $rootScope.$emit("setSession", data);
        $location.path("/teams/"+$scope.teamname);
      }

      else
      {
        $scope.status='Error Try Again ';    
      }


    }, function myError(response) {
         $rootScope.loader= false;
   
      $scope.status = response.data;
    }); 
  }
  else
  {
      $scope.status = 'Error';
  }
 };
});


