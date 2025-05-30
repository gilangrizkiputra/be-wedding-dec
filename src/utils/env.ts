import dotenv from "dotenv";
import { access } from "fs/promises";

async function loadEnv() {
  const isDev = process.env.NODE_ENV === "development";

  let envPath: string | undefined = undefined;

  if (isDev) {
    const hasLocal = await access(".env.local")
      .then(() => true)
      .catch(() => false);

    if (!hasLocal) throw new Error("Missing .env.local");

    envPath = ".env.local";
    console.log(`Loaded env from ${envPath}`);
  } else {
    console.log("Loaded env from .env or process.env");
  }

  dotenv.config({ path: envPath });
}

function formatEnv() {
  const PORT = process.env.PORT ?? process.env.HOST_PORT;

  return {
    ...process.env,
    PORT,
  };
}

await loadEnv();

export const appEnv = formatEnv() as Record<string, string>;
