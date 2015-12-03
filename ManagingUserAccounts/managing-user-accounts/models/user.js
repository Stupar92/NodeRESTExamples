var mongoose = require('mongoose');
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
    emails: [emailSchema]
});

exports.User = mongoose.model('User', userSchema);