//require mongoose
var mongoose = require('mongoose');

module.exports = function (url) {
	//connect to database
	mongoose.connect(url);

	// Use native promises
		 mongoose.Promise = global.Promise;

		 //waiter Schema
		const waiterSchema = new mongoose.Schema({
			waiter_username: {
				type: String,
				required: true
			},

			waiter_name: {
				type: String,
			},

			waiter_surname: {
				type: String,
			},

			waiter_password: {
				type: String,
				required: true
			},

			waiter_days: {
				type: Object
			}
		});

		//declare the unique values
		waiterSchema.index({waiter_username: 1}, {unique: true});

		var waiters = mongoose.model('waiters', waiterSchema);

		///Admin Schema
		const adminSchema = new mongoose.Schema({
			admin_username: {
				type: String,
				required: true
			},

			admin_name: {
				type: String
			},

			admin_surname: {
				type: String
			},

			admin_password: {
				type: String,
				required: true
			}
		});

		adminSchema.index({admin_surname: 1}, {unique: true});

		var admin = mongoose.model('admin', adminSchema);

	return {
		waiters,
		admin
	};
}
