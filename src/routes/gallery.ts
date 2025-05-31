import { Application, Router } from "express";
import * as galleryController from "../controllers/gallery";
import * as authMiddleware from "../middlewares/auth.js";

export default (app: Application) => {
  const router = Router();

  app.use(router);

  router.get(
    "/gallery-decorations",
    galleryController.getAllGalleryDecorations
  );

  router.post(
    "/gallery-decorations",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    galleryController.createGalleryDecoration
  );
};
