import dotenv from "dotenv";

import controller from "@/controllers";

// env file
dotenv.config({ path: "/.env.local" });

export async function POST(req: Request, res: Response) {
	try {
		const data = await req.json();

		await controller.email.send({
			from: process.env.SENDER_USERNAME as string,
			to: data.email as string,
			subject: data.subject as string,
			text: data.message,
		});

		await controller.database.message.create(data);

		return Response.json(data);
	} catch (error: any) {
		console.error("x-> Error sending contact message:", error.message);
	}
}
