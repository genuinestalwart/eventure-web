import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Providers from "@/components/misc/Providers";

const saira = Saira({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-saira",
	subsets: ["latin"],
	style: ["italic", "normal"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Eventure | Home",
	description:
		"Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, RSVP tracking, ticket sales, and real-time notifications. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='en' {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>

			<body className={`${saira.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
