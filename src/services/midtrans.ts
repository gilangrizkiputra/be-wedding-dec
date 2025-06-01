import { HttpError } from "../utils/error";
import { midtrans } from "../utils/midtrans";
import * as bookingService from "../services/booking";
import * as modelMidtrans from "../models/midtrans";
import * as modelBooking from "../models/booking";
import * as helpers from "../utils/helper";

export async function generateMidtransToken(
  bookingId: string,
  paymentType: "dp" | "first" | "final"
) {
  const booking = await bookingService.getDetailBooking(bookingId);
  if (!booking) throw new HttpError("Booking tidak ditemukan", 404);

  const hMinus = helpers.getDaysBeforeEvent(booking.date);

  if (paymentType === "first" && hMinus > 30) {
    throw new HttpError("Pembayaran tahap 1 hanya dibuka H-30 ke bawah", 400);
  }

  if (paymentType === "final" && hMinus > 7) {
    throw new HttpError("Pelunasan hanya bisa dilakukan H-7 ke bawah", 400);
  }

  const existingToken = await modelMidtrans.findPendingSnapToken(
    bookingId,
    paymentType
  );

  if (existingToken) {
    throw new HttpError(
      "Kamu sudah memiliki transaksi yang belum selesai. Harap selesaikan pembayaran sebelumnya terlebih dahulu.",
      409
    );
  }

  const orderId = `ORDER-${Date.now()}`;

  let amount = 0;
  if (paymentType === "dp") amount = booking.dp_amount;
  else if (paymentType === "first") amount = booking.first_payment_amount;
  else amount = booking.final_payment_amount;

  const transaction = await midtrans.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
    credit_card: { secure: true },
  });

  await modelMidtrans.createPayment({
    bookingId,
    type: paymentType,
    amount,
    paymentStatus: "pending",
    snapToken: transaction.token,
    orderId,
  });

  return transaction.token;
}

export async function updatePaymentFromWebhook(body: any) {
  const { order_id, transaction_status, fraud_status, transaction_id } = body;

  if (!order_id || !transaction_status) return;

  let finalStatus: "paid" | "failed" | null = null;

  if (transaction_status === "settlement") {
    finalStatus = "paid";
  } else if (transaction_status === "capture" && fraud_status === "accept") {
    finalStatus = "paid";
  } else if (
    ["expire", "cancel"].includes(transaction_status) ||
    fraud_status === "deny"
  ) {
    finalStatus = "failed";
  }

  if (!finalStatus) return;

  const current = await modelMidtrans.getPaymentByOrderId(order_id);
  if (!current) return;

  if (current.payment_status === finalStatus) {
    console.log("🔁 Sudah diproses sebelumnya, skip.");
    return;
  }

  await modelMidtrans.updatePaymentStatusByOrderId(
    order_id,
    finalStatus,
    transaction_id || null
  );

  let dpAmount: number | undefined = undefined;
  let fullAmount: number | undefined = undefined;

  if (current.type === "dp" && finalStatus === "paid") {
    dpAmount = current.amount;
  }

  if (current.type === "final" && finalStatus === "paid") {
    fullAmount = await modelMidtrans.sumAllPaidAmountByBooking(
      current.booking_id
    );
  }

  await modelBooking.updateBookingStatusAndAmounts({
    bookingId: current.booking_id,
    type: current.type,
    status:
      current.type === "dp"
        ? "dp_paid"
        : current.type === "first"
        ? "first_paid"
        : "done",
    dpAmount,
    fullAmount,
  });
}
