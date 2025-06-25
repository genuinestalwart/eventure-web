"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { EventType, User } from "@/types/global";
import {
	Button,
	Card,
	Code,
	Divider,
	List,
	ListItem,
	Space,
	Text,
	Title,
} from "@mantine/core";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
dayjs.extend(calendar);

const embedded = (time: number) => (
	<Code c='secondary.3' color='gray.9'>
		{dayjs.unix(time).calendar(null, { sameElse: "MMM D, YYYY hh:mm A" })}
	</Code>
);

interface Props {
	disabled: boolean;
	event: EventType;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<EventType | null, Error>>;
	setDisabled: Function;
	user: User | null;
}

const EventActions: React.FC<Props> = ({
	disabled,
	event,
	refetch,
	setDisabled,
	user,
}) => {
	const { createdBy, endingAt, participants, startingAt, status } = event;
	const [opened, setOpened] = useState<boolean>(false);
	const router = useRouter();
	const axiosSecure = useAxiosSecure();

	const handleConfirm = async () => {
		setOpened(false);
		setDisabled(true);
		const data = { eid: event.eid, uid: (user as User).uid };
		const route = `/event/${status === "upcoming" ? "start" : "end"}-event`;

		try {
			await axiosSecure.patch(route, data);
		} catch (error) {
			// do something
		}

		await refetch();
		setDisabled(false);
	};

	const handleJoinLeave = async (joining: boolean) => {
		if (user) {
			setDisabled(true);
			const data = { eid: event.eid, uid: user.uid };
			const route = `/event/${joining ? "join" : "leave"}-event`;

			try {
				await axiosSecure.patch(route, data);
			} catch (error) {
				// do something
			}

			await refetch();
			setDisabled(false);
		} else {
			router.push("/login");
		}
	};

	return (
		<Card padding='lg' radius='md' w='100%' withBorder>
			<Divider
				label={
					<Title c='primary.6' order={2}>
						Status
					</Title>
				}
				labelPosition='center'
			/>

			<Space h='xs' />

			<List listStyleType='disc' pr='md'>
				<ListItem>Starting At {embedded(startingAt)}</ListItem>
				<ListItem>Ending At {embedded(endingAt)}</ListItem>
			</List>

			<Space h='md' />

			{/* Button Shown Based on User and Status */}
			{user?.uid === createdBy && status === "upcoming" ? (
				<Button
					color='green'
					disabled={disabled}
					loading={disabled}
					onClick={() => setOpened(true)}
					variant='filled'>
					Start Event
				</Button>
			) : user?.uid === createdBy && status === "ongoing" ? (
				<Button
					color='red'
					disabled={disabled}
					loading={disabled}
					onClick={() => setOpened(true)}
					variant='filled'>
					End Event
				</Button>
			) : status === "upcoming" &&
			  participants.includes(user?.uid || "") ? (
				<Button
					color='red'
					disabled={disabled}
					loading={disabled}
					onClick={() => handleJoinLeave(false)}
					variant='filled'>
					Leave Event
				</Button>
			) : status === "upcoming" ? (
				<Button
					color='green'
					disabled={disabled}
					loading={disabled}
					onClick={() => handleJoinLeave(true)}
					variant='filled'>
					Join Event
				</Button>
			) : status === "ongoing" ? (
				<Button bg='secondary.3' c='black' disabled variant='filled'>
					Event is Live
				</Button>
			) : (
				<Button bg='gray.8' c='gray.6' disabled variant='filled'>
					Event is Over
				</Button>
			)}

			{/* Shown only before Starting and Ending */}
			<ConfirmModal
				confirm={
					<Button
						color={status === "upcoming" ? "green" : "red"}
						onClick={() => handleConfirm()}
						variant='filled'>
						{status === "upcoming" ? "Start" : "End"} Event
					</Button>
				}
				onClose={() => setOpened(false)}
				opened={opened}
				title={{
					color: status === "upcoming" ? "green" : "red.6",
					text: "Waiting for Confirmation",
				}}>
				<Text>
					{status === "upcoming"
						? "Are you sure you want to start the event? Once the event is started, you can't edit it and no one can join or leave the event anymore."
						: "Are you sure you want to end the event?"}
				</Text>

				<Space h='lg' />
			</ConfirmModal>
		</Card>
	);
};

export default EventActions;
