// Module Includes
//=============================================================================================
const express = require('express')
const router = express.Router()


// Routes
//=============================================================================================
router.get('/', (req, res) => {

  const html = /*template*/ `
  <div>
    <h1>Login</h1>
    <form action="/login" method="POST">
      <div>
        <label for="email">Email</label>
        <input class="l" type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="password">Passwort</label>
        <input class="l" type="password" id="password" name="password" required>
      </div>
      <button style="margin-top: 32px;" class="btn l" type="submit">Login</button>
    </form>
    <h1>Register</h1>
    <form action="/register" method="POST">
      <div>
        <label for="username">Username</label>
        <input class="l" type="email" id="username" name="username" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input class="l" type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="password">Passwort</label>
        <input class="l" type="password" id="password" name="password" required>
      </div>
      <button style="margin-top: 32px;" class="btn l" type="submit">Register</button>
    </form>
    <h1>Logout</h1>
    <form action="/logout?_method=DELETE" method="POST">
      <button class="btn white auto" type="submit">Logout</button>
    </form>
    <h1>Socket</h1>
    <button onclick="run()">Send</button>
  </div>

  <script src='/socket.io/socket.io.js'></script>
  <script>
    var socket = io();

    socket.on('welcome', function(data) {
      // Respond with a message including this clients' id sent from the server
      console.log(data);
      socket.emit('i am client', {data: 'foo!', id: data.id});
    });
  </script>

  `

  res.send(html);
})


module.exports = router;