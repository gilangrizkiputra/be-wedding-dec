export function generateJoiError(error: any) {
  return error.details.map((err: any) => err.message);
}

export function getDaysBeforeEvent(eventDate: string | Date): number {
  const today = new Date();
  const target = new Date(eventDate);
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.ceil((target.getTime() - today.getTime()) / msInDay);
}

export function calculatePaymentBreakdown(
  decorationPrice: number,
  addOnTotalPrice: number
) {
  const totalPrice = decorationPrice + addOnTotalPrice;
  const bookingDpFlat = 1000000;
  const firstInstallment = Math.round(totalPrice * 0.5);
  const finalInstallment = totalPrice - bookingDpFlat - firstInstallment;

  return {
    total_price: totalPrice,
    dp_amount: bookingDpFlat,
    first_payment_amount: firstInstallment,
    final_payment_amount: finalInstallment,
  };
}

export function determineAvailablePayments(daysBefore: number): string[] {
  const available: string[] = ["dp"];
  if (daysBefore <= 30) available.push("first");
  if (daysBefore <= 7) available.push("final");
  return available;
}
