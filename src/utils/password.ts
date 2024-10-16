import bcrypt from "bcrypt";

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
) {
  const isValid = await bcrypt.compare(plainPassword, hashedPassword);
  return isValid;
}
export async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}
