import { randomUUID } from "crypto";

const users = new Map();

export default async function authRoutes(app) {

  // REGISTER
  app.post("/register", async (req, reply) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return reply.code(400).send({ error: "Email & password required" });
    }

    if (users.has(email)) {
      return reply.code(400).send({ error: "User already exists" });
    }

    const user = {
      id: randomUUID(),
      email,
      password,
      createdAt: Date.now()
    };

    users.set(email, user);

    return { registered: true, user: { id: user.id, email: user.email } };
  });

  // LOGIN
  app.post("/login", async (req, reply) => {
    const { email, password } = req.body || {};

    const user = users.get(email);

    if (!user || user.password !== password) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    return {
      login: true,
      user: { id: user.id, email: user.email }
    };
  });
}
