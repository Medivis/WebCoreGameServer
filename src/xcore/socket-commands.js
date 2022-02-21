// Module Includes
//=============================================================================================
const passportSocketIo = require('passport-socket')


// Socket I/O User Functions
//=============================================================================================

module.exports.emitUser = function (io, id, key, data) {
  passportSocketIo.filterSocketsByUser(io, function (user) {
    return user._id === id;
  }).forEach(function (socket) {
    socket.emit(key, data);
  });
}