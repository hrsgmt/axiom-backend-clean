import Fastify from "fastify";

const app = Fastify({ logger: true });

app.get("/", async () => {
  return { ok: true, service: "axiom-backend-clean" };
});

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => {
    console.log("🚀 Server running on port", PORT);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
