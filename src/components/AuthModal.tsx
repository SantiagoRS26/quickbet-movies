import React from "react";
import { IoChevronBack } from "react-icons/io5";

interface AuthModalProps {
	onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
	const [isSignUp, setIsSignUp] = React.useState(true);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
			<div
				className="
				bg-black bg-opacity-50 text-white backdrop-blur-md rounded-lg shadow-lg
				w-11/12 max-w-7xl h-auto p-6 flex flex-col lg:flex-row
				overflow-auto
			">
				<button
					onClick={onClose}
					className="absolute lg:top-14 lg:left-14 flex items-center space-x-2 text-white hover:text-gray-300">
					<span className="flex items-center justify-center w-7 h-7 border-2 border-white rounded-full">
						<IoChevronBack className="w-4 h-4" />
					</span>
					<span className="font-bold">Back</span>
				</button>
				<div className="w-full lg:w-[60%] flex justify-center p-4">
					<div className="w-full max-w-md flex flex-col items-center justify-between h-full">
						<div className="flex bg-[#262626] justify-center items-center rounded-[10px] mb-6 w-fit">
							<button
								className={`px-6 py-2 text-md font-semibold rounded-[10px] transition-colors duration-300 ${
									isSignUp
										? "bg-[#F0B90B] text-black"
										: "bg-[#343434] text-white"
								}`}
								onClick={() => setIsSignUp(true)}>
								Sign up
							</button>
							<button
								className={`px-6 py-2 text-md font-semibold rounded-[10px] transition-colors duration-300 ${
									!isSignUp
										? "bg-[#F0B90B] text-black"
										: "bg-[#343434] text-white"
								}`}
								onClick={() => setIsSignUp(false)}>
								Log In
							</button>
						</div>

						<div className="flex-1 flex flex-col justify-center items-center w-full">
							{isSignUp ? (
								<>
									<button className="w-full bg-yellow-500 text-white py-3 px-6 rounded-lg hover:bg-yellow-600">
										Register with your Email ✉️
									</button>
									<div className="h-[150px]" />
								</>
							) : (
								<div className="w-full flex flex-col gap-4">
									<p className="text-center">We love having you back</p>
									<form className="flex flex-col gap-4 text-black">
										<input
											type="email"
											placeholder="Email"
											className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-yellow-500"
										/>
										<input
											type="password"
											placeholder="Password"
											className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring focus:border-yellow-500"
										/>
										<button
											type="submit"
											className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600">
											Continue 🎟️
										</button>
									</form>
								</div>
							)}
						</div>

						<div className="text-white text-sm mt-6">
							For any questions, reach out to{" "}
							<a
								href="mailto:support@quickbetdmovies.com"
								className="text-yellow-500 underline">
								support@quickbetdmovies.com
							</a>
						</div>
					</div>
				</div>
				<div className="w-full lg:w-[40%] flex flex-col items-end justify-end pt-4 px-6 bg-[#1C1C1C] rounded-r-[16px] mt-6 lg:mt-0">
					<h1 className="text-2xl lg:text-3xl font-bold text-center mb-4">
						{isSignUp
							? "Welcome to Quickbet Movies!"
							: "Welcome back to Quickbet Movies!"}
					</h1>
					<p className="text-center mb-6">
						{isSignUp
							? "🎥 Ready to unlock a universe of cinematic delights? Sign up now and start your journey with us!"
							: "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"}
					</p>
					<div className="w-full aspect-square overflow-hidden">
						<img
							src={isSignUp ? "/SignUp.png" : "/SignIn.png"}
							alt={isSignUp ? "Sign Up" : "Sign In"}
							className="w-full h-auto scale-[3.2] translate-y-[80%] object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;
