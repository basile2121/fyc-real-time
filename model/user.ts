// user.ts
import { Server, Socket } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

export class User {
  constructor(private io: Server) {
    this.setupUserEvents();
  }

  private setupUserEvents() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`socket ${socket.id} connected as user`);
      // Gestion des événements spécifiques de l'utilisateur
    });
  }
}
