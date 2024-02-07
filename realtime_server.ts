import { Server } from './deps.ts';

const io = new Server();

io.on("connection", (socket) => {
  console.log("Un client s'est connecté");

  socket.on("chat-message", (data: { username: string, message: string }) => {
      console.log("Message reçu :", data);
      const { username, message } = data;
      const currentTime = new Date().toLocaleTimeString();
      io.emit("chat-message", { username, message, time: currentTime });
  });

  socket.on("disconnect", () => {
      console.log("Un client s'est déconnecté");
  });
});

export { io };