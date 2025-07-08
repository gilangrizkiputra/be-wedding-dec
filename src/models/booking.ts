import { query } from "../utils/db.js";

export async function createBooking(
  userId: string,
  decorationId: string,
  date: string
) {
  const res = await query(
    `
    INSERT INTO bookings (user_id, decoration_id, date, status, created_at, updated_at)
    VALUES ($1, $2, $3, 'pending', NOW(), NOW())
    RETURNING *
  `,
    [userId, decorationId, date]
  );

  return res.rows[0];
}

export async function addAdditionalServices(
  bookingId: string,
  services: { service_id: string; quantity: number }[]
) {
  if (!services.length) return;

  const values = services
    .map((_, i) => `($1, $${i * 2 + 2}, $${i * 2 + 3}, NOW(), NOW())`)
    .join(",");

  const params = [
    bookingId,
    ...services.flatMap((s) => [s.service_id, s.quantity]),
  ];

  await query(
    `
    INSERT INTO booking_additional_services 
    (booking_id, additional_service_id, quantity, created_at, updated_at)
    VALUES ${values}
  `,
    params
  );
}

export async function getBookingsByUserId(userId: string) {
  const res = await query(
    `
    SELECT 
      b.id, b.date, b.status, b.created_at,
      json_build_object(
        'title', d.title,
        'base_price', d.base_price
      ) AS decoration,
      COALESCE(SUM(s.price * bas.quantity), 0) AS addons_total,
      (d.base_price + COALESCE(SUM(s.price * bas.quantity), 0)) AS total_price
    FROM bookings b
    JOIN decorations d ON d.id = b.decoration_id
    LEFT JOIN booking_additional_services bas ON bas.booking_id = b.id
    LEFT JOIN additional_services s ON s.id = bas.additional_service_id
    WHERE b.user_id = $1
    GROUP BY b.id, d.title, d.base_price
    ORDER BY b.created_at DESC
  `,
    [userId]
  );

  return res.rows;
}

export async function getBookingDetailById(id: string) {
  const res = await query(
    `
    SELECT 
      b.id, b.date, b.status, b.created_at,
      json_build_object(
        'name', u.name,
        'phone_number', u.phone_number
      ) AS user,
      json_build_object(
        'title', d.title,
        'base_price', d.base_price
      ) AS decoration
    FROM bookings b
    JOIN users u ON u.id = b.user_id
    JOIN decorations d ON d.id = b.decoration_id
    WHERE b.id = $1
  `,
    [id]
  );

  const paid = await query(
    `
    SELECT type FROM payments
    WHERE booking_id = $1 AND payment_status = 'paid'
    `,
    [id]
  );

  const paidPayments = paid.rows.map((p) => p.type); // ["dp", "first"]

  return {
    ...res.rows[0],
    paid_payments: paidPayments,
  };
}

export async function getBookingAddons(bookingId: string) {
  const res = await query(
    `
    SELECT 
      s.name, s.price, s.unit, bas.quantity
    FROM booking_additional_services bas
    JOIN additional_services s ON s.id = bas.additional_service_id
    WHERE bas.booking_id = $1
  `,
    [bookingId]
  );

  return res.rows;
}

export async function updateBookingStatusAndAmounts({
  bookingId,
  type,
  status,
  dpAmount,
  fullAmount,
}: {
  bookingId: string;
  type: "dp" | "first" | "final";
  status: string;
  dpAmount?: number;
  fullAmount?: number;
}) {
  const updates: string[] = [`status = $1`];
  const values: any[] = [status];
  let index = 2;

  if (type === "dp" && dpAmount != null) {
    updates.push(`dp_amount = $${index}`);
    values.push(dpAmount);
    index++;
  }

  if (fullAmount != null) {
    updates.push(`full_amount = $${index}`);
    values.push(fullAmount);
    index++;
  }

  updates.push(`updated_at = NOW()`);
  const whereClauseIndex = index;
  values.push(bookingId);

  const sql = `
    UPDATE bookings
    SET ${updates.join(", ")}
    WHERE id = $${whereClauseIndex}
  `;

  await query(sql, values);
}

export async function getPaidPaymentTypes(
  bookingId: string
): Promise<string[]> {
  const res = await query(
    `SELECT type FROM payments WHERE booking_id = $1 AND payment_status = 'paid'`,
    [bookingId]
  );
  return res.rows.map((p) => p.type);
}

export async function getDecorationById(decorationId: string) {
  const res = await query(`SELECT * FROM decorations WHERE id = $1`, [
    decorationId,
  ]);
  return res.rows[0];
}

export async function cancelBooking(bookingId: string) {
  const res = await query(
    `
    UPDATE bookings
    SET status = 'cancelled', updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `,
    [bookingId]
  );

  return res.rows[0];
}

export async function getAllBookings() {
  const res = await query(
    `
    SELECT 
      b.id, b.date, b.status, b.created_at,
      json_build_object(
        'id', u.id,
        'name', u.name,
        'phone_number', u.phone_number
      ) AS user,
      json_build_object(
        'id', d.id,
        'title', d.title,
        'base_price', d.base_price,
        'category', d.category
      ) AS decoration,
      COALESCE(SUM(s.price * bas.quantity), 0) AS addons_total,
      (d.base_price + COALESCE(SUM(s.price * bas.quantity), 0)) AS total_price
    FROM bookings b
    JOIN users u ON u.id = b.user_id
    JOIN decorations d ON d.id = b.decoration_id
    LEFT JOIN booking_additional_services bas ON bas.booking_id = b.id
    LEFT JOIN additional_services s ON s.id = bas.additional_service_id
    GROUP BY b.id, u.id, u.name, u.phone_number, d.id, d.title, d.base_price, d.category
    ORDER BY b.created_at DESC
  `
  );

  return res.rows;
}

export async function deleteBooking(bookingId: string) {
  await query(`DELETE FROM payments WHERE booking_id = $1`, [bookingId]);

  await query(`DELETE FROM booking_additional_services WHERE booking_id = $1`, [
    bookingId,
  ]);

  const res = await query(`DELETE FROM bookings WHERE id = $1 RETURNING *`, [
    bookingId,
  ]);

  return res.rows[0];
}
