import { useMovies } from "./useMovies";
import { fetchPopularMovies } from "../services/moviesService";
import { useEffect, useState, useRef } from "react";
import { useInfiniteMoviesByGenre } from "./useInfiniteMoviesByGenre";
import { useInfiniteMoviesBySearch } from "./useInfiniteMoviesBySearch";
import { MovieList } from "../types/MovieList";

export function useHomeLogic() {
	const {
		movies: popularMovies,
		loading,
		error,
	} = useMovies({ fetchMovies: fetchPopularMovies });
	const [featuredMovie, setFeaturedMovie] = useState<MovieList | null>(null);

	const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const {
		movies: searchMovies,
		loading: searchLoading,
		hasMore: searchHasMore,
		setPage: setSearchPage,
	} = useInfiniteMoviesBySearch(searchQuery);

	useEffect(() => {
		if (popularMovies.length > 0 && !featuredMovie) {
			const randomMovie =
				popularMovies[Math.floor(Math.random() * popularMovies.length)];
			setFeaturedMovie(randomMovie);
		}
	}, [popularMovies, featuredMovie]);

	const isLoadingFeatured = loading || !featuredMovie;

	const {
		movies: genreMovies,
		loading: genreLoading,
		hasMore,
		setPage,
	} = useInfiniteMoviesByGenre(selectedGenreId);

	const observer = useRef<IntersectionObserver | null>(null);
	const genreLastRef = useRef<HTMLDivElement | null>(null);

	const searchObserver = useRef<IntersectionObserver | null>(null);
	const searchLastRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver((entries) => {
			if (
				entries[0].isIntersecting &&
				hasMore &&
				!genreLoading &&
				selectedGenreId !== 0
			) {
				setPage((prev) => prev + 1);
			}
		});

		if (genreLastRef.current) observer.current.observe(genreLastRef.current);
	}, [hasMore, genreLoading, selectedGenreId]);

	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (searchObserver.current) searchObserver.current.disconnect();

		if (searchQuery !== "") {
			searchObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && searchHasMore && !searchLoading) {
					setSearchPage((prev) => prev + 1);
				}
			});

			if (searchLastRef.current)
				searchObserver.current.observe(searchLastRef.current);
		}
	}, [searchHasMore, searchLoading, searchQuery]);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	const handleGenreChange = (genreId: number) => setSelectedGenreId(genreId);
	const handleSearchChange = (query: string) => {
		setSearchQuery(query);
		setSelectedGenreId(0);
	};

	return {
		isLoadingFeatured,
		error,
		featuredMovie,
		selectedGenreId,
		searchQuery,
		searchMovies,
		searchLoading,
		searchLastRef,
		genreMovies,
		genreLoading,
		genreLastRef,
		showScrollTop,
		handleGenreChange,
		handleSearchChange,
		scrollToTop,
	};
}
