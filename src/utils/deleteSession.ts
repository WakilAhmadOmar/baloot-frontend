"use server";
import { cookies } from "next/headers";

export async function deleteSession(sessionName: string) {
  const expiresAt = new Date(0);
  const cookiesStore = await cookies();

  cookiesStore.set(sessionName, "", {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}