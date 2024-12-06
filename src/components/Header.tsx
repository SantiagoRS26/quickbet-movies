"use client";
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Logo from "./Logo";
import AuthModal from "./AuthModal";

interface HeaderProps {
	title?: string;
	links?: { label: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({
	title = "QuickBet Movies",
	links = [
		{ label: "Popular", href: "#" },
		{ label: "Favorites", href: "#" },
	],
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<header className="hidden lg:flex bg-black items-center justify-center text-white">
				<div className="flex w-11/12 justify-between items-center">
					<div className="flex gap-14">
						<Logo />
						<nav className="flex items-center gap-14">
							{links.map((link) => (
								<a
									key={link.label}
									href={link.href}
									className="text-white font-medium hover:text-yellow-400 transition text-lg">
									{link.label}
								</a>
							))}
						</nav>
					</div>
					<FaRegUserCircle
						className="text-3xl cursor-pointer hover:text-yellow-400 transition"
						onClick={openModal}
					/>
				</div>
			</header>
			{isModalOpen && <AuthModal onClose={closeModal} />}
		</>
	);
};

export default Header;
