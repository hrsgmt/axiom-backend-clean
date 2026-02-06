import Fastify from "fastify";
import cors from "@fastify/cors";

import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth/auth.routes.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

await app.register(usersRoutes, { prefix: "/api/users" });
await app.register(authRoutes, { prefix: "/api/auth" });

app.get("/", async () => {
  return { ok: true };
});

await app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});
