import Fastify from "fastify";

const app = Fastify();

app.get("/", async () => {
  return { status: "ok", service: "axiom-backend-clean" };
});

const port = process.env.PORT || 4000;

app.listen({ port, host: "0.0.0.0" })
  .then(() => console.log("Server running on", port))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
