// utils/whatsapp.ts
import axios from "axios";

const ADMIN_PHONE = process.env.ADMIN_PHONE;
const WABLAS_URL =
  process.env.WABLAS_URL || "https://console.wablas.com/api/send-message";
const WABLAS_TOKEN = process.env.WABLAS_TOKEN || "your-wablas-token";

export async function sendWhatsAppMessage(message: string) {
  try {
    await axios.post(
      WABLAS_URL,
      {
        phone: ADMIN_PHONE,
        message,
      },
      {
        headers: {
          Authorization: WABLAS_TOKEN,
        },
      }
    );
  } catch (error: any) {
    console.error("Gagal kirim pesan WhatsApp:");
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message || error);
    }
  }
}
