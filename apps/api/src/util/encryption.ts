import crypto from "crypto";

function encryptPassword(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function comparePasswords(input: string, password: string) {
  if (!input || !password) {
    return false;
  }
  return encryptPassword(input) === password;
}

export { encryptPassword, comparePasswords };
