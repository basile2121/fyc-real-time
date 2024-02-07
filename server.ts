import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import * as log from "https://deno.land/std@0.166.0/log/mod.ts";
import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

const io = new Server();

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.emit("hello", "world");

  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG"),
    },
    loggers: {
      "socket.io": {
        level: "DEBUG",
        handlers: ["console"],
      },
      "engine.io": {
        level: "DEBUG",
        handlers: ["console"],
      },
    },
});

const handler = io.handler(async (req) => {
    return await app.handle(req) || new Response(null, { status: 404 });
});  

await serve(handler, {
    port: 3000,
});