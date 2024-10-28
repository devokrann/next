import { SignIn as FormAuthSignin } from "@/types/form";
import { getCallbackUrlParameter } from "@/utilities/helpers/url";
import email from "@/utilities/validators/special/email";
import { useForm, UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { signIn } from "next-auth/react";
import { useState } from "react";
import IconNotificationError from "@/components/common/icons/notification/error";

export const useFormAuthSignIn = () => {
	const [submitted, setSubmitted] = useState(false);

	const form: UseFormReturnType<FormAuthSignin> = useForm({
		initialValues: {
			email: "",
			password: "",
			remember: false
		},

		validate: {
			email: (value) => email(value.trim()),
			password: (value) => (value.trim().length > 0 ? null : "Please fill out this field")
		}
	});

	const parseValues = () => {
		return {
			email: form.values.email.trim().toLowerCase(),
			password: form.values.password.trim(),
			rememberMe: form.values.remember
		};
	};

	const handleSubmit = async () => {
		if (form.isValid()) {
			try {
				setSubmitted(true);

				const result = await signIn("credentials", {
					...parseValues(),
					redirect: false,
					callbackUrl: getCallbackUrlParameter()
				});

				if (!result) {
					throw new Error("There was a problem with the request");
				}

				if (!result.error) {
					// apply callbackurl
					result.url && window.location.replace(result.url);
				} else {
					form.reset();

					if (result.error == "AccessDenied") {
						throw new Error("Invalid username/password");
					}

					throw new Error(result.error);
				}
			} catch (error) {
				notifications.show({
					id: "sign-in-failed",
					icon: IconNotificationError(),
					title: "Authentication Error",
					message: (error as Error).message,
					variant: "failed"
				});
			} finally {
				setSubmitted(false);
			}
		}
	};

	return { form, submitted, handleSubmit };
};
