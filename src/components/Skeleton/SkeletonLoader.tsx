import React from "react";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface SkeletonLoaderProps {
	title: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ title }) => {
	return (
		<section className="w-full p-4">
			<h2 className="text-3xl font-bold mb-4 text-white">{title}</h2>
			<div className="relative group">
				<button
					className="absolute left-0 top-0 h-full w-16 z-20 bg-gradient-to-r from-gray-900 via-transparent to-transparent 
              opacity-50 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
					aria-hidden="true">
					<span className="text-white text-3xl">&lt;</span>
				</button>
				<div className="flex overflow-x-hidden whitespace-nowrap gap-2 scrollbar-hide">
					{Array.from({ length: 8 }).map((_, index) => (
						<div
							key={index}
							className="flex-shrink-0 w-48 sm:w-60 md:w-72">
							<MovieCardSkeleton />
						</div>
					))}
				</div>
				<button
					className="absolute right-0 top-0 h-full w-16 z-20 bg-gradient-to-l from-gray-900 via-transparent to-transparent 
              opacity-50 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
					aria-hidden="true">
					<span className="text-white text-3xl">&gt;</span>
				</button>
			</div>
		</section>
	);
};

export default SkeletonLoader;
