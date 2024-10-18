import appData from "@/data/app";
import resend from "@/libraries/resend";

import TemplateEmailCodeForgot from "@/app/email/code/forgot";
import TemplateEmailNofificationChanged from "@/app/email/notification/changed";

export const emailSendPasswordForgot = async (params: {
	otl: string;
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
		subject: `Reset Your Password`,
		react: TemplateEmailCodeForgot(params.otl)
		// replyTo: formData.email,
	});
	if (!error) {
		return data;
	} else {
		console.error(
			"---> wrapper error - (email send password forgot):",
			error
		);

		throw error;
	}
};

export const emailSendPasswordChanged = async (params: { email: string }) => {
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
		subject: `Password Changed`,
		react: TemplateEmailNofificationChanged()
		// replyTo: formData.email,
	});
	if (!error) {
		return data;
	} else {
		console.error(
			"---> wrapper error - (email send password changed):",
			error
		);

		throw error;
	}
};
