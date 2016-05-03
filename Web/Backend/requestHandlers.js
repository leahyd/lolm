var locations = [{
	"identification":{
		"major_id":64117, 
		"minor_id":16270},
	"information":{
		"vendor_name":"Chemistry 101", 
		"vendor_description":"Chemistry 101 in Caldwell Labs 120 with Professor Brutus Buckeye check-in"},
	"preCheckIn":{
		"need_more_info":false, 
		"message":"Thank you for checking in!  Class will start shortly.", 
		"more_info":[]},
	"checkIns":[], 
	"login":{
		"username":"class", 
		"password":"checkin"}},
	{"identification":{
		"major_id":43767, 
		"minor_id":30860},
	"information":{
		"vendor_name":"Dr. Mehta's Office", 
		"vendor_description":"Dr. Mehta's Family Practition check-in"},
	"preCheckIn":{
		"need_more_info":true, 
		"message":"Thank you for checking in!  The doctor will be with you shortly.", 
		"more_info":["Insurance Policy", "Social Security #", "Patient ID", "Weight", "Height"]},
	"checkIns":[], 
	"login":{
		"username":"doctor", 
		"password":"checkin"}}
	/*,
	{"identification":{"major_id":51020, "minor_id":42079},
	"information":{"vendor_name":"Flight D43", 
	"vendor_description":"Terminal check-in for Flight D43"},
	"preCheckIn":{"need_more_info":false, "message":"Thank you for checking in!  The flight will board shortly.", 
	"more_info":[]},"checkIns":[], "login":{"username":"flight", "password":"checkin"}} */
	];

function start(response, postData) {
	console.log("Request handler 'start' was called.");

	response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
}

function beaconLookup(response, postData) {
	console.log("Request handler '/app/beaconLookup' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	var receivedData = JSON.parse(postData);
	console.log(JSON.stringify(receivedData));
	var major_id;
	var minor_id;

	if (receivedData.hasOwnProperty('major_id')) {
		major_id = receivedData.major_id;
		console.log("Found major ID.\n");
		console.log("" + major_id);
	}
	if (receivedData.hasOwnProperty('minor_id')) {
		minor_id = receivedData.minor_id;
		console.log("\nFound minor ID.\n");
		console.log("" + minor_id + "\n");
	}

	var foundBeacon = false;
	locations.forEach(function(entry) {
		if (entry.identification.major_id == major_id) {
			response.write(JSON.stringify(entry.information));
			foundBeacon = true;
		}
	})

	if (!foundBeacon) {
		var notFound = {"vendor_name":"", 
		"vendor_description":""}
		response.write(JSON.stringify(notFound));
	}

	response.end();
}

function checkIn(response, postData) {
	console.log("Request handler '/app/checkIn' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	var receivedData = JSON.parse(postData);
	console.log(JSON.stringify(receivedData));
	var major_id;
	var minor_id;

	if (receivedData.hasOwnProperty('major_id')) {
		major_id = receivedData.major_id;
		console.log("Found major ID.\n");
		console.log("" + major_id);
	}
	if (receivedData.hasOwnProperty('minor_id')) {
		minor_id = receivedData.minor_id;
		console.log("\nFound minor ID.\n");
		console.log("" + minor_id + "\n");
	}

	var person = {"first_name":receivedData.first_name,
					"last_name":receivedData.last_name};

	locations.forEach(function(entry) {
		if (entry.identification.major_id == major_id) {
			response.write(JSON.stringify(entry.preCheckIn));
			var hasPerson = false;
			entry.checkIns.forEach(function(people) {
				if ((people.first_name == person.first_name) && (people.last_name == person.last_name)) {
					hasPerson = true;
				}
			});
			if (!hasPerson) {
				entry.checkIns.push(person);
				console.log("\n" + person.last_name + ", " + person.first_name + "\n");
			}
			console.log("\n" + JSON.stringify(entry.checkIns) + "\n");
		}
	});
	response.end();
} 

function company(response, postData) {
	console.log("Request handler '/app/company' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	var receivedData = JSON.parse(postData);
	console.log("Adding vendor:  " + JSON.stringify(receivedData));

	locations.push(receivedData);

	response.end();
} 

function persons(response, postData) {
	console.log("Request handler '/app/persons' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	var receivedData = JSON.parse(postData);
	var username = receivedData.username;
	var password = receivedData.password;

	locations.forEach(function(entry) {
		if (username == entry.login.username) {
			if (password == entry.login.password) {
				var people = {"people":entry.checkIns}
				response.write(JSON.stringify(people));
			}
		}
	});

	response.end();
} 

function people(response, postData) {
	console.log("Request handler '/app/persons' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	var object = {};
	locations.forEach(function(entry) {
		var name = entry.information.vendor_name;
		var people = entry.checkIns;
		object[name] = people;
	});

	response.write(JSON.stringify(object));

	response.end();
}

function login(response, postData) {
	console.log("Request handler '/app/login' was called.");

	response.writeHead(200, {"Content-Type": "application/json"});

	var receivedData = JSON.parse(postData);
	var username = receivedData.username;
	var password = receivedData.password;
	console.log("*****username: " + username);
	console.log("*****password: " + password);
	var correctSet = "0";

	locations.forEach(function(entry) {
		if (username == entry.login.username) {
			if (password == entry.login.password) {
				correctSet = "1";
				console.log("Inside /app/login and found input username and password");
			}
		}
	});
	
	response.write(correctSet);

	response.end();
} 

exports.start = start;
exports.beaconLookup = beaconLookup;
exports.checkIn = checkIn;
exports.company = company;
exports.persons = persons;
exports.people = people;
exports.login = login;