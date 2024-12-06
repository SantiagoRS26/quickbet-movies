import React from "react";
import MovieCardSimple from "./MovieCardSimple";
import { MovieList } from "@/modules/movies/types/MovieList";

interface MovieRecommendationsProps {
	recommendations: MovieList[];
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({
	recommendations,
}) => {
	return (
		<section className="w-full py-8 px-4 sm:px-6 lg:px-8">
			<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-white">
				Recommendations
			</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-hidden p-3">
				{recommendations.slice(0, 8).map((movie) => (
					<MovieCardSimple
						key={movie.id}
						movie={movie}
					/>
				))}
			</div>
		</section>
	);
};

export default MovieRecommendations;
