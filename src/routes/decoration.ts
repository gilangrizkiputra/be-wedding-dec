import { Application, Router } from "express";
import * as decorationController from "../controllers/decoration";
import * as authMiddleware from "../middlewares/auth";

const router = Router();

router.get("/", decorationController.getAllDecorations);

export default (app: Application) => {
  const router = Router();

  app.use(router);

  router.get("/decoration", decorationController.getAllDecorations);

  router.get("/decoration/:id", decorationController.getDecorationById);

  router.get(
    "/admin/decoration",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    decorationController.getAllDecorations
  );

  router.post(
    "/admin/decoration",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    decorationController.createDecoration
  );

  router.put(
    "/admin/decoration/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    decorationController.updateDecoration
  );

  router.delete(
    "/admin/decoration/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    decorationController.deleteDecoration
  );
};
