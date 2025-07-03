import * as projectModel from "../models/projectDecoration";
import { HttpError } from "../utils/error";

export async function getAll() {
  return await projectModel.getAllProjectDecorations();
}

export async function getById(id: string) {
  return await projectModel.getProjectDecorationById(id);
}

export async function create(
  title: string,
  description: string,
  decorationId: string
) {
  return await projectModel.createProjectDecoration(
    title,
    description,
    decorationId
  );
}

export async function updateProjectDecoration(
  id: string,
  data: { title?: string; description?: string }
) {
  const updated = await projectModel.updateProjectDecoration(id, data);
  if (!updated)
    throw new HttpError(
      "Project decoration tidak ditemukan atau tidak ada perubahan",
      404
    );
  return updated;
}

export async function removeWithImages(id: string) {
  const { deletedProject, deletedImages } =
    await projectModel.deleteProjectDecorationWithImages(id);

  if (!deletedProject)
    throw new HttpError("Project decoration tidak ditemukan", 404);

  return { deletedProject, deletedImages };
}
