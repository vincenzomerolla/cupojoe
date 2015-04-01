'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

  if (io) return io;

  io = socketio(server);

  io.on('connection', function (socket) {
    socket.on('test:published', function () {
      socket.broadcast.emit('test:published');
    });
    
    socket.on('test:deleted', function () {
      console.log('test deleted')
      socket.broadcast.emit('test:deleted');
    });

    socket.on('test:updated', function () {
      socket.broadcast.emit('test:updated');
    });
  });

};