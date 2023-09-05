import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { sessions, users } from "./schema/schema";
import { db } from "./lib/db";

const protectedRoutes = ["/dashboard", "/profile"] as const;

export async function middleware(request: NextRequest) {
  let sessionToken = request.cookies.get(
    process.env.SESSION_TOKEN_NAME!
  )?.value;
  const pathname = request.nextUrl.pathname;

  if (
    !sessionToken &&
    protectedRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (!sessionToken) {
    return NextResponse.next();
  }

  const userSession = (
    await db
      .select()
      .from(sessions)
      .innerJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.sessionToken, sessionToken!))
      .limit(1)
  )[0];

  if (
    !userSession &&
    protectedRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (!userSession) {
    return NextResponse.next();
  }

  if (userSession && (pathname === "/" || pathname === "/sign-in")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next|api/auth).*)"],
};
