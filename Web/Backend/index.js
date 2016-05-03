var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;

function start() {
	try {
		server.start(router.route, handle);
	} catch (e) {
		console.log(e);
		start();
	}
}

start();
