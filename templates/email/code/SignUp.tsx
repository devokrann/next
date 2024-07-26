import * as React from "react";

import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components";

import contact from "@/data/contact";

export default function SignUp(otp: string) {
	const message = `Thanks for starting the new ${contact.name.app} account creation process. We want to make sure it's really you. Please enter the following verification code to verify your account. If you don't want to create an account or didn't request this email, you can ignore this message.`;

	return (
		<Html lang="en">
			<Head />

			<Preview>{message}</Preview>

			<Body>
				<Container style={content}>
					<Section style={header}>
						<Container style={container}>
							<Heading style={{ ...h1, textAlign: "center" }}>{contact.name.company}</Heading>
							{/* <Img
							src={"https://localhost:300/path/to/image"}
							width={32}
							height={32}
							alt={contact.name.company}
						/> */}
						</Container>
					</Section>

					<Section style={main}>
						<Container style={container}>
							<Section style={section}>
								<Heading style={h2}>Verify Your Email Address</Heading>
								<Text style={text}>{message}</Text>
							</Section>

							<Section style={{ ...section, margin: "40px 0px" }}>
								<Text style={{ ...text, textAlign: "center", fontWeight: "bold", fontSize: 32 }}>
									{otp}
								</Text>
								<Text style={{ ...text, textAlign: "center", marginTop: "8px" }}>
									(this code is valid for 1 hour)
								</Text>
							</Section>

							<Section style={section}>
								<Text style={text}>
									{contact.name.app} will never email you and ask you to disclose or verify your
									password, credit card, banking account number or any other sensitive personal
									information.
								</Text>
							</Section>
						</Container>
					</Section>

					<Section style={footer}>
						<Container style={container}>
							<Text style={{ ...text, textAlign: "center" }}>
								Copyright © {new Date().getFullYear()}, {contact.name.company}. All rights reserved.
							</Text>
							<Text style={{ ...text, textAlign: "center" }}>
								This message was produced and distributed by {contact.name.company}, or its affiliates.
							</Text>
							<Text style={{ ...text, textAlign: "center" }}>
								{contact.emails.find(e => e.type == "main")?.value}.
							</Text>
						</Container>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const content = {
	maxWidth: "640px",
	margin: "0 auto",
	overflow: "hidden",
};

const headerFooter = {
	backgroundColor: "#e4e6ed",
	padding: "20px 0",
};

const header = {
	...headerFooter,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const footer = {
	...headerFooter,
};

const main = {
	// backgroundColor: "gray",
};

const section = {
	margin: "20px 0",
};

const container = {
	minWidth: "100%",
	padding: "0 20px",
};

const h1 = {
	fontSize: "24px",
	fontWeight: "bolder",
};

const h2 = {
	fontSize: "20px",
	fontWeight: "bold",
};

const text = {
	margin: 0,
	fontSize: "12px",
};

const link = {
	margin: 0,
	fontWeight: "bold",
	color: "red",
};
