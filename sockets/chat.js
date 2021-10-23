const getCurrentTime = () => {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth());
  const yyyy = today.getFullYear();
  const hh = today.getHours();
  const min = today.getMinutes();
  return `${dd}-${mm}-${yyyy} ${hh}:${min}`;
};

const conn = (io) => io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${getCurrentTime()} ${nickname} ${chatMessage}`);
    });

    socket.on('newUser', (user) => {
      io.emit('newUser', user);
    });
  });

  module.exports = conn;
