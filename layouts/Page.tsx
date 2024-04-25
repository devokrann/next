import React from "react";

import { Box, Stack } from "@mantine/core";

import typePage from "@/types/page";

export default function Page({
	children,
	padded,
	stacked,
	...restProps
}: typePage & React.ComponentProps<typeof Box & typeof Stack>) {
	return (
		<Box
			component={stacked ? Stack : "article"}
			w={"100%"}
			gap={stacked ? (typeof stacked == "boolean" ? 96 : stacked) : undefined}
			py={padded ? (typeof padded == "boolean" ? 96 : padded) : undefined}
			{...restProps}
		>
			{children}
		</Box>
	);
}
