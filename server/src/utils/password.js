import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hashPassword = async (value) => bcrypt.hash(value, SALT_ROUNDS);

export const comparePassword = async (value, hashedValue) =>
  bcrypt.compare(value, hashedValue);
