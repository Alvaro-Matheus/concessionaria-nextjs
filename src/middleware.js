import { NextResponse } from "next/server";

export function middleware(req) {

  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");

  if (pathname === "/register") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const isLoginRoute = pathname === "/login";

  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoginRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};