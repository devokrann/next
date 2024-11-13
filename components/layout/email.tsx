import * as React from "react";

import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components";
import appData from "@/data/app";

export default function Email({ props, children }: { props: { preview: string }; children: React.ReactNode }) {
	return (
		<>
			<Html lang="en">
				<Head />
				<Preview>{props.preview}</Preview>

				<Body>
					<Container style={content}>
						<Container style={container}>
							<Section style={header}>
								<Heading style={{ ...h1, textAlign: "center" }}>{appData.name.company}</Heading>

								{/* <Img
									src={`${baseUrl}${images.logo.dark}`}
									width={32}
									height={32}
									alt={appData.name.company}
								/> */}
							</Section>
						</Container>

						<Container style={container}>
							<Section style={{ ...section, padding: "0px 20px" }}>
								{children}

								<Section style={section}>
									<Text style={text}>
										{appData.name.app} will never email you and ask you to disclose or verify your
										password, credit card, banking account number or any other sensitive personal
										information.
									</Text>
								</Section>
							</Section>
						</Container>

						<Container style={container}>
							<Section style={footer}>
								<Text style={{ ...text, textAlign: "center" }}>
									Copyright © {new Date().getFullYear()}, {appData.name.company}. All rights reserved.
								</Text>
								<Text style={{ ...text, textAlign: "center" }}>
									This message was produced and distributed by {appData.name.company}, or its
									affiliates.
								</Text>
								<Text style={{ ...text, textAlign: "center" }}>{appData.locations.main.location}</Text>
							</Section>
						</Container>
					</Container>
				</Body>
			</Html>
		</>
	);
}

export const footer = {
	backgroundColor: "black",
	color: "white",
	padding: "20px 0",
};

export const header = {
	...footer,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

export const container = {
	minWidth: "100%",
	padding: "0 20px",
};

export const section = {
	margin: "20px 0",
};

export const content = {
	maxWidth: "640px",
	margin: "0 auto",
	overflow: "hidden",
};

export const h1 = {
	fontSize: "24px",
	fontWeight: "bolder",
};

export const h2 = {
	fontSize: "20px",
	fontWeight: "bolder",
};

export const text = {
	margin: 0,
	fontSize: "12px",
};

export const link = {
	margin: 0,
	fontWeight: "bold",
	color: "red",
};
