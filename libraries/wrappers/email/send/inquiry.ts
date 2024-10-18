import resend from "@/libraries/resend";
import { Contact } from "@/types/form";
import TemplateEmailContact from "@/app/email/contact";

export const emailSendInquiry = async (params: Contact) => {
	// switch to 'resend.general' when your domain is configured
	const { data, error } = await resend.onboarding.emails.send({
		/**
		 * add and verify a production domain in resend dashboard
		 * replace 'onboarding@resend.dev' below with the intended sender email
		 * 'NEXT_EMAIL_INFO' as defined in the '.env' files
		 */
		from: `${params.fname} ${params.lname} <${"onboarding@resend.dev"}>`,
		to: [process.env.NEXT_EMAIL_INFO as string],
		// cc:[]
		subject: params.subject,
		react: TemplateEmailContact(params),
		replyTo: params.email
	});

	if (!error) {
		return data;
	} else {
		console.error("---> wrapper error - (email send inquiry):", error);
		throw error;
	}
};
