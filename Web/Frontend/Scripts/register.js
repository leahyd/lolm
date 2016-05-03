$(function(){$("#register").submit(function(event){

	var company = {
		"identification":{
			"major_id":$("#majorID").val(),
			"minor_id":$("#minorID").val()
		},
		"information":{
			"vendor_name":$("#cname").val(),
			"vendor_description":$("#description").val()
		},
		"preCheckIn":{
			"need_more_info":false,
			"message":$("#message").val(),
			"more_info":[]
		},
		"checkIns":[],
		"login":{
			"username":$("#username").val(),
			"password":$("#password").val()
		}
	}
	
	$.ajax({
		url: "http://time2checkin.herokuapp.com/app/company",
		type: 'POST',
		contentType:'application/json',
		data: JSON.stringify(company),
		dataType:'json'
	});

	window.location.href = "register.html";
	alert("Thanks for registering with CheckIn!");
	
	event.preventDefault();
	return false;
	
})});