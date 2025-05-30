import { Request, Response } from "express";

export function ping(_req: Request, res: Response) {
  res.status(200).json({
    message: "Ping successfully",
  });
}
