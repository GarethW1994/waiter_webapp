//require assert
const assert = require('assert');
const models = require('../modules');

//connect to MongoDB
var Models = models('mongodb://127.0.0.1/waiter_app');

describe('store waiters', function() {
   //before it fuction run clear the Database
    beforeEach(function(done) {
        Models.waiters.find({}, function(err) {
            Models.waiters.remove({}, function(err) {
                done(err);
            });
        });
    });

    it('should add new waiter to MongoDB', function(done) {
        var newWaiter = {
                  waiter_username: 'JohnR',
                  waiter_name: 'John',
                  waiter_surname: 'Russ',
                  waiter_password: 'jr@123'
                };


            Models.waiters.create(newWaiter, function(err) {
                Models.waiters.find({}, function(err, results){
                  assert.equal(1, results.length);
                  done(err);
                });
            });
    });
});
