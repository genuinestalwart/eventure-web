import EventWrapper from "@/components/page-event/EventWrapper";
import axiosAuth from "@/lib/configs/axiosAuth";
import { EventType } from "@/types/global";
import { Metadata } from "next";

interface Props {
	params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
	params,
}: Props): Promise<Metadata> => {
	const { slug } = await params;
	const { data } = await axiosAuth.get(`/event/${slug}`);
	const event: EventType | null = data;

	return {
		description:
			"Eventure is a modern event management platform that allows users to easily create, manage, and attend events. Whether it's a virtual webinar, a local concert, or a corporate conference, Eventure simplifies the process with features like event creation, real-time notifications etc. With an intuitive dashboard for organizers and a seamless discovery experience for attendees, planning and participating in events has never been easier.",
		title: `Eventure | ${event?.title || "Not Found"}`,
	};
};

const EventPage = () => {
	return <EventWrapper />;
};

export default EventPage;
