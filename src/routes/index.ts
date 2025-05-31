import { Application, Router } from "express";
import root from "./root.js";
import auth from "./auth.js";
import user from "./user.js";
import uploads from "./uploads.js";
import decoration from "./decoration.js";
import additionalService from "./additionalService.js";
import booking from "./booking.js";
import midtrans from "./midtrans.js";

export default (app: Application) => {
  const router = Router();
  app.use("/", router);

  root(app);
  auth(app);
  user(app);
  uploads(app);
  decoration(app);
  additionalService(app);
  booking(app);
  midtrans(app);
};
