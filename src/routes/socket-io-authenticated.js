module.exports.setup = (io) => {

  let status = false;

  io.on('connection', function (socket) {

    //console.log(socket.request.user)

    //sync status on connect
    socket.emit('ButtonChange', { status: status })

    //if user requests change then chnage status
    socket.on('PlsChangeButton', (bla) => {

      if (socket.request?.user?.isadmin == false) return

      status = !status;

      socket.broadcast.emit('ButtonChange', { status: status })
      socket.emit('ButtonChange', { status: status })
    })
  });

}