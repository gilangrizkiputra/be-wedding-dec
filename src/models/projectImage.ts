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
