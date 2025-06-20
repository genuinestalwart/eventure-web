import { Flex, Title } from "@mantine/core";
import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, real-time notifications etc. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.",
	title: "Eventure | Not Found",
};

const NotFound = () => {
	return (
		<Flex
			align='center'
			className='container h-[calc(100vh_-_5rem)]'
			justify='center'>
			<Title c='red.6' order={1}>
				404 - Resource Not Found
			</Title>
		</Flex>
	);
};

export default NotFound;
