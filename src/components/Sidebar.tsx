"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import AuthModal from "./AuthModal";
import { fetchMovieGenres } from "@/modules/movies/services/moviesService";

interface Genre {
	id: number;
	name: string;
}

interface SidebarProps {
	onGenreChange: (genreId: number) => void;
	onSearchChange: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onGenreChange, onSearchChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [genres, setGenres] = useState<Genre[]>([]);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadGenres = async () => {
			try {
				const genreData = await fetchMovieGenres();
				console.log("genreData:", genreData);
				if (Array.isArray(genreData)) {
					setGenres(genreData);
				} else {
					setError("No genres found");
				}
			} catch (err) {
				console.error(err);
				setError("Failed to load genres");
			}
		};
		loadGenres();
	}, []);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedId = Number(e.target.value);
		onGenreChange(selectedId);
	};

	return (
		<>
			<input
				type="checkbox"
				id="sidebarToggle"
				className="peer hidden"
			/>
			<label
				htmlFor="sidebarToggle"
				className="lg:hidden fixed top-1/2 left-4 transform -translate-y-1/2 bg-[#1C1C1C]/50 backdrop-blur-sm text-white p-2 rounded z-[9]"
				aria-label="Abrir menú">
				<FaArrowRight size={24} />
			</label>

			<aside
				className="bg-[#262626] text-white p-4 h-full fixed top-0 left-0 z-[11] w-60 flex flex-col gap-6 transition-transform -translate-x-full
        peer-checked:translate-x-0
        lg:translate-x-0 lg:relative lg:block lg:h-auto">
				<div className="flex justify-end lg:hidden">
					<label
						htmlFor="sidebarToggle"
						className="text-white p-2 z-50"
						aria-label="Cerrar menú">
						<FiX size={24} />
					</label>
				</div>

				<div className="flex flex-col gap-4 justify-between h-full">
					<div className="lg:hidden">
						<Logo />
					</div>
					<div>
						<div className="mb-6">
							<label
								htmlFor="search"
								className="block text-sm font-medium mb-2">
								Search
							</label>
							<input
								type="text"
								id="search"
								className="w-full px-3 py-2 bg-[#1C1C1C] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#454545]"
								placeholder="Keywords"
								onChange={(e) => onSearchChange(e.target.value)}
							/>
						</div>

						<div>
							<label
								htmlFor="genres"
								className="block text-sm font-medium mb-2">
								Genres
							</label>
							{error ? (
								<p className="text-red-500">{error}</p>
							) : (
								<select
									id="genres"
									className="w-full px-3 py-2 bg-[#1C1C1C] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#454545]"
									onChange={handleGenreChange}>
									<option value="0">All genres</option>
									{genres.length > 0 &&
										genres.map((genre) => (
											<option
												key={genre.id}
												value={genre.id}>
												{genre.name}
											</option>
										))}
								</select>
							)}
						</div>
					</div>

					<div className="flex w-full justify-center lg:hidden lg:h-full">
						<FaRegUserCircle
							className="text-3xl cursor-pointer hover:text-yellow-400 transition"
							onClick={openModal}
						/>
					</div>
				</div>
			</aside>

			{isModalOpen && <AuthModal onClose={closeModal} />}
		</>
	);
};

export default Sidebar;
