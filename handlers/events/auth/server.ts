"use server";

import { cookieName } from "@/data/constants";
import { cookies } from "next/headers";

export const signOut = async () => cookies().delete(cookieName.sessionToken);
