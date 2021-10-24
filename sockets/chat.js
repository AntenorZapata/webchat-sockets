const { createMessage, getAll } = require('../models/messagesModel');
const getCurrentTime = require('../public/utils/getTime');
const { removeUser, addUser } = require('../public/utils/usersHandlers');

// const users = [];

const conn = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const messageObj = { message: chatMessage, nickname, timestamp: getCurrentTime() };
      createMessage(messageObj);
      io.emit('message', `${getCurrentTime()} ${nickname} ${chatMessage}`);
    });

    socket.on('newUser', (user) => {
      const users = addUser(socket.id, user);
      io.emit('newUser', users);
    });

    socket.on('disconnect', () => {
    const users = removeUser(socket.id);
      io.emit('newUser', users);
    });

    socket.on('userConnected', async () => {
      io.emit('userConnected', await getAll());
    });
  });

  module.exports = conn;
