const removeClient = (id, users) => {
  const cli = users.findIndex((el) => el.id === id);
  users.splice(cli, 1);
};

module.exports = removeClient;