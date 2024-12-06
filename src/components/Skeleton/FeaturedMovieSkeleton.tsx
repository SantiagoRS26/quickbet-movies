import React from "react";

const FeaturedMovieSkeleton: React.FC = () => {
	return (
		<section className="relative w-full h-[436px] bg-gray-700 overflow-hidden shadow-lg animate-pulse">
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
			<div className="absolute bottom-0 w-full py-10 flex justify-center">
				<article className="w-11/12">
					<header className="flex justify-between items-end">
						<div className="flex-1">
							<div className="h-8 bg-gray-600 rounded w-3/4 mb-4"></div>
							<div className="space-y-2 max-w-[70%]">
								<div className="h-4 bg-gray-600 rounded"></div>
								<div className="h-4 bg-gray-600 rounded"></div>
								<div className="h-4 bg-gray-600 rounded w-3/4"></div>
							</div>
						</div>
						<aside className="flex items-center gap-14">
							<div className="h-6 w-6 bg-gray-600 rounded-full"></div>
							<div className="h-[90px] w-[90px] bg-gray-600 rounded-full"></div>
						</aside>
					</header>
				</article>
			</div>
		</section>
	);
};

export default FeaturedMovieSkeleton;
