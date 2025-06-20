"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { EventType } from "@/types/global";
import {
	ActionIcon,
	Button,
	Card,
	Flex,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import Link from "next/link";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
dayjs.extend(calendar);

interface Props {
	item: EventType;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<EventType[], Error>>;
	value: string;
}

const EventCard: React.FC<Props> = ({ item, refetch, value }) => {
	const { createdAt, description, eid, title } = item;
	const [disabled, setDisabled] = useState<boolean>(false);
	const [opened, setOpened] = useState<boolean>(false);
	const axiosSecure = useAxiosSecure();

	const handleConfirm = async () => {
		setDisabled(true);
		setOpened(false);

		try {
			await axiosSecure.delete(`/event/${eid}`);
		} catch (error) {
			// do something
		}

		await refetch();
		setDisabled(false);
	};

	return (
		<Card padding='md' radius='md' shadow='sm' w='100%' withBorder>
			<Title order={2}>{title}</Title>

			<Text c='gray.5' size='xs'>
				created at{" "}
				{dayjs
					.unix(createdAt)
					.calendar(null, { sameElse: "MMM D, YYYY hh:mm A" })}
			</Text>

			<Text className='line-clamp-4' my='md'>
				{description}
			</Text>

			<Flex align='center' gap='md'>
				<Link className='grow' href={`/events/${eid}`}>
					<Button
						color='primary.6'
						fullWidth
						size='sm'
						variant='outline'>
						View Details
					</Button>
				</Link>

				{value === "created" && (
					<ActionIcon
						color='red'
						disabled={disabled}
						loading={disabled}
						onClick={() => setOpened(true)}
						size='lg'>
						<IconTrash />
					</ActionIcon>
				)}
			</Flex>

			<ConfirmModal
				confirm={
					<Button
						color='red'
						onClick={() => handleConfirm()}
						variant='filled'>
						Delete Event
					</Button>
				}
				onClose={() => setOpened(false)}
				opened={opened}
				title={{
					color: "red.6",
					text: "Waiting for Confirmation",
				}}>
				<Text>Are you sure you want to delete the event?</Text>
				<Space h='lg' />
			</ConfirmModal>
		</Card>
	);
};

export default EventCard;
