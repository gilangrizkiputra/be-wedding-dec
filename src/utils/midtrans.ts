import midtransClient from "midtrans-client";
import { appEnv } from "./env.js";

const isProduction = appEnv.MIDTRANS_IS_PRODUCTION === 'true';
const serverKey = appEnv.MIDTRANS_SERVER_KEY;
const clientKey = appEnv.MIDTRANS_CLIENT_KEY;

const midtrans = new midtransClient.Snap({
  isProduction,
  serverKey,
  clientKey,
});

export { midtrans };
