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
  return await modelBooking.getBookingsByUserId(userId);
}

export async function getDetailBooking(bookingId: string) {
  const booking = await modelBooking.getBookingDetailById(bookingId);
  if (!booking) throw new Error("Booking not found");

  const addOns = await modelBooking.getBookingAddons(bookingId);

  const decorationPrice = booking.decoration.base_price;

  let addOnTotalPrice = 0;
  for (let i = 0; i < addOns.length; i++) {
    const item = addOns[i];
    addOnTotalPrice += item.price * item.quantity;
  }

  const { total_price, dp_amount, first_payment_amount, final_payment_amount } =
    helpers.calculatePaymentBreakdown(decorationPrice, addOnTotalPrice);

  const daysBefore = helpers.getDaysBeforeEvent(booking.date);
  const availablePayments = helpers.determineAvailablePayments(daysBefore);

  return {
    ...booking,
    additional_services: addOns,
    total_price,
    dp_amount,
    first_payment_amount,
    final_payment_amount,
    available_payments: availablePayments,
  };
}
