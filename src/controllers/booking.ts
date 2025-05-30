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

  res.json({
    message: "Booking created",
    data: booking,
  });
}

export async function getMyBookings(_req: Request, res: Response) {
  const user = res.locals.user;
  const data = await bookingService.getUserBookings(user.id);
  res.json({ data });
}

