import axios from "axios";

const axiosPublic = axios.create({
	baseURL: "https://gs-eventure-server.vercel.app",
});

const useAxiosPublic = () => {
	return axiosPublic;
};

export default useAxiosPublic;
