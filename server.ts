import { Application, send, Context, serve } from './deps.ts';
import { io } from './realtime_server.ts';

const app = new Application();

app.use(async (ctx: Context) => {
    await send(ctx, ctx.request.url.pathname, {
        root: `${Deno.cwd()}\\public`,
        index: "index.html",
    });
});

const port = 3000;

const handler = io.handler(async (req: any) => {
  return await app.handle(req) || new Response(null, { status: 404 });
});

await serve(handler, {
  port: 3000,
});

console.log(`Serveur démarré sur le port ${port}`);