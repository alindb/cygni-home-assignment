const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

app.use(express.static('dist'));

const port = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log('Server is running')
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    io.emit('message', msg);
  });
});