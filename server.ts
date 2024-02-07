import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import * as log from "https://deno.land/std@0.166.0/log/mod.ts";
import { Application, send, Context  } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Room } from "./model/room.ts";
import { User } from "./model/user.ts";

const app = new Application();
const io = new Server();

const room = new Room(io);
const user = new User(io);

app.use(async (ctx: Context, next) => {
    // Vérifier si la requête concerne le fichier favicon.ico
    if (ctx.request.url.pathname === '/favicon.ico') {
      ctx.response.status = 404; // Retourner une réponse 404
      return;
    }
  
    // Si ce n'est pas une demande pour favicon.ico, passer au middleware suivant
    await next();
  });

app.use(async (ctx: Context ) => {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}\\public`,
      index: "index.html",
    });
  });

  app.use((ctx) => {
    ctx.response.status = 404;
    ctx.response.body = "Not Found";
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

io.on("connection", (socket) => {
    console.log("Client connecté");
  
    // Écouter l'événement 'chat-message' émis par le client
    socket.on("chat-message", (message: string) => {
      console.log(`Message reçu du client : ${message}`);
      // Traitez le message ici, par exemple, diffusez-le à tous les clients
      io.emit("chat-message", message);
    });
  });

const handler = io.handler(async (req) => {
    return await app.handle(req) || new Response(null, { status: 404 });
});  

await serve(handler, {
    port: 3000,
});