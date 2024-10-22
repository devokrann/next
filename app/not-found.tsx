import React from "react";

import Link from "next/link";
import NextImage from "next/image";

import {
	Anchor,
	Center,
	Grid,
	GridCol,
	Group,
	Stack,
	Text,
	Title,
	Image,
	Button,
	Flex
} from "@mantine/core";

import { IconArrowLeft } from "@tabler/icons-react";

import LayoutSection from "@/components/layout/section";

import images from "@/data/images";
import appData from "@/data/app";

export default function NotFound() {
	return (
		<LayoutSection id={"page-not-found"}>
			<Center mih={"100vh"} py={96}>
				<Grid
					w={"100%"}
					gutter={{ base: "xl", sm: "md" }}
					align="center"
				>
					<GridCol
						span={{ base: 12, sm: 5 }}
						order={{ base: 2, sm: 1 }}
					>
						<Flex
							align={{ base: "center", sm: "start" }}
							direction={"column"}
							gap={{ base: "md", sm: 64 }}
						>
							<Anchor
								component={Link}
								href={"/"}
								visibleFrom="sm"
							>
								<Group>
									<Image
										src={images.brand.logo.light}
										alt={appData.name.app}
										h={{ base: 48 }}
										component={NextImage}
										width={1920}
										height={1080}
										priority
									/>
								</Group>
							</Anchor>

							<Stack gap={"xs"}>
								<Title
									order={1}
									fw={"bold"}
									fz={{ base: 24, sm: 32 }}
									ta={{ base: "center", sm: "start" }}
								>
									Not Found
								</Title>
								<Text
									fz={{ base: "sm", sm: "md" }}
									ta={{ base: "center", sm: "start" }}
								>
									The page you&apos;re looking for has either
									been removed or moved to another section of
									the site.
								</Text>
							</Stack>

							<Group>
								<Button
									leftSection={<IconArrowLeft size={16} />}
									component={Link}
									href={"/"}
								>
									Back Home
								</Button>
								<Button
									variant="light"
									component={Link}
									href={"/"}
								>
									Help Center
								</Button>
							</Group>
						</Flex>
					</GridCol>
					<GridCol
						span={{ base: 12, sm: 7 }}
						order={{ base: 1, sm: 2 }}
					>
						<Center>
							<Group>
								<Image
									src={images.error.err404}
									alt={"Not Found"}
									h={{ base: 120, xs: 160, md: 240, lg: 280 }}
									component={NextImage}
									width={1920}
									height={1080}
									priority
								/>
							</Group>
						</Center>
					</GridCol>
				</Grid>
			</Center>
		</LayoutSection>
	);
}
