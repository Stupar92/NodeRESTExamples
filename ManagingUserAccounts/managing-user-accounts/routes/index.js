var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var User = require('../models/user').User;

/**
 * Mongoose ready state:
 * 0 - disconnected
 * 1 - connected
 * 2 - connecting
 * 3 - disconnecting
 * 
 * get it with: `mongoose.connection.readyState`.
 */
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function (req, res) {
    console.log(mongoose.connection.readyState);
    res.render('index', { title: 'Express' });
});

router.post('/signup', function (req, res) {

    req.check('email', 'Please enter a valid email').len(1).isEmail();
    req.check('password', 'Please enter a password with a length between 4 and 34 digits').len(4, 34);
    req.check('firstName', 'Please enter your first name').len(1);
    req.check('lastName', 'Please enter your last name').len(1);
    
    var errors = req.validationErrors();
    if (errors) {
        console.log("Validation error(s): " + errors);
        res.redirect('/login');
    } else {
        var newUser = {
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            emails: [
                {
                    value: req.body.email
                }
            ]
        };

        User.hashPassword(req.body.password, function(err, passwordHash) {
            newUser.passwordHash = passwordHash;
            User.create(newUser, function (err, user) {
                res.redirect('/account');
            })
        });
    }

})

module.exports = router;

