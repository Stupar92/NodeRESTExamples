var assert = require('assert');
var should = require('should');
var config = require('../config');
var mongoose = require('mongoose');


process.env.NODE_ENV = 'test';

/**
 * Mongoose ready state:
 * 0 - disconnected
 * 1 - connected
 * 2 - connecting
 * 3 - disconnecting
 * 
 * get it with: `mongoose.connection.readyState`.
 */
beforeEach(function (done) {
    
    function clearDB() {
        for (var i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove();
        }
        
        return done();
    }
    
    function reconnect() {

        mongoose.connect(config.db.test, function (err) {
            if (err) {
                throw err;
            }
            return clearDB();
        });
    }
    
    /**
     * Ok, there was an amazing bug.
     * When you require an app from some test file the app tries to connect to mongo
     * We try to connect to mongo here as well. At first run of check state, we get readyState
     * of 2 (connecting). So we sleep for 500 millis and call checkState again.
     * */
    function checkState() {
        switch (mongoose.connection.readyState) {
            case 0:
                reconnect();
                break;
            case 1:
                clearDB();
                break;
            default:
                setTimeout(function () {
                    // Think about changing this, possible stack overflow.
                    checkState();
                }, 500);
        }
        
    }
    
    checkState();
});

afterEach(function (done) {
    mongoose.disconnect();
    return done();
});