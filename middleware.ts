import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "./data/constants";
import { updateSession } from "./utilities/helpers/session";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const sessionToken = request.cookies.get(cookieName.sessionToken)?.value;

	if (sessionToken) {
		await updateSession(sessionToken);
	}

	// return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
	matcher: [
		"/about/:path*",
		"/dashboard/:path*",

		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
