import { cache } from "react";

import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

import { db } from "@/db";
import { sessionsTable } from "@/db/schema";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const createSession = async (token: string, userId: number) => {
  try {
    const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);

    return await db
      .insert(sessionsTable)
      .values({
        id,
        expiresAt,
        userId,
      })
      .returning();
  } catch (error) {
    throw error;
  }
};

export const getCurrentSession = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return;
    }

    const id = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session = await getSessionWithUser(id);

    if (!session) {
      return;
    }

    if (Date.now() >= session.expiresAt.getTime()) {
      await deleteSession(session.id);

      return;
    }

    if (Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15) {
      updateSessionExpiresAt(session.id);
    }

    return session;
  } catch (error) {
    throw error;
  }
});

export const getSessionWithUser = async (id: string) => {
  try {
    return await db.query.sessionsTable.findFirst({
      where: eq(sessionsTable.id, id),
      with: {
        user: {
          columns: {
            id: true,
            email: true,
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const updateSessionExpiresAt = async (id: string) => {
  try {
    const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);

    return await db
      .update(sessionsTable)
      .set({
        expiresAt,
      })
      .where(eq(sessionsTable.id, id))
      .returning();
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const deleteSession = async (id: string) => {
  try {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, id)).returning();
  } catch (error) {
    console.log(error);

    throw error;
  }
};
