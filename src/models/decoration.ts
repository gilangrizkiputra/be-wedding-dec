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

export async function createDecoration({
  title,
  description,
  base_price,
  category,
}: {
  title: string;
  description: string;
  base_price: number;
  category: string;
}) {
  const res = await query(
    `
    INSERT INTO decorations (title, description, base_price, category, created_at, updated_at)
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    RETURNING *
  `,
    [title, description, base_price, category]
  );
  return res.rows[0];
}

export async function updateDecoration(
  id: string,
  {
    title,
    description,
    base_price,
    category,
  }: {
    title?: string;
    description?: string;
    base_price?: number;
    category?: string;
  }
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
  if (base_price != null) {
    updates.push(`base_price = $${i++}`);
    values.push(base_price);
  }
  if (category) {
    updates.push(`category = $${i++}`);
    values.push(category);
  }

  if (updates.length === 0) return null;

  updates.push(`updated_at = NOW()`);

  const sql = `
    UPDATE decorations SET ${updates.join(", ")}
    WHERE id = $${i} RETURNING *
  `;
  values.push(id);

  const res = await query(sql, values);
  return res.rows[0];
}

export async function deleteDecoration(id: string) {
  const res = await query(`DELETE FROM decorations WHERE id = $1 RETURNING *`, [
    id,
  ]);
  return res.rows[0];
}
