"use server";

import { verify } from "@node-rs/argon2";
import { z } from "zod";

import { selectUsersSchema } from "@/db/schema";

import { updateSessionCookie } from "@/lib/session-cookies";
import { createSession } from "@/lib/sessions";
import { getUserByEmail } from "@/lib/users";
import { createSessionToken, hashOptions } from "@/lib/utils";

export async function signIn(value: z.infer<typeof selectUsersSchema>) {
  try {
    const parsed = selectUsersSchema.safeParse(value);

    if (!parsed.success) {
      return;
    }

    const user = await getUserByEmail(parsed.data.email);

    if (!user) {
      return;
    }

    if (!(await verify(user.password, parsed.data.password, hashOptions))) {
      return;
    }

    const sessionToken = createSessionToken();

    if (!sessionToken) {
      return;
    }

    const session = await createSession(sessionToken, user.id);

    if (!session) {
      return;
    }

    await updateSessionCookie(sessionToken, session[0].expiresAt);
  } catch (error) {
    console.log(error);
  }
}
