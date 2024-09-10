import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://ExpenseEasedb_owner:bANzgQYrB01E@ep-shy-dream-a19gin6a.ap-southeast-1.aws.neon.tech/ExpenseEasedb?sslmode=require"
);
export const db = drizzle(sql, { schema });
