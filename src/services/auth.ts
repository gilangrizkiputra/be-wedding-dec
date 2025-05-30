import * as userModel from "../models/user.js";
import { HttpError } from "../utils/error.js";
import { generateToken } from "../utils/jwt.js";
import { verifyToken } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function login(email: string, password: string) {
  const user = await userModel.getUserByEmail(email);
  if (!user) throw new HttpError("User not found", 404);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new HttpError("Invalid password", 401);

  const token = generateToken({ id: user.id, email: user.email });

  return {
    name: user.name,
    role: user.role,
    token,
  };
}

export async function verifyTokenAndUser(token: string) {
  try {
    const { id } = verifyToken(token) as { id: string };

    const user = await userModel.getUserById(id);

    if (!user) {
      throw new HttpError("User not found", 401);
    }

    return user;
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new HttpError("Invalid token", 401);
    }

    throw err;
  }
}
