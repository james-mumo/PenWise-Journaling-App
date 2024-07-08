import { Pool } from "pg";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// initializing postgress db usnng the pg library
const initDb = async () => {
  const filePath = path.join(__dirname, "../../init.sql");
  const sql = fs.readFileSync(filePath, "utf-8");
  await pool.query(sql);
};

export { initDb, pool };
