import React from "react";

import { Metadata } from "next";
import NextImage from "next/image";

import { Stack, Text, Title, Image } from "@mantine/core";

import asset from "@/assets";
import Layout from "@/layouts";
import Partial from "@/partials";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	title: "Verify Email",
};

export default async function Verify({ params }: { params: { userId: string } }) {
	const session = await auth();

	session?.user && redirect("/");

	return (
		<Layout.Page padded>
			<Layout.Section containerized="xs">
				<Stack gap={"xl"}>
					<Stack align="center">
						<Image
							src={asset.icon.tool.nextjs}
							alt="next logo"
							w={{ base: 56, xs: 72, md: 96 }}
							component={NextImage}
							priority
						/>
						<Stack gap={"xs"}>
							<Title order={1} ta={"center"} fz={{ base: "lg", xs: 24, md: 32 }}>
								Verify Email
							</Title>
							<Text className="textResponsive" ta={"center"}>
								A verification code has been sent to the provided email.
							</Text>
						</Stack>
					</Stack>

					<Partial.Form.Authentication.Verify userId={params.userId} />
				</Stack>
			</Layout.Section>
		</Layout.Page>
	);
}
