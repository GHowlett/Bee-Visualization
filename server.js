var path = require('path');
var http = require('http');
var express = require('express');
var socketIO = require('socket.io');
var twitStream = new (require('twit'))({
	consumer_key: 'MHA5zldY2vrNq4wq6u1ndVfJk',
	consumer_secret: 'vNWlPX6grC1bphD7iZGC22i1veXqsNfI9Z6xt84onBT7aYOW5Y',
	access_token: '2488844486-D7JiVnPodmEhMzz34FJuDDSOjjwgcswvmRZTTDX',
	access_token_secret: 'MkG6696eABas1DLiUWOxxcNAI5XMxFDroPQv5xwf9QL6M'
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

