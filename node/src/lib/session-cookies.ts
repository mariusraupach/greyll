import { cookies } from "next/headers";

export const updateSessionCookie = async (token: string, expiresAt: Date) => {
  try {
    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      expires: expiresAt,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    throw error;
  }
};

export const deleteSessionCookie = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.set("session", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (error) {
    throw error;
  }
};
