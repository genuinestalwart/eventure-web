import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { EventType } from "@/types/global";

const useEvents = (route: string) => {
	const { user } = useAuth();
	const axiosSecure = useAxiosSecure();

	const {
		data: events = [],
		isLoading,
		refetch,
	} = useQuery<Array<EventType>>({
		enabled: !!user,
		queryKey: ["events", route],
		queryFn: async () => {
			try {
				const { data } = await axiosSecure.get(
					`/events/${user?.uid}/${route}`
				);

				return data;
			} catch (error) {
				return [];
			}
		},
	});

	return { events, loading: isLoading, refetch };
};

export default useEvents;
