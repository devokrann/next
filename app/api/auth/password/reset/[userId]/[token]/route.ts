import prisma from "@/services/prisma";
import hasher from "@/utilities/hasher";
import jwt from "jsonwebtoken";

import { typePasswordReset } from "@/types/apis";
import notification from "@/handlers/resend/email/auth/notification";

export async function POST(req: Request, { params }: { params: typePasswordReset }) {
	try {
		// query database for user
		const userRecord = await prisma.user.findUnique({ where: { id: params.userId } });

		if (!userRecord) {
			return Response.json({ user: { exists: false } });
		} else {
			try {
				const samplePassword = "@72@^0nH*Nl%&^@y!Kh%mU#wFb&B@cBStl%O9a3QHc#134J65D@rplg35t1J^L@w";
				const secret = process.env.NEXT_JWT_KEY + (userRecord.password ? userRecord.password : samplePassword);

				await jwt.verify(params.token, secret);

				try {
					const { password } = await req.json();

					const matches = await hasher.compare(password, userRecord.password);

					if (!matches) {
						const passwordHash = await hasher.create(password);

						// update password field
						await prisma.user.update({ where: { id: params.userId }, data: { password: passwordHash } });

						// delete used otl record
						await prisma.otl.delete({ where: { email: userRecord.email } });

						return Response.json({
							user: { exists: true, password: { matches: false } },
							token: { valid: true },
							// send otp email and output result in response body
							resend: await notify({ email: userRecord.email }),
						});
					} else {
						return Response.json({
							user: { exists: true, password: { matches: true } },
							token: { valid: true },
						});
					}
				} catch (error) {
					console.error(`x-> Error updating password record:`, (error as Error).message);
					return Response.error();
				}
			} catch (error) {
				console.error(`x-> Could not verify token:`, (error as Error).message);
				return Response.json({ user: { exists: true }, token: { valid: false } });
			}
		}
	} catch (error) {
		console.error("x-> Error resetting password:", (error as Error).message);
		return Response.error();
	}
}

const notify = async (fields: { email: string }) => {
	// send confirmation email
	const emailResponse = await notification.passwordChanged({ email: fields.email });

	return { email: emailResponse };
};
