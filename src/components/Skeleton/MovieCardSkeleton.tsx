import React from "react";

const MovieCardSkeleton: React.FC = () => {
	return (
		<article className="relative w-full bg-gray-900 text-white rounded-lg overflow-hidden shadow-md animate-pulse">
			<figure
				className="relative w-full h-64 md:h-80 bg-gray-700"
				aria-label="Placeholder for movie poster"
			></figure>
			<section className="p-2 md:p-4 flex flex-col gap-2">
				<header className="flex flex-col items-start">
					<div className="w-3/4 h-4 bg-gray-700 rounded"></div>
					<div className="w-1/2 h-3 bg-gray-600 rounded mt-2"></div>
				</header>
				<div className="flex flex-col items-center justify-between w-full px-4">
					<div className="flex w-full justify-between">
						<span className="text-sm text-gray-500 mb-1 text-center w-1/2">
							Rating
						</span>
						<span className="text-sm text-gray-500 mb-1 text-center w-1/2">
							Favorites
						</span>
					</div>
					<div className="flex w-full justify-between">
						<div className="flex items-center justify-center w-1/2">
							<div className="w-9 h-9 bg-gray-700 rounded-full"></div>
						</div>
						<div className="flex items-center justify-center w-1/2">
							<div className="w-9 h-9 bg-gray-700 rounded-full"></div>
						</div>
					</div>
				</div>
			</section>
		</article>
	);
};

export default MovieCardSkeleton;
