"use server";

import { z } from "zod";

import { insertUsersSchema } from "@/db/schema";

import { updateSessionCookie } from "@/lib/session-cookies";
import { createSession } from "@/lib/sessions";
import { createUser } from "@/lib/users";
import { createSessionToken } from "@/lib/utils";

export async function signUp(value: z.infer<typeof insertUsersSchema>) {
  try {
    const parsed = insertUsersSchema.safeParse(value);

    if (!parsed.success) {
      return;
    }

    const user = await createUser(parsed.data);

    if (!user) {
      return;
    }

    const sessionToken = createSessionToken();

    if (!sessionToken) {
      return;
    }

    const session = await createSession(sessionToken, user[0].id);

    if (!session) {
      return;
    }

    await updateSessionCookie(sessionToken, session[0].expiresAt);
  } catch (error) {
    console.log(error);
  }
}
