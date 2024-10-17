"use client";

import { alpha, CSSVariablesResolver } from "@mantine/core";

const appResolver: CSSVariablesResolver = theme => ({
	variables: {},

	light: {
		"--mantine-color-white": `${theme.white}`,
		"--mantine-color-body": `${theme.white}`,

		"--mantine-color-text": `${theme.black}`,
		"--mantine-color-pri-outline": `${theme.black}`,
		"--mantine-color-pri-light-color": `${theme.black}`,

		"--mantine-color-anchor": `${theme.colors.pri[4]}`,
		"--mantine-color-default-border": `${theme.colors.pri[4]}`,

		"--divider-color": `${theme.colors.pri[4]} !important`,
	},

	dark: {
		"--mantine-color-white": `${theme.black}`,
		"--mantine-color-body": `${theme.black}`,

		"--mantine-color-text": `${theme.white}`,
		"--mantine-color-pri-outline": `${theme.white}`,
		"--mantine-color-pri-light-color": `${theme.white}`,

		"--mantine-color-anchor": `${theme.colors.pri[4]}`,
		"--mantine-color-default-border": `${theme.colors.pri[4]}`,

		"--divider-color": `${theme.colors.pri[4]} !important`,
	},
});

export default appResolver;
