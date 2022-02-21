// Module Includes
//=============================================================================================
const Users = require('../models/user')


// userFunctions
//=============================================================================================

/**
 * returns the userobject from email string.
 */
module.exports.getUserByEmail = async function (email) {
    return Users.findOne({ email: email.toLowerCase() })
}

/**
 * returns the userobject from id.
 */
module.exports.getUserById = async function (id) {
    return Users.findOne({ _id: id });
}

/**
 * Creates a user in the database from a user object.
 */
module.exports.registerUser = async function (user) {
    await Users.create(user);
}

