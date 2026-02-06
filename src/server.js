import Fastify from "fastify";
import cors from "@fastify/cors";

import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth/auth.routes.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true
});

/* HEALTH */
app.get("/", async () => {
  return { ok: true, service: "axiom-backend-clean" };
});

/* USERS */
await app.register(usersRoutes, { prefix: "/api/users" });

/* AUTH */
await app.register(authRoutes, { prefix: "/api/auth" });

await app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});
