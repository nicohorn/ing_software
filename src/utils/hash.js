import bcrypt from "bcrypt";

// Creates a hashed password.
export async function createHashBcrypt(password) {
  const saltRounds = 10; // Number of salt rounds (adjust as needed)
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Verifies the hash password using the plain text password provided by the user.
export async function verifyHashBcrypt(password, hash) {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}