import { Pool } from "node-postgres";
import * as dotenv from "dotenv";

dotenv.config();
const env = process.env;

const pool = new Pool({
  host: env.POSTGRES_HOST,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  port: Number(env.POSTGRES_PORT),
  idleTimeoutMillis: 30000,
});

export default pool;
