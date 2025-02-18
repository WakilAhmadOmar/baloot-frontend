"use server";

import { cookies } from "next/headers";

export async function getAuthUser(sessionName: string) {
  const cookiesStore = await cookies();
  return cookiesStore.get(sessionName)?.value;
}