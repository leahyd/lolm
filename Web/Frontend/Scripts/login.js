$(function(){$("#login").submit(function(event){

	var credentials = {
		"username":$("#username").val(),
		"password":$("#password").val()
	};
	
	$.ajax({
		url: "http://time2checkin.herokuapp.com/app/login",
		type: "POST",
		dataType: "JSON",
		data: JSON.stringify(credentials),
		success:function(data){
			if(data == "1"){
				sessionStorage.setItem("username", $("#username").val());
				sessionStorage.setItem("password", $("#password").val());
				console.log("******Session Storage Username: " + sessionStorage.getItem("username"));
				window.location.href = "user.html";
			} else{
				alert("The username and/or password you entered was incorrect.");
			}
		},
		error:function(){
			alert("Could not check username and password")
		}
	});
	
	event.preventDefault();
	return false;
	
})});

