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

////////////////////////////////////////////////////////

$('.flexslider').flexslider({
	animation: "slide"
});

$('video').each(function(i,vid){
	vid.play();
});

$('#facts').on('click', function(){
	$('#story').show().attr('src', $('#story').attr('src') + '?t=' + Date.now());
	setTimeout(function(){ $('#story').hide(); }, 25000);
});

////////////////////////////////////////////////////////

//The color of each hexagon
var color = ["#F8EC51", "#E6A540", "#CDB369", "#7E4022"]

///////////////////////////////////////////////////////////////////////////
////////////// Initiate SVG and create hexagon centers ////////////////////
///////////////////////////////////////////////////////////////////////////

//Function to call when you mouseover a node
function mover(d) {
  var el = d3.select(this)
		.transition()
		.duration(10)		  
		.style("fill-opacity", 1)
		;
}

//Mouseout function
function mout(d) { 
	var el = d3.select(this)
	   .transition()
	   .duration(1000)
	   .style("fill-opacity", 0.3)
	   ;
};

//svg sizes and margins
var margin = {
    top: 30,
    right: 20,
    bottom: 20,
    left: 50
};

//The next lines should be run, but this seems to go wrong on the first load in bl.ocks.org
//var width = $(window).width() - margin.left - margin.right - 40;
//var height = $(window).height() - margin.top - margin.bottom - 80;
//So I set it fixed to
var width = 850;
var height = 650;

//The number of columns and rows of the heatmap
var MapColumns = 30,
	MapRows = 30;
	
//The maximum radius the hexagons can have to still fit the screen
var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
			height/((MapRows + 1/3) * 1.5)]);

//Set the new height and width of the SVG based on the max possible
width = MapColumns*hexRadius*Math.sqrt(3);
heigth = MapRows*1.5*hexRadius+0.5*hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin()
    	       .radius(hexRadius);

//Calculate the center positions of each hexagon	
var points = [];
for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
        points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
    }//for j
}//for i

//Create SVG element
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

///////////////////////////////////////////////////////////////////////////
////////////////////// Draw hexagons and color them ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Start drawing the hexagons
svg.append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
	.attr("id", function (d, i) {
		return "hex" + i;
	})
    .attr("d", function (d) {
		return "M" + d.x + "," + d.y + hexbin.hexagon();
	})
    .attr("stroke", function (d,i) {
		return "#FFF";
	})
    .attr("stroke-width", "1px")
    .style("fill", function (d,i) {
		return color[Math.floor(Math.random() * 4)];
	})
	.style("fill-opacity", 0.3)
	.on("mouseover", mover)
	.on("mouseout", mout)
	;

setTimeout(function(){
	d3.select("#hex" + 3)  
	 	.transition()
		.duration(1000)	
		.style("color", "blue")
		;
}, 1000);



function highlight(i) {
	
	var timer = Math.floor(Math.random() * 1000) +10;
	d3.select("#hex" + i)
		.transition().delay(timer).duration(100)
			.style("fill-opacity", "1")
		.transition().duration(2000)
		  .style("fill-opacity", "0.3");
}
		
		
////// TESTER
	var timer = Math.floor(Math.random() * 1000) +10;
	d3.select("#hex" + 6)
		.transition().delay(timer).duration(100)
			.style("fill-opacity", "1")
		.transition().duration(2000)
		  .style("fill-opacity", "0.3");
	
	timer = Math.floor(Math.random() * 1000) +10;
	d3.select("#hex" + 0)	
		.transition().delay(timer).duration(100)
			.style("fill-opacity", "1")
		.transition().duration(2000)
		  .style("fill-opacity", "0.3");
///////



	
function randOrd(){
  return (Math.round(Math.random())-0.5);
}

function getRandNumList() {
	var min = 0,
		max = 800,
		i,
		arr = [];
	
	for (i = 0; i < 800; i++)
	{
		arr.push(i);
	}
	return arr.sort(randOrd);
}
	
	
// Activate random hives to animate them
setInterval(function() {

	var activityLevel = Math.floor((300-49) * Math.random()) + 50;
	var hiveList = getRandNumList();
	
	for (i = 0; i < activityLevel; i++) {
		highlight(hiveList[i]);
	}      
}, 1000);