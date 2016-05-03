var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/app/beaconLookup"] = requestHandlers.beaconLookup;
handle["/app/checkIn"] = requestHandlers.checkIn;
handle["/app/company"] = requestHandlers.company;
handle["/app/persons"] = requestHandlers.persons;
handle["/app/login"] = requestHandlers.login;
handle["/app/people"] = requestHandlers.people;

function start() {
	try {
		server.start(router.route, handle);
	} catch (e) {
		console.log(e);
		start();
	}
}

start();
