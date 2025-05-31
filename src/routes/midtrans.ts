import { Application, Router } from "express";
import * as midtransController from "../controllers/midtrans";
import * as authMiddleware from "../middlewares/auth";

export default (app: Application) => {
  const router = Router();

  app.use("/midtrans", router);

  router.post(
    "/token",
    authMiddleware.isAuthorized,
    midtransController.createMidtransToken
  );

  router.post("/notification", midtransController.handleWebhook);
};

// TESTING MIDTRANS NOTIFICATION
// 1. run program num run dev di terminal
// 2. jalanin ngrok di terminal : ngrok http 3000 (login ngrok dulu baru jalanin perintah  ke 2)
// 3. buka link ngrok di browser > klik visit site > jika ping success berarti aman
// 4. buka midtrans > settings > payment > notification url > masukin url ngrok > test > jika success klik save
