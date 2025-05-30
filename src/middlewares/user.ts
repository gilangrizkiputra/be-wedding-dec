import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.js";
import { HttpError } from "../utils/error.js";

export async function checkUserEmailorPhoneNumberExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, phoneNumber } = req.body;
  const currentUser = res.locals.user;

  const skipUniqueCheckEmail = currentUser?.email === email;

  if (email && !skipUniqueCheckEmail) {
    const userEmail = await userService.getUserByEmail(email);
    if (userEmail) {
      throw new HttpError("User with the same email already exists!", 409);
    }
  }

  const skipUniqueCheckPhoneNumber = currentUser?.phoneNumber === phoneNumber;

  if (phoneNumber && !skipUniqueCheckPhoneNumber) {
    const userPhoneNumber = await userService.getUserByPhoneNumber(phoneNumber);
    if (userPhoneNumber) {
      throw new HttpError(
        "User with the same phone number already exists!",
        409
      );
    }
  }

  next();
}
