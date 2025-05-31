import * as galleryModel from "../models/gallery";

export async function getAll() {
  return await galleryModel.getAllGalleryDecorations();
}

export async function createGalleryDecoration(title: string, image: string) {
  return await galleryModel.createGalleryDecoration(title, image);
}