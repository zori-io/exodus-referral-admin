import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/"];
const publicRoutes = ["/auth/login"];

const isProtectedRoute = (path: string) => protectedRoutes.includes(path);
const isPublicRoute = (path: string) => publicRoutes.includes(path);

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(`Requested path: ${path}`);

  const isProtected = isProtectedRoute(path);
  const isPublic = isPublicRoute(path);

  const cookie = cookies().get("adminToken")?.value;
  console.log(`Cookie value: ${cookie}`);

  if (isProtected && !cookie) {
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isPublic && cookie) {
    console.log("Redirecting to home page");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
