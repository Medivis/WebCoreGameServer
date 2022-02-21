var socket = io();

const button = document.querySelector('#button')

socket.on('ButtonChange', (data) => {
  button.style.backgroundColor = data.status ? 'blue' : 'red'
})

button.addEventListener('click', () => {
  console.log("hallo");
  socket.emit('PlsChangeButton', {})
})