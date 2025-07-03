import { query } from "../utils/db.js";
import { supabase } from "../utils/supabase";
import { appEnv } from "../utils/env.js";

export async function getAllProjectDecorations() {
  const res = await query(`
    SELECT 
      pd.id,
      pd.title,
      pd.description,
      (
        SELECT image_url 
        FROM project_images 
        WHERE project_id = pd.id 
        ORDER BY order_index ASC 
        LIMIT 1
      ) AS cover_image
    FROM project_decorations pd
    ORDER BY pd.created_at DESC
  `);
  return res.rows;
}

export async function getProjectDecorationById(id: string) {
  const projectRes = await query(
    `SELECT id, title, description, decoration_id, created_at
     FROM project_decorations
     WHERE id = $1`,
    [id]
  );

  const project = projectRes.rows[0];
  if (!project) return null;

  const imagesRes = await query(
    `SELECT image_url
     FROM project_images
     WHERE project_id = $1
     ORDER BY order_index ASC`,
    [id]
  );

  project.images = imagesRes.rows.map((r) => r.image_url);
  return project;
}

export async function createProjectDecoration(
  title: string,
  description: string,
  decorationId: string
) {
  const res = await query(
    `INSERT INTO project_decorations (title, description, decoration_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, decorationId]
  );
  return res.rows[0];
}

export async function updateProjectDecoration(
  id: string,
  { title, description }: { title?: string; description?: string }
) {
  const updates: string[] = [];
  const values: any[] = [];
  let i = 1;

  if (title) {
    updates.push(`title = $${i++}`);
    values.push(title);
  }
  if (description) {
    updates.push(`description = $${i++}`);
    values.push(description);
  }

  if (updates.length === 0) return null;

  updates.push(`created_at = NOW()`);

  const sql = `
    UPDATE project_decorations SET ${updates.join(", ")}
    WHERE id = $${i} RETURNING *
  `;
  values.push(id);

  const res = await query(sql, values);
  return res.rows[0];
}

export async function deleteProjectDecoration(id: string) {
  const res = await query(
    `DELETE FROM project_decorations WHERE id = $1 RETURNING *`,
    [id]
  );
  return res.rows[0];
}

export async function deleteProjectDecorationWithImages(id: string) {
  const imagesRes = await query(
    `SELECT image_url FROM project_images WHERE project_id = $1`,
    [id]
  );
  const imageUrls = imagesRes.rows.map((r) => r.image_url);

  const filePaths = imageUrls.map((url) =>
    url.replace(`${appEnv.SUPABASE_URL}/storage/v1/object/public/uploads/`, "")
  );
  if (filePaths.length > 0) {
    await supabase.storage.from("wdstorage").remove(filePaths);
  }

  const imagesToDelete = imagesRes.rows;

  await query(`DELETE FROM project_images WHERE project_id = $1`, [id]);

  const res = await query(
    `DELETE FROM project_decorations WHERE id = $1 RETURNING *`,
    [id]
  );

  return { deletedProject: res.rows[0], deletedImages: imagesToDelete };
}
