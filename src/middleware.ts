// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/"];
// const publicRoutes = ["/auth/login"];

// const isProtectedRoute = (path: string) => protectedRoutes.includes(path);
// const isPublicRoute = (path: string) => publicRoutes.includes(path);

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   const isProtected = isProtectedRoute(path);
//   const isPublic = isPublicRoute(path);

//   const cookie = cookies().get("adminToken")?.value;

//   if (isProtected && !cookie) {
//     return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
//   }

//   if (isPublic && cookie) {
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
