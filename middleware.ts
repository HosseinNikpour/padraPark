import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/checklists/:path*",
        "/devices/:path*",
        "/issues/:path*",
        "/reports/:path*",
        "/users/:path*",
    ],
};