import { useState, useEffect, useRef } from "react";
import { fetchMoviesByGenre } from "@/modules/movies/services/moviesService";
import { MovieApiResponse } from "../types/MovieListApiResponse";
import { MovieList } from "../types/MovieList";

export function useInfiniteMoviesByGenre(genreId: number) {
  const [movies, setMovies] = useState<MovieList[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [genreId]);

  useEffect(() => {
    let isMounted = true;

    const loadMovies = async () => {
      if (!hasMore) return;
      if (genreId === 0) return;
      setLoading(true);
      try {
        const data: MovieApiResponse = await fetchMoviesByGenre(genreId, page);
        if (isMounted) {
          setMovies((prev) => [...prev, ...data.results]);
          if (data.results.length === 0 || page >= data.total_pages) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setHasMore(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadMovies();
    return () => {
      isMounted = false;
    };
  }, [genreId, page, hasMore]);

  return { movies, loading, hasMore, setPage };
}
