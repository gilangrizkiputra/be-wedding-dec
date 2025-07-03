import { NextFunction, Request, Response } from "express";
import * as projectService from "../services/projectDecoration";
import { HttpError } from "../utils/error";

export async function getAllProjectDecorations(_req: Request, res: Response) {
  const data = await projectService.getAll();
  res.status(200).json({ data });
}

export async function getProjectDecorationDetail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await projectService.getById(id);

    if (!data) {
      return next(new HttpError("Project decoration tidak ditemukan", 404));
    }

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function createProjectDecoration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, description, decoration_id } = req.body;

    if (!title || !description || !decoration_id) {
      return next(
        new HttpError("title, description, dan decoration_id wajib diisi", 400)
      );
    }

    const data = await projectService.create(title, description, decoration_id);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
}

export async function updateProjectDecoration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const data = await projectService.updateProjectDecoration(id, {
      title,
      description,
    });
    res
      .status(200)
      .json({ message: "Project decoration berhasil diupdate", data });
  } catch (err) {
    next(err);
  }
}

export async function deleteProjectDecoration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const { deletedProject, deletedImages } =
      await projectService.removeWithImages(id);

    res.status(200).json({
      message: "Project decoration & images berhasil dihapus",
      data: {
        deletedProject,
        deletedImages,
      },
    });
  } catch (err) {
    next(err);
  }
}
