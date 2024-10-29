import prisma from "@/libraries/prisma";
import { compareHashes } from "@/utilities/helpers/hasher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const credentials = await request.json();

		// check if user exists
		const userRecord = await prisma.user.findUnique({ where: { email: credentials.email as string } });

		if (!userRecord) {
			return NextResponse.json({ error: "Invalid username/password" }, { status: 404, statusText: "Not Found" });
		}

		// check if provided password is correct
		const passwordMatch = await compareHashes(credentials.password, userRecord.password!);

		if (!passwordMatch) {
			return NextResponse.json(
				{ error: "Invalid username/password" },
				{ status: 401, statusText: "Unauthorized" }
			);
		}

		return NextResponse.json({ user: userRecord }, { status: 200 });
	} catch (error) {
		console.error("---> route handler error (sign in):", error);
		return NextResponse.json({ error: "Something went wrong on our end." }, { status: 500 });
	}
}
