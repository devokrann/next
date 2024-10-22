"use client";

import React from "react";

import { Box, Button, Center, Grid, GridCol, TextInput, Textarea } from "@mantine/core";
import { useFormContact } from "@/hooks/form/contact";

export default function Contact() {
	const { form, submitted, handleSubmit } = useFormContact();

	return (
		<Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
			<Grid pb={"md"}>
				<GridCol span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
					<TextInput
						required
						label={"Frist Name"}
						placeholder="Your First Name"
						{...form.getInputProps("fname")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
					<TextInput
						required
						label={"Last Name"}
						placeholder="Your Last Name"
						{...form.getInputProps("lname")}
					/>
				</GridCol>
				<GridCol span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
					<TextInput required label={"Email"} placeholder="Your Email" {...form.getInputProps("email")} />
				</GridCol>
				<GridCol span={{ base: 12, xs: 6, sm: 12, md: 6 }}>
					<TextInput label={"Phone"} placeholder="Your Phone" {...form.getInputProps("phone")} />
				</GridCol>
				<GridCol span={12}>
					<TextInput
						required
						label="Inquiry"
						placeholder="What are you inquiring about?"
						{...form.getInputProps("subject")}
					/>
				</GridCol>
				<GridCol span={12}>
					<Textarea
						required
						label={"Message"}
						placeholder="Write your message here..."
						autosize
						minRows={3}
						maxRows={10}
						{...form.getInputProps("message")}
					/>
				</GridCol>
				<GridCol span={12}>
					<Grid mt={"md"}>
						<GridCol span={{ base: 6 }}>
							{/* <Center>
								<Button
									variant="light"
									fullWidth
									type="reset"
									onClick={() => form.reset()}
									disabled={submitted}
								>
									Clear
								</Button>
							</Center> */}
						</GridCol>
						<GridCol span={{ base: 6 }}>
							<Center>
								<Button fullWidth type="submit" loading={submitted}>
									{submitted ? "Sending" : "Send"}
								</Button>
							</Center>
						</GridCol>
					</Grid>
				</GridCol>
			</Grid>
		</Box>
	);
}
