import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const path = req.nextUrl.pathname;

  if (
    path.startsWith("/admin-login") ||
    path.startsWith("/api/admin/login") ||
    path.startsWith("/login") ||
    path.startsWith("/join") ||
    path.startsWith("/api/auth") ||
    path.startsWith("/api/join")
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/api/sessions/:path*",
  ],
};