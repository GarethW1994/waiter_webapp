'use strict';

//require main.js
var main = require('../main');

module.exports = function (waiters, admin) {
	//declare days
	var daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	/////////GET ROUTES//////////////
	const index = function (req, res) {
		res.render('home');
	}

	const login = function (req, res) {
		res.render('login');
	}

	const signUp = function (req, res) {
		res.render('sign-up');
	}

	const loggedIn = function (req, res) {
		var currentUser = req.params.username;

		res.render('processDays', {
			username: currentUser,
			days: daysArr
		});
	}

	const adminDashboard = function (req, res) {
		waiters.find({}, function (err, data) {
			if (err) {
				console.log(err)
			};
		}).then(function (waiters) {
			//call main function
			let list = []; 
			var dayMap = {}
				
			for (var i = 0; i < waiters.length; i++) {
				if (waiters[i].waiter_days !== undefined) {
					list.push(waiters[i].waiter_days);
				} 
			}
			
			var weekUpdate = daysProcess(list);
				
			
			res.render('adminPanel', {
				data: waiters,
				week: weekUpdate
			});
			});
	}

	//////////POST DATA ROUTES/////////
	//log in the user
	const userLogin = function (req, res, next) {
		//get the user name from form
		var username = req.body.username;
		var password = req.body.password;

		if (username === 'Admin') {
			//find the admin
			admin.find({
				admin_username: username
			}, function (err, user) {
				if (err) {
					console.log(err)
				}
			}).then(function (admin) {
				//check if the passwords and username match
				//that of the database
				if (username === admin[0].admin_username && password === admin[0].admin_password) {
					//redirect to logged route
					res.redirect('days/' + username);
				} else {
					return 'wrong user name or password';
				}
			});

		} else {
			//find the user
			waiters.find({
				waiter_username: username
			}, function (err, user) {
				if (err) {
					console.log(err)
				}
			}).then(function (user) {
				//check if the passwords and username match
				//that of the database
				if (username === user[0].waiter_username && password === user[0].waiter_password) {
					//redirect to logged route
					res.redirect('login/' + username);
				} else {
					return 'wrong user name or password';
				}
			});
		}
	}

	///////SAVE DATA ROUTES/////////
	//save new user 
	const newUser = function(req, res, next) {
		var userName = req.body.username;
		var name = req.body.name;
		var surname = req.body.surname;
		var password = req.body.password;
		
		waiters({
			waiter_username: userName,
			waiter_name: name,
			waiter_surname: surname,
			waiter_password: password,
		}).save(function(result) {
			if (result.message == 'waiters validation failed') {
				res.redirect('sign-up');
			} else {
				res.redirect('login')	
			};
		});
	}
	
	//save waiter days
	const updateDays = function (req, res, next) {
		//get the users days
		var getDays = req.body.days;
		var user = req.params.username;

		waiters.update({
			waiter_username: user
		}, {
			waiter_days: getDays
		}, function (options, callback) {
			console.log(callback);

			res.render('processDays', {
				username: user,
				current: getDays,
				days: daysArr
			});
		});
	}

	///determine which days has the most workers;
	const daysProcess = function (dayList) {

		var dayMap = main(dayList);
		
		return dayMap;
	}

	//reset data (Delete users)
	const resetData = function(req, res) {
		waiters.remove(function(err, result) {
			if (err) return (err);
			
			console.log(result);
		}).then(function() {
			res.redirect('/days/Admin');
		});	
	}
	
	return {
		//get routes
		index,
		login,
		signUp,
		loggedIn,
		adminDashboard,
		resetData,
		//post routes
		newUser,
		userLogin,
		updateDays
	}
}