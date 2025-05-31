import { Application, Router } from "express";
import * as projectController from "../controllers/projectDecoration";
import * as projectImageController from "../controllers/projectImage";
import * as authMiddleware from "../middlewares/auth";

export default (app: Application) => {
  const router = Router();
  app.use(router);

  router.get(
    "/project-decorations",
    projectController.getAllProjectDecorations
  );

  router.get(
    "/project-decorations/:id",
    projectController.getProjectDecorationDetail
  );

  router.post(
    "/project-decorations",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectController.createProjectDecoration
  );

  router.post(
    "/project-decorations/:id/images",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectImageController.uploadProjectImages
  );
};
