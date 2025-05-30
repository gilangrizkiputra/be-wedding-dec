import * as serviceModel from "../models/additionalService";

export async function getAll() {
  return await serviceModel.getAllServices();
}
