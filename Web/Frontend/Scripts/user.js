function showDash(){
	var dashboard = document.getElementById("dashboard");
	var settings = document.getElementById("settings");
	
	dashboard.style.display="block";
	settings.style.display="none";
}

function showSettings(){
	var dashboard = document.getElementById("dashboard");
	var settings = document.getElementById("settings");
	
	dashboard.style.display="none";
	settings.style.display="block";
}

var bigUser = {
	Name: sessionStorage.getItem("username")
};

function onLoad(){
	var company = document.getElementById("company");
	
	company.innerText = bigUser.Name;
}