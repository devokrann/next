import { signOut as authSignOut } from "next-auth/react";

export const signOut = async () =>
	await authSignOut({ redirect: false })
		.then(() => window.localStorage.clear())
		.then(() => window.location.replace("/"));
