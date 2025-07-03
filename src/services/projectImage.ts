import * as modelProjectImage from "../models/projectImage";
import { HttpError } from "../utils/error";
import { supabase } from "../utils/supabase.js";
import { appEnv } from "../utils/env.js";

export async function addImages(projectId: string, imageUrls: string[]) {
  return await modelProjectImage.addProjectImages(projectId, imageUrls);
}

export async function deleteImage(id: string) {
  const deletedImage = await modelProjectImage.deleteProjectImage(id);

  if (!deletedImage) throw new HttpError("Project image tidak ditemukan", 404);

  const filePath = deletedImage.image_url.replace(
    `${appEnv.SUPABASE_URL}/storage/v1/object/public/uploads/`,
    ""
  );

  const { error } = await supabase.storage.from("uploads").remove([filePath]);
  if (error) {
    console.error("Supabase delete error:", error.message);
    throw new HttpError(`Gagal hapus file di storage: ${error.message}`, 500);
  }

  return deletedImage;
}

export async function getAllImages() {
  return await modelProjectImage.getAllProjectImages();
}
