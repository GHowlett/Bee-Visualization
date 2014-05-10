var socket = io.connect('http://localhost'); //TODO: change to just be root

socket.on('tweet', function(tweet){
	var tweetEl = $('<div class="tweet">');

	tweetEl.append('<img class="profile-img" src="' + tweet.user.profile_image_url_https + '">');

	var header = $('<div class="tweet-header">').appendTo(tweetEl);
	header.append('<span class="username">' + tweet.user.name + '</span>');
	header.append('<span class="date"> - ' + prettyDate(tweet.created_at) + '</span>');

	tweetEl.append('<p>' + tweet.text + '</p>');

	$('#tweets').prepend(tweetEl);
});