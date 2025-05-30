import { Router, Application } from "express";
import * as authController from "../controllers/auth.js";
import * as userController from "../controllers/user.js";
import * as userMiddleware from "../middlewares/user.js";
import * as userValidationMiddleware from "../middlewares/validation/user.js";

export default (app: Application) => {
  const router = Router();

  app.use("/auth", router);

  router.post("/login", authController.login);

  router.post(
    "/register",
    userValidationMiddleware.createUserValidation,
    userMiddleware.checkUserEmailorPhoneNumberExist,
    userController.createUser
  );
};
