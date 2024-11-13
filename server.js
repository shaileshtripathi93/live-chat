const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let usersOnline = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
  // Notify when a user connects
  usersOnline[socket.id] = socket.id;
  io.emit('userStatus', usersOnline);

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    delete usersOnline[socket.id];
    io.emit('userStatus', usersOnline);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
