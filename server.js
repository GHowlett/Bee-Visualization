var path = require('path');
var express = require('express');

var app = express()
	.set('views', __dirname + 'www')
	.use(express.static(__dirname + '/www'))
	.use(express.static(__dirname + '/bower_components'))
	.use(express.bodyParser())

var port = process.env.PORT || 3000;
app.listen(port);
console.log(__filename + ' is now listening on port ' + port);

