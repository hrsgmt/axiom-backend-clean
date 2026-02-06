import { randomUUID } from "crypto";

const users = [];

/**
 * Create a new user
 */
export function createUser({ email }) {
  const user = {
    id: randomUUID(),
    email,
    createdAt: Date.now()
  };
  users.push(user);
  return user;
}

/**
 * Find user by email
 */
export function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

/**
 * Get all users (debug only)
 */
export function getAllUsers() {
  return users;
}
