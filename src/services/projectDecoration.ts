import * as projectModel from "../models/projectDecoration";

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
