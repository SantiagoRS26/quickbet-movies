"use client";

import { useEffect, useState, useCallback } from "react";

interface UseMoviesParams {
	fetchMovies: (page: number) => Promise<any>;
}

export const useMovies = ({ fetchMovies }: UseMoviesParams) => {
	const [movies, setMovies] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [isFetching, setIsFetching] = useState(false);

	const loadMovies = useCallback(async () => {
		if (isFetching || !hasMore) return;

		try {
			setIsFetching(true);
			const data = await fetchMovies(page);
			setMovies((prev) => [...prev, ...data.results]);
			setHasMore(page < data.total_pages);
			setPage((prevPage) => prevPage + 1);
		} catch (err) {
			setError(err as Error);
		} finally {
			setIsFetching(false);
		}
	}, [fetchMovies, page, hasMore, isFetching]);

	useEffect(() => {
		setLoading(true);
		loadMovies().finally(() => setLoading(false));
	}, []);

	const loadNextPage = () => {
		if (!isFetching && hasMore) {
			loadMovies();
		}
	};

	return { movies, loading, error, loadNextPage, hasMore };
};
