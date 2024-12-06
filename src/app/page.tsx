"use client";

import HomeLayout from "@/components/Layout/HomeLayout";
import MovieSearchResults from "@/components/Movies/MovieSearchResults";
import MovieGenreResults from "@/components/Movies/MovieGenreResults";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useHomeLogic } from "@/modules/movies/hooks/useHomeLogic";
import FeaturedMovieSkeleton from "@/components/Skeleton/FeaturedMovieSkeleton";
import FeaturedMovie from "./FeaturedMovie";
import Sidebar from "@/components/Sidebar";
import MovieSection from "./MovieSection";
import {
	fetchNowPlayingMovies,
	fetchPopularMovies,
	fetchTopRatedMovies,
	fetchUpcomingMovies,
} from "@/modules/movies/services/moviesService";

interface Section {
	title: string;
	fetchMovies: () => Promise<any[]>;
}

export default function Home() {
	const {
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
	} = useHomeLogic();

	const sections: Section[] = [
		{ title: "Popular", fetchMovies: fetchPopularMovies },
		{ title: "Now Playing", fetchMovies: fetchNowPlayingMovies },
		{ title: "Top Rated", fetchMovies: fetchTopRatedMovies },
		{ title: "Upcoming", fetchMovies: fetchUpcomingMovies },
	];

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
					featuredMovie && <FeaturedMovie movie={featuredMovie} />
				)}
			</div>

			<div className="flex flex-1">
				<Sidebar
					onGenreChange={handleGenreChange}
					onSearchChange={handleSearchChange}
				/>
				<HomeLayout>
					{searchQuery.trim() !== "" ? (
						<MovieSearchResults
							movies={searchMovies}
							loading={searchLoading}
							lastRef={searchLastRef}
						/>
					) : selectedGenreId !== 0 ? (
						<MovieGenreResults
							movies={genreMovies}
							loading={genreLoading}
							lastRef={genreLastRef}
						/>
					) : (
						<div className="px-4 sm:px-6 md:px-20 pb-24 py-6">
							{sections.map((section) => (
								<MovieSection
									key={section.title}
									{...section}
								/>
							))}
						</div>
					)}
				</HomeLayout>
			</div>

			{showScrollTop && <ScrollToTopButton onClick={scrollToTop} />}
		</div>
	);
}
