import Link from "next/link";

export default function Logo() {
	return (
		<Link
			href="/"
			className="flex flex-col items-center text-center text-white py-4">
			<div className="text-4xl font-bold tracking-wide">QUICKBET</div>
			<div className="flex items-center space-x-2 mt-2">
				<div className="h-1 w-8 bg-yellow-500"></div>
				<div className="text-yellow-500 font-bold tracking-widest text-sm">
					MOVIES
				</div>
				<div className="h-1 w-8 bg-yellow-500"></div>
			</div>
		</Link>
	);
}
