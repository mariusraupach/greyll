import { relations } from "drizzle-orm";

import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const sessionsTable = pgTable("sessions", {
  id: text().primaryKey(),
  expiresAt: timestamp({
    mode: "date",
    withTimezone: true,
  }).notNull(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id),
});

export const sessionRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: [usersTable.id],
  }),
}));

export const usersTable = pgTable(
  "users",
  {
    id: serial().primaryKey(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => [uniqueIndex().on(table.email)],
);

export const userRelations = relations(usersTable, ({ many }) => ({
  sessions: many(sessionsTable),
}));

export const insertUsersSchema = createInsertSchema(usersTable, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(8),
}).pick({ email: true, password: true });

export const selectUsersSchema = createSelectSchema(usersTable, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(1),
}).pick({ email: true, password: true });
