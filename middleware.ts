import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  console.log("request.nextUrl.pathname", request.nextUrl.pathname);

  // Protect these routes
  const protectedPaths = ["/todos", "/income", "/dashboard", "/expenses"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  console.log("isAuthPage", isAuthPage);

  if (!token && isProtectedPath) {
    console.log("inside '!token' if");
    console.log("token", token);
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  console.log("request.url", request.url);
  if (token && isAuthPage) {
    console.log("inside if 2 (redirecting to home)");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/todos/:path*",
    "/income/:path*",
    "/dashboard/:path*",
    "/expenses/:path*",
    "/login",
    "/signup",
  ],
};
