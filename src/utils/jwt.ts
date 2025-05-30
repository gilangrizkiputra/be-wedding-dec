import jwt from "jsonwebtoken";
import { appEnv } from "./env.js";

export function generateToken(payload: object) {
  return jwt.sign(payload, appEnv.JWT_SECRET, { expiresIn: "5h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, appEnv.JWT_SECRET);
}
