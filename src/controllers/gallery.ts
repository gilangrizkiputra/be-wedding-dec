import { NextFunction, Request, Response } from "express";
import * as galleryService from "../services/gallery";
import { HttpError } from "../utils/error";

export async function getAllGalleryDecorations(_req: Request, res: Response) {
  const data = await galleryService.getAll();
  res.status(200).json({ data });
}

export async function createGalleryDecoration(req: Request, res: Response) {
  const { title, image } = req.body;

  if (!title || !image) {
    res.status(400).json({ message: "title dan image wajib diisi" });
    return;
  }

  const data = await galleryService.createGalleryDecoration(title, image);
  res.status(201).json({ data });
}
