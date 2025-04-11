import { createTheme, CSSVariablesResolver } from "@mantine/core";

export const resolver: CSSVariablesResolver = (theme) => ({
	dark: {
		"--mantine-color-body": theme.black,
		"--mantine-color-text": theme.white,
	},
	light: {
		"--mantine-color-body": theme.black,
		"--mantine-color-text": theme.white,
	},
	variables: {},
});

export const theme = createTheme({
	black: "#333940",
	breakpoints: { xs: "40em", sm: "48em", md: "64em", lg: "80em", xl: "96em" },
	colors: {
		primary: [
			"#fff6e1",
			"#ffebcb",
			"#ffd69a",
			"#ffbf64",
			"#ffab37",
			"#ff9f1b",
			"#ff9500",
			"#e38400",
			"#cb7500",
			"#b06400",
		],
		secondary: [
			"#e3f6ff",
			"#cde8ff",
			"#9ccefe",
			"#65b1fc",
			"#3d9bfa",
			"#228cf9",
			"#0e85fa",
			"#0072e0",
			"#0065c9",
			"#0057b2",
		],
	},
	fontFamily: "Saira, sans-serif",
	fontFamilyMonospace: "Saira, sans-serif",
	headings: { fontFamily: "Genos, sans-serif" },
	primaryColor: "primary",
	white: "#ffffff",
});
