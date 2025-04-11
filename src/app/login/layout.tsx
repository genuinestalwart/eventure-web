import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Eventure | Login",
	description:
		"Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, RSVP tracking, ticket sales, and real-time notifications. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.",
};

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>;
};

export default LoginLayout;
