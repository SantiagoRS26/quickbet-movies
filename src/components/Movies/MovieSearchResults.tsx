import MovieGrid from "./MovieGrid";
import { MovieList } from "@/modules/movies/types/MovieList";

interface MovieSearchResultsProps {
  movies: MovieList[];
  loading: boolean;
  lastRef: React.RefObject<HTMLDivElement>;
}

export default function MovieSearchResults({ movies, loading, lastRef }: MovieSearchResultsProps) {
  return (
    <div className="px-4 sm:px-6 md:px-20 pb-24 py-6">
      <h2 className="text-white text-3xl font-bold mb-4">Search Results</h2>
      <MovieGrid movies={movies} lastRef={lastRef} />
      {loading && <p className="text-white text-center mt-4">Cargando...</p>}
    </div>
  );
}
