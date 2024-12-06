import axios, { AxiosInstance } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_TMDB;

const apiClient: AxiosInstance = axios.create({
	baseURL: baseUrl,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

apiClient.interceptors.request.use(
	(config) => {
		const tmdbToken = process.env.NEXT_PUBLIC_TMDB_API_TOKEN;
		if (tmdbToken) {
			config.headers.Authorization = `Bearer ${tmdbToken}`;
		}
		return config;
	},
	(error) => {
		console.error("Error en la solicitud:", error);
		return Promise.reject(error);
	}
);

export default apiClient;
