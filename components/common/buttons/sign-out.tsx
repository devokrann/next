"use client";

import React from "react";

import { Button, ButtonProps } from "@mantine/core";

export default function SignOut({ children, ...restProps }: { children: React.ReactNode } & ButtonProps) {
	return (
		<Button
			{...restProps}
			// onClick={async () => await signOut()}
		>
			{children}
		</Button>
	);
}
