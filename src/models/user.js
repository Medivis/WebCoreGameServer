// Module Includes
//=============================================================================================
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator')


// Schema
//=============================================================================================
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    },
})

userSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('user', userSchema)