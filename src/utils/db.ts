import { Pool } from "pg";
import { appEnv } from "./env.js";

const pool = new Pool({
  connectionString: appEnv.DATABASE_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
