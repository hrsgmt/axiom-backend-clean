import { createUser, findUser } from "../../store/auth.js";

export default async function authRoutes(app) {

  app.post("/register", async (req) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return { error: "Missing fields" };
    }
    const user = createUser(email, password);
    return { registered: true, user };
  });

  app.post("/login", async (req) => {
    const { email, password } = req.body;
    const user = findUser(email, password);
    if (!user) {
      return { error: "Invalid credentials" };
    }
    return { login: true, user };
  });

}
