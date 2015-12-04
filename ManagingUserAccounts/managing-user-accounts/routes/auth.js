var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user').User;
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, fn) {
 fn(null, user.id);
});

passport.deserializeUser(function (id, fn) {
 User.findOne({_id: id}, function (err, user) {
   fn(err, user);
 });
});

passport.use(new LocalStrategy(
 { usernameField: 'email' },
 function (email, password, fn) {
   User.findOne({'emails.value': email}, function (err, usr) {
     if (err) {
       return fn(err, false, { message: 'An Error occured' });
     }

     if (!usr) {
       return fn(err, false, { message: 'Unknown email address ' + email });
     }

     User.comparePasswordAndHash(password, usr.passwordHash, function (err, valid) {
       if (err) {
         return fn(err);
       }
       // if the passoword is invalid return that 'Invalid Password' to
       // the user
       if (!valid) {
         return fn(null, false, { message: 'Invalid Password' });
       }
       return fn(err, usr);
     });
   });
 }
));

router.post('/local', function(req, res, next) {
  /**
   * Ok, so after debugging this:
   * Above, we overrided the authenticate function so it returns a function
   * That is why we need to 'call' below in order to work
   */
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return fn(err);
    }
    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, function (err) {
      if (err) {
        return fn(err);
      }
      return res.redirect('/account');
    });
  })(req, res, next); // This fucker is needed, read above.
});

module.exports = router;
