import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = "http://localhost:3000";
  if (request.cookies.get("jakob")?.value) return;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/jakob",
};
