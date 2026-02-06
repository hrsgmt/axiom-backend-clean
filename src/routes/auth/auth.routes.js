import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

const users = [];

export default async function authRoutes(app) {

  app.post("/register", async (req, reply) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return reply.code(400).send({ error: "Missing fields" });
    }

    const user = {
      id: randomUUID(),
      email,
      password
    };

    users.push(user);
    return { registered: true, user: { id: user.id, email: user.email } };
  });

  app.post("/login", async (req, reply) => {
    const { email, password } = req.body;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    return { login: true, token };
  });

}
