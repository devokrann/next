import { render } from "@react-email/render";
import React from "react";
import sample from "@/data/sample";

import EmailContact from "@/components/email/contact";
import PasswordChanged from "@/components/email/auth/password-changed";
import PasswordForgot from "@/components/email/auth/password-forgot";
import SignIn from "@/components/email/auth/sign-in";
import SignUp from "@/components/email/auth/sign-up";

import { baseUrl } from "@/data/constants";
import { generateOtpCode } from "@/utilities/generators/otp";

const emails: Record<string, React.ReactElement> = {
	contact: EmailContact({ name: "Jane Doe", message: sample.text.prose }),
	signIn: SignIn({ otp: String(generateOtpCode()) }),
	signUp: SignUp({ otp: String(generateOtpCode()) }),
	passwordForgot: PasswordForgot({ otl: baseUrl }),
	passwordChanged: PasswordChanged(),
};

export default async function EmailPreview({ params }: { params: { template: string } }) {
	const email = emails[params.template];

	if (!email) {
		return <p>Email template not found</p>;
	}

	const emailHtml = await render(email);

	return <div dangerouslySetInnerHTML={{ __html: emailHtml }} />;
}
