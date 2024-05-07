import React from "react";

import { Metadata } from "next";
import NextImage from "next/image";

import { Stack, Text, Title, Image } from "@mantine/core";

import Layout from "@/layouts";
import Partial from "@/partials";
import asset from "@/assets";

export const metadata: Metadata = {
	title: "Forgot Password",
};

export default async function Forgot() {
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
								Forgot Password
							</Title>
							<Text ta={"center"} className="textResponsive">
								Enter your email to receive a password reset link.
							</Text>
						</Stack>
					</Stack>
					<Partial.Form.Authentication.Password.Forgot />
				</Stack>
			</Layout.Section>
		</Layout.Page>
	);
}
