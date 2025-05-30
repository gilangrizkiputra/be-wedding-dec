import { Application, Router } from "express";
import multer from "multer";
import * as uploadController from "../controllers/upload.js";
import * as authMiddleware from "../middlewares/auth.js";

export default (app: Application) => {
  const router = Router();
  const uploads = multer({ storage: multer.memoryStorage() });

  app.use(router);

  router.post(
    "/uploads",
    authMiddleware.isAuthorized,
    uploads.single("image"),
    uploadController.uploadImage
  );
};
