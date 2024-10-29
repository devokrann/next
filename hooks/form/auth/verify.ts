import IconNotificationError from "@/components/common/icons/notification/error";
import IconNotificationSuccess from "@/components/common/icons/notification/success";
import { signIn as authSignIn } from "@/handlers/event/sign-in";
import { Verify as FormAuthVerify } from "@/types/form";
import { millToMinSec, MinSec } from "@/utilities/formatters/number";
import { useForm, UseFormReturnType } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { verify as handleVerify, verifyResend as handleVerifyResend } from "@/handlers/request/auth/verify";
import { useRouter } from "next/navigation";
import { timeout } from "@/data/constants";

export const useFormAuthVerify = (params: { userId: string }) => {
	const [submitted, setSubmitted] = useState(false);

	const [requested, setRequested] = useState(false);

	const router = useRouter();

	const form: UseFormReturnType<Omit<FormAuthVerify, "userId">> = useForm({
		initialValues: { otp: "" },

		validate: {
			otp: (value) => value.length != 6 && true
		}
	});

	const parseValues = () => {
		return { otp: form.values.otp, userId: params.userId };
	};

	const handleSubmit = async () => {
		try {
			if (form.isValid()) {
				setSubmitted(true);

				const response = await handleVerify(parseValues());

				if (!response) {
					throw new Error("No response from server");
				}

				const result = await response.json();

				if (!response.ok) {
					form.reset();

					if (response.status === 404) {
						// redirect to sign up page
						setTimeout(() => router.push("/auth/sign-up"), timeout.redirect);
					}

					if (response.statusText === "Verified") {
						// redirect to sign in page
						setTimeout(async () => await authSignIn(), timeout.redirect);
					}

					throw new Error(result.error || response.statusText);
				}

				notifications.show({
					id: "otp-verify-success",
					icon: IconNotificationSuccess(),
					title: response.statusText,
					message: result.message,
					variant: "success"
				});

				form.reset();

				// redirect to sign in page
				setTimeout(async () => await authSignIn(), timeout.redirect);
			}
		} catch (error) {
			notifications.show({
				id: "otp-verify-failed",
				icon: IconNotificationError(),
				title: `Verification Failed`,
				message: (error as Error).message,
				variant: "failed"
			});
		} finally {
			setSubmitted(false);
		}
	};

	const [time, setTime] = useState<MinSec | null>(null);

	const handleRequest = async () => {
		try {
			setRequested(true);

			const response = await handleVerifyResend({ userId: params.userId });

			if (!response) {
				throw new Error("No response from server");
			}

			const result = await response.json();

			if (!response.ok) {
				form.reset();

				if (response.status === 404) {
					// redirect to sign up page
					setTimeout(() => router.push("/auth/sign-up"), timeout.redirect);
				}

				if (response.statusText === "Verified") {
					// redirect to sign in page
					setTimeout(async () => await authSignIn(), timeout.redirect);
				}

				if (response.statusText === "Sent") {
					setTime(millToMinSec(result.otp.expiry)!);
				}

				throw new Error(result.error || response.statusText);
			}

			notifications.show({
				id: "otp-request-success",
				icon: IconNotificationSuccess(),
				title: response.statusText,
				message: result.message,
				variant: "success"
			});

			form.reset();
		} catch (error) {
			notifications.show({
				id: "otp-request-failed",
				icon: IconNotificationError(),
				title: "New OTP Request Failed",
				message: (error as Error).message,
				variant: "failed"
			});
		} finally {
			setRequested(false);
		}
	};

	return {
		form,
		handleSubmit,
		handleRequest,
		submitted,
		requested,
		time
	};
};
