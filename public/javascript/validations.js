var validations = function(values) {
	var passwordVal = password.value;
	
	var userNameVal = userName.value;

	const userNameValid = function() {
		val
	}
	if (userNameVal.length == 0) {
		errorMsg.innerText = 'Required Fields Cannot Be Empty.';
	};
	if (passwordVal.length < 5) {
		errorMsg.innerText = 'Password too short - must be more than 4 characters';
	} else if (passwordVal.length >= 5) {
		errorMsg.innerText = "";
	}
	
	return {
		userNameValid,
		usernameValid,
		passwordValid
	}
}