import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export default {
  schema: "./utils/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ExpenseEasedb_owner:bANzgQYrB01E@ep-shy-dream-a19gin6a.ap-southeast-1.aws.neon.tech/ExpenseEasedb?sslmode=require",
  },
};
