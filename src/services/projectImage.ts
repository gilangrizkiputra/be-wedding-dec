import * as modelProjectImage from "../models/projectImage";

export async function addImages(projectId: string, imageUrls: string[]) {
  return await modelProjectImage.addProjectImages(projectId, imageUrls);
}
