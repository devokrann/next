import { contactCreate } from "@/libraries/wrappers/email/contact";
import { generateOtpCode } from "@/utilities/generators/otp";
import prisma from "@/libraries/prisma";
import { compareHashes, hashValue } from "@/utilities/helpers/hasher";
import { emailSendSignUp } from "@/libraries/wrappers/email/send/auth/sign-up";
import { generateId } from "@/utilities/generators/id";
import { Type, Provider } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Credentials } from "@/types/auth";

export async function POST(request: NextRequest) {
	try {
		const { provider, credentials }: { provider?: Provider; credentials?: Credentials } = await request.json();

		if (provider !== Provider.CREDENTIALS) {
			// handle oauth
			return NextResponse.json({ message: "Handle oauth" }, { status: 200, statusText: "Oauth" });
		}

		if (!credentials) {
			return NextResponse.json(
				{ error: "Credentials must be provided" },
				{ status: 406, statusText: "Missing Credentials" }
			);
		}

		const userRecord = await prisma.user.findUnique({ where: { email: credentials.email } });

		if (!userRecord) {
			return NextResponse.json({ error: "User does not exist" }, { status: 404, statusText: "User Not Found" });
		}

		const passwordMatches = await compareHashes(credentials.password, userRecord.password);

		// create the session
		const expires = new Date(Date.now() + 10 * 1000);

		if (!passwordMatches) {
			return NextResponse.json(
				{ error: "User is not authorized" },
				{ status: 401, statusText: "Not Authorized" }
			);
		}

		return NextResponse.json(
			{
				message: "User authenticated successfully",
				user: userRecord,
			},
			{ status: 200, statusText: "User Authenticated" }
		);
	} catch (error) {
		console.error("---> route handler error (sign up):", error);
		return NextResponse.json({ error: "Something went wrong on our end" }, { status: 500 });
	}
}
