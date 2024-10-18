import appData from "@/data/app";
import resend from "@/libraries/resend";

import TemplateEmailCodeSignUp from "@/app/email/code/signUp";

export const emailSendSignUp = async (params: {
	otp: string;
	email: string;
}) => {
	// switch to 'resend.general' when your domain is configured
	const { data, error } = await resend.onboarding.emails.send({
		/**
		 * add and verify a production domain in resend dashboard
		 * replace 'onboarding@resend.dev' below with the intended sender email
		 * 'NEXT_EMAIL_NOREPLY' as defined in the '.env' files
		 */
		from: `${appData.name.company} <${"onboarding@resend.dev"}>`,
		/**
		 * add and verify a production domain in resend dashboard
		 * replace 'devokrann@gmail.com' below with 'params.email'
		 */
		to: ["devokrann@gmail.com"],
		// cc:[]
		subject: `Verify Your Email Address`,
		react: TemplateEmailCodeSignUp(params.otp)
		// replyTo: formData.email,
	});
	if (!error) {
		return data;
	} else {
		console.error("---> wrapper error - (email send sign up):", error);
		throw error;
	}
};
