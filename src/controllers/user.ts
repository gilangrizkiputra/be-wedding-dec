import { Request, Response } from "express";
import * as userService from "../services/user.js";
import { HttpError } from "../utils/error.js";

export async function createUser(req: Request, res: Response) {
  const { name, email, phoneNumber, password } = req.body;
  const user = await userService.createUser(name, email, phoneNumber, password);
  res.json({
    essage: "User created successfully",
    data: user,
  });
}

export function    getCurrentUser(_req: Request, res: Response) {
  const user = res.locals.user;
  res.json({
    message: "Success found user",
    data: user,
  });
}

export async function updateCurrentUser(req: Request, res: Response) {
  const user = res.locals.user;
  const { name, phoneNumber, image } = req.body;

  const updated = await userService.updateUser(user.id, {
    name,
    phoneNumber,
    image,
  });

  res.json({
    message: "Profile updated successfully",
    data: updated,
  });
}
