const { createMessage, getAll } = require('../models/messagesModel');

const getCurrentTime = require('../public/utils/getTime');

const conn = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageObj = { message: chatMessage, nickname, timestamp: getCurrentTime() };
      createMessage(messageObj);
      io.emit('message', `${getCurrentTime()} ${nickname} ${chatMessage}`);
    });

    socket.on('newUser', (user) => {
      io.emit('newUser', user);
    });

    socket.on('userConnected', async () => {
      io.emit('userConnected', await getAll());
    });
  });

  module.exports = conn;
