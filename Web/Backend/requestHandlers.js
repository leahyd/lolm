function start(response, postData) {
	console.log("Request handler 'start' was called.");

	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

exports.start = start;