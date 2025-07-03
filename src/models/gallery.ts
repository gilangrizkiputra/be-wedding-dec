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

export async function updateGalleryDecoration(
  id: string,
  { title, image }: { title?: string; image?: string }
) {
  const updates: string[] = [];
  const values: any[] = [];
  let i = 1;

  if (title) {
    updates.push(`title = $${i++}`);
    values.push(title);
  }
  if (image) {
    updates.push(`image = $${i++}`);
    values.push(image);
  }

  if (updates.length === 0) return null;

  updates.push(`created_at = NOW()`);

  const sql = `
    UPDATE gallery_decorations SET ${updates.join(", ")}
    WHERE id = $${i} RETURNING *
  `;
  values.push(id);

  const res = await query(sql, values);
  return res.rows[0];
}

export async function deleteGalleryDecoration(id: string) {
  const res = await query(
    `DELETE FROM gallery_decorations WHERE id = $1 RETURNING *`,
    [id]
  );
  return res.rows[0];
}
