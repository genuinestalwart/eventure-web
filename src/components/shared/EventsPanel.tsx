import { EventType } from "@/types/global";
import { Flex, Grid, GridCol, Loader, TabsPanel, Text } from "@mantine/core";
import EventCard from "@/components/shared/EventCard";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface Props {
	events: EventType[];
	loading: boolean;
	refetch: (
		options?: RefetchOptions
	) => Promise<QueryObserverResult<EventType[], Error>>;
	value: string;
}

const EventsPanel: React.FC<Props> = ({ events, loading, refetch, value }) => {
	return (
		<TabsPanel value={value}>
			{loading ? (
				<Flex align='center' justify='center' mih='70vh'>
					<Loader color='primary.6' />
				</Flex>
			) : events.length ? (
				<Grid my='md'>
					{events.map((item, i) => (
						<GridCol key={i} span={{ base: 12, sm: 6, lg: 4 }}>
							<EventCard
								item={item}
								refetch={refetch}
								value={value}
							/>
						</GridCol>
					))}
				</Grid>
			) : (
				<Flex align='center' justify='center' mih='70vh'>
					<Text c='gray.6' ta='center'>
						{value === "created"
							? "You haven't created any events yet."
							: value === "joined"
							? "You haven't joined any events yet."
							: "Looks like all events are yet to expire."}
					</Text>
				</Flex>
			)}
		</TabsPanel>
	);
};

export default EventsPanel;
