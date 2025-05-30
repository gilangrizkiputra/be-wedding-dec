import { Request, Response } from "express";
import * as serviceService from "../services/additionalService";

export async function getAllServices(req: Request, res: Response) {
  const data = await serviceService.getAll();
  res.status(200).json({ data });
}
