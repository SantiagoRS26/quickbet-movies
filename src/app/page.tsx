"use client";

import Sidebar from "@/components/Sidebar";
import {
	fetchNowPlayingMovies,
	fetchPopularMovies,
	fetchTopRatedMovies,
	fetchUpcomingMovies,
} from "@/modules/movies/services/moviesService";
import { useMovies } from "@/modules/movies/hooks/useMovies";
import { useEffect, useState, useRef } from "react";
import FeaturedMovie from "./FeaturedMovie";
import FeaturedMovieSkeleton from "@/components/Skeleton/FeaturedMovieSkeleton";
import MovieCard from "@/components/MovieCard";
import { useInfiniteMoviesByGenre } from "@/modules/movies/hooks/useInfiniteMoviesByGenre";
import { MovieList } from "@/modules/movies/types/MovieList";
import MovieSection from "./MovieSection";
import { useInfiniteMoviesBySearch } from "@/modules/movies/hooks/useInfiniteMoviesBySearch";

const sections = [
	{ title: "Popular", fetchMovies: fetchPopularMovies },
	{ title: "Now Playing", fetchMovies: fetchNowPlayingMovies },
	{ title: "Top Rated", fetchMovies: fetchTopRatedMovies },
	{ title: "Upcoming", fetchMovies: fetchUpcomingMovies },
];

export default function Home() {
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
	const lastMovieRef = useRef<HTMLDivElement | null>(null);

	const searchObserver = useRef<IntersectionObserver | null>(null);
	const lastSearchRef = useRef<HTMLDivElement | null>(null);

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

		if (lastMovieRef.current) observer.current.observe(lastMovieRef.current);
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

			if (lastSearchRef.current)
				searchObserver.current.observe(lastSearchRef.current);
		}
	}, [searchHasMore, searchLoading, searchQuery]);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	return (
		<div className="flex flex-col min-h-screen bg-[#454545]">
			<div className="w-full">
				{isLoadingFeatured ? (
					<FeaturedMovieSkeleton />
				) : error ? (
					<div className="text-center text-white p-4">
						<p>Error al cargar la película destacada</p>
					</div>
				) : (
					<FeaturedMovie movie={featuredMovie} />
				)}
			</div>

			<div className="flex flex-1">
				<Sidebar
					onGenreChange={(genreId) => setSelectedGenreId(genreId)}
					onSearchChange={(query) => {
						setSearchQuery(query);
						setSelectedGenreId(0);
					}}
				/>
				<div className="flex-1 overflow-x-hidden">
					{searchQuery.trim() !== "" ? (
						// Mostrar resultados de búsqueda
						<div className="px-4 sm:px-6 md:px-20 pb-24 py-6">
							<h2 className="text-white text-3xl font-bold mb-4">
								Search Results
							</h2>
							<div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-auto">
								{searchMovies.map((movie, index) => {
									if (index === searchMovies.length - 1) {
										return (
											<div
												key={movie.id}
												ref={lastSearchRef}>
												<MovieCard movie={movie} />
											</div>
										);
									}
									return (
										<MovieCard
											key={movie.id}
											movie={movie}
										/>
									);
								})}
							</div>

							{searchLoading && (
								<p className="text-white text-center mt-4">Cargando...</p>
							)}
						</div>
					) : selectedGenreId !== 0 ? (
						// Mostrar resultados por género (ya existente)
						<div className="px-4 sm:px-6 md:px-20 pb-24 py-6">
							<h2 className="text-white text-3xl font-bold mb-4">
								Movies by Genre
							</h2>
							<div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-auto">
								{genreMovies.map((movie, index) => {
									if (index === genreMovies.length - 1) {
										return (
											<div
												key={movie.id}
												ref={lastMovieRef}>
												<MovieCard movie={movie} />
											</div>
										);
									}
									return (
										<MovieCard
											key={movie.id}
											movie={movie}
										/>
									);
								})}
							</div>

							{genreLoading && (
								<p className="text-white text-center mt-4">Cargando...</p>
							)}
						</div>
					) : (
						// Mostrar secciones originales si no hay género ni búsqueda
						<div className="px-4 sm:px-6 md:px-20 pb-24 py-6">
							{sections.map((section) => (
								<MovieSection
									key={section.title}
									{...section}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					className="fixed bottom-10 right-10 bg-[#1C1C1C] text-white p-3 rounded-full shadow-md hover:bg-yellow-500 transition"
					aria-label="Volver arriba">
					↑
				</button>
			)}
		</div>
	);
}
