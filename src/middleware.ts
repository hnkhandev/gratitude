import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { sessions, users } from "./schema/schema";
import { db } from "./lib/db";

export async function middleware(request: NextRequest) {
  let sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const pathname = request.nextUrl.pathname;
  const isOAuthCallback = pathname.startsWith("/api/auth/callback/");

  if (isOAuthCallback) {
    return NextResponse.next();
  }

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const userSession = (
    await db
      .select()
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.sessionToken, sessionToken!))
      .limit(1)
  )[0];

  if (!userSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/", "/profile"] };
