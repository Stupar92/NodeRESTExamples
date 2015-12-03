var assert = require('assert');
var should = require('should');

describe('addition', function () {
    it('should add 1+1 correctly', function (done) {
        var onePlusOne = 1 + 1;
        onePlusOne.should.equal(2);
        // must call done() so that mocha know that we are... done.
        // Useful for async tests.
        done();
    });
});

describe('string compare', function () {
    it('compares strings', function (done) {
        var one = "Jovan Stupar";
        var two = "Jovan Stupar";
        one.should.equal(two);
        done();
    })
});

describe('mongoose connection', function () {
    it('connected', function (done) {
        var mongoose = require('mongoose');
        mongoose.connection.readyState.should.equal(1);
        done();
    })
})