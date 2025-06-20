"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import {
	Button,
	Card,
	Divider,
	Flex,
	Grid,
	GridCol,
	Space,
	Text,
	Title,
} from "@mantine/core";
import EventDetails from "@/components/page-event/EventDetails";
import EventActions from "@/components/page-event/EventActions";
import { useQuery } from "@tanstack/react-query";
import { EventType } from "@/types/global";
import { usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import PageLoader from "@/components/shared/PageLoader";
import NotFound from "@/app/not-found";
import { IconExternalLink, IconUsersGroup } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const EventWrapper = () => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const pathname = usePathname();
	const eid = pathname.slice(8, pathname.length);
	const axiosPublic = useAxiosPublic();
	const { loading: uLoading, user } = useAuth();

	const {
		data: event = null,
		isLoading: eLoading,
		refetch,
	} = useQuery<EventType | null>({
		queryKey: ["event", eid],
		queryFn: async () => {
			try {
				const { data } = await axiosPublic.get(`/event/${eid}/`);
				return data;
			} catch (error) {
				return null;
			}
		},
	});

	const { data: fullName = null, isLoading: fnLoading } = useQuery<
		string | null
	>({
		enabled: !!event,
		queryKey: ["full name", event?.createdBy],
		queryFn: async () => {
			try {
				const { data } = await axiosPublic.get(
					`/user/${event?.createdBy}/full-name`
				);

				return data?.fullName;
			} catch (error) {
				return null;
			}
		},
	});

	return uLoading || eLoading || fnLoading ? (
		<PageLoader />
	) : !event ? (
		<NotFound />
	) : (
		<Grid className='container' component='main' gutter='md' px='xl'>
			<GridCol component='article' span={{ base: 12, lg: 8 }}>
				<EventDetails
					disabled={disabled}
					event={event}
					fullName={fullName}
					refetch={refetch}
					setDisabled={setDisabled}
					user={user}
				/>
			</GridCol>

			<GridCol component='aside' span={{ base: 12, lg: 4 }}>
				<Flex align='center' gap='md' p='sm'>
					<IconUsersGroup />

					<Text c='secondary.3' size='sm'>
						{!event.participants.length
							? "No"
							: event.participants.length}{" "}
						participant
						{event.participants.length !== 1 ? "s" : ""}
					</Text>
				</Flex>

				<EventActions
					disabled={disabled}
					event={event}
					refetch={refetch}
					setDisabled={setDisabled}
					user={user}
				/>

				<Space h='md' />

				<Card padding='lg' radius='md' w='100%' withBorder>
					<Divider
						label={
							<Title c='primary.6' order={2}>
								Venue Link
							</Title>
						}
						labelPosition='center'
					/>

					<Space h='sm' />

					<Link href={event.venueLink}>
						<Button
							color='gray.8'
							fullWidth
							rightSection={<IconExternalLink />}>
							{event.venueLink}
						</Button>
					</Link>
				</Card>
			</GridCol>
		</Grid>
	);
};

export default EventWrapper;
