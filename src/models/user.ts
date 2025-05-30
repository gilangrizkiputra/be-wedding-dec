import { query } from "../utils/db.js";

export async function createUser(payload: {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}) {
  const { name, email, phoneNumber, password } = payload;
  const res = await query(
    `INSERT INTO users (name, email, phone_number, password, role)
     VALUES ($1, $2, $3, $4, 'USER')
     RETURNING *`,
    [name, email, phoneNumber, password]
  );
  return res.rows[0];
}

export async function getUserByEmail(email: string) {
  const res = await query("SELECT * FROM users WHERE email = $1", [email]);
  return res.rows[0] || null;
}

export async function getUserByPhoneNumber(phoneNumber: string) {
  const res = await query("SELECT * FROM users WHERE phone_number = $1", [
    phoneNumber,
  ]);
  return res.rows[0] || null;
}

export async function getUserById(userId: string) {
  const res = await query("SELECT * FROM users WHERE id = $1", [userId]);
  return res.rows[0] || null;
}

export async function updateUserById(id: string, payload: any) {
  const { name, phoneNumber, image } = payload;

  const res = await query(
    `UPDATE users SET 
      name = COALESCE($1, name), 
      phone_number = COALESCE($2, phone_number),
      image = COALESCE($3, image)
    WHERE id = $4
    RETURNING id, name, email, phone_number, image`,
    [name, phoneNumber, image, id]
  );

  return res.rows[0];
}
