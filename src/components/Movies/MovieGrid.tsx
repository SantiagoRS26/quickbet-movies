import MovieCard from "@/components/MovieCard";
import { MovieList } from "@/modules/movies/types/MovieList";
import { RefObject } from "react";

interface MovieGridProps {
	movies: MovieList[];
	lastRef?: RefObject<HTMLDivElement>;
}

export default function MovieGrid({ movies, lastRef }: MovieGridProps) {
	return (
		<div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-auto">
			{movies.map((movie, index) =>
				index === movies.length - 1 && lastRef ? (
					<div
						key={movie.id}
						ref={lastRef}>
						<MovieCard movie={movie} />
					</div>
				) : (
					<MovieCard
						key={movie.id}
						movie={movie}
					/>
				)
			)}
		</div>
	);
}
