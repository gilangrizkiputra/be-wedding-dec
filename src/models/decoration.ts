import { query } from "../utils/db.js";

export async function getAllDecorations() {
  const res = await query(`SELECT * FROM decorations ORDER BY created_at DESC`);
  return res.rows;
}

export async function getDecorationById(id: string) {
  const res = await query(`SELECT * FROM decorations WHERE id = $1`, [id]);
  return res.rows[0];
}

export async function getRelatedProjectsByDecorationId(decorationId: string) {
  const res = await query(
    `
    SELECT pd.id, pd.title, pd.description,
           json_agg(json_build_object('image_url', pi.image_url, 'order_index', pi.order_index)) AS images
    FROM project_decorations pd
    LEFT JOIN project_images pi ON pi.project_id = pd.id
    WHERE pd.decoration_id = $1
    GROUP BY pd.id
    ORDER BY pd.created_at DESC
  `,
    [decorationId]
  );

  return res.rows;
}
