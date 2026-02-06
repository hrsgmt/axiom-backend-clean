import jwt from "jsonwebtoken";
import { users } from "../../store/users.js";
import { randomUUID } from "crypto";

const SECRET = "axiom-secret";

export default async function authRoutes(app) {

  // REGISTER
  app.post("/register", async (req, reply) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.code(400).send({ error: "Missing fields" });
    }

    const exists = users.find(u => u.email === email);
    if (exists) {
      return reply.code(409).send({ error: "User already exists" });
    }

    const user = {
      id: randomUUID(),
      email,
      password,
      createdAt: Date.now()
    };

    users.push(user);

    return {
      registered: true,
      user: { id: user.id, email: user.email }
    };
  });

  // LOGIN
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
      SECRET,
      { expiresIn: "7d" }
    );

    return { login: true, token };
  });

}
