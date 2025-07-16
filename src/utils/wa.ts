import dotenv from "dotenv";
dotenv.config();

export function generateWhatsAppLink(detail: any): string {
  const phone = process.env.ADMIN_PHONE_NUMBER;
  if (!phone) throw new Error("ADMIN_PHONE_NUMBER is not set in env");

  const dateStr = new Date(detail.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  let addonsText = "- Tidak ada";
  if (detail.additional_services?.length) {
    addonsText = detail.additional_services
      .map(
        (a: any) =>
          `- ${a.name} (${a.quantity} ${a.unit} x Rp${a.price.toLocaleString(
            "id-ID"
          )})`
      )
      .join("\n");
  }

  const message = `
Halo Ka, Saya sudah melakukan Booking ${
    detail.decoration.category
  } pada Web ChizDecor

Nama: ${detail.user.name}
Tanggal Acara: ${dateStr}
Paket: ${detail.decoration.title}
Estimasi Total: Rp ${detail.total_price.toLocaleString("id-ID")}
Status: ${detail.status.toUpperCase()}

Additional Services:
${addonsText}
  `.trim();

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
