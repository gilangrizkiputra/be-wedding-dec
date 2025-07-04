import { Request, Response } from "express";
import { supabase } from "../utils/supabase.js";
import { randomUUID } from "crypto";
import { HttpError } from "../utils/error.js";
import { appEnv } from "../utils/env.js";

export async function uploadImage(req: Request, res: Response) {
  if (!req.file) {
    throw new HttpError("No file uploaded", 400);
  }

  const ext = req.file.originalname.split(".").pop();
  const filename = `${randomUUID()}.${ext}`;

  const folder = req.body.folder || "general";

  const allowedFolders = ["users", "Engagement", "gallery", "Wedding"];
  if (!allowedFolders.includes(folder)) {
    throw new HttpError("Invalid folder name", 400);
  }

  const path = `${folder}/${filename}`;

  const { error } = await supabase.storage
    .from("wdstorage")
    .upload(path, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: true,
    });

  if (error) {
    throw new HttpError(`Upload failed: ${error.message}`, 500);
  }

  const url = `${appEnv.SUPABASE_URL}/storage/v1/object/public/wdstorage/${path}`;

  res.status(200).json({
    message: "Upload success",
    url,
  });
}
