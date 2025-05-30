import * as userModel from "../models/user.js";
import { appEnv } from "../utils/env.js";
import { updateUserById } from "../models/user.js";
import { HttpError } from "../utils/error.js";
import bcrypt from "bcrypt";

export async function createUser(
  name: string,
  email: string,
  phoneNumber: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(appEnv.BCRYPT_SALT)
  );

  const payload = {
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  };

  const data = await userModel.createUser(payload);
  return data;
}

export async function getUserByEmail(email: string) {
  return userModel.getUserByEmail(email);
}

export async function getUserByPhoneNumber(phoneNumber: string) {
  return userModel.getUserByPhoneNumber(phoneNumber);
}

export async function updateUser(
  id: string,
  data: {
    name?: string;
    phoneNumber?: string;
    image?: string;
  }
) {
  if (!id) throw new HttpError("Missing user ID", 400);

  const updated = await updateUserById(id, data);
  if (!updated) throw new HttpError("User not found or update failed", 404);

  return updated;
}
