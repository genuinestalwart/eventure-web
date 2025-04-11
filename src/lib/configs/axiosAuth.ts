import axios from "axios";

const axiosAuth = axios.create({
	baseURL: "https://gs-eventure-server.vercel.app",
});

export default axiosAuth;
