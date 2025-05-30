import { Application, Router } from "express";
import * as controller from "../controllers/booking";
import * as authMiddleware from "../middlewares/auth";

export default (app: Application) => {
  const router = Router();

  app.use(router);

  router.post(
    "/booking",
    authMiddleware.isAuthorized,
    controller.createBooking
  );
};
