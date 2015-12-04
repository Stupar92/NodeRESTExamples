var utils = require('../utils');
var should = require('should');

var User = require('../../models/user').User;


describe('models/user', function () {
    describe('Create', function () {
        it('create a new user', function (done) {
            var user = {
                name: {
                    firstName: "Jovan",
                    lastName: "Stupar"
                },
                emails: [
                    {
                        type: "home",
                        value: "home@example.com"
                    },
                    {
                        type: "work",
                        value: "work@example.com"
                    }
                ]
            };

            User.create(user, function (err, createdUser) {
                should.not.exist(err);
                should.exist(createdUser);
                should.exist(createdUser.name);
                should.exist(createdUser.emails);

                createdUser.name.firstName.should.equal("Jovan");
                createdUser.name.lastName.should.equal("Stupar");
                createdUser.emails[0].type.should.equal("home");
                createdUser.emails[0].value.should.equal("home@example.com");
                createdUser.emails[1].type.should.equal("work");
                createdUser.emails[1].value.should.equal("work@example.com");

                done();
            })
        })
    })
})

describe('hash password', function () {
    /**
     * We define what slow means, so if the test lasts more that 1000ms it will be red,
     * a little less will be yellow.
     * We can also set a timeout to the test via `this.timeout(<num>)`.
     */
    this.slow(100);
    it('returns hashed password asynchroniously', function (done) {
        var password = 'secret';

        User.hashPassword(password, function (err, passwordHash) {
            should.not.exist(err);

            should.exist(passwordHash);
            done();
        })
    });
});

describe('compare password and hash', function () {
    it('returns true if password is valid', function (done) {
        var password = 'secret';
        
        // First create a password hash
        User.hashPassword(password, function (err, passwordHash) {
            should.not.exist(err);
            
            User.comparePasswordAndHash(password, passwordHash, function (err, areEqual) {
                should.not.exist(err);
                areEqual.should.equal(true);
                done();
            });
        });
    });

    it('returns false if password is invalid', function () {
        var password = 'secret';

        User.hashPassword(password, function (err, passwordHash) {
            should.not.exist(err);
            
            var fakePassword = 'jostup';
            User.comparePasswordAndHash(fakePassword, passwordHash, function (err, areEqual) {
                should.not.exist(err);
                areEqual.should.equal(false);
                done();
            });
        });
    })
});