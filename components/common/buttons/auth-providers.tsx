"use client";

import React, { useState } from "react";

import NextImage from "next/image";

import { Button, Group, Image, Stack } from "@mantine/core";

import { signInWithProvider } from "@/handlers/event/auth-client";
import images from "@/data/images";
import { capitalizeWords } from "@/utilities/formatters/string";

export default function Providers() {
	const [loading, setLoading] = useState(false);

	const getButton = (image: string, provider: string) => (
		<Button
			key={provider}
			fullWidth
			variant="light"
			onClick={() => {
				setLoading(true);
				signInWithProvider(provider);
			}}
			loading={loading}
			leftSection={
				<Group>
					<Image
						src={image}
						alt={provider}
						h={{ base: 24 }}
						component={NextImage}
						width={1920}
						height={1080}
						priority
					/>
				</Group>
			}
		>
			Continue with {capitalizeWords(provider)}
		</Button>
	);

	return <Stack>{providers.map((button) => getButton(button.image, button.provider))}</Stack>;
}

const providers = [
	{
		image: images.icons.google,
		provider: "google",
	},
];
