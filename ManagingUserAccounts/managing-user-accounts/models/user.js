var mongoose = require('mongoose');
/**
 * bcrypt could not be installed on mac so bcrypt-nodejs is used. Only diff
 * is that hash function takes 4 arguments intead of 3
 */
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
    // Since `type` is special keyword in mongoose we must set the def. to
    // and object. I.e. this would not work:
    // type: String,
    type  : { type: String },
    value : String
});

var userSchema = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    emails: [emailSchema],
    passwordHash: String,
    roles: Array
});

//Constant, this is a salt
var BCRYPT_COST = 12;

userSchema.statics.hashPassword = function (passwordRaw, fn) {
    /**
     * Speed up the hashing if we are in test enviroment.
     * BCRYPT_COST of 12 last approx. 300ms
     */
    if (process.env.NODE_ENV === 'test') {
        BCRYPT_COST = 1;
    }
    // With bcrypt whis would be:
    // bcrypt.hash(passwordRaw, BCRYPT_COST, fn);
    bcrypt.hash(passwordRaw, null, null, fn);
}

userSchema.statics.comparePasswordAndHash = function (password, passwordHash, fn) {
    bcrypt.compare(password, passwordHash, fn);
}

userSchema.methods.hasRole = function(role) {
  for (var i = 0; i < this.roles.length; i++) {
    if (this.roles[i] === role) {
      return true;
    }
  }
  return false;
}

exports.User = mongoose.model('User', userSchema);
