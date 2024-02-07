const socket = io();

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const usernameInput = document.getElementById('usernameInput');

sendButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const message = messageInput.value;
    socket.emit('chat-message', { username, message });
    messageInput.value = '';
});

socket.on('chat-message', (data) => {
    const { username, message, time } = data;
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}</strong> (${time}): ${message}`;
    messagesContainer.appendChild(messageElement);
});