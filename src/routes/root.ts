import { Application } from "express";
import * as indexController from "../controllers/index.js";

export default (app: Application) => {
  app.get("/", indexController.ping);
};
