"use client";

import { alpha, CSSVariablesResolver } from "@mantine/core";

const appResolver: CSSVariablesResolver = theme => ({
	variables: {},

	light: {
		"--mantine-color-white": `${theme.white} !important`,
		"--mantine-color-body": `${theme.white} !important`,

		"--mantine-color-text": `${theme.black} !important`,
		"--mantine-color-pri-outline": `${theme.black} !important`,
		"--mantine-color-pri-light-color": `${theme.black} !important`,
	},

	dark: {
		"--mantine-color-white": `${theme.black} !important`,
		"--mantine-color-body": `${theme.black} !important`,

		"--mantine-color-text": `${theme.white} !important`,
		"--mantine-color-pri-outline": `${theme.white} !important`,
		"--mantine-color-pri-light-color": `${theme.white} !important`,
	},
});

export default appResolver;
