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
      ) AS decoration
    FROM bookings b
    JOIN decorations d ON d.id = b.decoration_id
    WHERE b.user_id = $1
    ORDER BY b.created_at DESC
  `,
    [userId]
  );

  return res.rows;
}
