import { Request, Response } from "express";
import * as bookingService from "../services/booking";

export async function createBooking(req: Request, res: Response) {
  const user = res.locals.user;
  const { decoration_id, date, additional_services } = req.body;

  const booking = await bookingService.create(
    user.id,
    decoration_id,
    date,
    additional_services || []
  );

  res.status(201).json({
    message: "Booking created",
    data: booking,
  });
}

export async function getMyBookings(_req: Request, res: Response) {
  const user = res.locals.user;
  const data = await bookingService.getUserBookings(user.id);
  res.status(200).json({ data });
}

export async function getDetailBooking(req: Request, res: Response) {
  const bookingId = req.params.id;
  const data = await bookingService.getDetailBooking(bookingId);
  res.status(200).json({ data });
}

export async function cancelBooking(req: Request, res: Response) {
  const bookingId = req.params.id;

  const cancelledBooking = await bookingService.cancelBooking(bookingId);

  res.status(200).json({
    message: "Booking berhasil dibatalkan.",
    data: cancelledBooking,
  });
}

export async function getAllBookings(req: Request, res: Response) {
  const data = await bookingService.getAllBookings();
  res.status(200).json({ data });
}

export async function deleteBooking(req: Request, res: Response) {
  const bookingId = req.params.id;
  const deleted = await bookingService.deleteBooking(bookingId);
  res.status(200).json({
    message: "Booking berhasil dihapus.",
    data: deleted,
  });
}

export async function getAdminDetailBooking(req: Request, res: Response) {
  const { id } = req.params;
  const data = await bookingService.getAdminDetailBooking(id);
  res.status(200).json({ data });
}
