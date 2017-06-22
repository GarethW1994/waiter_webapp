var signUpForm = document.querySelector('.form-horizontal');

//get sign-up form DOM elements
var userName = document.getElementById('name');
var userSurname = document.getElementById('surname');
var username = document.getElementById('username');
var password = document.getElementById('password');

//sign-up form error messages
var errorMsg = document.getElementById('errorMess');


signUpForm.addEventListener('change', function() {
	var signupValues = [{
		userName: userName.value,
		userSurname: userSurname.value,
		username: username.value,
		password: password.value
		errorMsg: errorMsg
	}];
	
	//call validation function
	//pass in validation parameters
	validations(signupValues)
});