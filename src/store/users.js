import { randomUUID } from "crypto";

const users = [];

export function createUser({ email, passwordHash }) {
  const user = {
    id: randomUUID(),
    email,
    passwordHash,
    createdAt: Date.now()
  };
  users.push(user);
  return user;
}

export function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

export function allUsers() {
  return users.map(({ passwordHash, ...u }) => u);
}
