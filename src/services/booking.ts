import * as modelBooking from "../models/booking";
import * as helpers from "../utils/helper";
import { HttpError } from "../utils/error";

export async function create(
  userId: string,
  decorationId: string,
  date: string,
  services: any[]
) {
  const decoration = await modelBooking.getDecorationById(decorationId);
  if (!decoration) {
    throw new HttpError("Decoration not fount", 404);
  }

  // const eventDate = new Date(date);
  // const today = new Date();
  // const diffTime = eventDate.getTime() - today.getTime();
  // const diffDays = diffTime / (1000 * 3600 * 24);

  // let minDays = 0;
  // if (decoration.category === "wedding") {
  //   minDays = 21;
  // } else if (decoration.category === "engagement") {
  //   minDays = 5;
  // }

  // if (diffDays < minDays) {
  //   throw new HttpError(
  //     `Booking untuk acara ${decoration.category} harus dilakukan minimal ${minDays} hari sebelum tanggal acara.`,
  //     400
  //   );
  // }

  const booking = await modelBooking.createBooking(userId, decorationId, date);
  await modelBooking.addAdditionalServices(booking.id, services);
  return booking;
}

export async function getUserBookings(userId: string) {
  const bookings = await modelBooking.getBookingsByUserId(userId);

  const enriched = await Promise.all(
    bookings.map(async (b) => {
      const eventDate = new Date(b.date);
      const firstPaymentDate = new Date(eventDate);
      const finalPaymentDate = new Date(eventDate);
      firstPaymentDate.setDate(eventDate.getDate() - 30);
      finalPaymentDate.setDate(eventDate.getDate() - 7);

      const paid = await modelBooking.getPaidPaymentTypes(b.id);
      const days = helpers.getDaysBeforeEvent(b.date);
      const available = helpers.determineAvailablePayments(days, paid);

      return {
        ...b,
        paid_payments: paid,
        available_payments: available,
        first_payment_date: firstPaymentDate.toISOString(),
        final_payment_date: finalPaymentDate.toISOString(),
      };
    })
  );

  return enriched;
}

export async function getDetailBooking(bookingId: string) {
  const booking = await modelBooking.getBookingDetailById(bookingId);
  if (!booking) throw new Error("Booking not found");

  const addOns = await modelBooking.getBookingAddons(bookingId);
  const paidPayments = await modelBooking.getPaidPaymentTypes(bookingId);

  const addOnTotalPrice = addOns.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const decorationPrice = booking.decoration.base_price;

  const { total_price, dp_amount, first_payment_amount, final_payment_amount } =
    helpers.calculatePaymentBreakdown(decorationPrice, addOnTotalPrice);

  const daysBefore = helpers.getDaysBeforeEvent(booking.date);
  const availablePayments = helpers.determineAvailablePayments(
    daysBefore,
    paidPayments
  );

  return {
    ...booking,
    additional_services: addOns,
    total_price,
    dp_amount,
    first_payment_amount,
    final_payment_amount,
    paid_payments: paidPayments,
    available_payments: availablePayments,
  };
}

export async function cancelBooking(bookingId: string) {
  const booking = await modelBooking.getBookingDetailById(bookingId);
  if (!booking) throw new HttpError("Booking not found", 404);

  if (booking.status === "cancelled") {
    throw new HttpError("Booking sudah dibatalkan sebelumnya.", 400);
  }

  const cancelled = await modelBooking.cancelBooking(bookingId);
  return cancelled;
}

export async function getAllBookings() {
  const bookings = await modelBooking.getAllBookings();

  return bookings.map((b) => ({
    ...b,
    addons_total: parseInt(b.addons_total, 10),
    total_price: parseInt(b.total_price, 10),
  }));
}
