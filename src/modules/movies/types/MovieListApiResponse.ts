import { MovieList } from "./MovieList";

export interface MovieApiResponse {
	page: number;
	results: MovieList[];
	total_pages: number;
	total_results: number;
}
