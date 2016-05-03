function route(handle, pathname, response, postData) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else {
        console.log("No request handler found for " + pathname);
    	response.writeHead(404, {"Content-Type": "text/plain"});
    	response.write("Error 404: This is not the page you are looking for");
    	response.end();
    }
}

exports.route = route;