const socket = window.io();

const form = document.querySelector('#send-message');
const inputMessage = document.querySelector('#send-message-input');
const ulList = document.querySelector('#messages-list');
// const saveBtn = document.querySelector('#save-btn');
const formNick = document.querySelector('#form-nick');
const nickInput = document.querySelector('#nick-input');
const ulUserList = document.querySelector('#user-list');
// const getCurrentTime = require('../utils/getTime');
const TESTID = 'data-testid';

const randomNick = Math.random().toString(36).substring(2, 10)
  + Math.random().toString(36).substring(2, 10);

let nickname = '';

formNick.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname = nickInput.value;
  socket.emit('newUser', nickInput.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.setAttribute(TESTID, 'message');
  li.textContent = msg;
  ulList.appendChild(li);
};

const createUser = (users) => {
  console.log(users);
  ulUserList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute(TESTID, 'online-user');
    li.textContent = user.nick;
    ulUserList.appendChild(li);
  });
};

// const removeUser = (curr, users) => {
//   // const us = document.querySelectorAll('[data-testid="online-user"]');
//   // console.log(users);
//   console.log(curr);
//   ulUserList.innerHTML = '';
//   const user = users.filter((el) => el !== curr);
//   console.log(user);
//   createUser(user);
// };

const createHistory = (arrMsgs) => {
  arrMsgs.forEach((msg) => {
    const li = document.createElement('li');
    li.setAttribute(TESTID, 'message');
    li.textContent = `${msg.timestamp} - ${msg.nickname}: ${msg.message}`;
    ulList.appendChild(li);
  });
};

socket.on('message', (msg) => createMessage(msg));
socket.on('newUser', (users) => createUser(users));
socket.emit('newUser', randomNick);
socket.emit('userConnected');
socket.on('userConnected', (msgs) => createHistory(msgs));
// socket.on('disc', (curr, users) => removeUser(curr, users));