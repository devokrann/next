import { signIn as authSignIn } from "@/auth";
import { signOut as authSignOut } from "@/auth";
import { cookies } from "next/headers";
import { sessionDelete } from "../request/database/session";

export const signIn = async () => await authSignIn();

export const signInWithProvider = async (provider: string) =>
	await authSignIn(provider, { redirect: false, callbackUrl: "/" });

export const signOut = async (params?: { redirectUrl?: string }) => {
	// Retrieve the stored `jti` from the cookie for subsequent requests
	const storedJti = cookies().get("authjs.session-jti");

	if (storedJti) {
		await sessionDelete(storedJti.value);
	}

	await authSignOut({ redirect: false });

	window.localStorage.clear();
	window.location.replace(params?.redirectUrl ?? "/");
};
