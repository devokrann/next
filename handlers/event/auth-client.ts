"use client";

import { signIn as authSignIn } from "next-auth/react";
import { signOut as authSignOut } from "next-auth/react";
import { sessionDelete } from "../request/database/session";

export const signIn = async () => await authSignIn();

export const signInWithProvider = async (provider: string) => {
	// store device information in cookie

	await authSignIn(provider, { redirect: false, callbackUrl: "/" });
};

export const signOut = async (params?: { redirectUrl?: string }) => {
	const cookies = document.cookie.split("; ");
	const cookie = cookies.find((row) => row.startsWith("authjs.session-jti="));

	if (cookie) {
		await sessionDelete(cookie.split("=")[1]);
	}

	await authSignOut({ redirect: false });

	window.localStorage.clear();
	window.location.replace(params?.redirectUrl ?? "/");
};
