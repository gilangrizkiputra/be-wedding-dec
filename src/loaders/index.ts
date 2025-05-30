import { Application } from "express";
import common from "./common.js";
import cors from "./cors.js";
import logger from "./logger.js";
import { Server } from "http";

export default (app: Application, _server: Server) => {
  common(app);
  cors(app);
  logger(app);
};
