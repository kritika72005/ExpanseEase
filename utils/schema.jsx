// import { pgTable } from "drizzle-orm/pg-core";
import {
  numeric,
  pgTable,
  serial,
  varchar,
  integer,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: varchar("amount", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 255 }),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
});

export const Expanses = pgTable("expanses", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: numeric("amount").notNull().default(0),
  budgetId: integer("budgetId").references(() => Budgets.id),
  createdAt: varchar("createdAt").notNull(),
});
