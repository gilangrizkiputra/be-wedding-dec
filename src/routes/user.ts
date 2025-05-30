import { Router, Application } from "express";
import * as userController from "../controllers/user.js";
import * as authMiddleware from "../middlewares/auth.js";

export default (app: Application) => {
  const router = Router();

  app.use("/user", router);

  router.get("/me", authMiddleware.isAuthorized, userController.getCurrentUser);

  router.put(
    "/update/me",
    authMiddleware.isAuthorized,
    userController.updateCurrentUser
  );
};
