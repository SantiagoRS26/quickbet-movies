import MovieGrid from "./MovieGrid";
import { MovieList } from "@/modules/movies/types/MovieList";

interface MovieGenreResultsProps {
	movies: MovieList[];
	loading: boolean;
	lastRef: React.RefObject<HTMLDivElement>;
}

export default function MovieGenreResults({
	movies,
	loading,
	lastRef,
}: MovieGenreResultsProps) {
	return (
		<div className="px-4 sm:px-6 md:px-20 pb-24 py-6">
			<h2 className="text-white text-3xl font-bold mb-4">Movies by Genre</h2>
			<MovieGrid
				movies={movies}
				lastRef={lastRef}
			/>
			{loading && <p className="text-white text-center mt-4">Cargando...</p>}
		</div>
	);
}
