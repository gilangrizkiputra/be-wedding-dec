import { query } from "../utils/db.js";

export async function getAllServices() {
  const res = await query(
    `SELECT * FROM additional_services ORDER BY created_at DESC`
  );
  return res.rows;
}
