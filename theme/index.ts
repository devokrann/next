"use client";

import input from "./components/inputs";
import container from "./components/container";
import notification from "./components/notification";

import { Container, Notification, PasswordInput, Select, TextInput, Textarea, createTheme, rem } from "@mantine/core";

const projectName = createTheme({
	/** Controls focus ring styles. Supports the following options:
	 *  - `auto` – focus ring is displayed only when the user navigates with keyboard (default value)
	 *  - `always` – focus ring is displayed when the user navigates with keyboard and mouse
	 *  - `never` – focus ring is always hidden (not recommended)
	 */
	focusRing: "auto",

	/** Class added to the elements that have focus styles, for example, `Button` or `ActionIcon`.
	 *  Overrides `theme.focusRing` property.
	 */
	focusClassName: "focus",

	/** Class added to the elements that have active styles, for example, `Button` and `ActionIcon` */
	activeClassName: "active",

	// color
	colors: {
		pri: [
			"#fff8e1",
			"#ffefcc",
			"#ffdd9b",
			"#ffca64",
			"#ffba38",
			"#ffb01b",
			"#ffab09",
			"#e39500",
			"#ca8500",
			"#af7100",
		],
		sec: [
			"#ffe9e9",
			"#ffd1d1",
			"#fba0a1",
			"#f76d6d",
			"#f34141",
			"#f22625",
			"#f21616",
			"#d8070b",
			"#c10008",
			"#a90003",
		],
	},

	/** Key of `theme.colors`, hex/rgb/hsl values are not supported.
	 *  Determines which color will be used in all components by default.
	 *  Default value – `blue`.
	 * */
	primaryColor: "pri",

	/** Index of theme.colors[color].
	 *  Primary shade is used in all components to determine which color from theme.colors[color] should be used.
	 *  Can be either a number (0–9) or an object to specify different color shades for light and dark color schemes.
	 *  Default value `{ light: 6, dark: 8 }`
	 *
	 *  For example,
	 *  { primaryShade: 6 } // shade 6 is used both for dark and light color schemes
	 *  { primaryShade: { light: 6, dark: 7 } } // different shades for dark and light color schemes
	 * */
	primaryShade: { light: 6, dark: 6 },

	defaultGradient: {
		from: "pri",
		to: "sec",
		deg: 45,
	},

	/** Key of `theme.radius` or any valid CSS value. Default `border-radius` used by most components */
	defaultRadius: "sm",

	/** Determines whether text color must be changed based on the given `color` prop in filled variant
	 *  For example, if you pass `color="blue.1"` to Button component, text color will be changed to `var(--mantine-color-black)`
	 *  Default value – `false`
	 * */
	autoContrast: true,

	/** Determines which luminance value is used to determine if text color should be light or dark.
	 *  Used only if `theme.autoContrast` is set to `true`.
	 *  Default value is `0.3`
	 * */
	luminanceThreshold: 0.3,

	//font
	// fontFamily: "Arial, sans-serif",

	fontFamilyMonospace: "Courier New, monospace",

	fontSmoothing: true,

	fontSizes: {
		xs: rem(12),
		sm: rem(14),
		md: rem(16),
		lg: rem(18),
		xl: rem(20),
		xxl: "2rem",
	},

	lineHeights: {
		xs: "1.4",
		sm: "1.45",
		md: "1.55",
		lg: "1.6",
		xl: "1.65",
	},

	headings: {
		// properties for all headings
		fontWeight: "400",
		fontFamily: "Roboto",

		// properties for individual headings, all of them are optional
		// sizes: {
		// 	h1: {
		// 		fontSize: "2rem",
		// 		lineHeight: "1.5",
		// 		fontWeight: "500",
		// 	},
		// 	h2: {
		// 		fontSize: "1.5rem",
		// 		lineHeight: "1.6",
		// 		fontWeight: "500",
		// 	},
		// },
	},

	spacing: {
		xs: rem(10),
		sm: rem(12),
		md: rem(16),
		lg: rem(20),
		xl: rem(32),
	},

	/** Determines which cursor type will be used for interactive elements
	 * - `default` – cursor that is used by native HTML elements, for example, `input[type="checkbox"]` has `cursor: default` styles
	 * - `pointer` – sets `cursor: pointer` on interactive elements that do not have these styles by default
	 */
	cursorType: "pointer",

	components: {
		PasswordInput: PasswordInput.extend(input.password),
		Select: Select.extend(input.select),
		TextInput: TextInput.extend(input.text),
		Textarea: Textarea.extend(input.textarea),

		Container: Container.extend(container),
		Notification: Notification.extend(notification),
	},
});

export default projectName;
