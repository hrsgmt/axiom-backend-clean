import Fastify from "fastify";
import cors from "@fastify/cors";

import authRoutes from "./routes/auth/auth.routes.js";
import usersRoutes from "./routes/users.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });

app.get("/", () => ({
  status: "ok",
  service: "axiom-backend-clean"
}));

await app.register(usersRoutes, { prefix: "/api" });
await app.register(authRoutes, { prefix: "/api/auth" });

await app.listen({
  port: process.env.PORT || 4000,
  host: "0.0.0.0"
});
