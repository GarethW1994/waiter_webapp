var signUpForm = document.querySelector('.form-horizontal');

//get sign-up form DOM elements
var userName = document.getElementById('name');
var userSurname = document.getElementById('surname');
var username = document.getElementById('username');
var password = document.getElementById('password');

//sign-up form error messages
var errorMsgSignUp = document.getElementById('errorMessSignUp');


//three loading dots
var dotOne = document.querySelector('.dot1');

userName.addEventListener('change', function() {
	dotOne.classList.add('active');
});

signUpForm.addEventListener('change', function() {
	
	var signupValues = [{
		userName: userName.value,
		userSurname: userSurname.value,
		username: username.value,
		password: password.value
	}];
	
	//call validation function
	//pass in validation parameters
	var inputs = validations(signupValues).validInputs();
	
	//display outputs from validation functions
	errorMsgSignUp.innerText = inputs; 
});