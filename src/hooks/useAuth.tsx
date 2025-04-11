import { useSession } from "next-auth/react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/global";

const useAuth = () => {
	const { data: session, status } = useSession();
	const axiosSecure = useAxiosSecure();

	const {
		data: user = null,
		isLoading,
		refetch,
	} = useQuery<User | null>({
		enabled: !!session?.user?.accessToken,
		queryKey: ["user", session?.user],
		queryFn: async () => {
			const { data } = await axiosSecure.get(
				`/user/${session?.user?.uid}`
			);

			return data;
		},
	});

	const loading = status === "loading" || isLoading;
	return { loading, refetch, user };
};

export default useAuth;
