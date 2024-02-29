import React from "react";

import { Center, Container, Image, Stack } from "@mantine/core";

import Layout from "@/layouts";
import Partial from "@/partials";

export default function Forgot() {
	return (
		<Layout.Body>
			<Container size={"xs"}>
				<Center mih={"100vh"}>
					<Stack gap={"xl"} align="center" w={"100%"}>
						{/* <Image src={image.brand.full} w={160} /> */}
						<Partial.Form.Authentication.Forgot />
					</Stack>
				</Center>
			</Container>
		</Layout.Body>
	);
}
