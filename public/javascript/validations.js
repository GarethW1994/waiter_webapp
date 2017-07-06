var validations = function(values) {
	
	const validInputs = function() {	
	if (values[0].userName !== undefined) {
		if (values[0].userName.length == 0) {
			return 'Required Fields Cannot Be Empty.';
		}
	}
		
	if (values[0].username.length == 0) {
			return 'Required Fields Cannot Be Empty.';
		} else if (values[0].password.length == 0) {
			return 'Required Fields Cannot Be Empty.';
		} 
	}
	
	return {
		validInputs
	}
}