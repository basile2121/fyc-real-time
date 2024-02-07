const socket = io();

const sendButton = document.getElementById('sendButton');
const messageInput = document.getElementById('messageInput');

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    socket.emit('chat-message', message + " - Client");
    messageInput.value = '';
});

socket.on('chat-message', (message) => {
    console.log(`Message reçu du serveur : ${message}`);
});