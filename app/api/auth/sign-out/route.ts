import prisma from "@/libraries/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieName } from "@/data/constants";
import { getSession } from "@/utilities/helpers/session";

export async function POST(request: NextRequest) {
	try {
		const session = await getSession();

		if (!session) {
			return NextResponse.json({ error: "Sign in to continue" }, { status: 401, statusText: "Unauthorized" });
		}

		// remove sessions from db
		const sessionsDelete = await prisma.$transaction(async () => {
			const sessionDelete = await prisma.session.delete({ where: { id: session.id } });
			const sessionsDeleteExpired = await prisma.session.deleteMany({
				where: { userId: session.user.id, expiresAt: { lt: new Date(Date.now()) } },
			});

			return { sessionDelete, sessionsDeleteExpired };
		});

		// remove session from cookies
		cookies().delete(cookieName.session);

		return NextResponse.json(
			{ message: "User signed out", sessions: sessionsDelete },
			{ status: 200, statusText: "Signed Out" }
		);
	} catch (error) {
		console.error("---> route handler error (sign up):", error);
		return NextResponse.json({ error: "Something went wrong on our end" }, { status: 500 });
	}
}
