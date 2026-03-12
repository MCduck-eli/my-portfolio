// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const isIndexPage = request.nextUrl.pathname === "/";
    const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
    if (isAdminPage && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ["/admin/:path*"],
};
