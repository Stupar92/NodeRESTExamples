var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
    passwordHash: String
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
    bcrypt.hash(passwordRaw, BCRYPT_COST, fn);
}

userSchema.statics.comparePasswordAndHash = function (password, passwordHash, fn) {
    bcrypt.compare(password, passwordHash, fn);
}

exports.User = mongoose.model('User', userSchema);