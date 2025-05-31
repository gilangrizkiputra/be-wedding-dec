import { query } from "../utils/db";

export async function createPayment({
  bookingId,
  type,
  amount,
  paymentStatus,
  snapToken,
  orderId,
}: {
  bookingId: string;
  type: "dp" | "first" | "final";
  amount: number;
  paymentStatus: "pending" | "paid" | "failed";
  snapToken: string;
  orderId: string;
}) {
  await query(
    `INSERT INTO payments (booking_id, type, amount, payment_status, snap_token, order_id, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
    [bookingId, type, amount, paymentStatus, snapToken, orderId]
  );
}

export async function findPendingSnapToken(
  bookingId: string,
  paymentType: "dp" | "first" | "final"
) {
  const result = await query(
    `SELECT snap_token FROM payments
     WHERE booking_id = $1 AND type = $2 AND payment_status = 'pending' AND snap_token IS NOT NULL
     ORDER BY created_at DESC
     LIMIT 1`,
    [bookingId, paymentType]
  );

  return result.rows[0]?.snap_token || null;
}

export async function updatePaymentStatusByOrderId(
  orderId: string,
  status: "paid" | "failed",
  midtransTransactionId: string
) {
  await query(
    `UPDATE payments
     SET payment_status = $1,
         midtrans_transaction_id = $2,
         updated_at = NOW()
     WHERE order_id = $3`,
    [status, midtransTransactionId, orderId]
  );
}

export async function getPaymentByOrderId(orderId: string) {
  const result = await query(`SELECT * FROM payments WHERE order_id = $1`, [
    orderId,
  ]);
  return result.rows[0];
}

export async function sumAllPaidAmountByBooking(bookingId: string) {
  const result = await query(
    `SELECT SUM(amount) as total FROM payments 
     WHERE booking_id = $1 AND payment_status = 'paid'`,
    [bookingId]
  );
  return parseInt(result.rows[0]?.total ?? "0", 10);
}
