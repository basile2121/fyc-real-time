// room.ts
import { Server, Socket } from "https://deno.land/x/socket_io@0.2.0/mod.ts";

export class Room {
  constructor(private io: Server) {
    this.setupRoomEvents();
  }

  private setupRoomEvents() {
    this.io.on("connection", (socket: Socket) => {
      console.log(`socket ${socket.id} joined room`);
    });
  }
}
