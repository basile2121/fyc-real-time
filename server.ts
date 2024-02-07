import { serve } from "https://deno.land/std@0.166.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Application, send, Context  } from "https://deno.land/x/oak@v11.1.0/mod.ts";

const app = new Application();
const io = new Server();

app.use(async (ctx: Context ) => {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}\\public`,
      index: "index.html",
    });
  });

io.on("connection", (socket) => {
    console.log("Client connecté");
  
    socket.on("chat-message", (message: string) => {
      console.log(`Message reçu du client : ${message}`);
      // Envoie à tous les clients
      io.emit("chat-message", message + " - Server");
    });
  });

const handler = io.handler(async (req) => {
    return await app.handle(req) || new Response(null, { status: 404 });
});  

await serve(handler, {
    port: 3000,
});