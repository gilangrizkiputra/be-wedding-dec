import { Application, Router } from "express";
import * as decorationController from "../controllers/decoration";

const router = Router();

router.get("/", decorationController.getAllDecorations);

export default (app: Application) => {
  const router = Router();

  app.use(router);

  router.get("/decoration", decorationController.getAllDecorations);

  router.get("/decoration/:id", decorationController.getDecorationById);
};
