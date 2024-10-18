import { signIn as authSignIn } from "next-auth/react";

export const signIn = async () => await authSignIn();
