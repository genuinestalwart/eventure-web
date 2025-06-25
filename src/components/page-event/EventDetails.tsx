"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { eventFormData } from "@/lib/formData/EventFormData";
import { EventFormProps, EventType, User } from "@/types/global";
import {
	ActionIcon,
	Box,
	Button,
	Card,
	Divider,
	Flex,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useState } from "react";
import EventModal from "@/components/modals/EventModal";
import { useRouter } from "next/navigation";
import DisplayMarkdown from "@/components/shared/DisplayMarkdown";
dayjs.extend(calendar);

interface Props {
	disabled: boolean;
	event: EventType;
	fullName: string | null;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<EventType | null, Error>>;
	setDisabled: Function;
	user: User | null;
}

const EventDetails: React.FC<Props> = ({
	disabled,
	event,
	fullName,
	refetch,
	setDisabled,
	user,
}) => {
	const { createdAt, createdBy, description, status } = event;

	const initialValues = {
		description: event.description,
		endingAt: dayjs.unix(event.endingAt).format("YYYY-MM-DD HH:mm:ss"),
		startingAt: dayjs.unix(event.startingAt).format("YYYY-MM-DD HH:mm:ss"),
		title: event.title,
		venueLink: event.venueLink,
	};

	const [formValues, setFormValues] = useState<EventFormProps>(initialValues);
	const [opened, setOpened] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm(
		eventFormData({ formValues, initialValues, setFormValues })
	);
	const isEmpty = Object.values(formValues).some((x) => !x);
	const axiosSecure = useAxiosSecure();

	const handleSubmit = async (values: EventFormProps) => {
		setDisabled(true);
		const { description, endingAt, startingAt, title, venueLink } = values;

		try {
			await axiosSecure.put("/event/update-details", {
				description,
				eid: event.eid,
				endingAt: dayjs(endingAt).unix(),
				startingAt: dayjs(startingAt).unix(),
				title,
				venueLink,
			});

			await refetch();
			router.refresh();
		} catch (error) {
			// do something
		}

		setOpened(false);
		form.reset();
		setDisabled(false);
	};

	return (
		<Card padding='lg' radius='md' w='100%' withBorder>
			<Flex
				align={{ xs: "center" }}
				direction={{ base: "column", xs: "row" }}
				gap={{ base: "sm", xs: "xl" }}>
				{/* Title */}
				<Box className='grow'>
					<Title c='primary.6' order={1}>
						{event.title}
					</Title>

					<Text c='gray.6' size='sm'>
						by{" "}
						<Text fw={600} span>
							{fullName ? fullName : "Unknown User"}
						</Text>{" "}
						— created{" "}
						<Text fw={600} span>
							{dayjs.unix(createdAt).calendar(null, {
								sameElse: "MMM D, YYYY hh:mm A",
							})}
						</Text>
					</Text>
				</Box>

				{/* Edit Button Shown Based on Screen Type */}
				{user?.uid === createdBy && status === "upcoming" && (
					<>
						<ActionIcon
							aria-label='Edit event'
							color='primary.6'
							disabled={disabled}
							loading={disabled}
							onClick={() => setOpened(true)}
							variant='filled'
							visibleFrom='xs'>
							<IconEdit />
						</ActionIcon>

						<Button
							aria-label='Edit event'
							color='primary.6'
							disabled={disabled}
							hiddenFrom='xs'
							loading={disabled}
							onClick={() => setOpened(true)}
							rightSection={<IconEdit />}
							variant='filled'>
							Edit Event
						</Button>
					</>
				)}
			</Flex>

			<Divider color='secondary.3' mt='sm' />
			<Space h='md' />
			<DisplayMarkdown text={description} />

			{/* Edit Event Action */}
			<EventModal
				disabled={disabled}
				form={form}
				handleSubmit={handleSubmit}
				isEmpty={isEmpty}
				newEvent={false}
				onClose={() => {
					setOpened(false);
					form.reset();
				}}
				opened={opened}
				title='Edit The Event'
			/>
		</Card>
	);
};

export default EventDetails;
