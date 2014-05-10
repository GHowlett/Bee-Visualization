var socket = io.connect('http://localhost');

socket.on('tweet', function(tweet){
	// TODO: insert tweets into #tweets list
	console.log(tweet);
});