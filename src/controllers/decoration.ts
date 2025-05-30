import { Request, Response, NextFunction } from "express";
import * as decorationService from "../services/decoration";

export async function getAllDecorations(_req: Request, res: Response) {
  const decorations = await decorationService.getAll();
  res.json({
    data: decorations,
  });
}

export async function getDecorationById(req: Request, res: Response) {
  const id = req.params.id;
  const data = await decorationService.getByIdWithProjects(id);
  res.json({ data });
}
