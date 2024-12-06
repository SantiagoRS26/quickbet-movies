import { useMovies } from "@/modules/movies/hooks/useMovies";
import MovieCarousel from "./MovieCarousel";
import Error from "@/components/Error";
import SkeletonLoader from "@/components/Skeleton/SkeletonLoader";

interface MovieSectionProps {
  title: string;
  fetchMovies: (page: number) => Promise<any>;
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, fetchMovies }) => {
  const { movies, loading, error, loadNextPage, hasMore } = useMovies({
    fetchMovies,
  });

  const isLoadingSection = loading || (movies && movies.length === 0);

  if (isLoadingSection) {
    return <SkeletonLoader title={title} />;
  }

  if (error) {
    return (
      <section
        aria-labelledby={`section-${title}`}
        className="px-4 sm:px-6 lg:px-8 py-6"
      >
        <h2
          id={`section-${title}`}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-white"
        >
          {title}
        </h2>
        <Error message={error.message} />
      </section>
    );
  }

  return (
    <section
      aria-labelledby={`section-${title}`}
      className="md:px-4 sm:px-6 lg:px-8 py-6"
    >
      <MovieCarousel
        title={title}
        movies={movies}
        loadMore={loadNextPage}
        hasMore={hasMore}
      />
    </section>
  );
};

export default MovieSection;
