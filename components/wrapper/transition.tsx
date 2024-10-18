"use client";

import React, { useState } from "react";

import {
	Transition as TransitionComponent,
	TransitionProps
} from "@mantine/core";

export default function Transition({
	mounted = false,
	children,
	...restProps // Gather remaining props
}: {
	mounted: boolean;
	children: React.ReactNode;
} & Omit<TransitionProps, "mounted" | "children">) {
	return (
		<TransitionComponent
			mounted={mounted}
			duration={250}
			timingFunction="ease"
			{...restProps} // Spread the restProps here
		>
			{(styles) => <div style={styles}>{children}</div>}
		</TransitionComponent>
	);
}
