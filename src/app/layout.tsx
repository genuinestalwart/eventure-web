import type { Metadata } from "next";
import { Genos, Saira } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Providers from "@/components/misc/Providers";

const genos = Genos({
	display: "swap",
	style: ["italic", "normal"],
	subsets: ["latin"],
	variable: "--font-genos",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const saira = Saira({
	display: "swap",
	style: ["italic", "normal"],
	subsets: ["latin"],
	variable: "--font-saira",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	description:
		"Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, RSVP tracking, ticket sales, and real-time notifications. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.",
	title: "Eventure | Home",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>

			<body className={`antialiased ${genos.variable} ${saira.variable}`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
