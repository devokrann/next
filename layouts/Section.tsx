import React from "react";

import { Box, Container } from "@mantine/core";

import typeSection from "@/types/section";

import classes from "./Section.module.scss";

export default function Section({
	containerized,
	padded,
	margined,
	children,
	className,
	bordered,
	shadowed,
	...restProps
}: typeSection & React.ComponentProps<typeof Box>) {
	return (
		<Box
			component={"section"}
			py={padded ? (typeof padded == "boolean" ? 96 : padded) : undefined}
			my={margined ? (typeof margined == "boolean" ? 96 : margined) : undefined}
			className={`${className} ${bordered && classes.border} ${shadowed && classes.shadow}`}
			{...restProps}
		>
			{containerized ? (
				<Container size={typeof containerized == "boolean" ? undefined : containerized}>{children}</Container>
			) : (
				children
			)}
		</Box>
	);
}
