import React, { useRef, useState, useEffect } from "react";
import { MovieList } from "@/modules/movies/types/MovieList";
import MovieCard from "@/components/MovieCard";

interface MovieCarouselProps {
	title: string;
	movies: MovieList[];
	loadMore: () => void;
	hasMore: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
	title,
	movies,
	loadMore,
	hasMore,
}) => {
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const [atStart, setAtStart] = useState<boolean>(true);
	const [atEnd, setAtEnd] = useState<boolean>(false);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);

	const handleScroll = () => {
		if (!scrollRef.current) return;
		const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

		setAtStart(scrollLeft === 0);
		setAtEnd(scrollLeft + clientWidth >= scrollWidth - 100);

		if (
			scrollLeft + clientWidth >= scrollWidth - 1000 &&
			hasMore &&
			!loadingMore
		) {
			setLoadingMore(true);
			loadMore();
		}
	};

	const scrollByAmount = (direction: "left" | "right") => {
		if (scrollRef.current) {
			const { clientWidth } = scrollRef.current;
			const scrollAmount = clientWidth * 0.8;
			scrollRef.current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth",
			});
		}
	};

	const scrollLeftHandler = () => scrollByAmount("left");
	const scrollRightHandler = () => scrollByAmount("right");

	useEffect(() => {
		setLoadingMore(false);
	}, [movies]);

	return (
		<section className="w-full md:p-4">
			<h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
			<div className="relative group">
				{!atStart && (
					<button
						className="absolute left-0 top-0 h-full w-16 z-10 bg-gradient-to-r from-gray-900 via-transparent to-transparent 
						md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
						onClick={scrollLeftHandler}
						aria-label="Scroll Left">
						<span className="text-white text-3xl transform group-hover:scale-125">
							&lt;
						</span>
					</button>
				)}
				<div
					ref={scrollRef}
					onScroll={handleScroll}
					className="flex whitespace-nowrap gap-3 sm:gap-10 overflow-x-hidden scrollbar-hide py-5 relative"
				>
					{movies.map((movie, index) => (
						<div
							key={`${movie.id}-${index}`}
							className="w-48 sm:w-60 md:w-72 flex-shrink-0"
						>
							<MovieCard movie={movie} />
						</div>
					))}
				</div>
				{!atEnd && (
					<button
						className="absolute right-0 top-0 h-full w-16 z-10 bg-gradient-to-l from-gray-900 via-transparent to-transparent 
						md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
						onClick={scrollRightHandler}
						aria-label="Scroll Right">
						<span className="text-white text-3xl transform group-hover:scale-125">
							&gt;
						</span>
					</button>
				)}
			</div>
			{loadingMore && (
				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
					<span className="text-white">Cargando más películas...</span>
				</div>
			)}
		</section>
	);
};

export default MovieCarousel;
