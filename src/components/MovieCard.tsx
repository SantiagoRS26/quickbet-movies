import { useRouter } from "next/navigation";
import { MovieList } from "@/modules/movies/types/MovieList";
import CircularProgress from "./CircularProgress";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

interface MovieCardProps {
	movie: MovieList;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
	const router = useRouter();
	const [isFavorite, setIsFavorite] = useState(false);
	const [isClicked, setIsClicked] = useState(false);

	const releaseDate = new Date(movie.release_date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const handleClick = () => {
		router.push(`/movie/${movie.id}`);
	};

	const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsFavorite((prev) => !prev);

		setIsClicked(true);
		setTimeout(() => setIsClicked(false), 200);
	};

	return (
		<article
			className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-md transform transition-all duration-300 md:hover:scale-105 md:hover:rotate-[0.6deg] cursor-pointer w-full"
			onClick={handleClick}>
			<figure
				className="relative w-full h-64 md:h-80"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				aria-label={`${movie.title} Poster`}></figure>
			<section className="p-2 md:p-4 flex flex-col gap-2">
				<header className="flex flex-col items-start">
					<h3 className="text-base md:text-lg font-bold truncate">
						{movie.title}
					</h3>
					<time
						className="text-xs md:text-sm text-gray-400 mb-2 md:mb-4"
						dateTime={movie.release_date}>
						{releaseDate}
					</time>
				</header>
				<div className="flex flex-col items-center justify-between w-full px-2 md:px-4">
					<div className="flex w-full justify-between">
						<span className="text-xs md:text-sm text-gray-300 mb-1 text-center w-1/2">
							Rating
						</span>
						<span className="text-xs md:text-sm text-gray-300 mb-1 text-center w-1/2">
							Favorites
						</span>
					</div>
					<div className="flex w-full justify-between">
						<div className="flex items-center justify-center w-1/2">
							<CircularProgress
								percentage={Math.round(movie.vote_average * 10)}
								size={
									typeof window !== "undefined" && window.innerWidth >= 768
										? 35
										: 25
								}
							/>
						</div>
						<div className="flex items-center justify-center w-1/2">
							<button
								className={`text-lg md:text-xl transition-all duration-300 ease-in-out ${
									isFavorite ? "text-red-500" : "text-gray-400"
								} ${isClicked ? "scale-125" : ""}`}
								aria-label="Add to favorites"
								onClick={handleFavoriteClick}>
								<FaHeart className="text-[25px] md:text-[35px]" />
							</button>
						</div>
					</div>
				</div>
			</section>
		</article>
	);
};

export default MovieCard;
