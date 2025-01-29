import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // const token = await getToken({ req: request });

  // const isAuthPage =
  //   request.nextUrl.pathname.startsWith("/login") ||
  //   request.nextUrl.pathname.startsWith("/signup");

  // // Protect these routes
  // const protectedPaths = ["/todos", "/income", "/dashboard", "/expenses"];
  // const isProtectedPath = protectedPaths.some((path) =>
  //   request.nextUrl.pathname.startsWith(path)
  // );

  // if (!token && isProtectedPath) {
  //   console.log("inside '!token' if");
  //   console.log("token", token);
  //   const url = new URL("/login", request.url);
  //   url.searchParams.set("callbackUrl", request.nextUrl.pathname);
  //   return NextResponse.redirect(url);
  // }

  // if (token && isAuthPage) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}
