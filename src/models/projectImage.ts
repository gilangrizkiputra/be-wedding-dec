import { query } from "../utils/db.js";

export async function addProjectImages(projectId: string, imageUrls: string[]) {
  const inserted = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const res = await query(
      `INSERT INTO project_images (project_id, image_url, order_index)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [projectId, imageUrls[i], i]
    );
    inserted.push(res.rows[0]);
  }

  return inserted;
}

export async function deleteProjectImage(id: string) {
  const resSelect = await query(
    `SELECT image_url FROM project_images WHERE id = $1`,
    [id]
  );
  const image = resSelect.rows[0];
  if (!image) return null;

  await query(`DELETE FROM project_images WHERE id = $1`, [id]);

  return image;
}

export async function getAllProjectImages() {
  const res = await query(`
    SELECT 
      pi.id,
      pi.image_url,
      pi.order_index,
      pi.project_id,
      pd.title AS project_title
    FROM project_images pi
    JOIN project_decorations pd ON pi.project_id = pd.id
    ORDER BY pi.created_at DESC
  `);

  return res.rows;
}
