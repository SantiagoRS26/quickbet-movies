import CircularProgress from "@/components/CircularProgress";
import { MovieDetailed } from "@/modules/movies/types/MovieDetailed";
import { FaHeart } from "react-icons/fa";

interface MovieSectionProps {
	movie: MovieDetailed;
}

const MovieSection: React.FC<MovieSectionProps> = ({ movie }) => {
	const ratingPercentage = Math.round(movie.vote_average * 10);

	return (
		<section
			className="relative w-full bg-center bg-cover text-white shadow-lg"
			style={{
				backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
			}}>
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10"></div>
			<div className="relative flex flex-col md:flex-row justify-center items-center px-4 py-8 w-11/12 md:w-10/12 mx-auto z-20">
				<div className="flex flex-col items-center space-y-4 w-full md:w-1/3 mx-auto">
					<img
						src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
						alt={`${movie.title} Poster`}
						className="w-48 md:w-64 rounded-lg shadow-lg"
						loading="lazy"
					/>
					<a
						href={movie.homepage || "#"}
						target="_blank"
						rel="noopener noreferrer"
						className="px-4 py-2 bg-yellow-500 text-black font-semibold text-lg rounded-lg w-full max-w-xs text-center hover:bg-yellow-600 transition-colors">
						Official Trailer
					</a>
				</div>
				<div className="mt-8 md:mt-0 md:ml-8 flex-1 flex flex-col justify-between">
					<header>
						<h2 className="text-3xl md:text-5xl font-extrabold text-center md:text-left">
							{movie.title}{" "}
							<span className="text-white font-extrabold">
								({new Date(movie.release_date).getFullYear()})
							</span>
						</h2>
						<div className="mt-2 text-white text-base md:text-lg flex flex-col md:flex-row justify-center md:justify-between items-center">
							<span>{new Date(movie.release_date).toLocaleDateString()}</span>
							<span>{movie.runtime} min</span>
						</div>
					</header>
					<div className="mt-6">
						<h3 className="text-2xl md:text-3xl font-bold mb-2">Overview:</h3>
						<p className="text-base md:text-lg text-white text-justify">
							"{movie.overview}"
						</p>
					</div>
					<footer className="mt-6 flex flex-col gap-6 w-full justify-center items-center">
						<div className="flex flex-col md:flex-row items-center justify-between w-full">
							<div className="flex items-center mb-4 md:mb-0">
								<CircularProgress
									percentage={Math.min(100, Math.max(0, ratingPercentage || 0))}
									size={70}
								/>
								<div className="ml-4 text-center md:text-left">
									<span className="block text-lg md:text-xl font-semibold text-white">
										Users <br /> Score
									</span>
								</div>
							</div>
							<FaHeart className="w-8 h-8 md:w-10 md:h-10 text-red-500" />
						</div>
						<div className="flex flex-wrap gap-2 md:gap-3 justify-center">
							{movie.genres.map((genre) => (
								<span
									key={genre.id}
									className="px-3 py-1 text-sm font-medium rounded border 
                                 border-yellow-500 text-yellow-500 
                                 hover:bg-yellow-500 hover:text-black 
                                 transition-colors">
									{genre.name}
								</span>
							))}
						</div>
					</footer>
				</div>
			</div>
		</section>
	);
};

export default MovieSection;
