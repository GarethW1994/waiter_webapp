//require assert
const assert = require('assert');
const models = require('../modules');
const databaseConnection = require('../connectDatabase');
//connect to MongoDB
var connection = databaseConnection('mongodb://Ninja:IT1994!@ds147551.mlab.com:47551/waiter_app');
var waiterSchema = models().waiterData;
var waiters = waiterSchema();

describe('store waiters', function() {
   //before it fuction run clear the Database
    beforeEach(function(done) {
        waiters.find({}, function(err) {
            waiters.remove({}, function(err) {
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


            waiters.create(newWaiter, function(err) {
                waiters.find({}, function(err, results){
                  assert.equal(1, results.length);
                  done(err);
                });
            });
    });
});
