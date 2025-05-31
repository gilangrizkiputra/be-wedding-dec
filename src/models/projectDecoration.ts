import { query } from "../utils/db.js";

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
