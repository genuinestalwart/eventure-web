"use client";
import EventModal from "@/components/modals/EventModal";
import EventsPanel from "@/components/shared/EventsPanel";
import EventsTabTitle from "@/components/shared/EventsTabTitle";
import RequireAuth from "@/components/shared/RequireAuth";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useEvents from "@/hooks/useEvents";
import { eventFormData } from "@/lib/formData/EventFormData";
import { EventFormProps, User } from "@/types/global";
import { ActionIcon, Affix, Tabs, TabsList } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";

const initialValues = {
	description: "",
	endingAt: "",
	startingAt: "",
	title: "",
	venueLink: "",
};

const tabsTitle = [
	{ text: "My Events", value: "created" },
	{ text: "Joined Events", value: "joined" },
	{ text: "Expired Events", value: "expired" },
];

const EventsPage = () => {
	const [activeTab, setActiveTab] = useState<string | null>("created");
	const [disabled, setDisabled] = useState<boolean>(false);
	const [formValues, setFormValues] = useState<EventFormProps>(initialValues);
	const [opened, setOpened] = useState<boolean>(false);
	const form = useForm(
		eventFormData({ formValues, initialValues, setFormValues })
	);
	const isEmpty = Object.values(formValues).some((x) => !x);
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();
	const {
		events: cEvents,
		loading: cLoading,
		refetch: cRefetch,
	} = useEvents("created");
	const { events: jEvents, loading: jLoading } = useEvents("joined");
	const { events: eEvents, loading: eLoading } = useEvents("expired");

	const tabsPanel = [
		{ events: cEvents, loading: cLoading, value: "created" },
		{ events: jEvents, loading: jLoading, value: "joined" },
		{ events: eEvents, loading: eLoading, value: "expired" },
	];

	const handleSubmit = async (values: EventFormProps) => {
		setDisabled(true);
		const { description, endingAt, startingAt, title, venueLink } = values;

		try {
			await axiosSecure.post("/events", {
				createdBy: (user as User).uid,
				description,
				endingAt: dayjs(endingAt).unix(),
				startingAt: dayjs(startingAt).unix(),
				title,
				venueLink,
			});

			await cRefetch();
		} catch (error) {
			// do something
		}

		setOpened(false);
		form.reset();
		setDisabled(false);
	};

	return (
		<RequireAuth>
			<Tabs
				className='container min-h-[calc(100vh_-_5rem)]'
				color='primary.6'
				component='main'
				onChange={setActiveTab}
				value={activeTab}
				px='xl'
				radius='md'>
				<TabsList grow justify='center'>
					{tabsTitle.map((item, i) => (
						<EventsTabTitle
							activeTab={activeTab}
							key={i}
							value={item.value}>
							{item.text}
						</EventsTabTitle>
					))}
				</TabsList>

				{tabsPanel.map((item, i) => (
					<EventsPanel
						events={item.events}
						key={i}
						loading={item.loading}
						refetch={cRefetch}
						value={item.value}
					/>
				))}
			</Tabs>

			<Affix position={{ bottom: 40, right: 40 }}>
				<ActionIcon
					aria-label='Create new event'
					c='black'
					color='primary.6'
					disabled={disabled}
					loading={disabled}
					onClick={() => setOpened(true)}
					radius='xl'
					size='lg'
					variant='filled'>
					<IconPlus />
				</ActionIcon>
			</Affix>

			<EventModal
				disabled={disabled}
				form={form}
				handleSubmit={handleSubmit}
				isEmpty={isEmpty}
				newEvent
				onClose={() => {
					setOpened(false);
					form.reset();
				}}
				opened={opened}
				title='Create a New Event'
			/>
		</RequireAuth>
	);
};

export default EventsPage;
