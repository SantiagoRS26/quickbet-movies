import { useState, useEffect, useRef } from "react";
import { fetchMoviesBySearchQuery } from "@/modules/movies/services/moviesService";
import { MovieApiResponse } from "../types/MovieListApiResponse";
import { MovieList } from "../types/MovieList";

export function useInfiniteMoviesBySearch(query: string) {
  const [movies, setMovies] = useState<MovieList[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Cada vez que la query cambie, se reinician los resultados
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  useEffect(() => {
    let isMounted = true;
    const loadMovies = async () => {
      if (!hasMore) return;
      if (query.trim() === "") return;
      setLoading(true);
      try {
        const data: MovieApiResponse = await fetchMoviesBySearchQuery(query, page);
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
  }, [query, page, hasMore]);

  return { movies, loading, hasMore, setPage };
}