"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Anchor, Box, Button, Center, Grid, Stack } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

// icons
import { IconCheck, IconX } from "@tabler/icons-react";

import utility from "@/utilities";

import notificationSuccess from "@/styles/notifications/success.module.scss";
import notificationFailure from "@/styles/notifications/failure.module.scss";

import { typeSignIn } from "@/types/form";
import Component from "@/components";
import controller from "@/controllers";

export default function SignIn() {
	const [sending, setSending] = useState(false);
	const router = useRouter();

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},

		validate: {
			email: value => utility.validator.form.special.email(value),
			password: isNotEmpty("Please fill out this field"),
		},
	});

	const parse = (rawData: typeSignIn) => {
		return { email: rawData.email.trim().toLowerCase(), password: rawData.password };
	};

	const handleSubmit = async (formValues: typeSignIn) => {
		try {
			if (form.isValid()) {
				setSending(true);

				await controller.request
					.post("http://localhost:3000/api/sign-in", {
						method: "POST",
						body: JSON.stringify(parse(formValues)),
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					})
					.then(response => {
						if (!response) {
							notifications.show({
								id: "signin-failed-no-response",
								color: "red",
								icon: <IconX size={16} stroke={1.5} />,
								autoClose: 5000,
								title: "Server Unavailable",
								message: `There was no response from the server.`,
								classNames: {
									root: notificationFailure.root,
									icon: notificationFailure.icon,
									description: notificationFailure.description,
									title: notificationFailure.title,
								},
							});
						} else {
							if (!response.user) {
								notifications.show({
									id: "signin-failed-not-found",
									color: "red",
									icon: <IconX size={16} stroke={1.5} />,
									autoClose: 5000,
									title: `Not Found`,
									message: `No account with that email has been found.`,
									classNames: {
										root: notificationFailure.root,
										icon: notificationFailure.icon,
										description: notificationFailure.description,
										title: notificationFailure.title,
									},
								});
							} else {
								if (!response.user.passwordValid) {
									notifications.show({
										id: "signin-failed-invalid-login",
										color: "red",
										icon: <IconX size={16} stroke={1.5} />,
										autoClose: 5000,
										title: `Invalid Login`,
										message: `Username password mismatch`,
										classNames: {
											root: notificationFailure.root,
											icon: notificationFailure.icon,
											description: notificationFailure.description,
											title: notificationFailure.title,
										},
									});
								} else {
									notifications.show({
										id: "signin-success",
										withCloseButton: false,
										color: "pri.6",
										icon: <IconCheck size={16} stroke={1.5} />,
										autoClose: 5000,
										title: "Authenticated",
										message: `User has logged in.`,
										classNames: {
											root: notificationSuccess.root,
											icon: notificationSuccess.icon,
											description: notificationSuccess.description,
											title: notificationSuccess.title,
										},
									});

									router.replace(`/`);
								}
							}

							form.reset();
						}
					});
			}
		} catch (error) {
			notifications.show({
				id: "signin-failed",
				color: "red",
				icon: <IconX size={16} stroke={1.5} />,
				autoClose: 5000,
				title: `Error`,
				message: (error as Error).message,
				classNames: {
					root: notificationFailure.root,
					icon: notificationFailure.icon,
					description: notificationFailure.description,
					title: notificationFailure.title,
				},
			});
		} finally {
			setSending(false);
		}
	};

	return (
		<Box component="form" onSubmit={form.onSubmit(values => handleSubmit(values))} noValidate>
			<Stack gap={"xl"}>
				<Grid>
					<Grid.Col span={{ base: 12 }}>
						<Component.Core.Input.Text
							required
							label={"Email"}
							type="email"
							description="We will never share your email"
							placeholder="Your Email"
							{...form.getInputProps("email")}
						/>
					</Grid.Col>
					<Grid.Col span={{ base: 12 }}>
						<Stack gap={"xs"} align="end">
							<Component.Core.Input.Password
								w={"100%"}
								required
								label={"Password"}
								type="password"
								placeholder="Your Password"
								{...form.getInputProps("password")}
							/>
							<Anchor
								component={Link}
								href={"/password/forgot"}
								inherit
								fz={{ base: "xs", xs: "sm" }}
								c={"pri.8"}
							>
								Lost your password?
							</Anchor>
						</Stack>
					</Grid.Col>
					<Grid.Col span={{ base: 12 }}>
						<Center mt={"md"}>
							<Button
								type="submit"
								w={{ base: "75%", sm: "50%" }}
								miw={"fit-content"}
								color="pri.8"
								loading={sending}
							>
								{sending ? "Signing In" : "Sign In"}
							</Button>
						</Center>
					</Grid.Col>
				</Grid>
			</Stack>
		</Box>
	);
}
