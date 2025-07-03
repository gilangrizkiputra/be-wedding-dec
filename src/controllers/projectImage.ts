import { Request, Response, NextFunction } from "express";
import * as projectImageService from "../services/projectImage";
import { HttpError } from "../utils/error.js";

export async function uploadProjectImages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return next(
        new HttpError("images harus berupa array dan tidak boleh kosong", 400)
      );
    }

    const data = await projectImageService.addImages(id, images);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function deleteProjectImage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const data = await projectImageService.deleteImage(id);

    res.status(200).json({
      message: "Project image berhasil dihapus",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllProjectImages(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await projectImageService.getAllImages();
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}
