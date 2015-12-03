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