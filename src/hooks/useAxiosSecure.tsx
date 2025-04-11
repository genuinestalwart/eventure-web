import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const axiosSecure = axios.create({
	baseURL: "https://gs-eventure-server.vercel.app",
});

const useAxiosSecure = () => {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status !== "authenticated") return;

		const secureRequest = axiosSecure.interceptors.request.use(
			async (config) => {
				const token = session?.user?.accessToken;
				config.headers.Authorization = `Bearer ${token}`;
				return config;
			},
			(error) => Promise.reject(error)
		);

		const secureResponse = axiosSecure.interceptors.response.use(
			(response) => response,
			async (error) => {
				if (error.response.status === 401) {
					await signOut();
				}

				return Promise.reject(error);
			}
		);

		return () => {
			axiosSecure.interceptors.request.eject(secureRequest);
			axiosSecure.interceptors.response.eject(secureResponse);
		};
	}, [session?.user?.accessToken, status]);

	return axiosSecure;
};
export default useAxiosSecure;
