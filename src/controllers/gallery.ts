import { NextFunction, Request, Response } from "express";
import * as galleryService from "../services/gallery";
import { supabase } from "../utils/supabase";
import { appEnv } from "../utils/env";

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

export async function updateGalleryDecoration(req: Request, res: Response) {
  const id = req.params.id;
  const { title, image } = req.body;

  const updated = await galleryService.updateGalleryDecoration(id, {
    title,
    image,
  });

  res.status(200).json({
    message: "Gallery decoration updated successfully",
    data: updated,
  });
}

export async function deleteGalleryDecoration(req: Request, res: Response) {
  const id = req.params.id;

  const deleted = await galleryService.deleteGalleryDecoration(id);

  const filePath = deleted.image.replace(
    `${appEnv.SUPABASE_URL}/storage/v1/object/public/uploads/`,
    ""
  );
  await supabase.storage.from("wdstorage").remove([filePath]);

  res.status(200).json({
    message: "Gallery decoration deleted successfully",
    data: deleted,
  });
}
