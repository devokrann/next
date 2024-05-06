import React from "react";

import { Box, Container, Divider, Flex } from "@mantine/core";

import { typeWidth, typeBody } from "@/types/body";

export default function Body({ children, header, nav, hero, aside, footer }: typeBody) {
	const handleAside = (side: React.ReactNode, width?: typeWidth) => (
		<Box
			component="aside"
			visibleFrom="md"
			w={width ? { md: `${width.md}%`, lg: `${width.lg}%` } : `${25}%`}
			style={{
				position: "sticky",
				top: 48,
				maxHeight: "100%",
			}}
		>
			{side}
		</Box>
	);

	const widthMain = {
		md:
			100 -
			((aside?.left?.width?.md ? aside?.left?.width.md : 0) +
				(aside?.right?.width?.md ? aside?.right?.width.md : 0)),
		lg:
			100 -
			((aside?.left?.width?.lg ? aside?.left?.width.lg : 0) +
				(aside?.right?.width?.lg ? aside?.right?.width.lg : 0)),
	};

	return (
		<>
			{header && header}
			{nav && nav}
			{hero && hero}
			{aside ? (
				<Container size={"responsive"} component={"article"}>
					<Flex
						gap={
							aside.left?.withBorder || aside.right?.withBorder
								? aside.gap
									? aside.gap
									: "xl"
								: undefined
						}
					>
						{aside.left && handleAside(aside.left.component, aside.left.width)}
						{aside.left?.withBorder && <Divider orientation="vertical" visibleFrom="md" />}
						<Box w={{ base: "100%", md: `${widthMain.md}%`, lg: `${widthMain.lg}%` }}>{children}</Box>
						{aside.right?.withBorder && <Divider orientation="vertical" visibleFrom="md" />}
						{aside.right && handleAside(aside.right.component, aside.right.width)}
					</Flex>
				</Container>
			) : (
				children
			)}
			{footer && footer}
		</>
	);
}
