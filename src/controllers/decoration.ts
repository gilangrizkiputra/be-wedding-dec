import { Request, Response, NextFunction } from "express";
import * as decorationService from "../services/decoration";

export async function getAllDecorations(_req: Request, res: Response) {
  const decorations = await decorationService.getAll();
  res.status(200).json({
    data: decorations,
  });
}

export async function getDecorationById(req: Request, res: Response) {
  const id = req.params.id;
  const data = await decorationService.getByIdWithProjects(id);
  res.status(200).json({ data });
}

export async function createDecoration(req: Request, res: Response) {
  const { title, description, base_price, category } = req.body;

  const decoration = await decorationService.createDecoration({
    title,
    description,
    base_price,
    category,
  });

  res.status(201).json({
    message: "Decoration created successfully",
    data: decoration,
  });
}

export async function updateDecoration(req: Request, res: Response) {
  const id = req.params.id;
  const { title, description, base_price, category } = req.body;

  const updated = await decorationService.updateDecoration(id, {
    title,
    description,
    base_price,
    category,
  });

  res.status(200).json({
    message: "Decoration updated successfully",
    data: updated,
  });
}

export async function deleteDecoration(req: Request, res: Response) {
  const id = req.params.id;

  const deleted = await decorationService.deleteDecoration(id);

  res.status(200).json({
    message: "Decoration deleted successfully",
    data: deleted,
  });
}
