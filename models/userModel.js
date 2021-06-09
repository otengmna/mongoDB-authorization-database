
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

//use to hash and store passwords and to save users into db
usersSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', usersSchema);