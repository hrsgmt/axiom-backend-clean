import { createUser, findUserByEmail, getAllUsers } from "../store/users.js";

export default async function userRoutes(app) {

  // Create user
  app.post("/users", async (req, reply) => {
    const { email } = req.body || {};

    if (!email) {
      return reply.code(400).send({ error: "Email required" });
    }

    if (findUserByEmail(email)) {
      return reply.code(400).send({ error: "User already exists" });
    }

    const user = createUser({ email });
    return { created: true, user };
  });

  // List users (debug)
  app.get("/users", async () => {
    return getAllUsers();
  });
}
