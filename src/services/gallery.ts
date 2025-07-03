import * as galleryModel from "../models/gallery";
import { HttpError } from "../utils/error";

export async function getAll() {
  return await galleryModel.getAllGalleryDecorations();
}

export async function createGalleryDecoration(title: string, image: string) {
  return await galleryModel.createGalleryDecoration(title, image);
}

export async function updateGalleryDecoration(
  id: string,
  { title, image }: { title?: string; image?: string }
) {
  const updated = await galleryModel.updateGalleryDecoration(id, {
    title,
    image,
  });
  if (!updated)
    throw new HttpError("Gallery decoration not found or no data changed", 404);
  return updated;
}

export async function deleteGalleryDecoration(id: string) {
  const deleted = await galleryModel.deleteGalleryDecoration(id);
  if (!deleted) throw new HttpError("Gallery decoration not found", 404);
  return deleted;
}
