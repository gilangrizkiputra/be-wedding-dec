import * as decorationModel from "../models/decoration";
import { HttpError } from "../utils/error";

export async function getAll() {
  return await decorationModel.getAllDecorations();
}

export async function getByIdWithProjects(id: string) {
  const decoration = await decorationModel.getDecorationById(id);
  if (!decoration) {
    throw new Error("Decoration not found");
  }

  const projects = await decorationModel.getRelatedProjectsByDecorationId(id);
  return { ...decoration, related_projects: projects };
}

export async function createDecoration(data: {
  title: string;
  description: string;
  base_price: number;
  category: string;
}) {
  if (!data.title || !data.description || !data.base_price || !data.category) {
    throw new HttpError("Semua field wajib diisi", 400);
  }

  return await decorationModel.createDecoration(data);
}

export async function updateDecoration(
  id: string,
  data: {
    title?: string;
    description?: string;
    base_price?: number;
    category?: string;
  }
) {
  const updated = await decorationModel.updateDecoration(id, data);
  if (!updated) {
    throw new HttpError("Decoration not found or no data changed", 404);
  }
  return updated;
}

export async function deleteDecoration(id: string) {
  const deleted = await decorationModel.deleteDecoration(id);
  if (!deleted) throw new HttpError("Decoration not found", 404);
  return deleted;
}
