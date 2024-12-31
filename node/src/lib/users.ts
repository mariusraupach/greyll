import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { insertUsersSchema, usersTable } from "@/db/schema";

import { hashOptions } from "./utils";

export async function createUser(value: z.infer<typeof insertUsersSchema>) {
  try {
    const parsed = insertUsersSchema.safeParse(value);

    if (!parsed.success) {
      return;
    }

    const password = await hash(parsed.data.password, hashOptions);

    return await db
      .insert(usersTable)
      .values({
        email: parsed.data.email,
        password,
      })
      .returning();
  } catch (error) {
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    return await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
  } catch (error) {
    throw error;
  }
}
