// Module Includes
//=============================================================================================
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


// Configure passport
//=============================================================================================

/**
 * initializes a local strategy to serialize and deserializeUsers.
 */
async function initialize(passport, getUserByEmail, getUserById) {
	const authenticateUser = async function (email, password, done) {
		const user = await getUserByEmail(email);
		if (user == null) {
			//no user with this email
			return done(null, false, { message: "Die Kombination aus Benutzername und Passwort ist ungültig." })
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				//password Falsch
				return done(null, false, { message: "Die Kombination aus Benutzername und Passwort ist ungültig." });
			}
		} catch (e) {
			return done(e);
		}
	}

	passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
	passport.serializeUser(function (user, done) {
		return done(null, user._id)
	})
	passport.deserializeUser(async function (id, done) {
		let user = await getUserById(id)
		return done(null, user)
	})
}

module.exports = initialize