import { initialize } from "@/utilities/formatters/string";
import { Avatar, Flex, Stack, Text, Title } from "@mantine/core";
import { useSession } from "next-auth/react";
import React from "react";

export default function Aside() {
	const { data: session } = useSession();
	const userName = session?.user?.name;

	const userDesc = userName ? userName : "User";

	const avatarWidth = { base: 56, md: 120, lg: 56 };
	const avatarHeight = { base: 56, md: 120, lg: 56 };

	return (
		<Flex
			direction={{ base: "column", lg: "row" }}
			align={"center"}
			gap={"md"}
			w={"100%"}
		>
			{!session ? (
				<Avatar
					alt={userDesc}
					title={userDesc}
					w={avatarWidth}
					h={avatarHeight}
				/>
			) : !session?.user?.image ? (
				<Avatar
					alt={userDesc}
					title={userDesc}
					w={avatarWidth}
					h={avatarHeight}
				>
					{userName
						? initialize(userName)
						: session?.user.email?.charAt(0).toUpperCase()}
				</Avatar>
			) : (
				<Avatar
					src={session.user.image}
					alt={userDesc}
					title={userDesc}
					w={avatarWidth}
					h={avatarHeight}
				/>
			)}

			<Stack gap={0}>
				<Title order={3} fz={"md"} ta={{ base: "center", lg: "start" }}>
					{userName}
				</Title>

				<Text
					fz={"xs"}
					c={"dimmed"}
					ta={{ base: "center", lg: "start" }}
				>
					{session?.user.email}
				</Text>
			</Stack>
		</Flex>
	);
}
