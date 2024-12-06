import apiClient from "@/services/apiClient";

export const fetchPopularMovies = async (page: number = 1) => {
	try {
		const response = await apiClient.get("/movie/popular", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching popular movies:", error);
		throw error;
	}
};

export const fetchNowPlayingMovies = async (page: number = 1) => {
	try {
		const response = await apiClient.get("/movie/now_playing", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching popular movies:", error);
		throw error;
	}
};

export const fetchTopRatedMovies = async (page: number = 1) => {
	try {
		const response = await apiClient.get("/movie/top_rated", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching popular movies:", error);
		throw error;
	}
};

export const fetchUpcomingMovies = async (page: number = 1) => {
	try {
		const response = await apiClient.get("/movie/upcoming", {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching popular movies:", error);
		throw error;
	}
};

export const fetchMovieDetails = async (id: string) => {
	try {
		const response = await apiClient.get(`/movie/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching movie details:", error);
		throw error;
	}
};

export const fetchMovieRecommendations = async (
	id: string,
	page: number = 1
) => {
	try {
		const response = await apiClient.get(`/movie/${id}/recommendations`, {
			params: { page },
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching movie recommendations:", error);
		throw error;
	}
};

export const fetchMovieGenres = async () => {
	try {
		const response = await apiClient.get("/genre/movie/list");
		return response.data.genres;
	} catch (error) {
		console.error("Error fetching movie genres:", error);
		throw error;
	}
};

export const fetchMoviesByGenre = async (genreId: number, page: number = 1) => {
	try {
		const response = await apiClient.get("/discover/movie", {
			params: {
				with_genres: genreId,
				page,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching movies by genre:", error);
		throw error;
	}
};

export const fetchMoviesBySearchQuery = async (
	query: string,
	page: number = 1
) => {
	try {
		const response = await apiClient.get("/search/movie", {
			params: {
				query,
				page,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching movies by search query:", error);
		throw error;
	}
};
