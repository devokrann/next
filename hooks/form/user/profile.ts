import email from "@/utilities/validators/special/email";
import phone from "@/utilities/validators/special/phone";
import text from "@/utilities/validators/special/text";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Profile as FormProfile } from "@/types/form";
import { capitalizeWords, segmentFullName } from "@/utilities/formatters/string";
import { updateProfile } from "@/handlers/request/user/profile";
import { NotificationVariant } from "@/types/enums";
import { signIn as authSignIn } from "next-auth/react";
import { showNotification } from "@/utilities/notifications";
import { signOut as handleSignOut } from "@/handlers/event/sign-out";
import { timeout } from "@/data/constants";

export const useFormUserProfile = () => {
	const { data: session, update } = useSession();

	const [submitted, setSubmitted] = useState(false);

	const form: UseFormReturnType<FormProfile> = useForm({
		initialValues: {
			name: session?.user?.name
				? {
						first: segmentFullName(session?.user?.name).first,
						last: segmentFullName(session?.user?.name).last,
				  }
				: { first: "", last: "" },
			email: session?.user?.email ? session?.user?.email : "",
			phone: "",
		},

		validate: {
			name: {
				first: (value) =>
					value && value?.trim().length > 0 ? text(value, 2, 255) : "Please fill out this field.",
				last: (value) =>
					value && value?.trim().length > 0 ? text(value, 2, 255) : "Please fill out this field.",
			},
			email: (value) => value && email(value),
			phone: (value) => value.trim().length > 0 && phone(value),
		},
	});

	const parseValues = () => {
		return {
			name: {
				first: capitalizeWords(form.values.name.first),
				last: capitalizeWords(form.values.name.last),
			},
			email: form.values.email.trim().toLowerCase(),
			phone: form.values.phone?.trim() ? (form.values.phone.trim().length > 0 ? form.values.phone : "") : "",
		};
	};

	const handleSubmit = async () => {
		if (form.isValid()) {
			try {
				if (!form.isDirty()) {
					showNotification({
						variant: NotificationVariant.WARNING,
						title: "Nothing Updated",
						desc: "Update at least one form field",
					});
					return;
				}

				setSubmitted(true);

				const response = await updateProfile(parseValues());

				if (!response) throw new Error("No response from server");

				const result = await response.json();

				form.reset();

				if (response.ok) {
					// Update the session data on the client-side
					await update({
						...session,
						user: { ...session?.user, name: `${parseValues().name.first} ${parseValues().name.last}` },
					});

					// refresh the page
					window.location.reload();
					return;
				}

				if (response.status === 401) {
					// redirect to sign in
					setTimeout(async () => await authSignIn(), timeout.redirect);

					showNotification({ variant: NotificationVariant.WARNING }, response, result);
					return;
				}

				if (response.status === 404) {
					// sign out and redirect to home page
					setTimeout(async () => await handleSignOut({ redirectUrl: "/" }), timeout.redirect);

					showNotification({ variant: NotificationVariant.FAILED }, response, result);
					return;
				}

				showNotification({ variant: NotificationVariant.FAILED }, response, result);
				return;
			} catch (error) {
				showNotification({ variant: NotificationVariant.FAILED, desc: (error as Error).message });
				return;
			} finally {
				setSubmitted(false);
			}
		}
	};

	return {
		form,
		submitted,
		handleSubmit,
		session,
	};
};
