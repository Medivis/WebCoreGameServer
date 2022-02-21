// Module Includes
//=============================================================================================
const bcrypt = require('bcryptjs');


// Setup Authentication Routes
//=============================================================================================

/**
 * Setups the authentifikation routes to provide a login Api
 */
function setup(app, passport, insertUser) {

    app.post('/login', checkNotAuthenticated, function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(404).send({ error: info.message })
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.status(200).send({
                    username: user.username,
                    email: user.email,
                    isadmin: user.isadmin,
                    maxStorage: user.maxStorage,
                });
            });
        })(req, res, next);
    });

    app.delete('/logout', function (req, res) {
        req.logOut()
        res.status(200).send()
    })

    app.post('/register', async function (req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await insertUser({
                username: req.body.username,
                email: req.body.email.toLowerCase(),
                password: hashedPassword,
            });
            res.status(200).send();
        } catch (e) {
            res.status(500).send({ error: "Es existiert bereits ein Account mit dieser Email" })
        }
    })

}

/**
 * Middleware to check if a user is authenticated. Returns 403 if not authenticated.
 */
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    //access denied
    res.status(403).send()
}

/**
 * Middleware to check if a user is *NOT* authenticated. Returns 403 if authenticated.
 */
function checkNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    //access denied
    res.status(403).send()
}

/**
 * Middleware to check if a user has admin rights. Returns 403 if not authenticated or if the user isn't a admin.
 */
function checkAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isadmin) {
        return next()
    }
    //access denied
    res.status(403).send()
}

module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkNotAuthenticated = checkNotAuthenticated;
module.exports.checkAdmin = checkAdmin;
module.exports.setup = setup;