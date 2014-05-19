var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');
var twitStream = new (require('twit'))({
	consumer_key: process.env.TWIT_CONSUMER_KEY,
	consumer_secret: process.env.TWIT_CONSUMER_SECRET,
	access_token: process.env.TWIT_TOKEN,
	access_token_secret: process.env.TWIT_TOKEN_SECRET
}).stream('user');

var server = express()
	.use(express.static(__dirname + '/www'))
	.use(express.static(__dirname + '/bower_components'))
	.use(express.bodyParser())

var ioServer = http.createServer(server);
var io = socketIO.listen(ioServer);

twitStream.on('tweet', function(tweet) {
	console.log('TWEET!');
	io.sockets.emit('tweet', tweet);
});

var port = process.env.PORT || 3000;
ioServer.listen(port);
console.log(__filename + ' is now listening on port ' + port);

