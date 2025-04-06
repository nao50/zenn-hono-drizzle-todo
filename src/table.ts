import { pgTable, uuid, varchar, timestamp, boolean  } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todo", {
  id: uuid('id').defaultRandom().primaryKey(),
  todo: varchar({ length: 255 }).notNull().unique(),
  done: boolean().notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
