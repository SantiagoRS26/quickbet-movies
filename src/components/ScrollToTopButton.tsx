interface ScrollToTopButtonProps {
	onClick: () => void;
}

export default function ScrollToTopButton({ onClick }: ScrollToTopButtonProps) {
	return (
		<button
			onClick={onClick}
			className="fixed bottom-10 right-10 bg-[#1C1C1C] text-white p-3 rounded-full shadow-md hover:bg-yellow-500 transition"
			aria-label="Volver arriba">
			↑
		</button>
	);
}
