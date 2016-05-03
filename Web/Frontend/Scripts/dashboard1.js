

var userList = [];


function receiveList(){
	
	var credentials = {
		"username":sessionStorage.getItem("username"),
		"password":sessionStorage.getItem("password")
	}
	
	$.ajax({
		url: "http://time2checkin.herokuapp.com/app/persons",
		type: 'POST',
		contentType:'application/json',
		data: JSON.stringify(credentials),
		dataType:'json',
		success:function(data){
			processRequest(data);
		}
	});
}

function processRequest(data){
	vars people = JSON.parse(data);
	userList = people.people;
	populate();
}


function onLoad(){

	receiveList();
	
}

function populate(){
	var registry = document.getElementById("registry");
	
	var tBody = document.createElement("tbody");
	
	for (var i = 0; i < userList.length / 5; i++) {
		var tRow = document.createElement("tr");
		
		for (var j = 0; j < Math.min(userList.length - i * 5, 5); j++) {
			var tData = document.createElement("td");
			var button = document.createElement("button");
			var user = userList[5*i + j];
			
			button.cssClass = "gray";
			button.innerText = user.first_name + " " + user.last_name;
			
			tData.appendChild(button);
			tRow.appendChild(tData);
		}
		
		tBody.appendChild(tRow);
	}
	
	registry.appendChild(tBody);
}

function loadUser(userId) {
	var user = userList[userId];
}