const socket = window.io();

const form = document.querySelector('#send-message');
const inputMessage = document.querySelector('#send-message-input');
const ulList = document.querySelector('#messages-list');
// const saveBtn = document.querySelector('#save-btn');
const formNick = document.querySelector('#form-nick');
const nickInput = document.querySelector('#nick-input');
const ulUserList = document.querySelector('#user-list');

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
  li.textContent = msg;
  ulList.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.textContent = user;
  ulUserList.appendChild(li);
};

socket.on('message', (msg) => createMessage(msg));
socket.on('newUser', (user) => createUser(user));