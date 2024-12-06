import { FaHome } from "react-icons/fa";
import {
	fetchMovieDetails,
	fetchMovieRecommendations,
} from "@/modules/movies/services/moviesService";
import { MovieDetailed } from "@/modules/movies/types/MovieDetailed";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import MovieSection from "./MovieSection";
import MovieRecommendations from "@/components/MovieRecommendations";
import Link from "next/link";

interface MoviePageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: MoviePageProps): Promise<Metadata> {
	const { id } = await Promise.resolve(params);

	try {
		const movie = await fetchMovieDetails(id);
		if (!movie) {
			return { title: "Movie Not Found" };
		}
		return { title: movie.title };
	} catch {
		return { title: "Error Fetching Movie" };
	}
}

export default async function MoviePage({ params }: MoviePageProps) {
	const { id } = await Promise.resolve(params);

	const movie: MovieDetailed | null = await fetchMovieDetails(id);

	if (!movie) {
		notFound();
	}

	const recommendations = await fetchMovieRecommendations(id);

	return (
		<div className="bg-[#454545] min-h-screen relative">
			<MovieSection movie={movie} />
			<div className="mt-5">
				<MovieRecommendations recommendations={recommendations.results} />
			</div>
			<Link href="/" aria-label="Ir al Home">
				<button
					className="fixed bottom-5 right-5 bg-yellow-500 text-black p-3 rounded-full shadow-md hover:bg-yellow-600 transition flex items-center justify-center z-10"
				>
					<FaHome size={20} className="mr-2" />
					<span>Home</span>
				</button>
			</Link>
		</div>
	);
}
