var path = require('path');
var express = require('express');
var twit = new (require('twit'))({
	consumer_key: 'MHA5zldY2vrNq4wq6u1ndVfJk',
	consumer_secret: 'vNWlPX6grC1bphD7iZGC22i1veXqsNfI9Z6xt84onBT7aYOW5Y',
	access_token: '2488844486-D7JiVnPodmEhMzz34FJuDDSOjjwgcswvmRZTTDX',
	access_token_secret: 'MkG6696eABas1DLiUWOxxcNAI5XMxFDroPQv5xwf9QL6M'
});

//var twitStream = twit.stream('statuses/filter', {track: '#TerminalBee'});
var twitStream = twit.stream('user');

twitStream.on('tweet', function (tweet) {
	// TODO: emit update to website
});

var server = express()
	.set('views', __dirname + 'www')
	.use(express.static(__dirname + '/www'))
	.use(express.static(__dirname + '/bower_components'))
	.use(express.bodyParser())

var port = process.env.PORT || 3000;
server.listen(port);
console.log(__filename + ' is now listening on port ' + port);

