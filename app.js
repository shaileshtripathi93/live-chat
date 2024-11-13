const socket = io();
const inputMessage = document.getElementById('inputMessage');
const sendMessageButton = document.getElementById('sendMessage');
const messagesContainer = document.getElementById('messages');
const onlineStatusContainer = document.getElementById('onlineStatus');

// Identify user as sender or receiver
const isSender = window.location.pathname === '/sender.html';

// Send message to other user
sendMessageButton.addEventListener('click', () => {
  const message = inputMessage.value;
  if (message) {
    socket.emit('chat message', { text: message, isSender });
    inputMessage.value = '';
  }
});

// Display received message
socket.on('chat message', (msg) => {
  const messageElement = document.createElement('div');
  messageElement.textContent = msg.text;
  messageElement.classList.add('message');
  messageElement.classList.add(msg.isSender ? 'message-sender' : 'message-receiver');
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Online/offline status updates
socket.on('userStatus', (usersOnline) => {
  onlineStatusContainer.innerHTML = '';
  Object.keys(usersOnline).forEach((userId) => {
    const statusElement = document.createElement('div');
    statusElement.textContent = `User ${userId} is online`;
    onlineStatusContainer.appendChild(statusElement);
  });
});
