var assert = require('assert');
var should = require('should');
var utils = require('./utils');
var app = require('../app');
var request = require('supertest');

describe('addition', function () {
    it('should add 1+1 correctly', function (done) {
        var onePlusOne = 1 + 1;
        onePlusOne.should.equal(2);
        // must call done() so that mocha know that we are... done.
        // Useful for async tests.
        done();
    });
    it('returns 2 given the url /add/1/1', function (done) {
        request(app)
            .get('/add/1/1')
            .expect(200)
            .end(function (err, res) {
            should.not.exist(err);
            parseFloat(res.text).should.equal(2);
            done();
        });
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
    });
});