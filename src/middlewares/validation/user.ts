import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { generateJoiError } from "../../utils/helper.js";

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phoneNumber: Joi.string()
    .pattern(/^\+(\d{1,3})?\d{8,}$/)
    .required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  phoneNumber: Joi.string().pattern(/^\+(\d{1,3})?\d{11,}$/),
  image: Joi.string().uri(),
}).min(1);

export async function createUserValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await createUserSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errorMessages = generateJoiError(error);
    res.status(400).json({ message: errorMessages });
  }
}

export async function updateUserValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await updateUserSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errorMessages = generateJoiError(error);
    res.status(400).json({ message: errorMessages });
  }
}
