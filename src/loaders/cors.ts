import cors from "cors";
import { appEnv } from "../utils/env.js";
import { HttpError } from "../utils/error.js";
import { Application } from "express";

const ALLOWED_ORIGINS = appEnv.VALID_ORIGINS.split(",");

if (!ALLOWED_ORIGINS.length) {
  throw new Error("There are no allowed origins");
}

export const corsOptions = {
  origin(
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new HttpError("Not allowed by CORS", 403));
    }
  },
  credentials: true,
};

export default (app: Application) => {
  app.use(cors(corsOptions));
};
