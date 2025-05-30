import * as modelBooking from "../models/booking";

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
