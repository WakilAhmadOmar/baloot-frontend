"use server";
import { cookies } from "next/headers";

export async function createSession( nameCookies: string , token: string,) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookiesStore = await cookies();

  cookiesStore.set(nameCookies, token, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}