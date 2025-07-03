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
    "/admin/project-decorations",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectController.createProjectDecoration
  );

  router.put(
    "/admin/project-decorations/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectController.updateProjectDecoration
  );

  router.delete(
    "/admin/project-decorations/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectController.deleteProjectDecoration
  );

  router.post(
    "/admin/project-decorations/:id/images",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectImageController.uploadProjectImages
  );

  router.delete(
    "/admin/project-images/:id",
    authMiddleware.isAuthorized,
    authMiddleware.isAdmin,
    projectImageController.deleteProjectImage
  );

  // router.get(
  //   "/admin/project-images",
  //   authMiddleware.isAuthorized,
  //   authMiddleware.isAdmin,
  //   projectImageController.getAllProjectImages
  // );
};
