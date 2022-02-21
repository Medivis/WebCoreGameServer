// Module Includes
//=============================================================================================
const passportSocketIo = require("passport.socketio")
const cookieParser = require("cookie-parser")


// Setup Authentication Routes
//=============================================================================================
module.exports.setup = function (io, sessionSecret, sessionStore) {

  io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',       // the name of the cookie where express/connect stores its session_id
    secret: sessionSecret,
    store: sessionStore,
    success: onAuthorizeSuccess, 
    fail: onAuthorizeFail, 
  }));

  //kill all unauthenticated connections
  io.use((socket, next) => {
    if (socket.request.user && socket.request.user.logged_in) {
      next();
    } else {
      next(new Error("Unauthenticated"));
    }
  });

  function onAuthorizeSuccess(data, accept) {
    console.log('successful connection to socket.io');

    // The accept-callback still allows us to decide whether to
    // accept the connection or not.
    accept(null, true);
  }

  function onAuthorizeFail(data, message, error, accept) {
    if (error) throw new Error(message);
    console.log('failed connection to socket.io:', message);

    // We use this callback to log all of our failed connections.
    accept(null, false);
  }

}

