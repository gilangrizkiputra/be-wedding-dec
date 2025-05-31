import { Request, Response } from "express";
import * as midtransService from "../services/midtrans";
import { HttpError } from "../utils/error";

export async function createMidtransToken(req: Request, res: Response) {
  const { bookingId, paymentType } = req.body;

  if (!bookingId || !paymentType) {
    throw new HttpError("bookingId dan paymentType wajib diisi", 400);
  }

  const token = await midtransService.generateMidtransToken(
    bookingId,
    paymentType
  );
  res.status(200).json({
    message: "Success generate midtrans token",
    token,
  });
}

export async function handleWebhook(req: Request, res: Response) {
  await midtransService.updatePaymentFromWebhook(req.body);
  res.status(200).json({ message: "Webhook received" });
}
