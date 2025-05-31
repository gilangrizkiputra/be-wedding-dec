import { query } from "../utils/db.js";

export async function getAllGalleryDecorations() {
  const res = await query(
    `SELECT * FROM gallery_decorations ORDER BY created_at DESC`
  );
  return res.rows;
}

export async function createGalleryDecoration(title: string, image: string) {
  const res = await query(
    `INSERT INTO gallery_decorations (title, image) VALUES ($1, $2) RETURNING *`,
    [title, image]
  );
  return res.rows[0];
}
