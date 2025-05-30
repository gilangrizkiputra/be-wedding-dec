import { Application, Router } from "express";
import * as additionalServiceController from "../controllers/additionalService";

export default (app: Application) => {
  const router = Router();

  app.use(router);

  router.get("/additional-service", additionalServiceController.getAllServices);
};
