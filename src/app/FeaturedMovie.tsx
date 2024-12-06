import CircularProgress from "@/components/CircularProgress";
import { MovieList } from "@/modules/movies/types/MovieList";
import { FaHeart } from "react-icons/fa";

interface FeaturedMovieProps {
  movie: MovieList;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  const ratingPercentage = Math.round(movie.vote_average * 10);

  return (
    <section
      className="relative w-full h-[436px] bg-center bg-cover text-white overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
      }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>

      <div className="absolute bottom-0 w-full py-10 flex justify-center">
        <article className="w-11/12">
          <header className="flex justify-between items-end">
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold mb-4">
                {movie.title}
              </h2>
              <p className="text-lg font-medium text-gray-300 line-clamp-3 max-w-[70%]">
                {movie.overview}
              </p>
            </div>

            <aside className="flex items-center gap-14">
              <FaHeart
                className="text-white"
                size={24}
              />
              <CircularProgress
                percentage={ratingPercentage}
                size={90}
              />
            </aside>
          </header>
        </article>
      </div>
    </section>
  );
};

export default FeaturedMovie;
