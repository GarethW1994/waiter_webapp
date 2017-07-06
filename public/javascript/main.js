var signUpForm = document.querySelector('.form-horizontal');
var loginForm = document.querySelector('.form-inline');

//get sign-up form DOM elements
var userName = document.getElementById('name');
var userSurname = document.getElementById('surname');
var username = document.getElementById('username');
var password = document.getElementById('password');

//sign-up form error messages
var errorMsgSignUp = document.getElementById('errorMessSignUp');
//login form error messages
var errorMsgLogin = document.getElementById('errorMessLogin');

//get login form DOM elements
var userName2 = document.getElementById('username2');
var password2 = document.getElementById('password2');


//test function to validate the forms
function test(signUpForm, loginForm) {
	if (this.signUpForm !== null) {
		this.signUpForm.addEventListener('change', function () {
			var signupValues = [{
				userName: userName.value,
				userSurname: userSurname.value,
				username: username.value,
				password: password.value
			}];

			//call validation function
			//pass in validation parameters
			var inputsSignup = validations(signupValues).validInputs();
	
			//display outputs from validation functions
			errorMsgSignUp.innerText = inputsSignup;
		});
		
	}
	
	if (this.loginForm !== null) {
		this.loginForm.addEventListener('change', function () {
			var loginValues = [{
				username: userName2.value,
				password: password2.value
			}];

			//call validation function
			//pass in validation parameters
			var inputsLogin = validations(loginValues).validInputs();

			//display outputs from validation functions
			errorMsgLogin.innerText = inputsLogin;
		});
	}
}

//call the test function
test();