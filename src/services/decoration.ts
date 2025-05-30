import * as decorationModel from "../models/decoration";

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
