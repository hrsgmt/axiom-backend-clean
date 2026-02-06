import crypto from "crypto";

const users = [];

export function createUser(email, password) {
  const user = {
    id: crypto.randomUUID(),
    email,
    password
  };
  users.push(user);
  return user;
}

export function findUser(email, password) {
  return users.find(
    u => u.email === email && u.password === password
  );
}
