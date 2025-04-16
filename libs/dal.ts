import "server-only";

import { eq } from "drizzle-orm";
import { cookies, headers } from "next/headers";
import { decrypt } from "@/libs/sessions";
import { cache } from "react";
import { db, sessions } from "@/services/drizzle";

export const verifySession = cache(async () => {
  const header = (await headers()).get("X-User-Session");
  const cookie = (await cookies()).get("session")?.value;
  const sessionValue = header || cookie;
  const session = await decrypt(sessionValue);

  if (!session?.id) {
    if (header) {
      return { isAuth: false };
    }
    return { isAuth: false };
  }

  const user = await db
    .select({ userId: sessions.user_id })
    .from(sessions)
    .where(eq(sessions.id, session.id as string))
    .get();

  if (!user) {
    return { isAuth: false };
  }

  return { isAuth: true, userId: user?.userId };
});
