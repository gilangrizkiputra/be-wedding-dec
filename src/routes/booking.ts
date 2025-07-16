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

  router.get(
    "/booking/me",
    authMiddleware.isAuthorized,
    controller.getMyBookings
  );

  router.get(
    "/booking/:id",
    authMiddleware.isAuthorized,
    controller.getDetailBooking
  );

  router.get(
    "/admin/booking",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    controller.getAllBookings
  );

  router.patch(
    "/admin/booking/:id/cancel",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    controller.cancelBooking
  );

  router.patch(
    "/booking/:id/cancel",
    authMiddleware.isAuthorized,
    controller.cancelBooking
  );

  router.delete(
    "/admin/booking/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    controller.deleteBooking
  );

  router.get(
    "/admin/booking/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    controller.getAdminDetailBooking
  );
};
