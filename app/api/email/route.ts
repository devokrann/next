import { NextRequest, NextResponse } from "next/server";
import { emailCreateInquiry } from "@/libraries/wrappers/email/send/inquiry";
import { EmailInquiry } from "@/types/email";

export async function POST(request: NextRequest) {
	try {
		const email: EmailInquiry = await request.json();

		return NextResponse.json(
			{ email: await emailCreateInquiry(email), message: "Email sent successfully" },
			{ status: 200, statusText: "Email Sent" }
		);
	} catch (error) {
		console.error("---> route handler error (send email):", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
