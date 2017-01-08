var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/Major';

var routes = require('./routes/index');
var users = require('./routes/users');
var verify = require('./routes/verify');
var emailvalidation = require('./routes/emailvalidation');
var emailverification = require('./routes/emailverification');
var usernameverification = require('./routes/usernameverification');
var createTeam = require('./routes/createTeam');
var checkUserTeam = require('./routes/checkUserTeam');
var sendInvite = require('./routes/sendInvite');
var checkVerifyInvite = require('./routes/checkVerifyInvite');
var login = require('./routes/login');
var fetchTeamsLoggedIn = require('./routes/fetchTeamsLoggedIn');
var fetchUsersFromTeamID = require('./routes/fetchUsersFromTeamID');
var fetchUserinfoFromIDs = require('./routes/fetchUserinfoFromIDs');
var sendMessage = require('./routes/sendMessage');
var fetchMessages = require('./routes/fetchMessages');
var chatNotify = require('./routes/chatNotify');
var createChannel = require('./routes/createChannel');
var channelListByTeam = require('./routes/channelListByTeam');
var memberListByChannel = require('./routes/memberListByChannel');
var sendChannelMessage = require('./routes/sendChannelMessage');
var fetchChannelMessages = require('./routes/fetchChannelMessages');
var channelChatNotify = require('./routes/channelChatNotify');
<<<<<<< HEAD
var recommendChat = require('./routes/recommendChat');
var recommendChannelChat = require('./routes/recommendChannelChat');

=======
var userfromId= require('./routes/userfromId');
>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc

MongoClient.connect(url, function(err, db) {
  if (err) {
    throw err;
  }
  console.log('Successfully Connected');
});

app.use(require('method-override')());
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

if ('OPTIONS' == req.method) {
     res.sendStatus(200);
 } else {
     next();
 }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/users', users);

app.use('/verify', verify);

app.use('/emailvalidation', emailvalidation);

app.use('/emailverification', emailverification);

app.use('/usernameverification', usernameverification);

app.use('/createTeam', createTeam);

app.use('/checkUserTeam',checkUserTeam);

app.use('/sendInvite',sendInvite);

app.use('/checkVerifyInvite',checkVerifyInvite);

app.use('/login', login);

app.use('/fetchTeamsLoggedIn', fetchTeamsLoggedIn);

app.use('/fetchUsersFromTeamID', fetchUsersFromTeamID);

app.use('/fetchUserinfoFromIDs', fetchUserinfoFromIDs);

app.use('/sendMessage', sendMessage);

app.use('/fetchMessages', fetchMessages);

app.use('/chatNotify', chatNotify);

app.use('/createChannel', createChannel);

app.use('/channelListByTeam', channelListByTeam);

app.use('/memberListByChannel', memberListByChannel);

app.use('/sendChannelMessage', sendChannelMessage);

app.use('/fetchChannelMessages', fetchChannelMessages);

app.use('/channelChatNotify', channelChatNotify);

<<<<<<< HEAD

app.use('/recommendChat', recommendChat);

app.use('/recommendChannelChat', recommendChannelChat);
=======
app.use('/userfromId', userfromId);
>>>>>>> f0c7813f360b77ca213eeba009be48cabd9cdcdc

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
