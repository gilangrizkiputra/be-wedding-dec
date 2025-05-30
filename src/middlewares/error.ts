import { Application, Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/error.js";

export default (app: Application) => {
  app.use(notFound);
  app.use(errorHandler);
};

function notFound(req: Request, _res: Response, next: NextFunction) {
  const notFoundError = new HttpError(
    `Route not found - ${req.originalUrl}`,
    404
  );

  next(notFoundError);
}

function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: "Internal Server Error" });
}
