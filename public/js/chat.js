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

const createHistory = (arrMsgs) => {
  arrMsgs.forEach((msg) => {
    const li = document.createElement('li');
    li.setAttribute(TESTID, 'message');
    li.textContent = `${msg.timestamp} - ${msg.nickname}: ${msg.message}`;
    ulList.appendChild(li);
  });
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.setAttribute(TESTID, 'online-user');
  li.textContent = user;
  ulUserList.appendChild(li);
};

socket.on('message', (msg) => createMessage(msg));
socket.on('newUser', (user) => createUser(user));
socket.emit('newUser', randomNick);
socket.emit('userConnected');
socket.on('userConnected', (msgs) => createHistory(msgs));