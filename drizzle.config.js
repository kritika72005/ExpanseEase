import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export default {
  schema: "./utils/schema.jsx",
  dialect: "postgresql",
  dbCredentials: {
    url: NEXT_PUBLIC_DATABASE_URL,
  },
};
