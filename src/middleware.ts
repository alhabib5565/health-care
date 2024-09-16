import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authkey } from "./app/constant/authkey";

const AuthRoutes = ["/login", "/register"];

const commonPrivateRoutes = [
  "/dashboard",
  "/dashboard/change-password",
  "/doctors",
];

const roleBasedPrivateRoutes = {
  PATIENT: [/^\/dashboard\/patient/],
  DOCTOR: [/^\/dashboard\/doctor/],
  ADMIN: [/^\/dashboard\/admin/],
  SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(authkey)?.value;
  const { pathname } = request.nextUrl;

  let decodedData: {
    userId: string;
    role: string;
  } | null = null;

  if (!accessToken) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    accessToken &&
    (commonPrivateRoutes.includes(pathname) ||
      commonPrivateRoutes.some((route) => pathname.startsWith(route)))
  ) {
    return NextResponse.next();
  }

  if (accessToken) {
    decodedData = jwtDecode(accessToken);
  }

  const role = decodedData?.role as keyof typeof roleBasedPrivateRoutes;
  const routes = roleBasedPrivateRoutes[role];

  if (role && routes && routes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
