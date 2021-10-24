const users = [];

const removeUser = (id) => {
  const cli = users.findIndex((el) => el.id === id);
  users.splice(cli, 1);
  return users;
};

const addUser = (id, user) => {
  const currUser = { id, nick: user };
  users.push(currUser);
  return users;
};

module.exports = { removeUser, addUser };
