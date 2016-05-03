var connect = require("connect");
var serve = require("serve-static");
var app = connect();

var http = require("http");
var url = require("url");
var port = process.env.PORT || CONFIG.port || 3000;

function start(route, handle) {
	function onRequest(request, response) { 
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.addListener("data", function(postDataChunk) { 
			postData += postDataChunk;
			console.log("Received POST data chunk '"+ postDataChunk + "'.");
		});

		request.addListener("end", function() { 
			route(handle, pathname, response, postData);
		});
	}

	app.use(serve(__dirname + '/../Frontend'))
	app.use(onRequest);

	http.createServer(app).listen(port);
	console.log("\n\n\n\n\n\nServer has started.");
}

exports.start = start;