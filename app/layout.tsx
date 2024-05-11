import React from "react";

import type { Metadata } from "next";
// import { Inter } from "next/font/google";

import "@mantine/core/styles/global.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";

import "@/global.scss";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

import projectName from "@/theme";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: { default: "Next Template", template: "%s - Next Template" },
	description: "App description",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-mantine-color-scheme="dark">
			<head>
				<ColorSchemeScript defaultColorScheme="dark" />
			</head>
			<body /* className={inter.className} */>
				<MantineProvider
					theme={projectName}
					defaultColorScheme="dark"
					classNamesPrefix="next-template"
					withStaticClasses={false}
					withGlobalClasses={true}
				>
					<Notifications limit={3} />

					<ModalsProvider>{children}</ModalsProvider>
				</MantineProvider>
			</body>
		</html>
	);
}
