var utils = require('../utils');
var should = require('should');
var app = require('../../app');
var request = require('supertest');

var User = require('../../models/user').User;

describe('Users: routes', function () {
    describe('POST /signup', function () {
        it('redirect to "/account" if the form is valid', function (done) {
            var post = {
                firstName: 'John',
                lastName: 'Does',
                email: 'jdoe@example.com',
                password: 'jdoeshit'
            };
            request(app)
            .post('/signup')
            .send(post)
            .expect(302)
            .end(function (err, res) {
                should.not.exist(err);
                // Confirming the redirect
                res.header.location.should.containEql('/account');
                done();
            });
        });

        it('redirect to "/login" if the form is invalid', function (done) {
            var post = {
                firstName: 'John',
                lastName: '',
                email: 'fake',
                password: 'ps'
            };
            request(app)
            .post('/signup')
            .send(post)
            .expect(302)
            .end(function (err, res) {
                should.not.exist(err);
                res.header.location.should.containEql('/login');
                done();
            });
        });

        it('create a new user if the form is valid', function (done) {
            var post = {
                firstName: 'John',
                lastName: 'Does',
                email: 'jdoe@example.com',
                password: 'jdoeshit'
            };
            request(app)
            .post('/signup')
            .send(post)
            .expect(302)
            .end(function (err, res) {
                should.not.exist(err);
                User.find(function (err, users) { 
                    should.exist(users);
                    should.exist(users.length);
                    users.length.should.equal(1);
                    var u = users[0];
                    u.name.firstName.should.equal(post.firstName);
                    u.name.lastName.should.equal(post.lastName);
                    u.emails[0].value.should.equal(post.email);
                    should.exist(u.passwordHash);
                    done();
                });
                
            });
        });
    });
});