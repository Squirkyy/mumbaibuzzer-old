import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = "https://buzzer.squirky.me";
  if (request.cookies.get("jakob")?.value == "true") return;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/jakob",
};
