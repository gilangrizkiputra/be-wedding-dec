import * as modelBooking from "../models/booking";
import * as helpers from "../utils/helper";

export async function create(
  userId: string,
  decorationId: string,
  date: string,
  services: any[]
) {
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
