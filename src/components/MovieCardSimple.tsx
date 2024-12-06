'use client';

import { useRouter } from "next/navigation";
import { MovieList } from "@/modules/movies/types/MovieList";
import React from "react";

interface MovieCardSimpleProps {
  movie: MovieList;
}

const MovieCardSimple: React.FC<MovieCardSimpleProps> = ({ movie }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <div
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 cursor-pointer w-full hover:z-10 hover:scale-105"
      onClick={handleCardClick}
    >
      <div
        className="w-full aspect-[2/3] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
        }}
      ></div>
      <div className="p-4 text-center">
        <h3 className="text-white text-lg font-semibold truncate">
          {movie.title}
        </h3>
      </div>
    </div>
  );
};

export default MovieCardSimple;
